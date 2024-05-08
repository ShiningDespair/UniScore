import './Footer.css';

function Footer() {
    return(
        <div class='generalFooter'>
            <div class ='footerBody'>
                <div class='UniScore'>
                    <h1> UniScore</h1>
                </div>

                <div class ='yasalMevzuat'>
                    <h2>Yasal Mevzuat</h2>
                    <p>Gizlilik Sözleşmesi</p>
                    <p>Çerez Politikası</p>
                </div>

                <div class ='baglantilar'>
                    <h2>Bağlantılar</h2>
                    <p>Hakkmızda</p>
                    <p>İletişim</p>
                    <p>Hesabım</p>
                    <p>Anasayfa</p>
                </div>

                <div class ='sosyalMedya'>
                    <p>İnstagram</p>
                    <p>Twitter</p>
                </div>
            </div>
        </div>

    );
}

export default Footer;