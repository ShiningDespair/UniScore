import SUCSS from './SingleUniversity.module.css';
import { useHistory } from "react-router-dom";
//Single University CSS (SUCSS)

function SingleUniversity(props) {
    const university = props.university;
    let history = useHistory();

    const handleRouteClick = () => {
        history.push({
          pathname: `/UniversityPage/${university.uni_id}`,
          
        });
      };
      
    function toCapitalCase(text) {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function convertDriveLink(link, type) {
        if(link!=null) {
        const fileId = link.split('/d/')[1].split('/')[0];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
        } else if(type === 'logo') {
          return  'https://drive.google.com/thumbnail?id=1kID4I0OyUGhvGdXt3dxUKTt16HL2W0v1';
        } else if(type ==='wp') {
            return 'https://drive.google.com/thumbnail?id=1F_sRhVqNDD5sTW0ldUZfO8KMgRg-GNAj';
        }
    }

    // Calculate average rating
    const averageRating = university.uni_rate / university.uni_rate_count;

    // Calculate number of full stars, half stars, and empty stars
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.3 && averageRating % 1 <= 0.7;

    // Array to store star elements
    const stars = [];

    // Fill array with full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} style={{ color: '#FD7060' }}  className="fa fa-star"></span>);
    }

    // Add half star if applicable
    if (hasHalfStar) {
        stars.push(<span key="half" style={{ color: '#FD7060' }}  className="fa fa-star-half-alt"></span>);
    }

 // Fill remaining array with empty stars
for (let i = stars.length; i < 5; i++) {
    stars.push(<span key={i} style={{ color: '#FD7060' }} className="far fa-star"></span>);
}


    return (
        <div className={SUCSS.Container} onClick={handleRouteClick} >

             <div
                className={SUCSS.ContainerUpper}
                style={{ backgroundImage: `url(${convertDriveLink(university.uni_wp,'wp')})` }}
            >
                
                <img
                    className={SUCSS.UniLogo}
                    src={convertDriveLink(university.uni_logo,'logo')}
                    alt="school_logo"
                />
            </div>
            <div className={SUCSS.ContainerLower}>
                <div>
                    <p className={SUCSS.UniTitle}>{university.uni_name}</p>
                </div>

                <div className={SUCSS.Rate}>
                    {stars}
                </div>
                <div className="UniProperty">
                    <p>
                        Sıralama = {university.rank}<br />
                        Şehir = {toCapitalCase(university.uni_province)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SingleUniversity;
