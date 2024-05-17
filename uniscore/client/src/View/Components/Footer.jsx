import FooterCSS from './Footer.module.css';

function Footer() {
    return(
        <div className={FooterCSS.generalFooter}>
            <div className ={FooterCSS.footerBody}>
                <div className={FooterCSS.UniScore}>
                    <h1> UniScore</h1>
                </div>

                <div className ={FooterCSS.yasalMevzuat}>
                    <h2>Yasal Mevzuat</h2>
                    <p>Gizlilik Sözleşmesi</p>
                    <p>Çerez Politikası</p>
                </div>

                <div className ={FooterCSS.baglantilar}>
                    <h2>Bağlantılar</h2>
                    <p>Hakkmızda</p>
                    <p>İletişim</p>
                    <p>Hesabım</p>
                    <p>Anasayfa</p>
                </div>

                <div className ={FooterCSS.sosyalMedya}>
                    <h2>Sosyal Medya</h2>
                    <p>İnstagram</p>
                    <p>Twitter</p>
                </div>
            </div>
        </div>

    );
}

export default Footer;