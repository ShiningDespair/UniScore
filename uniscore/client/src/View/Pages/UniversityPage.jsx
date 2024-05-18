import UniPCSS from './UniversityPage.module.css'
import Rate from '../Components/Rate';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

function UniversityPage(){
    let { id } = useParams();
    const[university, setUniversity] = useState({
        uni_rate: 0,
        uni_rate_count: 0
    });
        
    useEffect(() => {
             axios.get(`http://localhost:3001/universities/byId/${id}`).then((response)=>{
                console.log(response);
                setUniversity(response.data);
            })               
        
    },[]);
     // Calculate average rating
     const averageRating = university.uni_rate / university.uni_rate_count;

     // Calculate number of full stars, half stars, and empty stars
     const fullStars = Math.floor(averageRating);
     const hasHalfStar = averageRating % 1 >= 0.3 && averageRating % 1 <= 0.7;
 
     // Array to store star elements
     const stars = [];
 
     // Fill array with full stars
     for (let i = 0; i < fullStars; i++) {
         stars.push(<span key={i} className="fa fa-star checked"></span>);
     }
 
     // Add half star if applicable
     if (hasHalfStar) {
         stars.push(<span key="half" className="fa fa-star-half-alt checked"></span>);
     }
 
     // Fill remaining array with empty stars
     for (let i = stars.length; i < 5; i++) {
         stars.push(<span key={stars.length} className="fa fa-star"></span>);  // Adjusted key
     }

    return(
        <div class ={UniPCSS.UniPageBody}>
            <div class={UniPCSS.UniDetailsContainer}>
                <h1 class={UniPCSS.UniTitle}> {university.uni_name} </h1>
                <p class={UniPCSS.Description}>{university.uni_name}</p>
                {/*properties*/}
                <div> <p>Email: {university.uni_email} </p>  </div>
                <div> <p>Telefon Numarası: </p></div>
                <div> <p>Şehir: {university.uni_province} </p></div>
                <div> <p>Rektör: {university.uni_rector_name +" " + university.uni_rector_surname}</p></div>
                <div> <p>Sıralama: TO BE ADDED </p></div>
                <div> {stars} </div>
            </div>

            <div class={UniPCSS.AddComment}>
                <form class={UniPCSS.FormGroup}>
                    <h3>Yorum Ekle</h3>
                    <div class={UniPCSS.Rate}> <Rate/> </div>
					<input type="text" class={UniPCSS.CommentField} placeholder="Yorum" required/>
                    <button class="btn" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
				</form>	
            </div>
            <div class = {UniPCSS.RateList}>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>

            </div>
        </div>
    );
}

export default UniversityPage;