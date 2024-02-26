import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Templates() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Templates;
