import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import MainCSS from './MainPage.module.css';
import SingleUniversity from '../Components/SingleUniversity';

function MainPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    let history = useHistory();

    const PAGE_SIZE = 6; // Number of items per page

    const SortBy = [
        { value: 'A', label: 'Popülerlik(Servis Dışı)' },
        { value: 'B', label: 'Değerlendirme' },
    ];
    const handleRegister = () => {
        history.push("/Registiration");
    }

    const handleNextPage = () => {
        const remainingUniversities = filteredUniversities.length - currentPage * PAGE_SIZE;
        if (remainingUniversities > 0) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        async function fetchUniversities() {
            try {
                const response = await axios.get('http://localhost:3001/universities');
                setUniversities(response.data);
                setFilteredUniversities(response.data);

                const uniqueCities = [...new Set(response.data.map(university => university.uni_province))].sort();
                const cityOptions = uniqueCities.map(city => ({
                    value: city,
                    label: city,
                }));
                setCities(cityOptions);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        }

        fetchUniversities();
    }, []);

    const handleSearch = () => {
        filterUniversities(searchQuery, selectedCity);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        filterUniversities(event.target.value, selectedCity);
    };

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
        filterUniversities(searchQuery, selectedOption);
    };

    const filterUniversities = (searchQuery, selectedCity) => {
        let filtered = universities;

        if (searchQuery) {
            const searchWords = searchQuery.trim().toLocaleLowerCase('tr-TR').split(/\s+/);
            filtered = filtered.filter(university => {
                const uniName = university.uni_name.toLocaleLowerCase('tr-TR');
                return searchWords.every(word => uniName.includes(word));
            });
        }

        if (selectedCity) {
            filtered = filtered.filter(university => university.uni_province === selectedCity.value);
        }

        setFilteredUniversities(filtered);
        setCurrentPage(1); // Reset to first page whenever filter changes
    };

    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const paginatedUniversities = filteredUniversities.slice(startIdx, endIdx);

    return (
        <div className={MainCSS.MainPageBody}>
            <div className={MainCSS.Layout}>
                <div className={MainCSS.Welcome}>
                        {/* Uniskor Logo */}
                        <img className={MainCSS.imageOlacak} src=" https://drive.google.com/thumbnail?id=1vrsIDYJIGBDxeFujotFS7mWKiI8Ey1u8" alt="UniSkor Logo"/> 
                    <p className={MainCSS.WelcomeText}>
                        Türkiye'deki tüm 205 üniversiteleri sıralayıp araştırabileceğiniz Türkiye'nin bağımsız ve en büyük üniversite forumu.
                        Sıralamalar tamamıyla  üniversite öğrencilerinin kendi verdikleri skorlar ve memnuniyet anketiyle oluşturulup tüm çıplaklığıyla karşılaştırmanız için burada.
                        Öğrencilerin özgürce yorum yapıp şikayetlerini paylaşabileceği bağımsız bir platform!
                    </p>
                    <div className={MainCSS.RegisterNow}>
                        <p>Misyonumuzda bize destek olmak için hemen kayıt olun!</p>
                        <button onClick={handleRegister} className="btn btn-success"> Kayıt Ol</button>
                    </div>
                </div>

                <div className={MainCSS.SearchBar}>
                    <form className={MainCSS.bar} onSubmit={(e) => e.preventDefault()}>
                        <input
                            className={MainCSS.BarField}
                            type="search"
                            name="search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Üniversite ara..."
                            autoComplete="off"
                        />
                        <button className={MainCSS.searchbtn} type="button" onClick={handleSearch}>Ara</button>
                    </form>
                </div>

                <div className={MainCSS.SortAndFilter}>
                    <div className={MainCSS.SortContainer}>
                        <Select placeholder='Sırala' options={SortBy} />
                        <form className="radio-group">
                            <label>
                                <input type="radio" name="inventor" value="bell" />
                                <span className="truncate">Devlet Üniversitesi</span>
                            </label>
                            <label>
                                <input type="radio" name="inventor" value="morse" />
                                <span className="truncate">Vakıf Üniversitesi</span>
                            </label>
                        </form>
                        <Select placeholder='Şehir Seç' value={selectedCity} onChange={handleCityChange} options={cities} />
                    </div>
                </div>
                <div className={MainCSS.UniversitiesContainer}>
                    {paginatedUniversities.map((university, index) => (
                        <SingleUniversity key={startIdx + index} university={university} index={startIdx + index + 1} />
                    ))}
                </div>
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

export default MainPage;
