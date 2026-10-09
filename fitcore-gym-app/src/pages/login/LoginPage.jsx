import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register, login } from "../../services/authService";

import "./LoginPage.css";

function LoginPage() {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (
            email.trim() === "" ||
            password.trim() === "" ||
            (!isLogin &&
                (
                    userName.trim() === "" ||
                    confirmPassword.trim() === ""
                ))
        ) {
            alert(
                isLogin
                    ? "Please enter email and password"
                    : "Please fill all the fields"
            );

            return;
        }

        if (!isLogin && password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            let data;
            if (isLogin) {

                data = await login(email, password);

            } else {

                data = await register(
                    userName,
                    email,
                    password
                );

            }

            console.log(
                isLogin ? "Login response:" : "Signup response:",
                data
            );


            const token = data?.data?.accessToken;
            const tokenType = data?.data?.tokenType || "Bearer";

            if (!token) {

                alert(
                    isLogin
                        ? "Login successful, but token was not received."
                        : "Account created, but token was not received."
                );
                navigate("/home");

                return;
            }

            localStorage.setItem("authToken", token);
            localStorage.setItem("tokenType", tokenType);

            console.log("Token saved successfully");

            if (!isLogin) {
                alert("Account created successfully!");
            }

            navigate("/home");

        } catch (error) {

            console.error(
                isLogin ? "Login Error:" : "Signup Error:",
                error
            );

            alert(error.message);

        }
    };

    return (

        <div className="loginPage">

            <div className="loginHeader">

                <h1>FITCORE</h1>
                <p>Your Fitness Business, Simplified</p>

            </div>

            <div className="loginCard">

                <div className="toggleButtons">

                    <button type="button" className={isLogin ? "loginButton active" : "loginButton"} onClick={() => setIsLogin(true)}>
                        Login
                    </button>

                    <button type="button" className={!isLogin ? "signupButton active" : "signupButton"} onClick={() => setIsLogin(false)}>
                        Signup
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (

                        <div className="inputGroup">

                            <label>User Name</label>

                            <input type="text" placeholder="Enter username" value={userName}
                                onChange={(event) =>
                                    setUserName(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    )}

                    <div className="inputGroup">

                        <label>Email</label>

                        <input type="email" placeholder="email@example.com" value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="inputGroup">

                        <div className="passwordLabel">

                            <label> Password </label>


                            {isLogin && (

                                <button type="button" className="forgotPassword"
                                    onClick={() =>
                                        alert(
                                            "Forgot Password clicked"
                                        )
                                    }
                                >Forgot?</button>

                            )}

                        </div>


                        <input type="password" placeholder="************" value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    {!isLogin && (

                        <div className="inputGroup">

                            <label>Confirm Password</label>

                            <input type="password" placeholder="************" value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    )}

                    <button type="submit" className="signInButton">
                        {isLogin
                            ? "SECURE LOGIN"
                            : "CREATE ACCOUNT"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;