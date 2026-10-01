import streak from "../../assets/headbar/streak.png"
import notification from "../../assets/headbar/notification.png"
import settings from "../../assets/headbar/settings.png"
import profile from "../../assets//headbar/profile.jpg"

import "../components/Headbar.css";



function HeadBar() {

    return (
        <>
            <div className="headBar">
               <h3>AURA</h3>
                <div className="headBarIcons">
                    <img className=" streakButton" src={streak} alt="streak" />
                    <img className="headerIcons" src={notification} alt="notification" />
                    <img className="headerIcons" src={settings} alt="settings" />
                    <img className="headerIcons profile" src={profile} alt="profilePic" />
                </div>
            </div>
        </>
    )
}

export default HeadBar;