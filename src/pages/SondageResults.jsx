import { useState, useEffect } from "react";
import axios from "axios";
import { selectToken, selectUserId } from "../components/features/AuthSlice";
import { useSelector } from "react-redux";
import { selectSondageId, selectLienSondageStockes } from "../components/features/SondageSlices";

const SondageResults = () => {
  const [results, setResults] = useState([]);
  const sondageIdsFromRedux = useSelector(selectSondageId);
  const token = useSelector(selectToken);
  const user_id = useSelector(selectUserId);
  const lienSondagesStockes = useSelector(selectLienSondageStockes);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!token || !sondageIdsFromRedux || sondageIdsFromRedux.length === 0) {
          console.log("Pas de Token ou de sondageId. Impossible de voir les resultats");
          return;
        }

        const resultsData = {};

        // Use Promise.all to make requests for all sondage IDs concurrently
        await Promise.all(
          sondageIdsFromRedux.map(async (sondageId) => {
            // Filter your sondage IDs based on user_id and owner
            const sondage = lienSondagesStockes.find(s => s.sondageId === sondageId);
            if (sondage && sondage.owner === user_id) {
              const response = await axios.get(
                `https://pulso-backend.onrender.com/api/sondages/${sondageId}/resultats/`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              resultsData[sondageId] = response.data;
            }
          })
        );

        setResults(resultsData);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchResults();
  }, [sondageIdsFromRedux, token, user_id, lienSondagesStockes]);

  if (!token) {
    return (
      <div className="text-center text-gray-400 text-2xl font-bold mt-40">
        Veuillez vous connecter pour voir les résultats.
      </div>
    );
  }

  if (Object.keys(results).length === 0) {
    return (
      <div className="text-center text-gray-400 text-2xl font-bold mt-40">
        Aucun résultat disponible pour ces sondages.
      </div>
    );
  }

  const resultComponents = Object.entries(results).map(([sondageId, result]) => {
    const { answers } = result;

    const pourcentageOptions = {};

    if (Array.isArray(answers)) {
      answers.map((answer) => {
        const choix = answer.choix;

        if (pourcentageOptions[choix]) {
          pourcentageOptions[choix]++;
        } else {
          pourcentageOptions[choix] = 1;
        }

        return null;
      });
    } else {
      console.error("Answers is not an array:", answers);
    }

    const totalVotes = answers.length;

    const optionPlusElevee = Object.keys(pourcentageOptions).reduce(
      (a, b) => (pourcentageOptions[a] > pourcentageOptions[b] ? a : b),
      ""
    );

    const graphiqueOptionBar = Object.keys(pourcentageOptions).map((option) => (
      <div
        key={option}
        className="mb-4 text-gray-500 font-bold hover:text-gray-600"
      >
        <div className="flex items-center mb-2">
          <div className="w-1/4 text-right pr-4">{option}</div>
          <div className="w-1/2 bg-gray-200 h-6 rounded-full overflow-hidden">
            <div
              className={`h-full bg-blue-500 ${
                option === optionPlusElevee ? "most-frequent" : ""
              }`}
              style={{
                width: `${(pourcentageOptions[option] / totalVotes) * 100}%`,
              }}
            ></div>
          </div>
          <div className="w-1/4 pl-4 text-gray-600">
            {Math.round((pourcentageOptions[option] / totalVotes) * 100)}%
          </div>
        </div>
      </div>
    ));

    return (
      <>
        <div className="flex align-center text-center gap-12 justify-center flex-col font-sans mb-12">
          <div key={sondageId} className="">
            <h1 className="text-2xl font-bold mb-4">
              Résultats du Sondage {sondageId}
            </h1>
            <div className="options-container">{graphiqueOptionBar}</div>
          </div>
        </div>
      </>
    );
  });

  return <>{resultComponents}</>;
};

export default SondageResults;
