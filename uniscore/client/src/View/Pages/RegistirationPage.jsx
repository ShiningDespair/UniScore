import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  // Import useHistory
import './RegistirationPage.css';

function RegistirationPage() {
    const [universities, setUniversities] = useState([]);
    const [loginError, setLoginError] = useState('');  // Error state for login
    const history = useHistory();  // Create history object

    useEffect(() => {
        axios.get("http://localhost:3001/universities")
            .then(response => {
                const universityOptions = response.data.map(university => ({
                    value: university.uni_id,
                    label: university.uni_name
                }));
                setUniversities(universityOptions);
            })
            .catch(error => {
                console.error("There was an error fetching the universities!", error);
            });
    }, []);

    const handleClickRegister = (values) => {
        const registerData = {
            ...values,
            uni_id: values.selectedUniversity.value // `uni_id` olarak gönderiliyor
        };
        axios.post("http://localhost:3001/students", registerData)
            .then(() => {
                console.log(registerData);
                history.push(`/UniversityPage/${registerData.uni_id}`);
            })
            .catch(error => {
                console.error("There was an error registering!", error);
            });
    };

    const handleClickLogIn = (values) => {
        axios.post("http://localhost:3001/students/login", values)
            .then((response) => {
                console.log(response.data);  // Log the response data
                if(!response.data.error) {
                    sessionStorage.setItem("accessToken",response.data.token)
                }
                setLoginError('');  // Clear any previous error message
                const uniId = response.data.student.uni_id; // Assuming the backend API returns uni_id
                history.push(`/UniversityPage/${uniId}`);

            })
            .catch(error => {
                console.error("There was an error logging in!", error);
                alert("Invalid email or password");
                
            });
    };

    // eslint-disable-next-line no-unused-vars
    const handleClickForgotPassword = () => {
        // Detaylıca bakılacak
    };

    const registerInitialValues = {
        stu_name: "",
        stu_surname: "",
        stu_mail: "",
        stu_phone: "",
        stu_pw: "",
        selectedUniversity: null,
    };

    const loginInitialValues = {
        stu_mail: "",
        stu_pw: "",
    };

    const registerValidationSchema = Yup.object().shape({
        stu_name: Yup.string().max(50, "İsim en fazla 50 karakter olabilir").required("İsim boş bırakılamaz"),
        stu_surname: Yup.string().max(50, "Soyisim en fazla 50 karakter olabilir").required("Soyisim boş bırakılamaz"),
        stu_mail: Yup.string().max(100, "Geçerli bir mail giriniz").required("Üniversitenizin size atadığı öğrenci mailini giriniz"),
        stu_phone: Yup.string().max(14, "Telefon Numaranızı 05XX XXX XX XX şeklinde girebilirsiniz"),
        stu_pw: Yup.string().min(8, "Şifre en az 8 haneli olmalıdır").required("Şifre giriniz"),
        selectedUniversity: Yup.object().nullable().required('Lütfen bir üniversite seçiniz'),
    });

    const loginValidationSchema = Yup.object().shape({
        stu_mail: Yup.string().max(100, "Geçerli bir mail giriniz").required("Üniversitenizin size atadığı öğrenci mailini giriniz"),
        stu_pw: Yup.string().min(8, "").required("Şifre giriniz"),
    });

    return (
        <div className="body">
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="pb-3">Log In</h4>
                                                    <Formik initialValues={loginInitialValues} onSubmit={handleClickLogIn} validationSchema={loginValidationSchema}>
                                                        <Form>
                                                            <div className="form-group">
                                                                <Field className="form-style" name="stu_mail" placeholder="Okul Maili" />
                                                                <i className="input-icon uil uil-at"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <Field type="password" className="form-style" name="stu_pw" placeholder="Şifre" />
                                                                <i className="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                            <button type="submit" className="btn mt-4">Login</button>
                                                            <br /><br />
                                                            {loginError && <div className="error">{loginError}</div>} {/* Display the error message */}
                                                            <div className="error">
                                                                <ErrorMessage name="stu_mail" component="span" />
                                                                <br />
                                                                <ErrorMessage name="stu_pw" component="span" />
                                                            </div>
                                                        </Form>
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-3 pb-3">Sign Up</h4>
                                                    <Formik initialValues={registerInitialValues} onSubmit={handleClickRegister} validationSchema={registerValidationSchema}>
                                                        {({ setFieldValue, setFieldTouched }) => (
                                                            <Form className="form-group">
                                                                <div className="form-group">
                                                                    <Field className="form-style" name="stu_name" placeholder="İsim" />
                                                                    <i className="input-icon uil uil-user"></i>
                                                                    <Field className="form-style" name="stu_surname" placeholder="Soyisim" />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Field className="form-style" name="stu_phone" placeholder="Telefon Numarası" />
                                                                    <i className="input-icon uil uil-phone"></i>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Field className="form-style" name="stu_mail" placeholder="Okul Maili" />
                                                                    <i className="input-icon uil uil-at"></i>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Select
                                                                        placeholder="Üniversite Seç"
                                                                        options={universities}
                                                                        name="selectedUniversity"
                                                                        onChange={(value) => setFieldValue('selectedUniversity', value)}
                                                                        onBlur={() => setFieldTouched('selectedUniversity', true)}
                                                                    />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Field type="password" className="form-style" name="stu_pw" placeholder="Şifre" />
                                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                                </div>
                                                                <label>
                                                                    <Field type="checkbox" name="promotionalCommunications" />
                                                                    Promosyon Amaçlı İletişimleri Kabul Ediyor Musunuz?
                                                                </label>
                                                                <button type="submit" className="btn mt-4">Register</button>
                                                                <br /><br /><br />
                                                                <div className="error">
                                                                    <ErrorMessage name="stu_name" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="stu_surname" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="stu_mail" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="stu_phone" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="selectedUniversity" component="span" />
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistirationPage;
