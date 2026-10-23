
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMemberById } from "../../services/members";
import { createPayment } from "../../services/payments";

import "./RecordPaymentPage.css";

export default function RecordPaymentPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const today = new Date().toLocaleDateString("en-CA");

    const [formData, setFormData] = useState({

        description: "",
        detail: "",
        quantity: 1,
        unitPrice: "",
        taxRate: 0,

        status: "SUCCESS",
        method: "CASH",
        methodDetail: "",

        paymentDate: today,
        dueDate: today,

        transactionRef: "",
        notes: ""

    });


    // Fetch selected member

    useEffect(() => {

        const fetchMember = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await getMemberById(id);

                const data = response.data || response;

                console.log("Selected Member:", data);

                setMember(data);

                setFormData((previous) => ({

                    ...previous,

                    description: data.membershipPlanName
                        ? `${data.membershipPlanName} Membership`
                        : "Gym Membership",

                    quantity: 1,

                    unitPrice: data.totalFeeDue ?? "",

                    taxRate: 5

                }));

            } catch (error) {

                console.error("Member Error:", error);

                setError("Unable to load member details.");

            } finally {

                setLoading(false);

            }

        };

        fetchMember();

    }, [id]);


    // Update fields

    const updateField = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({

            ...previous,
            [name]: value

        }));

    };


    // Calculate amount

    // Membership fee
    const subtotal =
        Number(formData.unitPrice || 0) *
        Number(formData.quantity || 0);

    // Fixed 5% tax
    const tax = subtotal * 0.05;

    // Final amount
    const total = subtotal + tax;


    // Submit payment

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (saving) return;

        if (Number(formData.unitPrice) <= 0) {
            alert("Enter a valid payment amount.");
            return;
        }

        if (Number(formData.quantity) < 1) {
            alert("Quantity must be at least 1.");
            return;
        }

        const paymentData = {

            memberId: Number(id),

            items: [
                {
                    description: formData.description,
                    detail: formData.detail,
                    quantity: 1,
                    unitPrice: Number(formData.unitPrice)
                }
            ],

            description: formData.description,

            taxRate: 5,

            status: formData.status,

            method: formData.method,

            methodDetail: formData.methodDetail,

            paymentDate: formData.paymentDate,

            dueDate: formData.dueDate,

            transactionRef: formData.transactionRef,

            notes: formData.notes

        };


        try {

            setSaving(true);
            setError("");

            console.log("Sending Payment:", paymentData);

            const response = await createPayment(paymentData);

            console.log("Payment Created:", response);

            alert("Payment recorded successfully!");

            navigate("/home/payments");

        } catch (error) {

            console.error(
                "Payment Error:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Unable to record payment."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {
        return <p>Loading member details...</p>;
    }

    if (!member) {
        return <p>{error || "Member not found."}</p>;
    }


    return (

        <div className="recordPage">

            <div className="recordCard">

                <h1>Record Payment</h1>

                <p>Record a membership payment for this member.</p>


                {error && (
                    <p style={{ color: "#ff7777" }}>
                        {error}
                    </p>
                )}


                <form onSubmit={handleSubmit}>

                    {/* Member Details */}

                    <label>Member Name</label>

                    <input
                        value={member.fullName || ""}
                        readOnly
                    />


                    <label>Member ID</label>

                    <input
                        value={member.id}
                        readOnly
                    />


                    <label>Membership Plan</label>

                    <input
                        value={member.membershipPlanName || ""}
                        readOnly
                    />


                    {/* Invoice Item */}

                    <h3>Payment Information</h3>


                    <label>Description</label>

                    <input
                        name="description"
                        value={formData.description}
                        onChange={updateField}
                        required
                    />


                    <label>Detail</label>

                    <input
                        name="detail"
                        value={formData.detail}
                        onChange={updateField}
                        placeholder="Monthly membership payment"
                    />


                    <label>Quantity</label>

                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={updateField}
                        required
                    />


                    <label>Membership Fee ($)</label>

                    <input
                        type="number"
                        name="unitPrice"
                        value={formData.unitPrice}
                        readOnly
                    />


                    <label>Tax Rate (%)</label>

                    <input
                        type="number"
                        name="taxRate"
                        value={5}
                        readOnly
                    />


                    {/* Payment Details */}

                    <h3>Payment Details</h3>


                    <label>Payment Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={updateField}
                    >
                        <option value="SUCCESS">Success</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                    </select>


                    <label>Payment Method</label>

                    <select
                        name="method"
                        value={formData.method}
                        onChange={updateField}
                    >
                        <option value="CASH">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="CARD">Card</option>
                        <option value="BANK_TRANSFER">
                            Bank Transfer
                        </option>
                    </select>


                    <label>Method Detail</label>

                    <input
                        name="methodDetail"
                        value={formData.methodDetail}
                        onChange={updateField}
                        placeholder="e.g. UPI / Cash / Card"
                    />


                    <label>Payment Date</label>

                    <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={updateField}
                        required
                    />


                    <label>Due Date</label>

                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={updateField}
                        required
                    />


                    <label>Transaction Reference</label>

                    <input
                        name="transactionRef"
                        value={formData.transactionRef}
                        onChange={updateField}
                        placeholder="Optional transaction ID"
                    />


                    <label>Notes</label>

                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={updateField}
                        placeholder="Additional notes"
                    />


                    {/* Amount Summary */}

                    <div className="paymentSummary">

                        <h3>Payment Summary</h3>

                        <div className="line">
                            <span>Membership Fee</span>
                            <strong>${subtotal.toFixed(2)}</strong>
                        </div>

                        <div className="line">
                            <span>Tax (5%)</span>
                            <strong>${tax.toFixed(2)}</strong>
                        </div>

                        <hr />

                        <div className="line">
                            <h2>Grand Total</h2>
                            <h2>${total.toFixed(2)}</h2>
                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="recordActions">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/home/memberdetails/${id}`)
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Recording..."
                                : "Record Payment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}
