import { Link } from "react-router-dom"
import { useState } from "react";
import { Moon ,UserCircle} from "lucide-react";

import "./Header.css"

export default function Header() {

    const [dark, setDark] = useState(false);

    return (

        
        <>
            <header className="nav">

                <Link to="/home" className="brand">
                    TravelMate
                </Link>

                <div className="navLinks">
                    <Link to="/home" className="selected">
                        Dashboard
                    </Link>

                    <Link to="/myTrips">My Trips</Link>
                    <Link to="/planners">Planner</Link>
                    <Link to="/expenses">Expenses</Link>

                </div>

                <div className="navRight">

                    <button
                        className="themeBtn"
                        onClick={() => setDark(!dark)}
                        aria-label="Toggle theme"
                    >
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        className="profileBtn"
                        onClick={() => navigate("/profile")}
                        aria-label="Open profile"
                    >
                        <UserCircle size={25} />
                    </button>

                </div>

            </header>
        </>
    )
}