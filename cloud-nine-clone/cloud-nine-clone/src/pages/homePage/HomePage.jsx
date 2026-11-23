import "./HomePage.css"
import HomePageTopbar from "../../utils/topbar/HomePageTopbar"
import HomePageNavbar from "./components/homepageNavbar/HomePageNavbar"
import HomeSubNavBar from "./components/subNavBar/HomeSubNavBar";
import BranchesSection from "./components/hospital-branches/BrancesSection";
import Specialities from "./components/specialities/Specialities";

import heroBanner from "../../assets/homePage/bannerImg.jpg";



export default function HomePage(){
    return (
        <>
            <nav>
                <HomePageTopbar/>
                <HomePageNavbar/>
            </nav>

            <main>
                <img src={heroBanner} alt="" />
                <HomeSubNavBar/>
                <BranchesSection/>
                <Specialities/>

            </main>
        </>
    )
}