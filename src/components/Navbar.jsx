import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../components/features/AuthSlice";
import { Toaster, toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("LienSondage");
      localStorage.removeItem("user");
      localStorage.removeItem("sondageId");

      dispatch(logout());
      toast.success("Vous n'êtes plus connecté !");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.warning(
        "VOus n'avez pas pu vous déconnecter. Vérifiez votre connexion internet !"
      );
    }
  };

  return (
    <>
      <Toaster position="top-left" />
      <nav className="bg-white p-4 flex items-center justify-between fixed top-0 font-sans w-full z-50">
        <div>
          <NavLink to="/" onClick={closeMenu}>
            <p className="text-gray-600 text-2xl font-bold">Pulso</p>
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/sondages"
            className="text-gray-400 font-bold hover:text-gray-600 focus:text-gray-600"
            onClick={closeMenu}
          >
            Sondages
          </NavLink>
          <NavLink
            to="/resultats"
            className="text-gray-400 font-bold hover:text-gray-600 focus:text-gray-600"
            onClick={closeMenu}
          >
            Résultats
          </NavLink>
          {token ? (
            <>
              <button
                className="text-gray-400 font-bold hover:text-gray-600"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/connexion"
                className="text-gray-400 font-bold hover:text-gray-600 focus:text-gray-600"
                onClick={closeMenu}
              >
                Connexion
              </NavLink>
              <NavLink
                to="/inscription"
                className="text-gray-400 font-bold hover:text-gray-600 focus:text-gray-600"
                onClick={closeMenu}
              >
                Inscription
              </NavLink>
            </>
          )}
          <NavLink to="/forms" onClick={closeMenu}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md font-bold">
              Créer un formulaire
            </button>
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 text-3xl hover:text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
          {isMenuOpen && (
            <div className="absolute top-16 text-2xl right-0 bg-white p-4 border shadow-md w-screen md:w-auto">
              <NavLink
                to="/sondages"
                className="block text-gray-400 font-bold hover:text-gray-600 mb-2 text-center"
                onClick={closeMenu}
              >
                Sondages
              </NavLink>
              <NavLink
                to="/resultats"
                className="block text-gray-400 font-bold hover:text-gray-600 mb-2 text-center"
                onClick={closeMenu}
              >
                Résultats
              </NavLink>
              {token ? (
                <>
                  <button
                    className="text-gray-400 font-bold hover:text-gray-600 w-full mb-2 text-center"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/connexion"
                    className="block text-gray-400 font-bold hover:text-gray-600 mb-2 text-center"
                    onClick={closeMenu}
                  >
                    Connexion
                  </NavLink>
                  <NavLink
                    to="/inscription"
                    className="block text-gray-400 font-bold hover:text-gray-600 mb-2 text-center"
                    onClick={closeMenu}
                  >
                    Inscription
                  </NavLink>
                </>
              )}
              <NavLink to="/forms" onClick={closeMenu}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md w-full focus:outline-none focus:bg-blue-600 font-bold">
                  Créer un formulaire
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;