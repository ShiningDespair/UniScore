import './App.css';
import Header from'./View/Components/Header';
import Footer from './View/Components/Footer';
import RegistirationPage from './View/Pages/RegistirationPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Header/>
      </header>
      <body>
        <RegistirationPage/>
      </body>
      <p>Test2</p>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
//test
export default App;
