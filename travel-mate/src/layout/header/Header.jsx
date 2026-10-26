
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun, UserCircle } from "lucide-react";

import "./Header.css";

export default function Header() {

    const [dark, setDark] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="nav">

            <Link to="/home" className="brand">
                TravelMate
            </Link>

            <div className="navLinks">

                <NavLink
                    to="/home"
                    className={({ isActive }) => isActive ? "selected" : ""}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/myTrips"
                    className={({ isActive }) => isActive ? "selected" : ""}
                >
                    My Trips
                </NavLink>

                <NavLink
                    to="/planners"
                    className={({ isActive }) => isActive ? "selected" : ""}
                >
                    Planner
                </NavLink>

                <NavLink
                    to="/expenses"
                    className={({ isActive }) => isActive ? "selected" : ""}
                >
                    Expenses
                </NavLink>

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
    );
}
