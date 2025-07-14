import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../styles/mix.css"

const Register = () => {
    const [passhow, setPassShow] = useState(false);
    const [spiner, setSpiner] = useState(false);
    const [inputdata, setInputdata] = useState({
        fname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    // setinputvalue
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputdata({ ...inputdata, [name]: value })
    }

    // register data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, email, password } = inputdata;

        if (fname === "") {
            toast.error("Enter Your Name")
        } else if (email === "") {
            toast.error("Enter Your Email")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email")
        } else if (password === "") {
            toast.error("Enter Your Password")
        } else if (password.length < 6) {
            toast.error("password length minimum 6 character")
        } else {
            setSpiner(true);
            const response = await registerfunction(inputdata);

            if (response.status === 200) {
                setInputdata({ ...inputdata, fname: "", email: "", password: "" });
                setSpiner(false);
                navigate("/")
            } else {
                toast.error(response.response.data.error);
                setSpiner(false);
            }
        }
    }

    return (
        <>
            <div className="register-container">
                <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
                    <Row className="w-100 justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
                            <Card className="register-card shadow-lg border-0">
                                <Card.Body className="p-5">
                                    {/* Logo Section */}
                                    <div className="text-center mb-4">
                                        <div className="logo-container mb-3">
                                            <span className="logo-circle">○</span>
                                            <span className="logo-text">circle</span>
                                        </div>
                                        <div className="welcome-badge">
                                            <span className="badge-text">Join Us Today! 🚀</span>
                                        </div>
                                    </div>

                                    {/* Form Header */}
                                    <div className="form-header text-center mb-4">
                                        <h2 className="form-title">Sign Up</h2>
                                        <p className="form-subtitle">
                                            We are glad that you will be using Circle! We hope that you will like it.
                                        </p>
                                    </div>

                                    {/* Register Form */}
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="fname"
                                                placeholder="Enter your full name"
                                                value={inputdata.fname}
                                                onChange={handleChange}
                                                className="form-input"
                                                size="lg"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                value={inputdata.email}
                                                onChange={handleChange}
                                                className="form-input"
                                                size="lg"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label">Password</Form.Label>
                                            <div className="password-input-container">
                                                <Form.Control
                                                    type={!passhow ? "password" : "text"}
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    value={inputdata.password}
                                                    onChange={handleChange}
                                                    className="form-input password-input"
                                                    size="lg"
                                                />
                                                <div 
                                                    className="password-toggle" 
                                                    onClick={() => setPassShow(!passhow)}
                                                >
                                                    {!passhow ? "👁️" : "🙈"}
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Button
                                            type="submit"
                                            className="register-button w-100 mb-4"
                                            size="lg"
                                            onClick={handleSubmit}
                                            disabled={spiner}
                                        >
                                            {spiner ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        className="me-2"
                                                    />
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="me-2">📝</span>
                                                    Sign Up
                                                </>
                                            )}
                                        </Button>

                                        <div className="login-link text-center">
                                            <p className="mb-0">
                                                Already have an account?{' '}
                                                <NavLink to="/" className="login-link-text">
                                                    Log in
                                                </NavLink>
                                            </p>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>

            <style jsx>{`
                .register-container {
                    position: relative;
                    min-height: 100vh;
                    background-color: #f8f9fa;
                }

                .register-card {
                    background: white;
                    border-radius: 20px;
                    position: relative;
                    z-index: 1;
                    border: 1px solid #e9ecef;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .logo-circle {
                    font-size: 2rem;
                    color: #007bff;
                    font-weight: bold;
                }

                .logo-text {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #333;
                }

                .welcome-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #007bff, #0056b3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .form-header {
                    margin-bottom: 2rem;
                }

                .form-title {
                    color: #333;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .form-subtitle {
                    color: #666;
                    font-size: 0.95rem;
                    margin-bottom: 0;
                }

                .form-label {
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .form-input {
                    border: 2px solid #e1e5e9;
                    border-radius: 12px;
                    padding: 12px 16px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: white;
                }

                .form-input:focus {
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                    background: white;
                }

                .password-input-container {
                    position: relative;
                }

                .password-input {
                    padding-right: 50px;
                }

                .password-toggle {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    user-select: none;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }

                .password-toggle:hover {
                    background-color: #f8f9fa;
                }

                .register-button {
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                    border: none;
                    border-radius: 12px;
                    padding: 12px 24px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .register-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
                }

                .register-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .login-link-text {
                    color: #007bff;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .login-link-text:hover {
                    color: #0056b3;
                    text-decoration: none;
                }

                .login-link p {
                    color: #666;
                    font-size: 0.95rem;
                }

                @media (max-width: 768px) {
                    .register-card .card-body {
                        padding: 2rem !important;
                    }
                    
                    .form-title {
                        font-size: 1.5rem;
                    }
                    
                    .logo-circle {
                        font-size: 1.5rem;
                    }
                    
                    .logo-text {
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </>
    )
}

export default Register