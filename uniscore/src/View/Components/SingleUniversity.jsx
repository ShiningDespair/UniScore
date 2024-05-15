import './SingleUniversity.css'

function SingleUniversity() {
    return(
        <div class="container">
            <div class="upper">
            
            <img class="uni-logo" src="Images/iau_logo.png" alt="school_wallpaper" />
            
            </div>
           
            <div class ="lower">
                <div class="rate">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                </div>
                <div class="uni-property">
                    <p>
                    Sıralama = 9999<br />
                    Şehir = İstanbul
                    </p>
                </div>

            </div>
        </div>
    );
}

export default SingleUniversity