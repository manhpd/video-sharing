import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import YoutubeEmbed from "./YoutubEmbed";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function MovieList() {
  // set an initial state for the message we will receive after the API call
  const [videos, setVideos] = useState([]);
  

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const getMoviesRequest = {
      method: "get",
      url: "http://localhost:3000/getMovies",
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
  }, [token]);

  const listVideo = videos?.map((video) => 
    <YoutubeEmbed embedId={video.videoId} title={video.title} shareBy={video.shareBy} description={video.description}/> 
  );

  return (
    <div className="text-center">
      <div className="d-flex flex-column align-items-center gap-2">
        {listVideo}
      </div>
    </div>
  );
}