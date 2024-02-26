import { useState, useEffect } from "react";
import axios from "axios";
import { selectToken } from "../components/features/AuthSlice";
import { useSelector } from "react-redux";
import { selectSondageId } from "../components/features/SondageSlices";

const Soumissions = () => {
  const [submissionsBySondageId, setSubmissionsBySondageId] = useState({});
  const sondageIdsFromRedux = useSelector(selectSondageId);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        if (!token || !sondageIdsFromRedux || sondageIdsFromRedux.length === 0) {
          console.log("Pas de Token ou de sondageId. Impossible de voir les soumissions");
          return;
        }

        const submissionsData = {};

        // Use Promise.all to make requests for all sondage IDs concurrently
        await Promise.all(
          sondageIdsFromRedux.map(async (sondageId) => {
            const response = await axios.get(
              `https://pulso-backend.onrender.com/api/sondages/${sondageId}/resultats/`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            submissionsData[sondageId] = response.data.answers;
          })
        );

        setSubmissionsBySondageId(submissionsData);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchSubmissions();
  }, [sondageIdsFromRedux, token]);

  if (!token) {
    return (
      <div className="text-center text-gray-400 text-2xl font-bold mt-40">
        Veuillez vous connecter pour voir les soumissions.
      </div>
    );
  }

  if (Object.keys(submissionsBySondageId).length === 0) {
    return (
      <div className="text-center text-gray-400 text-2xl font-bold mt-40">
        Aucune soumission disponible pour ces sondages.
      </div>
    );
  }

  const tables = Object.entries(submissionsBySondageId).map(([sondageId, submissions]) => {
    const tableRows = submissions.map((submission, index) => (
      <tr key={index}>
        <td className="border-t border-r border-gray-300 py-2 px-4">{submission.created_at}</td>
        <td className="border-t border-r border-gray-300 py-2 px-4">{submission.choix}</td>
      </tr>
    ));

    return (
      <>
      <div className="flex align-center text-center gap-12 justify-center mb-12 flex-col">
       <div key={sondageId}>
        <h1 className="text-2xl font-bold mb-4">
          Soumissions du Sondage {sondageId}
        </h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-r">Created At</th>
              <th className="py-2 px-4 border-b">Choix</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      </div>
      </>
     
    );
  });

  return <div>{tables}</div>;
};

export default Soumissions;
