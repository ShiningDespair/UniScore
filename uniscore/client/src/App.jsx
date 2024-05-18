import './App.css';
import Header from'./View/Components/Header';
import Footer from './View/Components/Footer';
import RegistirationPage from './View/Pages/RegistirationPage';
import MainPage from './View/Pages/MainPage';
import UniversityPage from './View/Pages/UniversityPage';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Header/>
        </header>

        <div className="body-content">
          <Switch>
            <Route exact path='/'>
              <MainPage />
            </Route>
            <Route path='/Registiration'>
              <RegistirationPage/>
            </Route>
            <Route path='/UniversityPage/:id'>
              <UniversityPage/>
            </Route>
            
          </Switch>

        </div>

        <footer>
          <Footer/>
        </footer>
      </div>
    </Router>
  );
}
export default App;