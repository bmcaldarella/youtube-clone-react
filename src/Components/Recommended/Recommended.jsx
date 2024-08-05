import React, { useEffect, useState } from "react";
import './Recommended.css';
import { API_KEY, value_convertor } from "../../data";
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`;
        try {
            const response = await fetch(relatedVideo_url);
            const data = await response.json();
            setApiData(data.items);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    return (
        <div className="recommended">
            {apiData.map((item) => {
                const { id, snippet, statistics } = item;
                const { title, channelTitle, thumbnails } = snippet;
                const thumbnailUrl = thumbnails.medium.url;

                return (
                    <Link to={`/video/${categoryId}/${id}`} key={id} className="side-video-list">
                        <img src={thumbnailUrl} alt={title} />
                        <div className="vid-info">
                            <h4>{title}</h4>
                            <p>{channelTitle}</p>
                            <p>{value_convertor(statistics.viewCount || 0)} Views</p> 
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Recommended;
