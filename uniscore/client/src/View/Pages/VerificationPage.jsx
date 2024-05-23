import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import VCSS from './VerificationPage.module.css';

function VerificationPage() {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        const code = queryParams.get('code');
        console.log("Query parameters received - code:", code, " email:", email);

        if (email && code) {
            axios.get(`https://uniskor-api-acb533d7fd97.herokuapp.com/students/verify?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`)
                .then(response => {
                    console.log("Verification response received:", response);
                    setMessage(response.data.message || 'Verification successful.');
                    setTimeout(() => {
                        history.push('/RegistirationPage'); // Redirect to login page after verification
                    }, 3000);
                })
                .catch(error => {
                    console.error('Verification error:', error);
                    setMessage('Verification failed. Please try again.');
                });
        } else {
            setMessage('Invalid verification link.');
        }
    });

    return (
        <div className={VCSS.VerificationContainer}>
            <h1>Hesap Doğrulanıyor</h1>

           <div class={VCSS.loader}></div>
        </div>
    );
}

export default VerificationPage;
