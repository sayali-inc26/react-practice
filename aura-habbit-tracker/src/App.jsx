
import { useState,useEffect } from "react";
import HomePage from "./pages/HomePage";
import Sidebar from "./pages/components/Sidebar";

// import SplashScreen from "./pages/SplashScreen";
// import LoginPage from "./pages/LoginPage";

function App() {
    const [currentPage, setCurrentPage] = useState("home");

    // const [expenses,setExpenses] = useState(()=>{
    //   const savedExpenses = localStorage.getItem("expenses");

    //   return savedExpenses?JSON.parse(savedExpenses):[];

    // });

    // useEffect(()=>{
    //   localStorage.setItem(
    //     "expenses",
    //     JSON.stringify(expenses)
    //   );
    // },[expenses]);

    return (
        <>
            {/* {currentPage === "splash" && (
                <SplashScreen setCurrentPage={setCurrentPage} />
            )} */}

            {/* {currentPage === "login" && (
                <LoginPage setCurrentPage={setCurrentPage} />
            )} */}

              {/* <Onboarding/> */}

              {/* {currentPage === "home" && (

                <HomePage  currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )} */}

            <HomePage/>

              {/* <Sidebar/> */}
              
        </>
    );
}

export default App;