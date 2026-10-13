import { useState } from "react";

import {
    TrendingUp,
    Clock,
    CalendarClock,
    CreditCard,
    ChartNoAxesCombined,
    Download,
    CalendarDays
} from "lucide-react";

import "./RevenueTrends.css";

export default function RevenueTrends() {

    const [status, setStatus] = useState("All");
    const [range, setRange] = useState("Last 6 Months");

    const stats = [
        {
            title: "Total Revenue",
            value: "$42,500",
            change: "↑ 12.5% vs last month",
            icon: null
        },
        {
            title: "Pending Invoices",
            value: "$3,240",
            change: "45 invoices awaiting payment",
            icon: CalendarClock
        },
        {
            title: "Active Subscriptions",
            value: "892",
            change: "↑ +24 new this week",
            icon: CreditCard
        },
        {
            title: "Recent Growth",
            value: "8.4%",
            change: "Steady upward trend",
            icon: ChartNoAxesCombined
        }
    ];

    const revenue = [
        { month: "Jan", value: 0 },
        { month: "Feb", value: 0 },
        { month: "Mar", value: 0 },
        { month: "Apr", value: 72 },
        { month: "May", value: 0 },
        { month: "Jun", value: 88 }
    ];

    const exportReport = () => {
        console.log("Export Report:", {
            status,
            range
        });
    };

    return (
        <div className="payments">


            <div className="stats">

                {stats.map((item, index) => {

                    const Icon = item.icon;

                    return (
                        <div className="card" key={item.title}>

                            <div className="cardTop">

                                <span>{item.title}</span>

                                {Icon && (
                                    <div className="icon">
                                        <Icon size={19} />
                                    </div>
                                )}

                            </div>

                            <h2>{item.value}</h2>

                            <p className={
                                index === 0 || index === 2
                                    ? "green"
                                    : ""
                            }>
                                {index === 1 && <Clock size={12} />}
                                {index === 3 && <TrendingUp size={12} />}

                                {item.change}
                            </p>

                        </div>
                    );
                })}

            </div>

            {/* Bottom Content */}

            <div className="content">

                {/* Revenue Chart */}

                <div className="chartBox">

                    <div className="chartHead">

                        <h2>Revenue Trends</h2>

                        <select
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                        >
                            <option>Last 6 Months</option>
                            <option>Last 3 Months</option>
                            <option>Last 12 Months</option>
                        </select>

                    </div>

                    <div className="chart">

                        {revenue.map((item) => (

                            <div className="column" key={item.month}>

                                <div className="barArea">

                                    <div
                                        className="bar"
                                        style={{
                                            height: `${item.value}%`
                                        }}
                                    ></div>

                                </div>

                                <span>{item.month}</span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Filter Transactions */}

                <div className="filter">

                    <h2>Filter Transactions</h2>

                    <label>Status</label>

                    <div className="options">

                        {[
                            "All",
                            "Successful",
                            "Pending",
                            "Failed"
                        ].map((item) => (

                            <button
                                key={item}
                                className={
                                    status === item ? "selected" : ""
                                }
                                onClick={() => setStatus(item)}
                            >
                                {item}
                            </button>

                        ))}

                    </div>

                    <label>Date Range</label>

                    <div className="date">
                        <CalendarDays size={15} />

                        <span>Jun 1 - Jun 30, 2024</span>
                    </div>

                    <button
                        className="export"
                        onClick={exportReport}
                    >
                        <Download size={15} />
                        Export Report
                    </button>

                </div>

            </div>

        </div>
    );
}