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
      <i class="fa-solid fa-house fa-2xl"  style={{ color: '#000000' }}></i>
        <h2>Hakkımızda</h2>
        <img className={HeaderCSS.Logo} src="https://drive.google.com/thumbnail?id=1BkxphvBw503_fWpTwWS0QMzkZvv3eyo4" alt="UniSkor Yatay Logo" />
        <h2>İletişim</h2>

        {authState.status ? (
          <Link to="/AccountPage">
            <i class="fa-solid fa-user fa-2xl" style={{ color: '#000000' }}></i>
          </Link>
        ) : (
          <Link to="/Registiration">
           <i class="fa-solid fa-user fa-2xl" style={{ color: '#000000' }}></i>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
