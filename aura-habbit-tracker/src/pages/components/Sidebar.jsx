import { Link } from "react-router";

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
            path: "/"
        },
        {
            icon: habbits,
            name: "My Habits",
            path: "/habits"
        },
        {
            icon: calender,
            name: "Calendar",
            path: "/calendar"
        },
        {
            icon: acheivements,
            name: "Achievements",
            path: "/achievements"
        },
        {
            icon: profile,
            name: "Profile",
            path: "/profile"
        }
    ];

    return (
        <div className="mainSidebar">

            <Link to="/add-habit">
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