import { Outlet } from "react-router-dom";

import HeadBar from "../pages/components/Headbar";
import Sidebar from "../pages/components/Sidebar";

import "./HomePage.css";

export default function HomePage() {

    return (
        <div className="homePage">

            <HeadBar />

            <div className="mainArea">

                <Sidebar />

                <div className="middleContent">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}