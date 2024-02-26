/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../components/services/AuthServices";
import { setUser, setToken } from "../../components/features/AuthSlice";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Inscription = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Soumission du formulaire pour inscrire un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await registerUser(
        formData.email,
        formData.password,
        formData.password2,
        formData.name,
        formData.tc
      );
      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
        tc: false,
      });
      setLoading(false);
      toast.success("Vous êtes à présent inscrit, amusez-vous!");
      setTimeout(() => {
        navigate("/connexion");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Erreur lors de l'inscription :", error);
      toast.error(
        "Votre inscription a échoué. Veuillez vérifier votre connexion internet!"
      );
    }
  };

  return (
    <div className="mt-40 font-sans">
      <Toaster position="top-left" />
      <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-md backdrop-filter backdrop-blur-sm">
        <h2 className="text-gray-500 text-3xl mb-6 font-bold text-center">
          Pulso
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Entrer le nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
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
          <div>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirmer le mot de passe"
              value={formData.password2}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="tc"
              name="tc"
              checked={formData.tc}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label htmlFor="tc" className="text-gray-600 text-sm font-bold">
              J'accepte les termes et conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full font-bold bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
          <p className="text-sm text-start text-gray-800 mt-4">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/connexion"
              href="#"
              className="font-medium text-blue-500 hover:underline dark:text-primary-500"
            >
              Connectez-vous ici !
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Inscription;