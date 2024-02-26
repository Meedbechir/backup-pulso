/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import axios from "axios";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { selectToken, selectUserId } from "../components/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  setLienSondageStockes,
  setSondageId,
} from "../components/features/SondageSlices";

const Forms = () => {
  const [token] = useState(useSelector(selectToken));
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState([
    { type: "text", value: "", key: 0 },
  ]);
  const [formTitle, setFormTitle] = useState("");
  const inputRef = useRef(null);

  const handleTextareaSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  const handleFieldChange = (index, e) => {
    const newFields = [...formFields];
    newFields[index].value = e.target.value;
    setFormFields(newFields);
  };

  const addField = () => {
    const newFields = [
      ...formFields,
      { type: "text", value: "", key: formFields.length },
    ];
    setFormFields(newFields);
  };

  const removeField = (index) => {
    const newFields = formFields.filter((field) => field.key !== index);
    setFormFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.warning(
        "Veuillez vous identifier avant de pouvoir créer un sondage"
      );
      setTimeout(() => {
        navigate("/connexion");
      }, 2000);

      return;
    }

    try {
      setLoading(true);
      const res = await submitForm({
        question: formTitle,
        options: formFields.map((field) => field.value),
      });

      if (res && res.status === 201) {
        const { slug, id: sondageId, owner: userId } = res.data;
        const lienSondage = `https://backup-pulso.vercel.app/sondages/${slug}`;
  
        dispatch(setLienSondageStockes({ sondageId, lien: lienSondage, owner: userId }));
        dispatch(setSondageId([sondageId]));
        
        toast.success(
          "Sondage créé. Vous pouvez à présent partager votre sondage !"
        );
        setFormTitle("");
        setFormFields([{ type: "text", value: "", key: 0 }]);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (formData) => {
    try {
      const owner = userId;

      if (!owner) {
        console.error(
          "Utilisateur pas connecté, Impossible de créer le Sondage"
        );
        return;
      }

      formData.owner = owner;

      const res = await axios.post(
        "https://pulso-backend.onrender.com/api/sondages/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-center mt-40 font-sans">
      <Toaster position="top-left" />
      <div className="absolute right-5 top-28">
        <button
          onClick={() => navigate("/share-link")}
          className="rounded-md text-white bg-blue-500  hover:bg-blue-600 px-4 py-1 focus:outline-none focus:bg-blue-600 font-bold"
        >
          Publier
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-20">
        <div className="mb-4">
          <textarea
            placeholder="Titre du formulaire"
            className="w-full p-2 border-none outline-none text-4xl font-bold rounded"
            required
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          ></textarea>
        </div>
        {formFields.map((field, index) => (
          <div key={field.key} className="flex items-center mb-4">
            <div className="ml-2 flex">
              <button
                type="button"
                onClick={() => removeField(field.key)}
                className={`px-2 py-1 mr-1 rounded ${
                  index === 0 ? "disabled" : ""
                }`}
                disabled={index === 0}
              >
                <DeleteIcon />
              </button>
              <button
                type="button"
                onClick={addField}
                className="px-2 py-1 rounded"
              >
                <AddRoundedIcon />
              </button>
            </div>
            <input
              ref={inputRef}
              type={field.type}
              placeholder="Contenu du formulaire"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e)}
              className="w-full px-2 border-b border-gray-300 font-bold focus:outline-none focus:border-gray-400 rounded"
              required
            />
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-black  hover:bg-gray-800 font-bold text-white rounded"
            disabled={loading}
          >
            {loading ? "Soumission..." : "Soumettre"}{" "}
            <ArrowForwardIcon className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
