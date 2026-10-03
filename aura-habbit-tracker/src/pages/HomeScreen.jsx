import "./HomeScreen.css"

export default function HomeScreen() {

    const habbits = [
        {
            id: 1,
            title: "Mindful Meditation",
            type: "FOCUS",
            time: "15 Minutes",
            icon: ""
        },
        {
            id: 2,
            title: "Deep Work Session",
            type: "PERFORMANCE",
            time: "90 Minutes",
            icon: ""
        },
        {
            id: 3,
            title: "Hydration Goal",
            type: "HEALTH",
            time: "2.5 / 3 Liters",
            icon: ""
        }
    ]

    const upNext = [
        {
            id: 1,
            title: "Read for 20 mins",
            time: "Starts in 15 minutes",
            icon: ""
        },
        {
            id: 2,
            title: "Evening Review",
            time: "8:00 PM Tonight",
            icon: ""
        },

    ]
    return (
        <div className="homeScreenContent">

            <div className="homeScreenTopHead">
                <div className="homeScreenGreat">
                    <h1>Good morning, Julian.</h1>
                    <p>Your aura is bright today. You've completed 2 of your 4 core habits. Keep the momentum going.</p>
                </div>

                <div className="dailyProgress">

                    <div className="progressCircle">75%</div>
                    <div>
                        <h3>DAILY PROGRESSES</h3>
                        <h4>Near Peak</h4>
                    </div>
                </div>
            </div>

            <div className="homeMain">
                <div className="todayTasks">
                    <h2>Today's Focus</h2>

                    {habbits.map((habit) => (
                        <div className="habitCard" key={habit.id}>

                            <div className="habitIcon">
                                <i className="fa-solid fa-share-nodes"></i>
                            </div>

                            <div className="habitInfo">

                                <h3>{habit.title}</h3>

                                <div className="habitDetails">

                                    <span className="habitTag">
                                        {habit.type}
                                    </span>

                                    <span className="habitTime">
                                        {habit.time}
                                    </span>

                                </div>

                            </div>

                            <button className="completeButton">
                                ✓
                            </button>

                        </div>
                    ))}
                </div>

                <div className="upNext">
                    <h2>Up Next</h2>



                    {
                        upNext.map((reminder) => (
                            <div className="reminderCard">
                                <div className="reminderIcon">
                                    <i className="fa-solid fa-bell"></i>
                                </div>

                                <div className="reminderInfo">
                                    <h3>{reminder.title}</h3>
                                    <p>{reminder.time}</p>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}