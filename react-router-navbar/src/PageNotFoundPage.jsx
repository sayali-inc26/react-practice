import {Link} from "react-router"

export default function PageNotFoundPage(){
    return(
        <>
            <div style={{textAlign:"center"}}>
                <h1>Page Not Found </h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BUcmCQzTI809aGrXs5mXTdH8z6ykggiZIkLvK37Z4A&s=10" alt="" />
                <Link to="/">Go to Home Page</Link>
            </div>
        </>
    )
}