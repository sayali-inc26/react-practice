import {Routes, Route} from "react-router-dom"

import HomePage from "../pages/homePage/HomePage"
export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>

        </Routes>
    )
}