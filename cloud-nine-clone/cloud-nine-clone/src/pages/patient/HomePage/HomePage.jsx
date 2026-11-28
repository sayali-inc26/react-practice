import "./HomePage.css"
import HomePageTopbar from "../../../utils/topbar/HomePageTopbar"
import HomePageNavbar from "./components/homepageNavbar/HomePageNavbar"
import HomeSubNavBar from "./components/subNavBar/HomeSubNavBar";
import BranchesSection from "./components/hospital-branches/BrancesSection";
import Specialities from "./components/specialities/Specialities";
import DoctorCard from "./components/doctorCard/DoctorCard";
import doctorsData from "./data/doctorData";
import hospitalPackagesData from "./data/hospitalPackagesData";
import HospitalPackageCard from "./components/hospitalPackages/HospitalPackageCard";
import FAQSection from "./components/faqSection/FAQSection";
import Footer from "../../../utils/footer/Footer";

import heroBanner from "../../../assets/homePage/bannerImg.jpg";

export default function HomePage() {
    return (
        <>
            <nav>
                <HomePageTopbar />
                <HomePageNavbar />
            </nav>

            <main>
                <img src={heroBanner} alt="" />
                <HomeSubNavBar />
                <BranchesSection />
                <Specialities />
                <section className="ourDoctorsSec">
                    <h2>Our Doctors</h2>

                    <div className="doctorsContainer">

                        {doctorsData.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                            />
                        ))}

                    </div>
                </section>

                <section className="hospitalPackagesSection">

                    <div className="packagesHeading">
                        <h3>For a joyful birthing experience select your</h3>
                        <h4>Maternity Package in
                            Pune</h4>
                    </div>

                    <div className="hospitalPackagesContainer">

                        {hospitalPackagesData.map((packageData) => (

                            <HospitalPackageCard
                                key={packageData.id}
                                packageData={packageData}
                            />

                        ))}

                    </div>

                </section>

                <FAQSection />
                <Footer/>
            </main>
        </>
    )
}