import "./SplashScreen.css";
import aura_logo from "../assets/splash_screen/aura_logo.png";
import splash_screen_up from "../assets/splash_screen/splash_screen_up.png";
import splash_screen_down from "../assets/splash_screen/splash_screen_down.png"

function SplashScreen() {

 


    return (
        <div className="splashScreenPage">

            <img className="splashTopImage" src={splash_screen_up} alt="" />
            

            <div className="splashContent">
                <img src={aura_logo} alt="" />

                <h1 className="logoText">Aura <span>Habit Tracker</span></h1>

                <p>Build Better Habits Every Day</p>

                <button className="getStartedButton">GET STARTED ➜</button>

            </div>

            <img className="splashBottomImage" src={splash_screen_down} alt="" />

           

            

        </div>
    );
}

export default SplashScreen;