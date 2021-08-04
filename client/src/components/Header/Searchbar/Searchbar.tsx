import "./searchbar.css";
import { FaSearch } from "react-icons/fa";
const Searchbar = () => {
  return (
    <div className="searchbar">
      <FaSearch />
      <input type="text" placeholder="Search"></input>
    </div>
  );
};

export default Searchbar;
