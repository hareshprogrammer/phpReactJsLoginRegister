import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const history = useNavigate();

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        profile: null, // Store selected file object
        password: "",
       
    });

    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        profile: "",
        password: "",
      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        // Clear error message when input changes
        setErrors({ ...errors, [name]: "" });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData({ ...data, profile: file });
        setErrors({ ...errors, profile: "" });
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate other fields
        Object.keys(data).forEach(key => {
            if (!data[key] && key !== "profile") {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        });

        // Validate profile picture
        if (!data.profile) {
            newErrors.profile = "Please upload a profile picture";
            isValid = false;
        } else if (!["image/jpeg", "image/png", "image/gif"].includes(data.profile.type)) {
            newErrors.profile = "Invalid file format. Only JPG, PNG, and GIF are allowed.";
            isValid = false;
        } else if (data.profile.size > 1000000) {
            newErrors.profile = "Maximum file size is 1 MB.";
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

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post('http://localhost/php-assessment/register.php', formData)
            .then((result) => {
                if (result.data.status === "invalid") {
                    alert("Email already exist in the our database... try different one");
                } else {
                    history(`/dashboard`);
                }
            })
            .catch(error => {
                console.error("Error uploading data:", error);
                alert("Error uploading data");
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
                                                <span className="h1 fw-bold mb-0">Register</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: "1px" }}><strong style={{ color: "#9a616d" }}>Sign up </strong> your account</h5>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="text" id="first_name"
                                                    name="first_name"
                                                    className={`form-control form-control-lg ${errors.first_name && 'is-invalid'}`}
                                                    placeholder='Enter Your First Name'
                                                    onChange={handleChange}
                                                    value={data.first_name}
                                                />
                                                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="text" id="last_name" name="last_name"
                                                    className={`form-control form-control-lg ${errors.last_name && 'is-invalid'}`}
                                                    placeholder='Enter Your Last Name'
                                                    onChange={handleChange}
                                                    value={data.last_name}
                                                />
                                                {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="email" name="email"
                                                    className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
                                                    placeholder='Enter Your Email Id'
                                                    onChange={handleChange}
                                                    value={data.email}
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 input-group custom-file-button">
                                                <label className="input-group-text" htmlFor="inputGroupFile">Upload Your Profile Picture</label>
                                                <input type="file" className="form-control" id="inputGroupFile"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                            {errors.profile && <div className="text-danger">{errors.profile}</div>}

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="password" name="password"
                                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                                    placeholder='Enter Password'
                                                    onChange={handleChange}
                                                    value={data.password}
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <input type="submit" name='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" style={{ width: "100%" }} value="Register" />
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
    )
}

export default Register;
