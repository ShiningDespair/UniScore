import MainCSS from './MainPage.module.css';
import SingleUniversity  from '../Components/SingleUniversity';
import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import University from '../../Helpers/University';

function MainPage() {

    const university = new University(1,"İstanbul Aydın Üniversitesi", 1, "İstanbul");


    const [universities, setUniversities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if(currentPage>1){
            setCurrentPage(currentPage - 1);
        }
        
    };


    useEffect(() => {
        // Function to fetch universities from the database
        async function fetchUniversities() {
            try {
                // Fetch universities logic goes here
                // Example: const response = await UniversityService.getUniversities(currentPage);
                // const data = response.data;
                // setUniversities(data);
                // For now, setting a single university as an example
                setUniversities([university]);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        }

        fetchUniversities();
    }, [currentPage]); // Fetch universities when currentPage changes
    


    const SortBy = [
        { value: 'A', label: 'Popülerlik' },
        { value: 'B', label: 'Değerlendirme' },

      ];

      const Cities = [
        { value: 'A', label: 'İstanbul' },
        { value: 'B', label: 'Ankara' },

      ];


  return (
    <div className ={MainCSS.MainPageBody}>
        <div className={MainCSS.Layout}> 
            <div class={MainCSS.Welcome}>
                <div class={MainCSS.imageOlacak}></div>

                { /*Overflow is hidden at Welcome-Text, textin taşmaması için belirli bir karakterin altında olması lazım */}
                <p class={MainCSS.WelcomeText}> non pharetra viverra, quam tortor placerat enim, id efficitur eros quam ut mi. Aliquam erat quam, varius ut tristique ut, sollicitudin ac sapien. Donec molestie convallis egestas. Nullam fringilla nisl magna, at mollis ipsum sollicitudin at. Nulla maximus arcu convallis rutrum lacinia. Nullam sagittis at risus ac fringilla. Sed iaculis, turpis quis eleifend pulvinar, orci metus faucibus est, eget semper odio ante nec mi. Sed porta lobortis egestas. Pellentesque id orci scelerisque, molestie sapien ut, sagittis ligula. Ut sit amet euismod ante. Ut porta augue et scelerisque commodo. Mauris volutpat hendrerit rhoncus. Donec suscipit tellus nec quam venenatis tempus. Proin sollicitudin sodales est a tempusNunc tempor nisl magna, id posuere nunc varius non. Vestibulum efficitur enim vel eleifend auctor. Nulla justo risus, lacinia vel justo non, aliquet rhoncus urna. Donec vel fringilla neque. Aenean malesuada magna nec condimentum ornare. Morbi feugiat dignissim est, in egestas ligula pulvinar at. Morbi vitae neque vel lacus placerat egestas. Nullam sit amet faucibus ligula, vestibulum luctus magna. Aliquam at purus eu massa facilisis pellentesque quis ut nisl.Maecenas venenatis ultrices ante, ac ultrices arcu pulvinar nec. Aenean accumsan eleifend facilisis. Integer elementum tempor leo, fermentum rutrum leo congue nec. Fusce eu ipsum convallis felis aliquam ullamcorper. Donec egestas ligula non euismod accumsan. Integer non hendrerit nisl. Nam luctus vestibulum lectus at hendrerit.Cras tristique odio et condimentum viverra. Praesent venenatis sed lacus quis rhoncus. Sed vitae dui dui. Pellentesque pharetra tempor ante sit amet ultrices. Aenean dapibus pharetra arcu id aliquam. Integer volutpat est nisi. Aliquam tempor sollicitudin convallis. Integer non efficitur tortor. Etiam consequat nibh ut ornare lacinia. Pellentesque fringilla tellus vestibulum ultricies eleifend.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mollis, nibh quis rhoncus commodo, diam tortor auctor dui, non tempor erat quam ut leo. In posuere urna sit amet lorem euismod, nec lacinia neque blandit. Maecenas venenatis sapien risus, sit amet pellentesque purus sollicitudin nec. Praesent vel viverra dui. Etiam malesuada pellentesque enim nec fermentum. Duis ultrices fermentum tellus et malesuada. Nam scelerisque massa eu elit convallis bibendum ut eget ipsum. Sed commodo, ligula vel maximus vestibulum, sem lectus sagittis purus, eu suscipit diam magna non mi. Pellentesque sed mi mauris. Vivamus sollicitudin ligula eleifend, viverra ligula viverra, sagittis arcu. Fusce vitae tellus lacinia, vulputate eros sit amet, tristique diam. Curabitur sit amet feugiat tortor.</p>
           
                <div class={MainCSS.RegisterNow}>
                    <p>Misyonumuzda bize destek olmak için hemen kayıt olun!</p>
                    <button class="btn btn-success"> Kayıt Ol</button>
                </div>
            </div>
            

            <div class={MainCSS.SearchBar}>
                <form  class={MainCSS.bar}>
                    <input class={MainCSS.BarField} type="search" name="search" pattern=".*\S.*" required autocomplete="off"/>
                    <button class={MainCSS.searchbtn} type="submit">
                    <span>Ara</span>
                    </button>
                </form>
            </div>


            <div class={MainCSS.SortAndFilter}> 
                <div class={MainCSS.SortContainer} >        
                        <Select  placeholder='Sırala' options={SortBy} />

                        <form class="radio-group">
                            <label>
                                <input type="radio" name="inventor" value="bell"/>
                                <span class="truncate">Devlet Üniversitesi</span>
                            </label>
                            <label>
                                <input type="radio" name="inventor" value="morse"/>
                                <span class="truncate">Vakıf Üniversitesi</span>
                            </label>

                        </form>

                        <Select  placeholder='Şehir Seç' options={Cities} />
                </div>  
            </div>
            <div class={MainCSS.UniversitiesContainer}>
                    <div class ="u1">1</div>
                    {/* Render SingleUniversity components for each university */}
                        {universities.map((university, index) => (
                            <SingleUniversity key={index} university={university} index={(currentPage - 1) * 6 + index + 1} />
                        ))}

                    <div class ="u1">3</div>
                    <div class ="u1">4</div>
                    <div class ="u1">5</div>
                    <div class ="u1">6</div>
                    
            </div>
            
        </div>
        <nav aria-label="Page navigation for uniscore">
                <ul class="pagination">
                    <li class="page-item">
                    <a onClick={handlePrevPage} class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#"> {currentPage} </a></li>
                    <li class="page-item">
                    <a onClick={handleNextPage} class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
        </nav>
    </div>
    
  );    
}

export default MainPage;
