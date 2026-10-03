import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";

import HomeScreen from "./pages/HomeScreen";
import MyHabbitScreen from "./pages/MyHabbitScreen";
import CalendarScreen from "./pages/CalendarScreen";
import AchievementScreen from "./pages/AchievementScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AddHabbitScreen from "./pages/AddHabbitScreen";

function App() {
    return (
        <Routes>

            {/* Common layout */}
            <Route path="/" element={<HomePage />}>

                {/* Middle content */}
                <Route index element={<HomeScreen />} />

                <Route path="habits" element={<MyHabbitScreen />} />

                <Route path="calendar" element={<CalendarScreen />} />

                <Route path="achievements" element={<AchievementScreen />} />

                <Route path="profile" element={<ProfileScreen />} />

                <Route path="add-habit" element={<AddHabbitScreen />} />

            </Route>

        </Routes>
    );
}

export default App;