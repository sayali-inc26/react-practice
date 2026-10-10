// import { useState } from "react";

import { Link } from "react-router-dom";
import "./Sidebar.css";

import {
    Dumbbell,
    LayoutDashboard,
    Users,
    CalendarCheck,
    ContactRound,
    Monitor,
    Banknote,
    TrendingUp
} from "lucide-react";

function Sidebar() {

    const sidebarItems = [
        {
            icon: LayoutDashboard,
            name: "Dashboard",
            path: "/homedashboard"
        },
        {
            icon: Users,
            name: "Members",
            path: "/home/members"
        },
        {
            icon: CalendarCheck,
            name: "Attendance",
            path: "/home/attendance"
        },
        {
            icon: ContactRound,
            name: "Trainers",
            path: "/home/trainers"
        },
        {
            icon: Monitor,
            name: "Membership Plans",
            path: "/home/membershipplans"
        },
        {
            icon: Banknote,
            name: "Payments",
            path: "/home/payments"
        },
        {
            icon: TrendingUp,
            name: "Progress",
            path: "/home/progress"
        }
    ];
    return (
        <>
            <div className="mainSidebar">
                <div className="sidebarHead">
                    <div className="sidebarIcon">
                        <Dumbbell size={28} />
                    </div>
                    <div className="logoText">
                        <h3>Fitcore</h3>
                        <p>Gym Management</p>
                    </div>
                </div>

                <div className="sidebarMenu">
                    {
                        sidebarItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link to={item.path} className="sidebarLink" key={item.name}>
                                    <div
                                        className="sidebarItems"
                                        key={item.name}

                                    >
                                        <Icon className="sidebarIcon" size={24} />
                                        <h3>{item.name}</h3>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </>
    )
}

export default Sidebar;