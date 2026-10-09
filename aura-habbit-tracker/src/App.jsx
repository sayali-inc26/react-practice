import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/LoginPage";
import Onboarding from "./pages/Onboarding";

import HomeScreen from "./pages/HomeScreen";
import MyHabbitScreen from "./pages/MyHabitScreen";
import CalendarScreen from "./pages/CalendarScreen";
import AchievementScreen from "./pages/AchievementScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AddHabitScreen from "./pages/AddHabitScreen";
import Notifications from "./pages/Notification";

import { useEffect, useState } from "react";

import CustomNotification from "./pages/components/CustomNotification";

import { connectNotificationStream } from "./services/notification";

function App() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("habitToken");

        if (!token) {
            return;
        }

        const controller = new AbortController();
        connectNotificationStream(
            (newNotification) => {
                setNotification(newNotification);
                // Also show a system notification when permitted. 
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification(newNotification.title || "Aura Habit Tracker",
                        {
                            body: newNotification.message,
                            icon: "/favicon.ico"
                        });

                }
            },
            controller.signal
        ).catch((error) => {
            if (error.name !== "AbortError") {
                console.error("Notification connection failed:", error);
            }
        }
        );
        return () => {
            controller.abort();
        };
    }, []);
    const enableNotifications = async () => {
        if ("Notification" in window && Notification.permission === "default") {
            await Notification.requestPermission();
        }
    };
    return (
        <>

            <button type="button" onClick={enableNotifications} className="enable-notifications-btn" > Enable Notifications </button>
            <Routes>

                <Route path="/" element={<Navigate to="/splash" replace />} />

                <Route path="/splash" element={<SplashScreen />} />

                <Route path="/login" element={<Login />} />

                <Route path="/onboarding" element={<Onboarding />} />

                <Route path="/home" element={<HomePage />}>
                    <Route index element={<HomeScreen />} />
                    <Route path="habits" element={<MyHabbitScreen />} />
                    <Route path="calendar" element={<CalendarScreen />} />
                    <Route path="achievements" element={<AchievementScreen />} />
                    <Route path="profile" element={<ProfileScreen />} />
                    <Route path="add-habit" element={<AddHabitScreen />} />
                    <Route path="notifications" element={<Notifications />}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/splash" replace />} />

            </Routes>
            <CustomNotification
                notification={notification}
                onClose={() => setNotification(null)}
            />
        </>


    );
}

export default App;