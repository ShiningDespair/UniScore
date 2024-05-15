import './SingleUniversity.css'
import University from '../../Controller/University';
//university.rank,university.city

function SingleUniversity(props) {
    const university = props.university;

    return(
        <div class="container">
            <div class="upper">
            
            <img class="uni-logo" src="Images/iau_logo.png" alt="school_wallpaper" />
            
            </div>
           
            <div class ="lower">
                <div>
                    <p class="uni-title">{university.name}</p>
                </div>

                <div class="rate">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star-half-alt checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="uni-property">
                    <p>
                    Sıralama = {university.rank}<br />
                    Şehir = {university.city}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default SingleUniversity