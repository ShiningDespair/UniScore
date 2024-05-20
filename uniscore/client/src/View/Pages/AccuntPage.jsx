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
        <div>
            <p>{student.stu_name +" " + student.stu_surname} </p>
            <p>{student.stu_mail} </p>
            <p>User University</p>
        </div>
    )
}

export default AccountPage;