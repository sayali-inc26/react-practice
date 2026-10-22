import "./HomeDashboardMainContent.css";


function HomeDashboardMainContent({ dashboard }) {
    const quick = dashboard?.quickStats || {};

    const recentCheckIns = dashboard?.recentCheckIns || [];

    const membership = dashboard?.membershipOverview || {};

    const membershipPlans = membership.plans || [];

    const expiringMembers = dashboard?.expiringSoon || [];

    const checkInStats = [
        {
            value: quick.checkIns ?? 0,
            label: "CHECK-INS",
            type: "lime"
        },
        {
            value: quick.newMembers ?? 0,
            label: "NEW",
            type: "white"
        },
        {
            value: quick.renewals ?? 0,
            label: "RENEWALS",
            type: "white"
        },
        {
            value: quick.expiring ?? 0,
            label: "EXPIRING",
            type: "red"
        }
    ];

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

                            {recentCheckIns.length === 0 ? (

                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                        No recent check-ins.
                                    </td>
                                </tr>

                            ) : (

                                recentCheckIns.map((member) => (

                                    <tr key={member.attendanceId}>

                                        <td>
                                            <div className="checkInMember">

                                                <div className="memberAvatar avatarBlue">

                                                    {member.profilePhotoUrl ? (
                                                        <img
                                                            src={member.profilePhotoUrl}
                                                            alt={member.memberName}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                borderRadius: "50%"
                                                            }}
                                                        />
                                                    ) : (
                                                        member.memberName
                                                            ?.split(" ")
                                                            .map((word) => word[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()
                                                    )}

                                                </div>

                                                <span>{member.memberName}</span>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="planBadge">
                                                {member.membershipPlanName || "N/A"}
                                            </span>
                                        </td>

                                        <td>
                                            {member.checkInTime
                                                ? new Date(member.checkInTime)
                                                    .toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                : "--"}
                                        </td>

                                        <td>{member.workoutType || "--"}</td>

                                    </tr>

                                ))

                            )}

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
                        <h3>{membership.totalMembers ?? 0}</h3>
                        <span>Total</span>
                    </div>
                </div>


                <div className="membershipLegend">

                    {membershipPlans.map((plan) => (

                        <div
                            className="membershipLegendItem"
                            key={plan.planId}
                        >

                            <span className="legendDot standardColor"></span>

                            <span>{plan.planName}</span>

                            <span className="legendCount">
                                {plan.memberCount}
                            </span>

                        </div>

                    ))}

                </div>

            </section>

            {/* Expiring Soon */}
            <section className="expiringSoonCard">
                <h2>Expiring Soon</h2>



                <div className="expiringMembersList">

                    {expiringMembers.length === 0 ? (

                        <p>No memberships expiring soon.</p>

                    ) : (

                        expiringMembers.map((member) => (

                            <div className="expiringMember" key={member.id}>

                                <div className="expiringMemberAvatar">

                                    {member.profilePhotoUrl ? (

                                        <img
                                            src={member.profilePhotoUrl}
                                            alt={member.fullName}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "50%"
                                            }}
                                        />

                                    ) : (

                                        member.initials ||
                                        member.fullName
                                            ?.split(" ")
                                            .map((word) => word[0])
                                            .slice(0, 2)
                                            .join("")
                                            .toUpperCase()

                                    )}

                                </div>

                                <div className="expiringMemberInfo">

                                    <span>{member.fullName}</span>

                                    <small>
                                        {member.daysLeft ?? 0} Days Left
                                    </small>

                                </div>

                                <button
                                    className="expiringMenuButton"
                                    aria-label={`Options for ${member.fullName}`}
                                    onClick={() =>
                                        console.log("Selected member:", member.id)
                                    }
                                >
                                    ⋮
                                </button>

                            </div>

                        ))

                    )}

                </div>


            </section>

        </div>

    </div>
    );


}

export default HomeDashboardMainContent;
