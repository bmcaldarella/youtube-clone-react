import React, { useEffect, useState } from "react";
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY,value_convertor,timeAgo } from "../../data";


const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=70&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        try {
            const response = await fetch(videoList_url);
            const result = await response.json();
            setData(result.items);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="feed">
            {data.map((item) => {
                const { id, snippet } = item;
                const { title, channelTitle, thumbnails } = snippet;
                const thumbnailUrl = thumbnails.high.url; // Use the appropriate thumbnail size

                return (
                    <Link key={id} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                        <img src={item.snippet.thumbnails.medium.url} alt={title} />
                        <h2>{item.snippet.title}</h2>
                        <h3>{channelTitle}</h3>
                        <p>{value_convertor(item.statistics.viewCount)} &bull;{timeAgo(item.snippet.publishedAt)}</p>
                    </Link>
                );
            })}
        </div>
    );
}

export default Feed;


