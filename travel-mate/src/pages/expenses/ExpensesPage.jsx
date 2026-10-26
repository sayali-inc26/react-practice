
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

import {
    Search,
    ListFilter,
    Plus,
    BedDouble,
    Utensils,
    CarFront,
    Wallet,
    Folder,
    Laptop,
    Building2,
    AlertCircle,
    X
} from "lucide-react";

import "./ExpensesPage.css";

export default function ExpensesPage() {

    const navigate = useNavigate();

    const totalBudget = 30000;

    const [expenses, setExpenses] = useState([
        {
            id: 1,
            title: "Hotel",
            category: "Stay",
            date: "Oct 15",
            amount: 8000
        },
        {
            id: 2,
            title: "Food",
            category: "Food",
            date: "Oct 16",
            amount: 3500
        },
        {
            id: 3,
            title: "Transport",
            category: "Transport",
            date: "Oct 16",
            amount: 4000
        },
        {
            id: 4,
            title: "Other Expenses",
            category: "Other",
            date: "Oct 16",
            amount: 3000
        }
    ]);

    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [newExpense, setNewExpense] = useState({
        title: "",
        category: "Stay",
        amount: ""
    });

    const spent = expenses.reduce(
        (total, item) => total + item.amount, 0
    );

    const remaining = totalBudget - spent;

    const used = Math.round((spent / totalBudget) * 100);

    const stats = [
        {
            title: "TOTAL BUDGET",
            amount: `₹${totalBudget.toLocaleString("en-IN")}`
        },
        {
            title: "SPENT",
            amount: `₹${spent.toLocaleString("en-IN")}`
        },
        {
            title: "REMAINING",
            amount: `₹${remaining.toLocaleString("en-IN")}`
        }
    ];

    const expensesTabs = ["All", "Stay", "Food", "Transport"];

    const filteredExpenses = expenses.filter((item) => {

        const matchTab =
            activeTab === "All" || item.category === activeTab;

        const matchSearch = item.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchTab && matchSearch;
    });

    if (sort) {
        filteredExpenses.sort((a, b) => b.amount - a.amount);
    }

    function addExpense(e) {
        e.preventDefault();

        if (!newExpense.title.trim() || Number(newExpense.amount) <= 0) {
            return;
        }

        const expense = {
            id: Date.now(),
            title: newExpense.title.trim(),
            category: newExpense.category,
            amount: Number(newExpense.amount),
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            })
        };

        setExpenses([...expenses, expense]);

        setNewExpense({
            title: "",
            category: "Stay",
            amount: ""
        });

        setShowForm(false);
        setActiveTab("All");
        setSearch("");
    }


    const [packing, setPacking] = useState([
        {
            id: 1,
            title: "Passport",
            category: "Documents",
            checked: true
        },
        {
            id: 2,
            title: "Flight Tickets",
            category: "Documents",
            checked: true
        },
        {
            id: 3,
            title: "Phone Charger",
            category: "Electronics",
            checked: false
        },
        {
            id: 4,
            title: "Power Bank",
            category: "Electronics",
            checked: false
        }
    ]);

    function togglePacking(id) {
        setPacking(
            packing.map((item) =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    }

    const packedCount = packing.filter((item) => item.checked).length;

    const packingPercent = Math.round(
        (packedCount / packing.length) * 100
    );

    const packingGroups = ["Documents", "Electronics"];

    return (
        <div className="myTripMainArea">

            <Header />

            <main className="expensesMainArea">

                <div className="expensesHeadings">
                    <h1>Goa Adventure</h1>
                    <p>Manage your budget and checklist for the trip.</p>
                </div>

                <section className="myTripContent">

                    <div className="myTripContentDiv">

                        <div className="expenses">

                            <div className="title">

                                <h3>Expenses</h3>

                                <div className="stat expensesStats">

                                    <div>

                                        <div
                                            className="percentUsed"
                                            style={{
                                                background: `conic-gradient(
                                                    #006A62 ${Math.min(used, 100)}%,
                                                    #eeeeee 0
                                                )`
                                            }}
                                        >
                                            <div>
                                                <h4>{used}%</h4>
                                                <p>Used</p>
                                            </div>
                                        </div>

                                        <div className="statsInNumber">

                                            {stats.map((stat) => (
                                                <div key={stat.title}>
                                                    <h5>{stat.title}</h5>

                                                    <p className={
                                                        stat.title === "SPENT" ? "spentAmount" : ""
                                                    }>
                                                        {stat.amount}
                                                    </p>
                                                </div>
                                            ))}

                                        </div>

                                    </div>

                                </div>

                                <div className="stat expensesList">

                                    <div className="expenseTop">

                                        <div className="expenseSearch">

                                            <Search size={20} />

                                            <input
                                                type="text"
                                                placeholder="Search expenses..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />

                                        </div>

                                        <button
                                            className="sort"
                                            onClick={() => setSort(!sort)}
                                            title="Sort by amount"
                                            aria-label="Sort expenses by amount"
                                        >
                                            <ListFilter size={18} />
                                        </button>

                                        <button
                                            className="addExpenses"
                                            onClick={() => navigate("/expenses/addExpenses")}
                                        >
                                            <Plus size={18} />
                                            Add Expense
                                        </button>

                                    </div>


                                    <div className="expensesTabs">

                                        {expensesTabs.map((tab) => (
                                            <button
                                                key={tab}
                                                className={
                                                    activeTab === tab ? "activeExpense" : ""
                                                }
                                                onClick={() => setActiveTab(tab)}
                                            >
                                                {tab}
                                            </button>
                                        ))}

                                    </div>


                                    <div className="expenseItems">

                                        {filteredExpenses.map((item) => (

                                            <div className="expenseItem" key={item.id}>

                                                <div className="expenseIcon">

                                                    {item.category === "Stay" && (
                                                        <BedDouble size={20} />
                                                    )}

                                                    {item.category === "Food" && (
                                                        <Utensils size={20} />
                                                    )}

                                                    {item.category === "Transport" && (
                                                        <CarFront size={20} />
                                                    )}

                                                    {item.category === "Other" && (
                                                        <Wallet size={20} />
                                                    )}

                                                </div>

                                                <div className="expenseInfo">
                                                    <h4>{item.title}</h4>

                                                    <p>
                                                        {item.category} • {item.date}
                                                    </p>
                                                </div>

                                                <h4 className="expenseAmount">
                                                    ₹{item.amount.toLocaleString("en-IN")}
                                                </h4>

                                            </div>

                                        ))}

                                        {filteredExpenses.length === 0 && (
                                            <p className="emptyExpenses">
                                                No expenses found.
                                            </p>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="packingChecklist">

                            <div className="title">

                                <h3>Packing Checklist</h3>

                                <div className="stat checklistStat">

                                    <div className="packingTop">

                                        <div>
                                            <h3>{packedCount}/{packing.length} Packed</h3>
                                            <p>Almost ready!</p>
                                        </div>

                                        <h2>{packingPercent}%</h2>

                                    </div>

                                    <div className="packingProgress">
                                        <div
                                            style={{ width: `${packingPercent}%` }}
                                        ></div>
                                    </div>

                                    <div className="packingItems">

                                        {packingGroups.map((group) => (

                                            <div className="packingGroup" key={group}>

                                                <h4>
                                                    {group === "Documents"
                                                        ? <Folder size={16} />
                                                        : <Laptop size={16} />
                                                    }

                                                    {group}
                                                </h4>

                                                {packing
                                                    .filter((item) => item.category === group)
                                                    .map((item) => (

                                                        <label
                                                            className="packingItem"
                                                            key={item.id}
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                checked={item.checked}
                                                                onChange={() => togglePacking(item.id)}
                                                            />

                                                            <span className={
                                                                item.checked ? "packed" : ""
                                                            }>
                                                                {item.title}
                                                            </span>

                                                        </label>

                                                    ))}

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </div>

                            <div className="travelNotes">

                                <h3>Travel Notes</h3>

                                <div className="notesGrid">

                                    <div className="noteCard">

                                        <Building2 size={20} />

                                        <h4>Hotel Info</h4>

                                        <p>
                                            Check-in at 2 PM. Sea View Resort,
                                            Baga Beach.
                                        </p>

                                    </div>

                                    <div className="noteCard">

                                        <AlertCircle size={20} className="alertIcon" />

                                        <h4>Things to Remember</h4>

                                        <p>
                                            Buy sunscreen, carry cash for local
                                            markets.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            {/* <Outlet /> */}

            <Footer />


            {/* {showForm && (

                <div className="expenseOverlay">

                    <form className="expenseForm" onSubmit={addExpense}>

                        <div className="formHead">
                            <h3>Add Expense</h3>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                aria-label="Close form"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <label>Expense Name</label>

                        <input
                            type="text"
                            placeholder="Enter expense name"
                            value={newExpense.title}
                            onChange={(e) => setNewExpense({
                                ...newExpense,
                                title: e.target.value
                            })}
                            required
                        />

                        <label>Category</label>

                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({
                                ...newExpense,
                                category: e.target.value
                            })}
                        >
                            <option value="Stay">Stay</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Other">Other</option>
                        </select>

                        <label>Amount</label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            min="1"
                            step="0.01"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({
                                ...newExpense,
                                amount: e.target.value
                            })}
                            required
                        />

                        <button type="submit" className="saveExpense">
                            Add Expense
                        </button>

                    </form>

                </div>

            )} */}

        </div>
    );
}
