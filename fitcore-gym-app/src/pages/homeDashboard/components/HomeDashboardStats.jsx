import { Users, Zap, UserCheck, Banknote } from "lucide-react";

import "./HomeDashboardStats.css";

function HomeDashboardStats({ stats }) {

    const cards = [
        {
            title: "Total Members",
            value: stats?.totalMembers ?? 0,
            change: `+${stats?.newMembersThisMonth ?? 0}`,
            icon: Users,
            type: "change"
        },
        {
            title: "Active Members",
            value: stats?.activeMembers ?? 0,
            change: `${stats?.activePercent ?? 0}%`,
            icon: Zap,
            type: "progress"
        },
        {
            title: "Today's Check-ins",
            value: stats?.todayCheckIns ?? 0,
            change: `${stats?.checkInChangePercent ?? 0}%`,
            icon: UserCheck,
            type: "change"
        },
        {
            title: "Monthly Revenue",
            value: `₹${Number(stats?.monthlyRevenue ?? 0).toLocaleString("en-IN")}`,
            change: `${stats?.revenueChangePercent ?? 0}%`,
            icon: Banknote,
            type: "change"
        }
    ];

    return (
        <div className="dashboardStats">

            {cards.map((stat) => {

                const Icon = stat.icon;

                return (
                    <div className="dashboardStatCard" key={stat.title}>

                        <span className="statStatusDot"></span>

                        <div className="statCardHeader">
                            <Icon size={15} strokeWidth={2.2} />
                            <span>{stat.title}</span>
                        </div>

                        <div className="statCardBottom">

                            <h2>{stat.value}</h2>

                            {stat.type === "progress" ? (

                                <div className="statProgress">
                                    <span>{stat.change}</span>

                                    <div className="statProgressTrack">
                                        <div
                                            className="statProgressFill"
                                            style={{
                                                width: `${Math.min(100, Math.max(0, stats?.activePercent ?? 0))}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                            ) : (

                                <span className="statChange">
                                    {stat.change}
                                </span>

                            )}

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


export default HomeDashboardStats;