import './UniversityPage.css'
import Rate from '../Components/Rate';

function UniversityPage(){
    return(
        <div>
            <div class='uni-details'>
                <h1 class='title'> UNIVERSITY TITLE</h1>
                <p class='description'>University desciption</p>
                {/*properties*/}
                <p>Email:  Telefon Numarası <br/> Şehir Rektör <br/>  Sıralama Rate</p>
            </div>

            <div class="add-comment">
                <p><Rate/></p>
                <div class="form-group">
					<input type="text" class="form-style" placeholder="Yorum" required/>
				</div>	
            </div>
        </div>
    );
}

export default UniversityPage;