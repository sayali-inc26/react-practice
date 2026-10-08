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

        const timer = setTimeout(() => {

            setNotification({
                id: 1,
                title: "Habit Reminder",
                message: "Time to complete your coding habit!"
            });

        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
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
                    <Route path="/home/notifications" element={<Notifications />}
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