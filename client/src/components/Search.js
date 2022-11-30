import React, { useState } from "react";
import axios from "axios";
import "../styles/Nav.css";

const Search = ({ articles, setArticles }) => {
  const [searchText, setSearchText] = useState("");
  const searchHandler = async () => {
    console.log(searchText)
    const art = await axios.get(
      `http://localhost:5000/api/questions/search/${searchText.toLowerCase()}`
    );
    setArticles(art.data);
  };
  
  return (
    <div className="search">
      <form className="search-form1">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
          placeholder="title Search.."
        />
        <button type="button" onClick={searchHandler} className="submit-button">
          Search
        </button>
      </form>
    </div>
  );
};
export default Search;
