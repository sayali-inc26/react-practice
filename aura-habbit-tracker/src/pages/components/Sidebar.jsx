// import { useState } from "react";
import home from "../../assets/sidebar/home.png";
import habbits from "../../assets/sidebar/habbits.png";
import calender from "../../assets/sidebar/calender.png";
import acheivements from "../../assets/sidebar/acheivements.png";
import profile from "../../assets/sidebar/profile.png"
import "./Sidebar.css";

function Sidebar() {

    const sidebarItems = [
        {
            icon: home,
            name: "Home"
        },
        {
            icon: habbits,
            name: "My Habits"
        },
        {
            icon: calender,
            name: "Calendar"
        },
        {
            icon: acheivements,
            name: "Achievements"
        },
        {
            icon: profile,
            name: "Profile"
        }
    ];
    return (
        <>
            <div className="mainSidebar">
                <button className="newHabbit">New Habbit</button>

                <div>
                    {
                        sidebarItems.map((item) => (
                            <div className="sidebarItems" key={item.name} >

                                <img src={item.icon} alt={item.name} />
                                <h3>{item.name}</h3>

                            </div>
                        ))
                    }
                </div>


            </div>


        </>
    )

}

export default Sidebar;