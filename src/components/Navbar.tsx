import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/cubicequation" className="hover:text-yellow-400 transition duration-300">Równanie sześcienne</Link>
          </li>
          <li>
            <Link to="/montecarlo" className="hover:text-yellow-400 transition duration-300">Monte Carlo</Link>
          </li>
          <li>
            <Link to="/quinticequation" className="hover:text-yellow-400 transition duration-300">Równanie piątego stopnia</Link>
          </li>
          <li>
            <Link to="/sieveoferatosthenes" className="hover:text-yellow-400 transition duration-300">Sito Eratostenesa</Link>
          </li>
          <li>
            <Link to="/travelingsalesmanprob" className="hover:text-yellow-400 transition duration-300">Problem Komiwojażera</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
