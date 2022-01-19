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

  const handleDelete = (id) => {
    axios.delete(`${baseURL}?articleID=${id}`).then((response) => {
      setArticles(articles.filter((i) => i._id !== id));
    });
  }
  
  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const isYesterday = (someDate) => {
    const today = new Date()
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return someDate.getDate() === yesterday.getDate() &&
      someDate.getMonth() === yesterday.getMonth() &&
      someDate.getFullYear() === yesterday.getFullYear()
  }

  const handleDate = (article_date) => {
    if (isToday(article_date)) {
      return article_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (isYesterday(article_date)) {
      return 'Yesterday'
    } else {
      return article_date.toString().substring(4,10);
    }
  }

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
              <td className='info' onClick={() => window.open(article.url, "_blank")}>
                <p className='title'>{ article.title }</p>
                <p className='author'>-{ article.author }-</p>
                </td>
              <td className='date'>{ handleDate(new Date(article.release_date))  }</td>
              <td>
                <div className='edit_hover_class' onClick={() => handleDelete(article._id)}>
                  <a href={() => false}><img src='/trash.png' alt=""/></a>
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
