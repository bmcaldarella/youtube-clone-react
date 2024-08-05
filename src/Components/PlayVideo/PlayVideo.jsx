import React, { useEffect, useState } from "react";
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_convertor, timeAgo } from "../../data";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
    const {videoId}=useParams();
    const [apidata, setApidata] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        try {
            const response = await fetch(videoDetails_url);
            const data = await response.json();
            setApidata(data.items[0]);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchOtherData = async (channelId) => {
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
        try {
            const response = await fetch(channelData_url);
            const data = await response.json();
            setChannelData(data.items[0]);
        } catch (error) {
            console.error("Error fetching channel data: ", error);
        }
    };

    const fetchComments = async () => {
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
        try {
            const response = await fetch(comment_url);
            const data = await response.json();
            setCommentData(data.items);
        } catch (error) {
            console.error("Error fetching comments: ", error);
        }
    };

    useEffect(() => {
        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    useEffect(() => {
        if (apidata) {
            fetchOtherData(apidata.snippet.channelId);
            fetchComments();
        }
    }, [apidata]);

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>

            <h3>{apidata ? apidata.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>
                    {apidata ? (
                        <>
                            {value_convertor(apidata.statistics.viewCount)} Views &bull; {timeAgo(apidata.snippet.publishedAt)}
                        </>
                    ) : (
                        "Loading..."
                    )}
                </p>
                <div>
                    <span><img src={like} alt="like" />{value_convertor(apidata ? apidata.statistics.likeCount : 12)}</span>
                    <span><img src={dislike} alt="dislike" /></span>
                    <span><img src={share} alt="share" />Share</span>
                    <span><img src={save} alt="save" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="publisher" />
                <div>
                    <p>{apidata ? apidata.snippet.channelTitle : "Channel Name"}</p>
                    <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : "Loading..."} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apidata ? apidata.snippet.description.slice(0, 250) : "Loading..."}</p>
                <hr />
                <h4>{value_convertor(apidata ? apidata.statistics.commentCount : 0)} Comments</h4>
                {commentData.map((item, index) => {
                    const comment = item.snippet.topLevelComment.snippet;
                    return (
                        <div key={index} className="comment">
                            <img src={comment.authorProfileImageUrl || user_profile} alt="user" />
                            <div>
                                <h3>{comment.authorDisplayName} <span>{timeAgo(comment.publishedAt)}</span></h3>
                                <p>{comment.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="like" />
                                    <span>{value_convertor(comment.likeCount)}</span>
                                    <img src={dislike} alt="dislike" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayVideo;
