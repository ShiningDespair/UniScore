import './App.css';
import Header from'./View/Components/Header';
import Footer from './View/Components/Footer';
//import RegistirationPage from './View/Pages/RegistirationPage';
import MainPage from './View/Pages/MainPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Header/>
      </header>

      <div className="body-content">
      <MainPage />

      </div>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
export default App;