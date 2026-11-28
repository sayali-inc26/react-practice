import { useState } from "react";
import { Search, MapPin } from "lucide-react";

import "./DoctorPage.css";

import DoctorCard from "../HomePage/components/doctorCard/DoctorCard";
import doctorData from "../HomePage/data/doctorData";

// Banner image
import babyImage from "../../../assets/homePage/babyImage.png";

export default function DoctorsPage() {

    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [gender, setGender] = useState("");

    // City options
    const cities = [
        "Bengaluru",
        "Chandigarh",
        "Chennai",
        "Faridabad",
        "Ghaziabad",
        "Gurgaon",
        "Hyderabad",
        "Mumbai",
        "New Delhi",
        "Pune"
    ];

    // Speciality options
    const specialities = [
        "Cosmetology",
        "Maternity",
        "Gynaecology",
        "Fertility",
        "Paediatrics"
    ];

    // Locations based on selected city
    const locations = [
        ...new Set(
            doctorData
                .filter((doctor) => doctor.city === city)
                .map((doctor) => doctor.location)
                .filter(Boolean)
        )
    ];

    // Filter doctors
    const filteredDoctors = doctorData.filter((doctor) => {

        const searchMatch =
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.speciality.toLowerCase().includes(search.toLowerCase());

        const cityMatch =
            city === "" || doctor.city === city;

        const locationMatch =
            location === "" || doctor.location === location;

        const specialityMatch =
            speciality === "" || doctor.speciality === speciality;

        const genderMatch =
            gender === "" || doctor.gender === gender;

        return (
            searchMatch &&
            cityMatch &&
            locationMatch &&
            specialityMatch &&
            genderMatch
        );

    });


    // Reset all filters
    const resetAll = () => {
        setSearch("");
        setCity("");
        setLocation("");
        setSpeciality("");
        setGender("");
    };


    // Reset individual filters
    const resetCity = () => {
        setCity("");
        setLocation("");
    };

    const resetLocation = () => {
        setLocation("");
    };

    const resetSpeciality = () => {
        setSpeciality("");
    };

    const resetGender = () => {
        setGender("");
    };


    return (

        <div className="doctorsPage">

            {/* Doctors Banner */}

            <div className="doctorsBanner">

                <img src={babyImage} alt="Mother and baby" />

                <h1>Cloudnine Doctors</h1>

            </div>


            {/* Main Doctors Section */}

            <div className="doctorsMain">


                {/* Filter Sidebar */}

                <aside className="doctorFilters">


                    {/* Total Doctors */}

                    <div className="filterHeader">

                        <p>
                            Showing <span>{filteredDoctors.length}</span> doctors
                            of {doctorData.length} doctors.
                        </p>

                        <button onClick={resetAll}>
                            Reset All
                        </button>

                    </div>


                    {/* Search */}

                    <div className="doctorSearch">

                        <Search size={25} />

                        <input
                            type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>


                    {/* City Filter */}

                    <div className="filterGroup">

                        <div className="filterTitle">

                            <h3>City</h3>

                            <button onClick={resetCity}>Reset</button>

                        </div>

                        {cities.map((item) => (

                            <label className="filterOption" key={item}>

                                <input
                                    type="radio"
                                    name="city"
                                    checked={city === item}
                                    onChange={() => {
                                        setCity(item);
                                        setLocation("");
                                    }}
                                />

                                {item}

                            </label>

                        ))}

                    </div>


                    {/* Location Filter */}

                    <div className="filterGroup">

                        <div className="filterTitle">

                            <h3>Location</h3>

                            <button onClick={resetLocation}>Reset</button>

                        </div>

                        {!city ? (

                            <p className="filterHint">
                                Select any city to see its locations!
                            </p>

                        ) : locations.length === 0 ? (

                            <p className="filterHint">
                                No locations available.
                            </p>

                        ) : (

                            locations.map((item) => (

                                <label className="filterOption" key={item}>

                                    <input
                                        type="radio"
                                        name="location"
                                        checked={location === item}
                                        onChange={() => setLocation(item)}
                                    />

                                    {item}

                                </label>

                            ))

                        )}

                    </div>


                    {/* Speciality Filter */}

                    <div className="filterGroup">

                        <div className="filterTitle">

                            <h3>Speciality</h3>

                            <button onClick={resetSpeciality}>Reset</button>

                        </div>

                        {specialities.map((item) => (

                            <label className="filterOption" key={item}>

                                <input
                                    type="radio"
                                    name="speciality"
                                    checked={speciality === item}
                                    onChange={() => setSpeciality(item)}
                                />

                                {item}

                            </label>

                        ))}

                    </div>


                    {/* Gender Filter */}

                    <div className="filterGroup">

                        <div className="filterTitle">

                            <h3>Gender</h3>

                            <button onClick={resetGender}>Reset</button>

                        </div>

                        <div className="genderOptions">

                            <label className="filterOption">

                                <input
                                    type="radio"
                                    name="gender"
                                    checked={gender === "Female"}
                                    onChange={() => setGender("Female")}
                                />

                                Female

                            </label>

                            <label className="filterOption">

                                <input
                                    type="radio"
                                    name="gender"
                                    checked={gender === "Male"}
                                    onChange={() => setGender("Male")}
                                />

                                Male

                            </label>

                        </div>

                    </div>

                </aside>


                {/* Doctor List */}

                <div className="doctorsListSection">


                    {/* Active Filters */}

                    <div className="activeFilters">

                        <span>Filtering by:</span>

                        {city && <span>{city}</span>}
                        {location && <span>{location}</span>}
                        {speciality && <span>{speciality}</span>}
                        {gender && <span>{gender}</span>}

                    </div>


                    {/* Doctor Cards */}

                    <div className="doctorsList">

                        {filteredDoctors.length > 0 ? (

                            filteredDoctors.map((doctor) => (

                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    variant="list"
                                />

                            ))

                        ) : (

                            <div className="noDoctors">

                                <h3>No doctors found!</h3>

                                <p>
                                    Try changing your search or filters.
                                </p>

                                <button onClick={resetAll}>
                                    Reset Filters
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}