import {Users,Zap,UserCheck,Banknote} from "lucide-react";

import "./HomeDashboardStats.css";

function HomeDashboardStats() {

    const stats = [
        {
            title: "Total Members",
            value: "248",
            change: "↑+12",
            icon: Users,
            type: "change"
        },
        {
            title: "Active Members",
            value: "214",
            change: "86%",
            icon: Zap,
            type: "progress"
        },
        {
            title: "Today's Check-ins",
            value: "76",
            change: "↗+14%",
            icon: UserCheck,
            type: "change"
        },
        {
            title: "Monthly Revenue",
            value: "₹1.84L",
            change: "↑+8.4%",
            icon: Banknote,
            type: "change"
        }
    ];

    return (
        <div className="dashboardStats">

            {stats.map((stat) => {
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
                                        <div className="statProgressFill"></div>
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