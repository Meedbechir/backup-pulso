import { useState, useEffect } from "react";
import axios from "axios";
import { selectToken } from "../components/features/AuthSlice";
import { useSelector } from "react-redux";
import { selectSondageId } from "../components/features/SondageSlices";

const SondageResults = () => {
  const [results, setResults] = useState([]);
  const sondageIdsFromRedux = useSelector(selectSondageId);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!token || !sondageIdsFromRedux || sondageIdsFromRedux.length === 0) {
          console.log("Pas de Token ou de sondageId. Impossible de voir les resultats");
          return;
        }

        // Use Promise.all to make requests for all sondage IDs concurrently
        const requests = sondageIdsFromRedux.map(async (sondageId) => {
          return axios.get(
            `https://pulso-backend.onrender.com/api/sondages/${sondageId}/resultats/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        });

        // Use Promise.all to wait for all requests to complete
        const responses = await Promise.all(requests);

        // Handle responses as needed
        const resultsData = responses.map((response) => response.data);

        setResults(resultsData);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchResults();
  }, [sondageIdsFromRedux, token]);

  if (!token) {
    return (
      <div className="text-center text-gray-400 text-2xl font-bold mt-40">
        Veuillez vous connecter pour voir les résultats.
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-400 text-2xl font-bold mt-40">
        Aucun résultat disponible pour ces sondages.
      </div>
    );
  }

  // Process and render results for each sondage ID
  const resultComponents = results.map((result, index) => {
    const { sondage_id, answers } = result;

    const pourcentageOptions = {};
    answers.forEach((answer) => {
      if (pourcentageOptions[answer.choix]) {
        pourcentageOptions[answer.choix]++;
      } else {
        pourcentageOptions[answer.choix] = 1;
      }
    });

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
      <div key={index} className="">
        <h1 className="text-2xl font-bold mb-4">
          Résultats du Sondage {sondage_id}
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
