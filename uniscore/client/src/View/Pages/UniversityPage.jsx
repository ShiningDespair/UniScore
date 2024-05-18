import UniPCSS from './UniversityPage.module.css'
import Rate from '../Components/Rate';
import {useParams, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import axios from 'axios';

function UniversityPage(props){
    const university = props.university;
    const { uniName } = useParams();
    const location = useLocation();
    const uniId = location.state?.uniId;
    
    useEffect(() => {
        if (uniId) {
          fetchUniversityDetails(uniId);
        } else {
          // Handle the case where uniId is not available
          console.error('University ID is missing');
        }
      }, [uniId]);
    
      const fetchUniversityDetails = async (id) => {
        try {
          // Replace this with your actual API call
          const response = await axios.get(`http://localhost:3001/UniversityPage/${id}`);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching university details:', error);
        }
      };

    return(
        <div class ={UniPCSS.UniPageBody}>
            <div class={UniPCSS.UniDetailsContainer}>
                <h1 class={UniPCSS.UniTitle}> {uniName} </h1>
                <p class={UniPCSS.Description}>University desciption</p>
                {/*properties*/}
                <div> <p>Email: </p>  </div>
                <div> <p>Telefon Numarası: </p></div>
                <div> <p>Şehir:  </p></div>
                <div> <p>Rektör: </p></div>
                <div> <p>Sıralama </p></div>
                <div> RATE</div>
            </div>

            <div class={UniPCSS.AddComment}>
                {/* <p><Rate/></p> */}
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