import SRateCSS from './SingleRate.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SingleRate (props){
    const rate = props.rate;
    const [studentName, setStudentName] = useState("");
    const [likeCount, setLikeCount] = useState(1);

    useEffect(() => {
            axios.get(`http://localhost:3001/rates/bystuId/${rate.stu_id}`)
                .then(response => {
                     setStudentName(response.data.stu_name + " "+ response.data.stu_surname);
                    console.log("Student Name:", studentName);
                    // You can use studentName as needed (e.g., set it to state)
                })
                .catch(error => {
                    console.error("Error fetching student name:", error);
                });
        
    }, []);
    
    return(
        <div class={SRateCSS.RateBody}>
            {/* Yorumcu İsmi(anonim mi?), beğen beğenme (satır sonu)
            Yıldızlar (2grid)
            Yorum */}
            <div class={SRateCSS.FirstRow}> 
                <p> {studentName} </p>
                <div class={SRateCSS.LikeDislike}>
                    <span>{likeCount}</span>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                </div>

            </div> 

            <div> STARS </div>
            <div> {rate.com}</div>
            <div>
                
            </div>
        </div>
    )
}

export default SingleRate;