

import "./SearchBar.css";
import profile from "../../assets/images/searchBar/profile.jpg"
import notification from "../../assets/images/searchBar/notification.png"



function SearchBar() {

    return (
        <>
            <div className="searchBar">
            
                <input
                    type="text"
                    placeholder=" Search..."
                />
                <div className="searchBarIcons">
                    <h4>Current Date</h4>
                    <img src={notification} className="notificationIcon" alt="notification" />
                    <img src={profile} alt="profile" />
                    <h3>Admin Profile</h3>
                </div>
            </div>
        </>
    )
}

export default SearchBar;