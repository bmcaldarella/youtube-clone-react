# React + Vite
# YouTube Clone

#LINK : https://beamish-raindrop-f99d00.netlify.app/

**YouTube Clone** is a web application built with React and Vite that replicates the main features of YouTube. It allows users to view videos by category, check video details, and explore recommended videos. The application uses the YouTube API to fetch real-time data.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool for JavaScript projects.
- **React Router**: For routing within the application.
- **YouTube Data API v3**: For fetching video and comment data.

## Installation

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your_username/youtube-clone-react.git
cd youtube-clone-react
Install Dependencies

Install the project dependencies using npm or yarn:
npm install
or
yarn install
Configure Environment Variables

Create a .env file in the root of the project and add your YouTube API key:
VITE_API_KEY=your_api_key_here
Usage

To run the application in development mode, use:
npm run dev
or
yarn dev
This will start the development server and open the application in your default web browser.
Main Components
PlayVideo

    Description: Displays the selected video along with details such as title, description, view count, likes, and comments.
    Props:
        videoId: The ID of the YouTube video.

Recommended

    Description: Shows a list of recommended videos based on the selected category.
    Props:
        categoryId: The ID of the video category.

Video

    Description: The main video playback page, showing the selected video and recommended videos.
    Props:
        videoId: The ID of the YouTube video.
        categoryId: The ID of the video category.

Routes

The application uses React Router for routing:

    /video/:videoId/:categoryId - Video playback page, shows the selected video and recommended videos based on the category.

YouTube API

The application uses the YouTube Data API v3 to fetch video data. The following endpoints are used:

    Video Details: https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id={videoId}&key={API_KEY}
    Comments: https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId={videoId}&key={API_KEY}
    Recommended Videos: https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId={categoryId}&key={API_KEY}

Contributing

If you would like to contribute to this project, please follow these steps:

    Fork the repository.
    Create a branch with your changes (git checkout -b feature/new-feature).
    Make your changes and commit (git commit -am 'Add new feature').
    Push your changes (git push origin feature/new-feature).
    Create a Pull Request.
