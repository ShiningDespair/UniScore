import './App.css';
import Header from'./View/Components/Header';
import Footer from './View/Components/Footer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Header/>
      </header>
      <body>
        <p>Test</p>
      </body>
      <p>Test2</p>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
