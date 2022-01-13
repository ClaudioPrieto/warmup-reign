import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {

  const baseURL = 'http://localhost:5000/articles'

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setArticles(response.data);
    });
  }, []);

  // Fix onClick function in table∫

  return(
    <div className='container'>
      <div className='header'>
        <h1>HN Feed</h1>
        <h2>We &lt;3 hacker news</h2>
      </div>
      <div className='table-container'>
        <table className='articles-table'>
          {articles.map((article, index) => (
            <tr key={index}>
              <td onClick={() => window.open(article.url, "_blank")}>{article.title}</td>
              <td onClick={() => window.open(article.url, "_blank")}>{article.author}</td>
              <td onClick={() => window.open(article.url, "_blank")}>{article.release_date}</td>
              <td>
                <div className='edit_hover_class'>
                    <a href='#'><img src='/trash.png' /></a>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Home;
