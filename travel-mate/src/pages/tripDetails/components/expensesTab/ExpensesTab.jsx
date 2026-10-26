import { useState } from "react";
import { useDispatch } from "react-redux";
import { Search, ListFilter, BedDouble, Utensils, CarFront, Wallet, Plus, X } from "lucide-react";
import { addExpense } from "../../../../redux/slices/tripDetails";
import "./ExpensesTab.css";
export default function ExpensesTab({trip}){
const dispatch=useDispatch();
    const [expenseSearch, setExpenseSearch] = useState("");
    const [expenseTab, setExpenseTab] = useState("All");
    const [sortExpenses, setSortExpenses] = useState(false);

    const [showExpense, setShowExpense] = useState(false);
    const [expenseForm, setExpenseForm] = useState({
        title: "",
        category: "Stay",
        amount: ""
    });

    function saveExpense(e) {
        e.preventDefault();

        if (!expenseForm.title.trim() || Number(expenseForm.amount) <= 0) {
            return;
        }

        dispatch(addExpense({
            tripId: trip.id,
            expense: {
                id: Date.now(),
                title: expenseForm.title.trim(),
                category: expenseForm.category,
                description: expenseForm.category,
                amount: Number(expenseForm.amount),
                date: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                })
            }
        }));

        setExpenseForm({
            title: "",
            category: "Stay",
            amount: ""
        });

        setExpenseTab("All");
        setExpenseSearch("");
        setShowExpense(false);
    }


    const filteredExpenses = trip
        ? trip.expenses.filter((item) => {

            const matchSearch = item.title
                .toLowerCase()
                .includes(expenseSearch.toLowerCase());

            const matchTab =
                expenseTab === "All" ||
                item.category === expenseTab;

            return matchSearch && matchTab;

        })
        : [];

    if (sortExpenses) {
        filteredExpenses.sort((a, b) => b.amount - a.amount);
    }


return (<>{/* EXPENSES */}


                <div className="detailsExpenseBox">

                        <div className="detailsExpenseTop">

                            <div className="detailsExpenseSearch">

                                <Search size={20} />

                                <input
                                    type="text"
                                    placeholder="Search expenses..."
                                    value={expenseSearch}
                                    onChange={(e) => setExpenseSearch(e.target.value)}
                                />

                            </div>

                            <button
                                className="detailsSort"
                                onClick={() => setSortExpenses(!sortExpenses)}
                                title="Sort by amount"
                                aria-label="Sort expenses by amount"
                            >
                                <ListFilter size={20} />
                            </button>

                            <button
                                className="detailsAddBtn"
                                onClick={() => setShowExpense(true)}
                            >
                                <Plus size={18} />
                                Add Expense
                            </button>

                        </div>

                        {/* Category Tabs */}

                        <div className="detailsExpenseTabs">

                            {["All", "Stay", "Food", "Transport"].map((tab) => (

                                <button
                                    key={tab}
                                    className={
                                        expenseTab === tab ? "selectedExpenseTab" : ""
                                    }
                                    onClick={() => setExpenseTab(tab)}
                                >
                                    {tab}
                                </button>

                            ))}

                        </div>

                        {/* Expense List */}

                        <div className="detailsExpenseList">

                            {filteredExpenses.map((item) => (

                                <div className="detailsExpenseItem" key={item.id}>

                                    <div className="detailsExpenseIcon">

                                        {item.category === "Stay" && <BedDouble size={20} />}

                                        {item.category === "Food" && <Utensils size={20} />}

                                        {item.category === "Transport" && <CarFront size={20} />}

                                        {!["Stay", "Food", "Transport"].includes(item.category)
                                            && <Wallet size={20} />
                                        }

                                    </div>

                                    <div className="detailsExpenseInfo">

                                        <h4>{item.title}</h4>

                                        <p>
                                            {item.description || item.category} • {item.date}
                                        </p>

                                    </div>

                                    <strong className="detailsExpenseAmount">
                                        {trip.currency}{item.amount.toLocaleString()}
                                    </strong>

                                </div>

                            ))}

                            {filteredExpenses.length === 0 && (
                                <p className="detailsEmpty">No expenses found.</p>
                            )}

                        </div>

                    </div>
{showExpense && <div className="detailsOverlay"><form className="detailsForm" onSubmit={saveExpense}><div className="detailsFormHead"><h2>Add Expense</h2><button type="button" onClick={()=>setShowExpense(false)}><X size={20}/></button></div><label>Expense Name</label><input value={expenseForm.title} onChange={e=>setExpenseForm({...expenseForm,title:e.target.value})} required/><label>Category</label><select value={expenseForm.category} onChange={e=>setExpenseForm({...expenseForm,category:e.target.value})}>{["Stay","Food","Transport","Activities","Shopping","Other"].map(x=><option key={x}>{x}</option>)}</select><label>Amount</label><input type="number" min="0.01" step="0.01" value={expenseForm.amount} onChange={e=>setExpenseForm({...expenseForm,amount:e.target.value})} required/><div className="detailsFormBottom"><button type="button" onClick={()=>setShowExpense(false)}>Cancel</button><button type="submit">Save Expense</button></div></form></div>}</>);
}
