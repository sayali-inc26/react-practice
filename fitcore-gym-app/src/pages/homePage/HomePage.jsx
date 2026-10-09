
import { Outlet } from "react-router-dom";

import SearchBar from "../../layout/searchBar/SearchBar";
import Sidebar from "../../layout/sidebar/Sidebar";

import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="homePage">

            <Sidebar />

            <div className="mainContent">

                <SearchBar />

                <div className="middleContent">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}