import React from 'react';
import PNFCSS from './PageNotFound.module.css';

const NotFound = () => {
    return (
        <div className={PNFCSS.PageNotBody}>
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Üzgünüz, istediğiniz sayfayı bulamadık.</p>
        </div>
    );
}

export default NotFound;
