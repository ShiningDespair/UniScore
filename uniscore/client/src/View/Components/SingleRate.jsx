import SRateCSS from './SingleRate.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SingleRate (props){
    const rate = props.rate;
    const [studentName, setStudentName] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [starCount, setStarCount] = useState();

    useEffect(() => {
        

            axios.get(`https://uniskor-api-acb533d7fd97.herokuapp.com/rates/bystuId/${rate.stu_id}`)
                .then(response => {
                     setStudentName(response.data.stu_name + " "+ response.data.stu_surname);
                    console.log("Student Name:", studentName);
                    // You can use studentName as needed (e.g., set it to state)
                })
                .catch(error => {
                    console.error("Error fetching student name:", error);
                });

            axios.get(`http://localhost:3001/Likes/${rate.com_id}`)
            .then(response => {
                setLikeCount(response.data.sum)
                setStarCount(rate.rate_amount);
            })
            

            
    }, [likeCount]);

        const handleLike = () => {
            axios.post(`http://localhost:3001/Likes/like/${rate.com_id}`,null, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(response => {
                if(response.data.error) {
                    alert("Lütfen giriş yapınız ");
                }
                console.log("Rate added successfully:", response.data);
                setLikeCount(likeCount+1);

            })
        };

        const handleDislike = () => {
            axios.post(`http://localhost:3001/Likes/dislike/${rate.com_id}`,null, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(response => {
                if(response.data.error) {
                    alert("Lütfen giriş yapınız ");
                }
                console.log("Rate added successfully:", response.data);
                setLikeCount(likeCount-1)

            })
        }

        
    
        // Array to store star elements
        const stars = [];
    
        // Fill array with full stars
        for (let i = 0; i < starCount; i++) {
            stars.push(<span key={i} style={{ color: '#FD7060' }}  className="fa fa-star"></span>);
        }
    
        // Fill remaining array with empty stars
        for (let i = starCount; i < 5; i++) {
            stars.push(<span key={i} style={{ color: '#FD7060' }} className="far fa-star"></span>);
        }
    
    return(
        <div class={SRateCSS.RateBody}>
            {/* Yorumcu İsmi(anonim mi?), beğen beğenme (satır sonu)
            Yıldızlar (2grid)
            Yorum */}
            <div class={SRateCSS.FirstRow}> 
                <p> {studentName} </p>
                <div class={SRateCSS.LikeDislike}>
                    <span> {likeCount} </span>
                    <button className={SRateCSS.LikeButton} onClick={handleLike}>
        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
    </button>
    <button className={SRateCSS.DislikeButton} onClick={handleDislike}>
        <i className="fa fa-thumbs-down" aria-hidden="true"></i>
    </button>
                </div>

            </div> 

            <div>  {stars} </div>
            <div> {rate.com}</div>
            <div>
                
            </div>
        </div>
    )
}

export default SingleRate;