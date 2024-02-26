/* eslint-disable react/no-unescaped-entities */
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-40 font-sans">
      <div className="text-center flex justify-center items-center flex-col">
        <h1 className="text-gray-500 text-5xl font-black mb-6">
          La façon la plus simple de créer des sondages
        </h1>
        <h3 className="text-gray-600 font-semibold my-12 text-xl">
          Dites adieu aux formulaires ennuyeux. Rencontrez Pulso — le générateur{" "}
          <br />
          gratuit de formulaires, intuitifs que vous recherchiez.
        </h3>
        <NavLink to="/forms">
          <button
            type="button"
            className="px-4 py-1 bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-md"
          >
            {" "}
            Créer un formulaire
            <ArrowForwardIcon className="ml-2" />
          </button>
        </NavLink>
        <p className="text-gray-400">Pas d'authentification requise</p>
      </div>
    </div>
  );
};

export default Home;