import "./HomeDashboardMainContent.css";

const checkInStats = [
    { value: "76", label: "CHECK-INS", type: "lime" },
    { value: "14", label: "NEW", type: "white" },
    { value: "8", label: "RENEWALS", type: "white" },
    { value: "5", label: "EXPIRING", type: "red" }
];

const recentCheckIns = [
    {
        name: "Rahul Patil",
        initials: "RP",
        plan: "Premium",
        time: "07:15 AM",
        workout: "Chest",
        avatar: "avatarBlue"
    },
    {
        name: "Sneha Joshi",
        initials: "SJ",
        plan: "Standard",
        time: "07:42 AM",
        workout: "Cardio",
        avatar: "avatarGreen"
    },
    {
        name: "Amit Sharma",
        initials: "AS",
        plan: "Premium",
        time: "08:05 AM",
        workout: "Back",
        avatar: "avatarOrange"
    }
];

const membershipPlans = [
    { name: "Standard", count: 102, color: "standardColor" },
    { name: "Premium", count: 88, color: "premiumColor" },
    { name: "Basic", count: 58, color: "basicColor" }
];

const expiringMembers = [
    { initials: "RP", name: "Rahul Patil", days: "3 Days Left" },
    { initials: "PS", name: "Priya Shah", days: "5 Days Left" },
    { initials: "AK", name: "Amit Kumar", days: "7 Days Left" }
];

function HomeDashboardMainContent() {
    return (<div className="dashboardMainContent">


        <div className="dashboardMainLeft">

            {/* Top Statistics */}
            <div className="checkInStats">
                {checkInStats.map((stat) => (
                    <div className="checkInStatCard" key={stat.label}>
                        <h3 className={stat.type}>{stat.value}</h3>
                        <span>{stat.label}</span>
                    </div>
                ))}
            </div>

            <section className="recentCheckInsCard">

                <div className="recentCheckInsHeader">
                    <h2>Recent Check-ins</h2>
                    <button className="viewAllButton">View All</button>
                </div>

                <div className="checkInsTableWrapper">
                    <table className="checkInsTable">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Plan</th>
                                <th>Time</th>
                                <th>Workout</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentCheckIns.map((member) => (
                                <tr key={member.name}>
                                    <td>
                                        <div className="checkInMember">
                                            <div className={`memberAvatar ${member.avatar}`}>
                                                {member.initials}
                                            </div>
                                            <span>{member.name}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <span className={`planBadge ${member.plan.toLowerCase()}`}>
                                            {member.plan}
                                        </span>
                                    </td>

                                    <td>{member.time}</td>
                                    <td>{member.workout}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>

        </div>

        <div className="dashboardMainRight">

            <section className="membershipOverviewCard">
                <h2>Membership Overview</h2>

                <div className="membershipDonut">
                    <div className="membershipDonutCenter">
                        <h3>248</h3>
                        <span>Total</span>
                    </div>
                </div>

                <div className="membershipLegend">
                    {membershipPlans.map((plan) => (
                        <div className="membershipLegendItem" key={plan.name}>
                            <span className={`legendDot ${plan.color}`}></span>
                            <span>{plan.name}</span>
                            <span className="legendCount">{plan.count}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expiring Soon */}
            <section className="expiringSoonCard">
                <h2>Expiring Soon</h2>

                <div className="expiringMembersList">
                    {expiringMembers.map((member) => (
                        <div className="expiringMember" key={member.name}>

                            <div className="expiringMemberAvatar">
                                {member.initials}
                            </div>

                            <div className="expiringMemberInfo">
                                <span>{member.name}</span>
                                <small>{member.days}</small>
                            </div>

                            <button
                                className="expiringMenuButton"
                                aria-label={`Options for ${member.name}`}
                                onClick={() => console.log(`Options for ${member.name}`)}
                            >
                                ⋮
                            </button>

                        </div>
                    ))}
                </div>
            </section>

        </div>

    </div>
    );


}

export default HomeDashboardMainContent;
