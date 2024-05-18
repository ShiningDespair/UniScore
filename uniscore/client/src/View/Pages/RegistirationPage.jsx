import React from 'react';
import Select from 'react-select';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegistirationPage.css';

function RegistirationPage() {
    const handleClickRegister = (values) => {
        // Register Logic will be implemented here
        console.log("Register data:", values);
    };

    const handleClickLogIn = (values) => {
        // Login Logic will be implemented here
        console.log("Log In data:", values);
    };

    // eslint-disable-next-line no-unused-vars
    const handleClickForgotPassword = () => {
        // Detaylıca bakılacak
    };

    const Universities = [
        { value: 'A', label: 'İAÜ' },
        { value: 'B', label: 'OMÜ' },
    ];

    const registerInitialValues = {
        name: "",
        surName: "",
        uniMail: "",
        phoneNumber: "",
        password: "",
        selectedUniversity: null,
    };

    const loginInitialValues = {
        uniMail: "",
        password: "",
    };

    const registerValidationSchema = Yup.object().shape({
        name: Yup.string().max(50, "İsim en fazla 50 karakter olabilir").required("İsim boş bırakılamaz"),
        surName: Yup.string().max(50, "Soyisim en fazla 50 karakter olabilir").required("Soyisim boş bırakılamaz"),
        uniMail: Yup.string().max(100, "Geçerli bir mail giriniz").required("Üniversitenizin size atadığı öğrenci mailini giriniz"),
        phoneNumber: Yup.string().max(14, "Telefon Numaranızı 05XX XXX XX XX şeklinde girebilirsiniz"),
        password: Yup.string().min(8).required("Şifre giriniz"),
        selectedUniversity: Yup.object().nullable().required('Lütfen bir üniversite seçiniz'),
    });

    const loginValidationSchema = Yup.object().shape({
        uniMail: Yup.string().max(100, "Geçerli bir mail giriniz").required("Üniversitenizin size atadığı öğrenci mailini giriniz"),
        password: Yup.string().min(8).required("Şifre giriniz"),
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
                                                                <Field className="form-style" name="uniMail" placeholder="Okul Maili" />
                                                                <i className="input-icon uil uil-at"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <Field className="form-style" name="password" placeholder="Şifre" />
                                                                <i className="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                            <button type="submit" className="btn mt-4">Login</button>
                                                            <br /><br />
                                                            <div className="error">
                                                                <ErrorMessage name="uniMail" component="span" />
                                                                <br />
                                                                <ErrorMessage name="password" component="span" />
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
                                                                    <Field className="form-style" name="name" placeholder="İsim" />
                                                                    <i className="input-icon uil uil-user"></i>
                                                                    <Field className="form-style" name="surName" placeholder="Soyisim" />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Field className="form-style" name="phoneNumber" placeholder="Telefon Numarası" />
                                                                    <i className="input-icon uil uil-phone"></i>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Field className="form-style" name="uniMail" placeholder="Okul Maili" />
                                                                    <i className="input-icon uil uil-at"></i>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Select 
                                                                        
                                                                        placeholder="Üniversite Seç"
                                                                        options={Universities}
                                                                        name="selectedUniversity"
                                                                        onChange={(value) => setFieldValue('selectedUniversity', value)}
                                                                        onBlur={() => setFieldTouched('selectedUniversity', true)}
                                                                    />
                                                                    
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <Field className="form-style" name="password" placeholder="Şifre" />
                                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                                </div>
																<label>
                                                                        <Field type="checkbox" name="promotionalCommunications" />
                                                                        Promosyon Amaçlı İletişimleri Kabul Ediyor Musunuz?
                                                                    </label>
                                                                <button type="submit" className="btn mt-4">Register</button>
                                                                <br /><br /><br />
                                                                <div className="error">
                                                                    <ErrorMessage name="name" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="surName" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="uniMail" component="span" />
                                                                    <br />
                                                                    <ErrorMessage name="phoneNumber" component="span" />
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
