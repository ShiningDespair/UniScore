import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';  
import { useHistory } from 'react-router-dom'; 
import AccCSS from './AccountPage.module.css';
import axios from 'axios';

function AccountPage() {
    const { authState, setAuthState } = useContext(AuthContext);
    const history = useHistory();
    const [loading, setLoading] = useState(false);  // Loading state
    const [student, setStudent] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/students/account", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(response => {
            setStudent(response.data.student);
            console.log(response.data.student);
        }).catch(error => {
            console.error('There was an error fetching the student data:', error);
        });
    }, []);

    function convertDriveLink(link) {
        if (link) {
            const fileId = link.split('/d/')[1].split('/')[0];
            return `https://drive.google.com/thumbnail?id=${fileId}`;
        } else {
            return 'https://drive.google.com/thumbnail?id=1kID4I0OyUGhvGdXt3dxUKTt16HL2W0v1';
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        setAuthState({status:false});
        console.log("signed out")
        setLoading(true);  // Show loading modal
        setTimeout(() => {
            setLoading(false);
            history.push(`/`);
        }, 1000);
    }

    return (
        <div className={AccCSS.AccountPageBody}>
            {student ? (
                <>
                    <div className={AccCSS.AccountInfo}>
                        {!imageLoaded && <p>Loading logo...</p>} {/* Loading state */}
                        <img
                            className={AccCSS.UniLogo}
                            src={convertDriveLink(student.uni_logo)}
                            alt="University logo"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageLoaded(true)} /* Handle error as loaded to stop showing "Loading logo..." */
                            style={{ display: imageLoaded ? 'block' : 'none' }} /* Hide image until loaded */
                        />
                    </div>
                    
                    <div className={AccCSS.AccountName}>
                        <input type="text" disabled value={student.name} placeholder="Name" />
                        <input type="text" disabled value={student.surname} placeholder="Surname" />
                    </div>

                    <div className={AccCSS.AccountEmail}>
                        <p>{student.university}</p>
                        <input type="email" disabled value={student.email} placeholder="Email" />
                    </div>

                    <div>
                        <button onClick={handleSignOut} className={AccCSS.SubmitBtn}>Çıkış Yap</button>
                    </div>

                    <div className={AccCSS.Empty}></div>
                </>
            ) : (
                <p>Yükleniyor...</p>
            )}
            {loading && (
                <div className="loading-modal">
                    <div className="loading-content">
                        <p>Çıkış Başarılı. Anasayfaya yönlendiriliyorsunuz...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountPage;
