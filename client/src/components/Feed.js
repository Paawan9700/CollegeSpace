// axios is used to made http request from the browser to a particular url
import axios from "axios";

import React, { useState, useEffect } from "react";
// just bringing out the article component here
import Article from "./Article.js";

const Feed = (props) => {

  // destructuring from props
  const {newQuestion, articles, setArticles, isShowSignup, setIsShowSignup,isAdmin} = props;
  console.log(isAdmin);
  const host = "http://localhost:5000";
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  // as soon as a user entered into the site the already questions and answers present
  // there can be shown to the user by using iseEffect
  useEffect(() => {
    async function fetchArticles() {
      let ArticleList;
      if(!isAdmin)
      {
        console.log(isAdmin,'by');
         ArticleList = await axios.get(
          `${host}/api/questions`
        );
      }
      else{
        console.log(isAdmin,"hi");
        ArticleList = await axios.get(`${host}/api/questions/toVerify`)
      }
      setArticles(ArticleList.data);
     
    }
    fetchArticles();
  }, [newQuestion, deleteQuestion, setArticles,isAdmin,articles]);

  return (
    <div className="articles">
      {!isAdmin ?
        <h2>Frequently Asked Questions</h2>
        :
        <h2>Welcome To Admin Panel</h2>
      }
      {articles.map((article) => (
        <Article
        // key is the meccessaty whenever i am using .map function
          key={article._id}
          question={article._id}
          isAdmin={isAdmin}
          user={article.user}
          title={article.title}
          questionBody={article.questionBody}
          tags={article.tags}
          votes={article.votes}
          deleteQuestion={deleteQuestion}
          setDeleteQuestion={setDeleteQuestion}
          isShowSignup={isShowSignup}
          setIsShowSignup={setIsShowSignup}
        />
      ))}
    </div>
  );
};

export default Feed;