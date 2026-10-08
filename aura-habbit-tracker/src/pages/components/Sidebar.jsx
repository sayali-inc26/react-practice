import { Link } from "react-router-dom";

import home from "../../assets/sidebar/home.png";
import habbits from "../../assets/sidebar/habbits.png";
import calender from "../../assets/sidebar/calender.png";
import acheivements from "../../assets/sidebar/acheivements.png";
import profile from "../../assets/sidebar/profile.png";

import "./Sidebar.css";

function Sidebar() {

    const sidebarItems = [
        {
            icon: home,
            name: "Home",
            path: "/home"
        },
        {
            icon: habbits,
            name: "My Habits",
            path: "/home/habits"
        },
        {
            icon: calender,
            name: "Calendar",
            path: "/home/calendar"
        },
        {
            icon: acheivements,
            name: "Achievements",
            path: "/home/achievements"
        },
        {
            icon: profile,
            name: "Profile",
            path: "/home/profile"
        }
    ];

    return (
        <div className="mainSidebar">

            <Link to="/home/add-habit">
                <button className="newHabbit">
                    + New Habit
                </button>
            </Link>


            <div className="sidebarList">

                {
                    sidebarItems.map((item) => (

                        <Link to={item.path} className="sidebarLink" key={item.name}>

                            <div className="sidebarItems">

                                <img
                                    src={item.icon}
                                    alt={item.name}
                                />

                                <h3>{item.name}</h3>

                            </div>

                        </Link>

                    ))
                }

            </div>

        </div>
    );
}

export default Sidebar;