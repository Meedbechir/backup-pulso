import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../components/features/AuthSlice';
import { useNavigate } from 'react-router-dom';

const ListSondages = () => {
  const [sondages, setSondages] = useState([]);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSondages = async () => {
      try {
        const response = await axios.get('https://pulso-backend.onrender.com/api/sondages/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = parseInt(localStorage.getItem('user'));
        
        const userSondages = response.data.filter((survey) => survey.owner === userId);
        setSondages(userSondages);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    if (token) {
      fetchUserSondages();
    }
  }, [token]);

  const handleClick = () => {

    navigate('/allinone');
  };

  return (
    <div className="mt-10 md:mt-30 text-start font-bold ">
        <h1 className='text-4xl pb-4 ms-14'>Mes Sondages</h1>
        <hr className='pb-4' />
    {sondages.map((sondage) => (
      <div key={sondage.id} className="mb-5 hover:bg-gray-100 hover:border-gray-50 hover:shadow-md p-4 rounded-md md:ms-12 cursor-pointer" 
      onClick={handleClick}
      >
        <ul className="list-disc list-none text-gray-700 text-base">
          <li>{sondage.question}</li>
        </ul>
        <p className="text-gray-500 mt-2">Pulso-Submissions</p>
      </div>
    ))}
  </div>
  );
};

export default ListSondages;
