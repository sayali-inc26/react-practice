import "./DoctorCard.css";

import {
    Stethoscope,
    Languages,
    MapPin
} from "lucide-react";

import "../../data/doctorData"


export default function DoctorCard({ doctor }) {

    return (
        <div className="doctorCard">

            <div className="doctorInfo">

                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="doctorImage"
                />

                <div className="doctorDetails">

                    <h3>{doctor.name}</h3>

                    <p className="doctorSpeciality">
                        {doctor.speciality}
                    </p>

                    <p>
                        <Stethoscope size={18} />
                        {doctor.qualification}
                    </p>

                    <p>
                        <Languages size={18} />
                        {doctor.languages}
                    </p>

                    <p>
                        <MapPin size={18} />
                        {doctor.location}
                    </p>

                </div>

            </div>


            <div className="doctorButtons">

                <button className="profileBtn">
                    View Full Profile
                </button>

                <button className="appointmentBtn">
                    Book an Appointment
                </button>

            </div>

        </div>
    );
}