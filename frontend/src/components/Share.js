import React, {useState} from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const Share = () => {
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const shareVideo = async () => {
        const saveVideoRequest = {
            method: "post",
            url: "http://localhost:3000/saveVideo",
            data: {
                videoId : "rokGy0huYEA",
                shareBy: "admin",
                title: "title",
                description: "description",
            },
        };
        await axios(saveVideoRequest)
        .then((result) => {
            setYoutubeUrl("");
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
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            value={youtubeUrl}
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
