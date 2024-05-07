import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // Clear error message when input changes
        setErrors({ ...errors, [e.target.name]: "" });
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!user.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!user.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Don't submit if form is not valid
        }

        const sendData = {
            email: user.email,
            password: user.password
        };

        axios.post('http://localhost/php-assessment/login.php', sendData)
            .then((result) => {
                console.log("Profile data:", result.data.profile); // Log the profile data

                if (result.data.Status === '200') {
                    window.localStorage.setItem('email', result.data.email);
                    window.localStorage.setItem('profile', result.data.profile);
                    window.localStorage.setItem('userName', (result.data.first_name + ' ' + result.data.last_name));
                    navigate(`/dashboard`);
                } else {
                    alert('Invalid User');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error logging in');
            });
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={submitForm}>
                                            <div className="mb-3 pb-1 text-center">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                <span className="h1 fw-bold mb-0">Login</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: "1px" }}>
                                                <strong style={{ color: "#9a616d" }}>Login</strong> into your account
                                            </h5>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
                                                    placeholder='Enter Your Email Id'
                                                    onChange={handleChange}
                                                    value={user.email}
                                                    autoComplete="new-email"
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                                    placeholder='Enter Password'
                                                    onChange={handleChange}
                                                    value={user.password}
                                                    autoComplete="new-password"
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <input
                                                    type="submit"
                                                    name='submit'
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-dark btn-lg btn-block"
                                                    style={{ width: "100%" }}
                                                    value="Login"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
