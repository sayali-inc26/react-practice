import "./HomeDashboardPage.css";

import HomeDashboardStats from "./components/HomeDashboardStats";
import HomeDashboardMainContent from "./components/HoemDashboardMainContent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../services/dashboard";

export default function HomeDashboardPage() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await getDashboard();

                console.log("Fetched Dashboard:", response);

                setDashboard(response.data || response);

            } catch (error) {

                console.error(error);
                setError("Unable to load dashboard.");

            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();

    }, []);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!dashboard) {
        return <p>No dashboard data available.</p>;
    }
    return (
        <div className="dashboardContent">

            <div className="dashboardHeader">
                <div>
                    <h1>Good Morning 👋</h1>
                    <h5>Here's what's happening at your gym today.</h5>
                </div>

                <button onClick={() => { navigate("/home/addmember"); }}>+ Add Member</button>
            </div>

            <HomeDashboardStats stats = {dashboard.stats} />
            <HomeDashboardMainContent dashboard ={dashboard}/>

        </div>
    );


}
