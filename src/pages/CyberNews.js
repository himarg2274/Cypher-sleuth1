import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CyberNews = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cybernews')
            .then(response => setNews(response.data))
            .catch(error => console.error("Error fetching news:", error));
    }, []);

    return (
        <div className="news-container">
            <h2>Cybersecurity News</h2>
            {news.map((article, index) => (
                <div key={index} className="news-article">
                    <h3>{article.title}</h3>
                    <p><strong>Source:</strong> {article.source}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
            ))}
        </div>
    );
};

export default CyberNews;
