import React, {useState, useEffect} from 'react'
import { Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Share = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length === 11)? match[7] : false;
    }

    useEffect(() => {
        setUsername(cookies.get("USERNAME"));
    }, []);

    const shareVideo = async () => {
        setIsLoading(true);
        const videoInfo = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBDzShH0tcvjUjpMiqvJ5Zt8D2NXfI8-8c', 
        { params: { id: youtube_parser(youtubeUrl) } });
        

        if (youtube_parser(youtubeUrl) && videoInfo) {
            const saveVideoRequest = {
                method: "post",
                url: "https://video-sharing-manh.herokuapp.com/saveVideo",
                data: {
                    videoId : youtube_parser(youtubeUrl),
                    shareBy: username,
                    title: videoInfo.data.items[0].snippet.title,
                    description: videoInfo.data.items[0].snippet.description,
                },
            };
            await axios(saveVideoRequest)
            .then((result) => {
                setYoutubeUrl("");
                setIsSuccess(true);
                setIsError(false);
                setIsLoading(false);
            })
            .catch((error) => {
                error = new Error();
                setIsError(true);
                setIsSuccess(false);
                setIsLoading(false);
            });
        } else {
            setIsError(true);
            setIsSuccess(false);
            setIsLoading(false);
        }
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
                        <Button variant="primary" disabled={isLoading} onClick={() => shareVideo()} className="mt-2">
                             { isLoading ? <Spinner animation="border" size="sm" /> : <></> } Share
                        </Button>

                        {
                            isSuccess ? <><div className='text-success'>Save Video Successful!</div></> : <></>
                        }

                        {
                            isError ? <><div className='text-danger'>Save Video Unsuccessful!</div></> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
