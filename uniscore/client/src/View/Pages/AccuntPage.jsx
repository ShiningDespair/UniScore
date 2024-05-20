import { useEffect, useState } from 'react';
import AccCSS from './AccountPage.module.css'
import axios from 'axios';

function AccountPage() {
    const[student,setStudent] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/students/account").then(response => {
            setStudent(response);
            console.log(response)
        }

        )
    })

    return (
        <div class={AccCSS.AccountPageBody}>
            <div class={AccCSS.AccountInfo}></div>
               <div class={AccCSS.Logo}>
                 <img/> {/* Uni Logo*/}
               </div>

               <div class={AccCSS.AccountName}>
                    <input type="text" disabled="true" placeholder='Name'></input>
                    <input type="text" disabled="true" placeholder='Surname'></input>
               </div>

               <div className={AccCSS.AccountEmail}>
               <p> Mail</p><input type="email" disabled="true" placeholder='example@mail.com'></input>
               </div>



               <div className={AccCSS.SubmitBtn}>
                    <button>Çıkış Yap</button>
               </div>

               <div className={AccCSS.Empty}>

               </div>

        </div>
    )
}

export default AccountPage;