import "./Headbar.css";

import streak from "../../assets/headbar/streak.png";
import notification from "../../assets/headbar/notification.png";
import profileImg from "../../assets/headbar/profileImg.jpg";

function HeadBar() {
    return (
        <header className="headBar">

            <h3>AURA</h3>

            <div className="headBarIcons">

                <img
                    src={streak}
                    alt="Notifications"
                    className="streakButton"
                />

                <img
                    src={notification}
                    alt="Notifications"
                    className="headerIcons"
                />

                <img
                    src={profileImg}
                    alt="Profile"
                    className="profileIcon"
                />

            </div>

        </header>
    );
}

export default HeadBar;