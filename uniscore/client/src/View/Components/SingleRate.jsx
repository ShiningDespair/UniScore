import SRateCSS from './SingleRate.module.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Helpers/AuthContext';

function SingleRate(props) {
    const rate = props.rate;
    const [studentName, setStudentName] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/rates/bystuId/${rate.stu_id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setStudentName(response.data.stu_name + " " + response.data.stu_surname);
            setLikeCount(response.data.rate.like_dislike);
            console.log("response likes" + response.data.rate.like_dislike)
        })
        .catch(error => {
            console.error("Error fetching student name:", error);
        });
    }, [rate.stu_id]);

    const handleLike = () => {
        axios.post(`http://localhost:3001/rates/like/${rate.com_id}`, {}, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        })
        .then(response => {
            setLikeCount(prevCount => prevCount + 1);
            alert(response.data.message);
        })
        .catch(error => {
            console.error("Error liking the comment:", error);
        });
    };

    const handleDislike = () => {
        axios.post(`http://localhost:3001/rates/dislike/${rate.com_id}`, {}, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        })
        .then(response => {
            setLikeCount(prevCount => prevCount - 1);
            alert(response.data.message);
        })
        .catch(error => {
            console.error("Error disliking the comment:", error);
        });
    };

    return (
        <div className={SRateCSS.RateBody}>
            <div className={SRateCSS.FirstRow}>
                <p>{studentName}</p>
                <div className={SRateCSS.LikeDislike}>
                    <span>{likeCount}</span>
                    <button onClick={handleLike}>
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                    </button>
                    <button onClick={handleDislike}>
                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div>STARS</div>
            <div>{rate.com}</div>
        </div>
    );
}

export default SingleRate;
