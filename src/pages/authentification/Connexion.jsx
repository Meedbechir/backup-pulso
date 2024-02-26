/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../components/services/AuthServices";
import { setUser, setToken } from "../../components/features/AuthSlice";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";


// Composant principal
const Connexion = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Soumission du formulaire pour connecter un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(formData.email, formData.password);
      dispatch(setUser(response.user));
      dispatch(
        setToken({
          access: response.token.access,
          refresh: response.token.refresh,
          user_id: response.user_id,
        })
      );

      // localStorage.setItem("user", JSON.stringify(response.user_id));

      setFormData({
        email: "",
        password: "",
      });
      setLoading(false);
      toast.success("Vous êtes à présent connecté, amusez-vous!");
      setTimeout(() => {
        navigate("/forms");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Erreur lors de la connexion:", error);
      toast.error(
        "Votre connexion a échoué. Veuillez vérifier votre connexion internet!"
      );
    }
  };

  return (
    <div className="mt-40 font-sans">
      <Toaster position="top-left" />
      <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-md mb-5">
        <h2 className="text-gray-500 text-3xl mb-6 font-bold text-center">
          Pulso
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrer l'email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrer le mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold bg-blue-500 text-white py-1 mt-4 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
          <p className="text-sm text-start text-gray-800 mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/inscription"
              className="font-medium text-blue-500 hover:underline dark:text-primary-500"
            >
              Inscrivez-vous ici !
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Connexion;