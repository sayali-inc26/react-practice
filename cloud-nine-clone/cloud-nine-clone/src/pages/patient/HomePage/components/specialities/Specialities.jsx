import "./Specialities.css"
import gynaec from "../../../../../assets/homePage/womb.png";
import paediatrics from "../../../../../assets/homePage/baby.png"
import maternity from "../../../../../assets/homePage/mother.png"
import fertility from "../../../../../assets/homePage/ovum.png"
import nicu from "../../../../../assets/homePage/emergency-room.png"
import cellBank from "../../../../../assets/homePage/cells.png"
import radiology from "../../../../../assets/homePage/ct-scan.png"

export default function Specialities() {
    return (
        <>
            <div className="specialities-section">
                <h2>Specialities</h2>

                <div className="speciality-type">

                    <div className="type">
                        <img src={gynaec} alt="" />
                        <figcaption>GYNAECOLOGY</figcaption>
                    </div>

                    <div className="type">
                        <img src={paediatrics} alt="" />
                        <figcaption>PAEDIATRIC CARE</figcaption>
                    </div>
                    <div className="type">
                        <img src={maternity} alt="" />
                        <figcaption>MATERNITY</figcaption>
                    </div>
                    <div className="type">
                        <img src={gynaec} alt="" />
                        <figcaption>GYNAECOLOGY</figcaption>
                    </div>

                    <div className="type">
                        <img src={paediatrics} alt="" />
                        <figcaption>PAEDIATRIC CARE</figcaption>
                    </div>
                    <div className="type">
                        <img src={fertility} alt="" />
                        <figcaption>FERTILITY</figcaption>
                    </div>

                    

                    <div className="type">
                        <img src={nicu} alt="" />
                        <figcaption>NICU</figcaption>
                    </div>

                    <div className="type">
                        <img src={cellBank} alt="" />
                        <figcaption>STEM CELL BANKING</figcaption>
                    </div>

                    <div className="type">
                        <img src={radiology} alt="" />
                        <figcaption>RADIOLOGY</figcaption>
                    </div>


                    
                </div>
            </div>

        </>
    )
}