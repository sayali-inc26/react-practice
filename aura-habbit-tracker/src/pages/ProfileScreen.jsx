import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeNotification, changeReminderStyle,changeSound,logout} from "../redux/profileSlice";
import profileImg from "../assets/headbar/profileImg.jpg"
import "./ProfileScreen.css";


function ProfileScreen() {

    const dispatch = useDispatch();

    const profile = useSelector(
        (state) => state.profile
    );

    const [showProfile, setShowProfile] =
        useState(false);


    const handleNotification = (name,value) => {

        dispatch(
            changeNotification({
                name: name,
                value: value
            })
        );
    };

    const handleLogout = () => {

        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            dispatch(logout());
            console.log("Logout");
        }
    };


    return (

        <main className="profile">


            <div className="profileBox">

                <div className="profileLeft">

                    <div className="avatar">

                        <img src={profileImg} alt="profile img" />

                        <button className="camera">
                            📷
                        </button>

                    </div>


                    <div className="profileInfo">

                        <h1>
                            {profile.name}
                        </h1>

                        <p>
                            {profile.email}
                        </p>


                        <div className="badges">

                            <span>
                                Premium Member
                            </span>

                            <span>
                                Top 5% Habit Streak
                            </span>

                        </div>

                    </div>

                </div>


                <button
                    className="editButton"
                    onClick={() =>
                        setShowProfile(!showProfile)
                    }
                >
                    Edit Profile
                </button>

            </div>


            {/* OPTIONAL EDIT PROFILE */}

            {showProfile && (

                <div className="editBox">

                    <p>
                        Profile editing can be added here.
                    </p>

                    <button
                        onClick={() =>
                            setShowProfile(false)
                        }
                    >
                        Close
                    </button>

                </div>

            )}


            {/* TWO COLUMN AREA */}

            <div className="settingsGrid">


                {/* NOTIFICATIONS */}

                <section>

                    <h2>
                        🔔 Notifications
                    </h2>


                    <div className="card">


                        <div className="setting">

                            <div>
                                <h3>
                                    Daily Reminders
                                </h3>

                                <p>
                                    Get notified for pending habits
                                </p>
                            </div>


                            <button
                                className={
                                    profile.notifications.dailyReminders
                                        ? "toggle active"
                                        : "toggle"
                                }
                                onClick={() =>
                                    handleNotification(
                                        "dailyReminders",
                                        !profile.notifications.dailyReminders
                                    )
                                }
                            >
                                <span></span>
                            </button>

                        </div>


                        <div className="setting">

                            <div>
                                <h3>
                                    Streak Milestones
                                </h3>

                                <p>
                                    Celebrate your consistency
                                </p>
                            </div>


                            <button
                                className={
                                    profile.notifications.streakMilestones
                                        ? "toggle active"
                                        : "toggle"
                                }
                                onClick={() =>
                                    handleNotification(
                                        "streakMilestones",
                                        !profile.notifications.streakMilestones
                                    )
                                }
                            >
                                <span></span>
                            </button>

                        </div>


                        <div className="setting">

                            <div>
                                <h3>
                                    Weekly Summary
                                </h3>

                                <p>
                                    Detailed performance report
                                </p>
                            </div>


                            <button
                                className={
                                    profile.notifications.weeklySummary
                                        ? "toggle active"
                                        : "toggle"
                                }
                                onClick={() =>
                                    handleNotification(
                                        "weeklySummary",
                                        !profile.notifications.weeklySummary
                                    )
                                }
                            >
                                <span></span>
                            </button>

                        </div>

                    </div>

                </section>



                {/* REMINDERS */}

                <section>

                    <h2>
                        📢 Reminders
                    </h2>


                    <div className="card">


                        <label>
                            Alert Sound
                        </label>


                        <select
                            value={profile.reminders.sound}
                            onChange={(event) =>
                                dispatch(
                                    changeSound(
                                        event.target.value
                                    )
                                )
                            }
                        >

                            <option>
                                Aura Bloom (Default)
                            </option>

                            <option>
                                Soft Chime
                            </option>

                            <option>
                                Morning Bell
                            </option>

                        </select>


                        <label>
                            Reminder Style
                        </label>


                        <div className="reminderButtons">


                            <button
                                className={
                                    profile.reminders.style ===
                                    "Gentle Nudge"
                                        ? "reminder active"
                                        : "reminder"
                                }
                                onClick={() =>
                                    dispatch(
                                        changeReminderStyle(
                                            "Gentle Nudge"
                                        )
                                    )
                                }
                            >

                                <span>
                                    ▱
                                </span>

                                Gentle Nudge

                            </button>


                            <button
                                className={
                                    profile.reminders.style ===
                                    "High Priority"
                                        ? "reminder active"
                                        : "reminder"
                                }
                                onClick={() =>
                                    dispatch(
                                        changeReminderStyle(
                                            "High Priority"
                                        )
                                    )
                                }
                            >

                                <span>
                                    ⚡
                                </span>

                                High Priority

                            </button>

                        </div>

                    </div>

                </section>



                {/* APPEARANCE */}

                <section>

                    <h2>
                        🎨 Appearance
                    </h2>


                    <div className="card appearance">


                        <div className="themeTitle">

                            <span>
                                Dynamic Theme
                            </span>

                            <span className="locked">
                                LOCKED
                            </span>

                        </div>


                        <div className="themes">


                            <div className="theme selected">

                                <div className="themeLines">

                                    <span></span>

                                    <span></span>

                                </div>

                                <small>
                                    ✓
                                </small>

                                <strong>
                                    AURA DARK
                                </strong>

                            </div>


                            <div className="theme disabled">

                                <div className="themeLines">

                                    <span></span>

                                    <span></span>

                                </div>

                                <strong>
                                    LIGHT MODE
                                </strong>

                            </div>

                        </div>


                        <p className="themeNote">

                            Theme customization is reserved for
                            Premium users. Aura Dark is the
                            optimized default.

                        </p>

                    </div>

                </section>



                {/* ACCOUNT */}

                <section>

                    <h2>
                        🛡 Account
                    </h2>


                    <div className="card account">


                        <div className="accountRow">

                            <div className="accountIcon">
                                🔒
                            </div>

                            <div>

                                <h3>
                                    Security & Password
                                </h3>

                                <p>
                                    Update credentials
                                </p>

                            </div>

                            <span className="arrow">
                                ›
                            </span>

                        </div>


                        <div className="accountRow">

                            <div className="accountIcon">
                                ⇩
                            </div>

                            <div>

                                <h3>
                                    Export Data
                                </h3>

                                <p>
                                    Download habit history
                                </p>

                            </div>

                            <span className="arrow">
                                ›
                            </span>

                        </div>


                        <button
                            className="logout"
                            onClick={handleLogout}
                        >

                            <span>
                                ⇥
                            </span>

                            <div>

                                <h3>
                                    Logout
                                </h3>

                                <p>
                                    Sign out of your session
                                </p>

                            </div>

                        </button>

                    </div>

                </section>

            </div>

        </main>

    );

}


export default ProfileScreen;