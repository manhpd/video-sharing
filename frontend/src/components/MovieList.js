import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import YoutubeEmbed from "./YoutubEmbed";
const cookies = new Cookies();


export default function MovieList() {
  // set an initial state for the message we will receive after the API call
  const [videos, setVideos] = useState([]);
  

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    const token = cookies.get("TOKEN");
    // set configurations for the API call here
    const getMoviesRequest = {
      method: "get",
      url: "https://video-sharing-manh.herokuapp.com/getMovies",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(getMoviesRequest)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setVideos(result.data);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const listVideo = videos?.map((video) => 
    <YoutubeEmbed key={video.videoId} embedId={video.videoId} title={video.title} shareBy={video.shareBy} description={video.description}/> 
  );

  return (
    <div className="text-center mt-4">
      <div className="d-flex flex-column align-items-center gap-2 justify-content-center">
        {listVideo}
      </div>
    </div>
  );
}