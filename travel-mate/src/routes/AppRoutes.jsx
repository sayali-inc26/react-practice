import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/homePage/HomePage";
import MyTripsPage from "../pages/myTrips/MyTripsPage"
import PlannersPage from "../pages/planners/PlannersPage";
import ExpensesPage from "../pages/expenses/ExpensesPage";


export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/home" element={<HomePage/>}/>

            <Route path="/myTrips" element={<MyTripsPage/>}/>

            <Route path="/planners" element={<PlannersPage/>}/>

            <Route path="/expenses" element={<ExpensesPage/>}/>

        </Routes>
    );
}