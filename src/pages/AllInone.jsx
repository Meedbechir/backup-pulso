import { Link } from 'react-router-dom';

const AllInOne = () => {
  return (
    <div>
      <nav className="mb-4">
        <ul className="flex space-x-4 ms-4 mt-20">
          <li>
            <Link to="/sondages/resultats" className="text-dark underline text-2xl">
              Resultats
            </Link>
          </li>
          <li>
            <Link to="/soumissions" className="text-dark underline text-2xl">
              Soumissions
            </Link>
          </li>
          <li>
            <Link to="/share-link" className="text-dark underline text-2xl">
              Lien
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllInOne;
