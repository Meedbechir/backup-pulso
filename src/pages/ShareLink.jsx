import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUserId } from "../components/features/AuthSlice";
import { selectLienSondageStockes } from "../components/features/SondageSlices";
import { Toaster, toast } from "sonner";

const ShareLink = () => {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const liensSondages = useSelector(selectLienSondageStockes);
  const [copiedIndex, setCopiedIndex] = useState(null);



  const userLiensSondages = liensSondages.filter(lien => lien.owner === userId);

  const handleCopy = (lien, index) => {
    if (lien && token) {
      navigator.clipboard.writeText(lien);
      setCopiedIndex(index);
      toast.success("Lien copié!");
      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } else {
      console.error("Utilisateur pas authentifié ou pas de lien disponible");
      toast.error("Utilisateur pas authentifié ou pas de lien disponible!");
    }
  };

  return (
    <div className="mt-40 font-sans">
      <div className="mt-32 flex items-center justify-center">
        <Toaster position="top-left" />
        {userLiensSondages.length > 0 && token ? (
          <div>
            {userLiensSondages.map((lien, index) => (
              <div key={index} className="mb-4">
                <input
                  value={lien.lien}
                  disabled
                  className="p-3 ms-5"
                  style={{ minWidth: "430px" }}
                />
                <button
                  onClick={() => handleCopy(lien.lien, index)}
                  className={`ml-2 bg-slate-600 text-white px-4 py-1 rounded-md ${copiedIndex === index ? "opacity-50" : ""}`}
                  disabled={copiedIndex !== null}
                >
                  {copiedIndex === index ? "Copié!" : "Copier"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-2xl font-bold">
            Pas de lien disponible. Créez un sondage ou connectez-vous.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShareLink;
