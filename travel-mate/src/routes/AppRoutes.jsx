import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/homePage/HomePage";
import MyTripsPage from "../pages/myTrips/MyTripsPage"
import PlannersPage from "../pages/planners/PlannersPage";
import ExpensesPage from "../pages/expenses/ExpensesPage";
import AddExpensesPage from "../pages/addExpenses/AddExpensesPage";
import TripDetailsPage from "../pages/tripDetails/TripDetailsPage";
import WhereNextPage from "../pages/whereNext/WhereNextPage";

import TripConfiguration from "../pages/tripCongiguration/TripConfiguration";


export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/home" element={<HomePage />} />

            <Route path="/home/whereNext/:id" element={<WhereNextPage />} />

            <Route path="/home/whereNext/tripConfiguration/:id" element={<TripConfiguration />}/>

            <Route path="/myTrips" element={<MyTripsPage />} />

            <Route path="/myTrips/tripDetails/:id" element={<TripDetailsPage />} />

            <Route path="/planners" element={<PlannersPage />} />

            <Route path="/expenses" element={<ExpensesPage />} />

            <Route path="/expenses/addExpenses" element={<AddExpensesPage />} />

            <Route path="*" element={<Navigate to="/home" replace />} />

        </Routes>
    );
}