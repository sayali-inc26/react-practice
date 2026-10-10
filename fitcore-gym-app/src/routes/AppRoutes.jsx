import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "../pages/login/LoginPage"
import HomePage from "../pages/homePage/HomePage"
import HomeDashboard from "../pages/homeDashboard/HomeDashboardPage"
import AddMemberPage from "../pages/addMember/AddMemberPage"
import Members from "../pages/members/MembersPage"
import MemberDetailsPage from "../pages/memberDetails/MemberDetailsPage"
import AttendanceControlPage from "../pages/attendanceControl/AttendanceControlPage"
import TarinerPage from "../pages/trainers/TrainerPage"
import MembershipPlansPage from "../pages/membershipPlans/MembershipPlansPage"
import PaymentsPage from "../pages/payments/PaymentsPage"
import ProgressPage from "../pages/progress/ProgressPage"
import AddTrainerPage from "../pages/addTariner/AddTrainerPage"
import TarinerDetailsPage from "../pages/trainerDetails/TrainerDetailsPage"
import NewPlan from "../pages/newPlan/NewPlan"


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

                <Route path="memberdetails" element={<MemberDetailsPage/>}></Route>

                <Route path="attendance" element={<AttendanceControlPage/>}></Route>

                <Route path="trainers" element={<TarinerPage/>}></Route>

                <Route path="addtrainer" element={<AddTrainerPage/>}></Route>

                <Route path="trainerdetails" element={<TarinerDetailsPage/>}></Route>

                <Route path="membershipplans" element={<MembershipPlansPage/>}></Route>

                <Route path="newplan" element={<NewPlan/>}></Route>

                <Route path="payments" element={<PaymentsPage/>}></Route>

                <Route path="progress" element={<ProgressPage/>}></Route>
                

            </Route>

            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    )
}