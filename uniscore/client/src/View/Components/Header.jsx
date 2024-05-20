// Header.js
import HeaderCSS from './Header.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';
import { useContext } from 'react';

function Header() {
  const { authState } = useContext(AuthContext);

  return (
    <div className={HeaderCSS.generalHeader}>
      <div className={HeaderCSS.headerBody}>
        <Link to="/"><img src='Icons/home.png' alt='Home Icon' /></Link>
        <h2>Hakkımızda</h2>
        <img className={HeaderCSS.Logo} src="https://drive.google.com/thumbnail?id=1BkxphvBw503_fWpTwWS0QMzkZvv3eyo4" alt="UniSkor Yatay Logo" />
        <h2>İletişim</h2>

        {authState ? (
          <Link to="/AccountPage">
            <img src='Icons/account.png' alt='Account Icon' />
          </Link>
        ) : (
          <Link to="/Registiration">
            <img src='Icons/account.png' alt='Account Icon' />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
