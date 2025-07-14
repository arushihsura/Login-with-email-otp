import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../styles/mix.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [spiner, setSpiner] = useState(false);
    const navigate = useNavigate();

    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email
            }

            const response = await sentOtpFunction(data);

            if (response.status === 200) {
                setSpiner(false)
                navigate("/user/otp", { state: email })
            } else {
                toast.error(response.response.data.error);
                setSpiner(false);
            }
        }
    }

    return (
        <>
            <div className="login-container">
                <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
                    <Row className="w-100 justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
                            <Card className="login-card shadow-lg border-0">
                                <Card.Body className="p-5">
                                    {/* Logo Section */}
                                    <div className="text-center mb-4">
                                        <div className="logo-container mb-3">
                                            <span className="logo-circle">○</span>
                                            <span className="logo-text">circle</span>
                                        </div>
                                        <div className="welcome-badge">
                                            <span className="badge-text">Welcome Back! 👋</span>
                                        </div>
                                    </div>

                                    {/* Form Header */}
                                    <div className="form-header text-center mb-4">
                                        <h2 className="form-title">Log In</h2>
                                        <p className="form-subtitle">
                                            Hi, we are glad you are back. Please login to continue.
                                        </p>
                                    </div>

                                    {/* Login Form */}
                                    <Form>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-input"
                                                size="lg"
                                            />
                                        </Form.Group>

                                        <Button
                                            type="submit"
                                            className="login-button w-100 mb-4"
                                            size="lg"
                                            onClick={sendOtp}
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
                                                    Sending OTP...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="me-2">🔐</span>
                                                    Login
                                                </>
                                            )}
                                        </Button>

                                        <div className="signup-link text-center">
                                            <p className="mb-0">
                                                Don't have an account?{' '}
                                                <NavLink to="/register" className="signup-link-text">
                                                    Sign up
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
                .login-container {
                    position: relative;
                    min-height: 100vh;
                    background-color: #f8f9fa;
                }

                .login-card {
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

                .login-button {
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

                .login-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
                }

                .login-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .signup-link-text {
                    color: #007bff;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .signup-link-text:hover {
                    color: #0056b3;
                    text-decoration: none;
                }

                .signup-link p {
                    color: #666;
                    font-size: 0.95rem;
                }

                @media (max-width: 768px) {
                    .login-card .card-body {
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

export default Login