import UniPCSS from './UniversityPage.module.css'
import Rate from '../Components/Rate';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SingleRate from '../Components/SingleRate';
import { AuthContext } from '../../Helpers/AuthContext';  

//LEAK VAR ACİL ÇÖZÜLMESİ LAZIM SERVER CMD DURMYUOR DURMYUOR
function UniversityPage() {
    let { id } = useParams();

    const [university, setUniversity] = useState({
        uni_rate: 0,
        uni_rate_count: 0
    });

    const [rateComment, setRateComment] = useState('');
    const [rateList, setRates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState(0); // State to store the rating
    const { authState, setAuthState } = useContext(AuthContext);

    const PAGE_SIZE = 6; // Number of items per page

    const addRate = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/rates", {
            rate_amount: rating,
            com: rateComment,
            uni_id: id,
            
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        ).then(response => {
            if(response.data.error) {
                alert("Lütfen giriş yapınız ");
            }
                console.log("Rate added successfully:", response.data);
                setRates([...rateList]); // Assuming response.data contains the new rate data
                window.location.reload(); // This line refreshes the page
            }).catch(error => {
                alert("Sadece kendi üniversitenize 1 adet değerlendirme ekleyebilirsiniz")
            });
    };

    const handleNextPage = (event) => {
        event.preventDefault();
        const remainingRates = rateList.length - currentPage * PAGE_SIZE;
        if (remainingRates > 0) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const paginatedRates = rateList.slice(startIdx, endIdx);

    useEffect(() => {
        axios.get(`http://localhost:3001/universities/byId/${id}`).then((response) => {
            setUniversity(response.data);
        });
        axios.get(`http://localhost:3001/rates/${id}`).then((response) => {
            setRates(response.data);
        });
    }, [id]);

    // Calculate average rating
    const averageRating = university.uni_rate / university.uni_rate_count;

    // Calculate number of full stars, half stars, and empty stars
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.3 && averageRating % 1 <= 0.7;

    // Array to store star elements
    const stars = [];

    // Fill array with full stars
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
        <div className={UniPCSS.UniPageBody}>
            <div className={UniPCSS.UniDetailsContainer}>
                <h1 className={UniPCSS.UniTitle}> {university.uni_name} </h1>
                <p className={UniPCSS.Description}>{university.uni_name}</p>
                {/*properties*/}
                <div><p>Email: {university.uni_email} </p></div>
                <div><p>Telefon Numarası: </p></div>
                <div><p>Şehir: {university.uni_province} </p></div>
                <div><p>Rektör: {university.uni_rector_name + " " + university.uni_rector_surname}</p></div>
                <div><p>Sıralama: TO BE ADDED </p></div>
                <div>{stars}</div>
            </div>

            <div className={UniPCSS.AddComment}>
                <form className={UniPCSS.FormGroup} onSubmit={addRate}>
                    <h3>Yorum Ekle</h3>
                    <div className={UniPCSS.Rate}>
                        <Rate onRatingChange={setRating} /> {/* Pass the callback function */}
                    </div>
                    <input onChange={(event) => { setRateComment(event.target.value) }} type="text" className={UniPCSS.CommentField} placeholder="Yorum" required />
                    <button className="btn" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form>
            </div>
            <div className={UniPCSS.RateList}>
                {paginatedRates.map((rate, index) => (
                    <SingleRate key={startIdx + index} rate={rate} index={startIdx + index + 1} />
                ))}
            </div>
            <nav aria-label="Page navigation for uniscore">
                <ul className="pagination">
                    <li className="page-item">
                        <a onClick={handlePrevPage} className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">{currentPage}</a></li>
                    <li className="page-item">
                        <a onClick={handleNextPage} className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default UniversityPage;
