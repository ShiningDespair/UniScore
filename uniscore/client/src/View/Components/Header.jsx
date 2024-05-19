import HeaderCSS from './Header.module.css';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className ={HeaderCSS.generalHeader}>
    <div className={HeaderCSS.headerBody}>
    <Link to ="/"k> <img src='Icons/home.png' alt='Home Icon' /></Link>
      <h2>Hakkımızda</h2>
      <h2>UniSkor</h2>
      <h2 >İletişim</h2>
     <Link to ="/Registiration"> <img src='Icons/account.png' alt='Account Icon'/></Link>

    </div>  
    </div>
  );    
}

export default Header;

//CSSe sticky eklenecek header