import axios from "axios";
import React from "react";
import "../styles/Sidebar.css";

function Sidebar(props) {

  // destructuring
  const {setArticles} = props;
  const host = "http://localhost:5000";

  // what is gonna happen when each categaory is clicked seperatly
  const clickHandler = async (category) => {

    console.log(category.target.outerText);
    const categoryName = category.target.outerText;

    const filterarticles = await axios
      .get(`${host}/api/questions/${categoryName}`)
      .catch((error) => {
        console.log(error);
      });
    setArticles(filterarticles.data);
  };


  return (
    // css can be applied on this className = "sidebars"
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
