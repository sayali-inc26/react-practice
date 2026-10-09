import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "../pages/login/LoginPage"
import HomePage from "../pages/homePage/HomePage"
import HomeDashboard from "../pages/homeDashboard/HomeDashboardPage"
import AddMemberPage from "../pages/addMember/AddMemberPage"
import Members from "../pages/members/MembersPage"


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/home" element={<HomePage />}>
                <Route index element={<HomeDashboard />} />
                <Route path="homedashboard" element={<HomeDashboard/>}></Route>
                <Route path="addmember" element={<AddMemberPage/>}></Route>
                <Route path="members" element={<Members/>}></Route>
                <Route path="attendance"></Route>
                <Route path="trainers"></Route>
                <Route path="membershipplans"></Route>
                <Route path="payments"></Route>
                <Route path="progress"></Route>
                

            </Route>

            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    )
}