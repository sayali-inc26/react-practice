import "./HomeDashboardPage.css";

import HomeDashboardStats from "./components/HomeDashboardStats";
import HomeDashboardMainContent from "./components/HoemDashboardMainContent";
import { useNavigate } from "react-router-dom";

export default function HomeDashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="dashboardContent">

            <div className="dashboardHeader">
                <div>
                    <h1>Good Morning 👋</h1>
                    <h5>Here's what's happening at your gym today.</h5>
                </div>

                <button onClick={() => {navigate("/home/addmember"); }}>+ Add Member</button>
            </div>

            <HomeDashboardStats />
            <HomeDashboardMainContent />

        </div>
    );


}
