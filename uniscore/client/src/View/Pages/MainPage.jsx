import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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

    const PAGE_SIZE = 6; // Number of items per page

    const SortBy = [
        { value: 'A', label: 'Popülerlik' },
        { value: 'B', label: 'Değerlendirme' },
    ];

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
                    <div className={MainCSS.imageOlacak}></div>
                    <p className={MainCSS.WelcomeText}>
                        non pharetra viverra, quam tortor placerat enim, id efficitur eros quam ut mi. Aliquam erat quam, varius ut tristique ut, sollicitudin ac sapien. Donec molestie convallis egestas. Nullam fringilla nisl magna, at mollis ipsum sollicitudin at. Nulla maximus arcu convallis rutrum lacinia. Nullam sagittis at risus ac fringilla. Sed iaculis, turpis quis eleifend pulvinar, orci metus faucibus est, eget semper odio ante nec mi. Sed porta lobortis egestas. Pellentesque id orci scelerisque, molestie sapien ut, sagittis ligula. Ut sit amet euismod ante. Ut porta augue et scelerisque commodo. Mauris volutpat hendrerit rhoncus. Donec suscipit tellus nec quam venenatis tempus. Proin sollicitudin sodales est a tempusNunc tempor nisl magna, id posuere nunc varius non. Vestibulum efficitur enim vel eleifend auctor. Nulla justo risus, lacinia vel justo non, aliquet rhoncus urna. Donec vel fringilla neque. Aenean malesuada magna nec condimentum ornare. Morbi feugiat dignissim est, in egestas ligula pulvinar at. Morbi vitae neque vel lacus placerat egestas. Nullam sit amet faucibus ligula, vestibulum luctus magna. Aliquam at purus eu massa facilisis pellentesque quis ut nisl.Maecenas venenatis ultrices ante, ac ultrices arcu pulvinar nec. Aenean accumsan eleifend facilisis. Integer elementum tempor leo, fermentum rutrum leo congue nec. Fusce eu ipsum convallis felis aliquam ullamcorper. Donec egestas ligula non euismod accumsan. Integer non hendrerit nisl. Nam luctus vestibulum lectus at hendrerit.Cras tristique odio et condimentum viverra. Praesent venenatis sed lacus quis rhoncus. Sed vitae dui dui. Pellentesque pharetra tempor ante sit amet ultrices. Aenean dapibus pharetra arcu id aliquam. Integer volutpat est nisi. Aliquam tempor sollicitudin convallis. Integer non efficitur tortor. Etiam consequat nibh ut ornare lacinia. Pellentesque fringilla tellus vestibulum ultricies eleifend.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mollis, nibh quis rhoncus commodo, diam tortor auctor dui, non tempor erat quam ut leo. In posuere urna sit amet lorem euismod, nec lacinia neque blandit. Maecenas venenatis sapien risus, sit amet pellentesque purus sollicitudin nec. Praesent vel viverra dui. Etiam malesuada pellentesque enim nec fermentum. Duis ultrices fermentum tellus et malesuada. Nam scelerisque massa eu elit convallis bibendum ut eget ipsum. Sed commodo, ligula vel maximus vestibulum, sem lectus sagittis purus, eu suscipit diam magna non mi. Pellentesque sed mi mauris. Vivamus sollicitudin ligula eleifend, viverra ligula viverra, sagittis arcu. Fusce vitae tellus lacinia, vulputate eros sit amet, tristique diam. Curabitur sit amet feugiat tortor.
                    </p>
                    <div className={MainCSS.RegisterNow}>
                        <p>Misyonumuzda bize destek olmak için hemen kayıt olun!</p>
                        <button className="btn btn-success"> Kayıt Ol</button>
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
