import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register, login } from "../services/authentication";

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

        if (isLogin) {

            if (email.trim() === "" || password.trim() === "") {

                alert("Please enter email and password");

                return;
            }

            try {

                const data = await login(email, password);

                console.log("Logged in user:", data);

                const token = data?.data?.token;

                if (!token) {
                    alert("Login successful, but authentication token was not received.");
                    return;
                }

                localStorage.setItem("authToken", token);

                console.log("Token saved:",localStorage.getItem("authToken"));

                navigate("/onboarding");

            } catch (error) {

                console.error("Login Error:", error);

                alert(error.message);
            }

            return;
        }




        if (
            userName.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {

            alert("Please fill all the fields");
            return;
        }


        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;
        }


        try {

            const data = await register(userName, email, password);

            console.log("Register successful:", data);

            const token = data?.data?.token;

            if (!token) {
                alert("Account created successfully, but authentication token was not received.");
                return;
            }

            localStorage.setItem("token", token);

            console.log("Token saved successfully");

            alert("Account created successfully!");

            navigate("/onboarding");

        } catch (error) {

            console.error("Signup Error:",error);

            alert(error.message);
        }
    };


    return (

        <div className="loginPage">


            {/* HEADER */}

            <div className="loginHeader">

                <h1>Aura</h1>

                <p>
                    Build Better Habits Every Day
                </p>

            </div>



            {/* LOGIN / SIGNUP CARD */}

            <div className="loginCard">


                {/* TOGGLE */}

                <div className="toggleButtons">

                    <button
                        type="button"
                        className={
                            isLogin
                                ? "loginButton active"
                                : "loginButton"
                        }
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>


                    <button
                        type="button"
                        className={
                            !isLogin
                                ? "signupButton active"
                                : "signupButton"
                        }
                        onClick={() => setIsLogin(false)}
                    >
                        Signup
                    </button>

                </div>



                {/* FORM */}

                <form onSubmit={handleSubmit}>


                    {/* USERNAME - SIGNUP ONLY */}

                    {!isLogin && (

                        <div className="inputGroup">

                            <label>
                                User Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter username"
                                value={userName}
                                onChange={(event) =>
                                    setUserName(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    )}



                    {/* EMAIL */}

                    <div className="inputGroup">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                        />

                    </div>



                    {/* PASSWORD */}

                    <div className="inputGroup">

                        <div className="passwordLabel">

                            <label>
                                Password
                            </label>


                            {isLogin && (

                                <button
                                    type="button"
                                    className="forgotPassword"
                                    onClick={() =>
                                        alert(
                                            "Forgot Password clicked"
                                        )
                                    }
                                >
                                    Forgot?
                                </button>

                            )}

                        </div>


                        <input
                            type="password"
                            placeholder="************"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />

                    </div>



                    {/* CONFIRM PASSWORD - SIGNUP ONLY */}

                    {!isLogin && (

                        <div className="inputGroup">

                            <label>
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="************"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    )}



                    {/* SUBMIT BUTTON */}

                    <button
                        type="submit"
                        className="signInButton"
                    >
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