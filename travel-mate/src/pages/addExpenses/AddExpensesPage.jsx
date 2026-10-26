
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    X,
    Utensils,
    BedDouble,
    CarFront,
    Ticket,
    ShoppingBag,
    Ellipsis,
    Save
} from "lucide-react";

import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

import "./AddExpensesPage.css";

export default function AddExpensesPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        expenseName: "",
        amount: "",
        date: "",
        category: "",
        paymentMethod: "Card",
        notes: ""
    });

    const categories = [
        { name: "Food", icon: Utensils },
        { name: "Stay", icon: BedDouble },
        { name: "Transport", icon: CarFront },
        { name: "Activities", icon: Ticket },
        { name: "Shopping", icon: ShoppingBag },
        { name: "Other", icon: Ellipsis }
    ];

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!formData.category) {
            alert("Please select a category");
            return;
        }

        if (Number(formData.amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        console.log("Expense Data:", formData);

        // Add your POST API call here.

        // Navigate after successful API response.
    }

    return (
        <>
            <Header />

            <div className="addExpencesForm">

                <form onSubmit={handleSubmit}>

                    <div className="formHead">

                        <div>
                            <h3>Add New Expense</h3>
                            <p>
                                Track spending for your upcoming beach trip.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="closeBtn"
                            onClick={() => navigate("/expenses")}
                        >
                            <X size={20} />
                        </button>

                    </div>

                    <div className="expensesField">

                        <label htmlFor="expenseName">
                            Expense Name
                        </label>

                        <input
                            id="expenseName"
                            type="text"
                            name="expenseName"
                            placeholder="e.g., Dinner at Beach Hut"
                            value={formData.expenseName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="formRow">

                        <div className="expensesField">

                            <label htmlFor="amount">Amount</label>

                            <div className="amountInput">
                                <span>₹</span>

                                <input
                                    id="amount"
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                    min="0.01"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="expensesField">

                            <label htmlFor="date">Date</label>

                            <input
                                id="date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    {/* Category */}

                    <div className="expensesField">

                        <label>Category</label>

                        <div className="categoryGrid">

                            {categories.map((category) => {

                                const Icon = category.icon;

                                return (
                                    <button
                                        key={category.name}
                                        type="button"
                                        className={
                                            formData.category === category.name
                                                ? "categoryBtn selectedCategory"
                                                : "categoryBtn"
                                        }
                                        onClick={() => setFormData({
                                            ...formData,
                                            category: category.name
                                        })}
                                    >
                                        <Icon size={17} />
                                        {category.name}
                                    </button>
                                );
                            })}

                        </div>

                    </div>

                    {/* Payment Method */}

                    <div className="expensesField">

                        <label>Payment Method</label>

                        <div className="paymentOptions">

                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Card"
                                    checked={formData.paymentMethod === "Card"}
                                    onChange={handleChange}
                                />
                                Card
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash"
                                    checked={formData.paymentMethod === "Cash"}
                                    onChange={handleChange}
                                />
                                Cash
                            </label>

                        </div>

                    </div>

                    {/* Notes */}

                    <div className="expensesField">

                        <label htmlFor="notes">
                            Notes (Optional)
                        </label>

                        <textarea
                            id="notes"
                            name="notes"
                            placeholder="Add any extra details here..."
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                        />

                    </div>

                    {/* Bottom Buttons */}

                    <div className="formBottom">

                        <button
                            type="button"
                            className="cancelBtn"
                            onClick={() => navigate("/expenses")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="saveBtn"
                        >
                            <Save size={17} />
                            Save Expense
                        </button>

                    </div>

                </form>

            </div>

            <Footer />
        </>
    );
}
