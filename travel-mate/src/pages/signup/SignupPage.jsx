
import { useState } from "react";
import {
    Compass,
    CircleHelp,
    User,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
    PlaneTakeoff,
    Heart,
    Users,
    Mountain
} from "lucide-react";

import { Link } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [style, setStyle] = useState("Solo Exploring");
    const [agree, setAgree] = useState(false);

    const styles = [
        { name: "Solo Exploring", icon: <User size={12} /> },
        { name: "Couple Getaways", icon: <Heart size={12} /> },
        { name: "Family Vacation", icon: <Users size={12} /> },
        { name: "Group Expeditions", icon: <Mountain size={12} /> }
    ];

    const handleSignup = (e) => {
        e.preventDefault();

        if (!agree) {
            alert("Please accept the Terms and Privacy Policy");
            return;
        }

        const data = {
            fullName: name,
            email: email,
            password: password,
            travelStyle: style
        };

        // Connect signup API here.
        // Avoid logging passwords to the console.
        console.log("Signup form submitted");
    };

    return (
        <div className="signupPage">

            <header className="signupHeader">

                <Link to="/login" className="signupLogo">
                    <Compass size={19} />
                    <span>TravelMate</span>
                </Link>

                <a href="mailto:support@travelmate.com" className="help">
                    <CircleHelp size={14} />
                    Help
                </a>

            </header>

            <main className="signupMain">

                <div className="signupBox">

                    <div className="tag">
                        <PlaneTakeoff size={12} />
                        START YOUR VOYAGE
                    </div>

                    <h1>Create your TravelMate account</h1>

                    <p className="signupText">
                        Start planning memorable journeys, split group expenses,
                        and build visual itineraries with curated ease.
                    </p>

                    <div className="line">
                        <span>OR REGISTER WITH EMAIL</span>
                    </div>

                    <form onSubmit={handleSignup}>

                        <div className="signupField">

                            <label>Full Name</label>

                            <div className="signupInput">
                                <User size={16} />

                                <input
                                    type="text"
                                    placeholder="Alex Morgan"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="signupField">

                            <label>Work or Personal Email</label>

                            <div className="signupInput">
                                <Mail size={16} />

                                <input
                                    type="email"
                                    placeholder="alex.morgan@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="signupField">

                            <div className="signupLabel">
                                <label>Create Password</label>
                                <span>♧ Strong Security</span>
                            </div>

                            <div className="signupInput">

                                <LockKeyhole size={16} />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={8}
                                    required
                                />

                                <button
                                    type="button"
                                    className="showBtn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword
                                        ? <EyeOff size={16} />
                                        : <Eye size={16} />
                                    }
                                </button>

                            </div>

                            <div className="strength">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                            <div className="strengthText">
                                <span>8+ characters · Uppercase & symbol applied</span>
                                <span>Excellent</span>
                            </div>

                        </div>

                        <div className="signupField">

                            <label>Primary Travel Style</label>

                            <div className="travelStyles">

                                {styles.map((item) => (

                                    <button
                                        key={item.name}
                                        type="button"
                                        className={
                                            style === item.name
                                                ? "travelBtn active"
                                                : "travelBtn"
                                        }
                                        onClick={() => setStyle(item.name)}
                                        aria-pressed={style === item.name}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </button>

                                ))}

                            </div>

                        </div>

                        <label className="terms">

                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                required
                            />

                            <span>
                                I agree to the TravelMate{" "}
                                <a href="/terms">Terms of Service</a> and{" "}
                                <a href="/privacy">Privacy Policy</a>, and
                                consent to essential journey notifications.
                            </span>

                        </label>

                        <button type="submit" className="createBtn">
                            Create Account
                            <ArrowRight size={16} />
                        </button>

                    </form>

                    <button type="button" className="signupGoogle">
                        <span className="googleG">G</span>
                        Sign up with Google
                    </button>

                    <p className="signin">
                        Already have an account?
                        <Link to="/login">Sign in to your portal</Link>
                    </p>

                </div>

            </main>

            <footer className="signupFooter">

                <p>© 2024 TravelMate Inc. All rights reserved.</p>

                <div>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/security">Security</a>
                </div>

            </footer>

        </div>
    );
}
