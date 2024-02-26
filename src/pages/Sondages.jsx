import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../components/features/AuthSlice";
import { selectUserId } from "../components/features/AuthSlice";

const Sondages = () => {
  const [sondages, setSondages] = useState([]);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);


  useEffect(() => {
    if (token) {
      axios
        .get("https://pulso-backend.onrender.com/api/sondages/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userSondages = response.data.filter((survey) => {
            return survey.owner === parseInt(userId);
          });
          setSondages(userSondages);
        })
        .catch((error) => {
          console.error("Error fetching surveys:", error);
        });
    }
  }, [token, userId]);

  return (
    <div className="mt-40 text-center font-sans">
      {(!token || sondages.length === 0) && (
        <div className="text-center text-gray-400 text-2xl font-bold">
          {token
            ? "Aucun sondage à afficher pour l'utilisateur connecté. Veuillez créer d'abord vos sondages pour qu'ils puissent s'afficher ici !"
            : "Veuillez vous connecter pour voir vos sondages existants."}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {sondages.length === 1 ? (
          <div
            key={sondages[0].id}
            className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-200 bg-opacity-75 m-2"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 py-3 bg-slate-500 text-white">
                {sondages[0].question}
              </div>
              <ul className="list-disc text-gray-700 text-base">
                {sondages[0].options.map((option, index) => (
                  <li key={index}>{`${index + 1}. ${option}`}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          sondages.map((survey) => (
            <div
              key={survey.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white m-2 w-72 text-center"
            >
              <div className="py-4">
                <div className="font-bold text-xl mb-2 py-3 bg-slate-500 text-white ">
                  {survey.question}
                </div>
                <ol className=" text-gray-400 font-bold hover:text-gray-600 text-start px-5">
                  {survey.options.map((option, index) => (
                    <li key={index}>{`${index + 1}. ${option}`}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sondages;
