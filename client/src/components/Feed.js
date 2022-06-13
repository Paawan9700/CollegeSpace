import axios from "axios";
import React, { useState, useEffect } from "react";
import Article from "./Article.js";

const Feed = ({
  newQuestion,
  articles,
  setArticles,
  isShowSignup,
  setIsShowSignup,
}) => {
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  useEffect(() => {
    async function fetchArticles() {
      const ArticleList = await axios.get(
        "http://localhost:5000/api/questions"
      );
      setArticles(ArticleList.data);
    }
    fetchArticles();
  }, [newQuestion, deleteQuestion, setArticles]);

  return (
    <div className="articles">
      <h2>All question answers</h2>
      {articles.map((article) => (
        <Article
          key={article._id}
          question={article._id}
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
