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

// function App() {
//     return (
//         <Routes>
//             <Route path="/splash" element={<SplashScreen />} />

//             <Route path="/login" element={<Login />} />

//             <Route path="/onboarding" element={<Onboarding />} />

//             <Route path="/" element={<HomePage />}>

//                 <Route index element={<HomeScreen />} />

//                 <Route path="habits" element={<MyHabbitScreen />} />

//                 <Route path="calendar" element={<CalendarScreen />} />

//                 <Route path="achievements" element={<AchievementScreen />} />

//                 <Route path="profile" element={<ProfileScreen />} />

//                 <Route path="add-habit" element={<AddHabitScreen />} />

//             </Route>

//         </Routes>
//     );
// }

// export default App;


function App() {
    return (
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
            </Route>

            <Route path="*" element={<Navigate to="/splash" replace />} />

        </Routes>
    );
}

export default App;