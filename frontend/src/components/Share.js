import React, {useState} from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const Share = () => {
    const [videoId, setVideoId] = useState("");

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const shareVideo = async () => {
        const videoInfo = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=64Wj7NpWZb0&key=AIzaSyBDzShH0tcvjUjpMiqvJ5Zt8D2NXfI8-8c', 
        { params: { id: videoId } });
        console.log(videoInfo.data.items[0]);

        const saveVideoRequest = {
            method: "post",
            url: "http://localhost:3000/saveVideo",
            data: {
                videoId,
                shareBy: "admin",
                title: videoInfo.data.items[0].snippet.title,
                description: videoInfo.data.items[0].snippet.description,
            },
        };
        await axios(saveVideoRequest)
        .then((result) => {
            setVideoId("");
        })
        .catch((error) => {
            error = new Error();
        });
    }
    return (
        <div className='card m-5'>
            <div className="card-header">
                <strong>Share a Youtube movie</strong>
            </div>
            <div className="card-body">
                <div className='d-flex justify-content-around align-items-start'>
                    <Form.Label> Youtube Url: </Form.Label>
                    <div className='w-50 d-flex flex-column'>
                        <Form.Control
                            type="text"
                            placeholder=""
                            name="youtubeurl"
                            onChange={(e) => setVideoId(youtube_parser(e.target.value))}
                            value={videoId}
                        />
                        <Button variant="primary" onClick={() => shareVideo()} className="mt-2">
                            Share
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
