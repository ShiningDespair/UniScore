import './Header.css';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className ="generalHeader">
    <div className='headerBody'>
    <Link to ="/"k> <img src='Icons/home.png' alt='Home Icon' /></Link>
      <p>Hakkımızda</p>
      <h1>UniSkor</h1>
      <p>İletişim</p>
     <Link to ="/Registiration"> <img src='Icons/account.png' alt='Account Icon'/></Link>

    </div>
    </div>
  );    
}

export default Header;

//CSSe sticky eklenecek header