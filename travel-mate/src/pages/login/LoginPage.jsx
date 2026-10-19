import { useState } from "react";
import {
    Compass,
    ShieldCheck,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import "./LoginPage.css";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Remember:", remember);
    };

    return (
        <div className="loginPage">

            <header className="header">
                <div className="logo">
                    <Compass size={19} />
                    <span>TravelMate</span>
                </div>
            </header>


            <main className="main">

                <div className="loginBox">

                    <div className="shield">
                        <ShieldCheck size={15} />
                    </div>

                    <h1>Welcome back to TravelMate</h1>

                    <p className="subtitle">
                        Plan, budget, and explore your next journey seamlessly.
                    </p>

                    <hr />

                    <form onSubmit={handleLogin}>

                        <div className="field">
                            <label>Email address</label>

                            <div className="inputBox">
                                <Mail size={17} />

                                <input
                                    type="email"
                                    placeholder="alex.morgan@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">

                            <div className="labelRow">
                                <label>Password</label>

                                <a href="/forgot-password">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="inputBox">

                                <LockKeyhole size={17} />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="eyeBtn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword
                                        ? <EyeOff size={17} />
                                        : <Eye size={17} />
                                    }
                                </button>

                            </div>
                        </div>

                        <div className="rememberRow">

                            <label className="remember">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />

                                Remember this device for 30 days
                            </label>

                            <span className="trusted">
                                ● Trusted Network
                            </span>

                        </div>

                        <button type="submit" className="loginBtn">
                            Sign In to TravelMate
                            <ArrowRight size={17} />
                        </button>

                    </form>

                    <button type="button" className="googleBtn">

                        <span className="googleIcon">G</span>

                        Continue with Google

                    </button>

                    <p className="signup">
                        Don't have an account?
                        <a href="/signup">Sign up for free</a>
                    </p>

                </div>

            </main>

            <footer className="footer">

                <p>© 2024 TravelMate Inc. All rights reserved.</p>

                <div className="footerLinks">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/security">Security</a>
                </div>

            </footer>

        </div>
    );
}
