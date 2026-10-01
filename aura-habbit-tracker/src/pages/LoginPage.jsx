import { useState } from "react";

import "./LoginPage.css";

function LoginPage({ setCurrentPage }) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Username:", userName);
        // console.log("Password:", password);
        // console.log("Remember Me:", rememberMe);

        if (userName === "" || password === "") {
            alert("Please enter username and password");
            return;
        }
        setCurrentPage("dashboard");
        // alert("Login successful!");
    };

    return (
        <div className="loginPage">

            <div className="loginHeader">

                <h1>Aura</h1>

                <p>Build Better Habits Every Day</p>

            </div>

            <div className="loginCard">

                <div className="toggleButtons">
                    <button className="loginButton">Login</button>
                    <button className="signupButton">Signup</button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="inputGroup">

                        <label>User Name</label>

                        <input type="text" placeholder="name@example.com" value={userName} onChange={(event) => setUserName(event.target.value)} />

                    </div>

                    <div className="inputGroup">

                        <div className="passwordLabel">

                            <label>Password</label>

                            <button type="button" className="forgotPassword" onClick={() => alert("Forgot Password clicked")}>
                                Forgot?
                            </button>

                        </div>

                        <div className="passwordBox">

                            <input type={"password"} placeholder="************" value={password} onChange={(event) => setPassword(event.target.value)} />

                            {/* <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </button> */}

                        </div>
                        <button type="submit" className="signInButton">
                            SECURE LOGIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;