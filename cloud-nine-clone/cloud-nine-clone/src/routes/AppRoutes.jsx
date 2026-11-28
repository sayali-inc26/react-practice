import {Routes, Route} from "react-router-dom"

import HomePage from "../pages/patient/HomePage/HomePage"
import DoctorsPage from "../pages/patient/Doctors/DoctorPage"
export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>
    )
}