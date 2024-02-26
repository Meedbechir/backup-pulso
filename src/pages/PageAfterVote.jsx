import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PageAfterVote = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = (event) => {
      event.preventDefault();
      navigate("/");
    };

    window.history.pushState({}, "", "/pageaftervote");
    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans">
      <h2 className="text-3xl font-bold mb-4">Merci d&apos;avoir voté !</h2>
      <p className="text-lg mb-6">Vous pouvez créer un formulaire ici :</p>
      <Link
        to="/Forms"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Aller vers les formulaires
      </Link>
    </div>
  );
};

export default PageAfterVote;