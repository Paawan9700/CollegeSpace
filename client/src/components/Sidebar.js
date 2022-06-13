import axios from "axios";
import React from "react";
import "../styles/Sidebar.css";

function Sidebar({ articles, setArticles }) {
  const clickHandler = async (choice) => {
    console.log(choice.target.outerText);
    const articles = await axios
      .get(`http://localhost:5000/api/questions/${choice.target.outerText}`)
      .catch((e) => {
        console.log(e);
      });
    setArticles(articles.data);
  };
  return (
    <div className="sidebars">
      <div className="sidebar" onClick={clickHandler}>
        <img
          src="https://assets.coingecko.com/coins/images/15201/large/110._Infinity_Protocol_Logo_200_Pixel.png?1620095445"
          alt=""
        />
        <p>All</p>
      </div>

      <div className="sidebar" onClick={clickHandler}>
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg"
          alt=""
        />
        <p>Academic</p>
      </div>

      <div className="sidebar" onClick={clickHandler}>
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-858-100-VnZbEVtOIGkEHXlnYId9slumV59IPgkA.jpeg"
          alt=""
        />

        <p>Co-curricular</p>
      </div>
      <div className="sidebar" onClick={clickHandler}>
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-1913-100-B8JrwaVauFzsaTSqXDqoWLCXzQb2mTE9.jpeg"
          alt=""
        />
        <p>Placements</p>
      </div>
    </div>
  );
}

export default Sidebar;
