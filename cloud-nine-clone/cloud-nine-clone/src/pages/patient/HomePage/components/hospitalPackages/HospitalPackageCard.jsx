import "./HospitalPackageCard.css";

export default function HospitalPackageCard({ packageData }) {

    return (

        <div className="hospitalPackageCard">

            <img
                src={packageData.image}
                alt={packageData.name}
                className="packageImage"
            />

            <div className="packageDetails">

                <h3>{packageData.name}</h3>

            </div>

        </div>

    );

}