import React from 'react';
import './App.css';
import Header from './View/Components/Header';
import Footer from './View/Components/Footer';

function RegistirationPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <form>
        <label htmlFor="myName">İsim:</label><br />
        <input type="text" id="myName" /><br />
        <label htmlFor="mySurname">Soyisim:</label><br />
        <input type="text" id="mySurname" /><br />
        <label htmlFor="mySchool">Üniversite:</label><br />
        <input type="text" id="mySchool" list="universities" /><br />
        <datalist id="universities">
          <option value="Üniversite 1" />
          <option value="Üniversite 2" />
          <option value="Üniversite 3" />
        </datalist><br />
        <label htmlFor="myEmail">Okul Maili:</label><br />
        <input type="email" id="myEmail" /><br />
        <label htmlFor="myPassword">Şifre:</label><br />
        <input type="password" id="myPassword" /><br />
        <button type="button">Kayıt Ol</button><br />
        <div id="ppImages"></div>
      </form>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default RegistirationPage;
