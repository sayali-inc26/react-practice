
import {
    Download,
    Mail,
    History,
    CreditCard
} from "lucide-react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    getPaymentById,
    getInvoice,
    downloadInvoice,
    emailInvoice
} from "../../services/payments";

import "./InvoiceDetailsPage.css";

export default function InvoiceDetailsPage() {

    //     const items = [
    //         {
    //             name: "Standard Pro Membership",
    //             note: "Monthly recurring",
    //             qty: 1,
    //             price: 89
    //         },
    //         {
    //             name: "Personal Training Session",
    //             note: "Coach: Sarah Jenkins",
    //             qty: 2,
    //             price: 65
    //         },
    //         {
    //             name: "Service Fee",
    //             note: "",
    //             qty: 1,
    //             price: 5
    //         }
    //     ];

    //     const subtotal = items.reduce(
    //         (sum, item) => sum + item.qty * item.price, 0
    //     );

    //     const tax = subtotal * 0.08875;
    //     const total = subtotal + tax;

    //     const money = (value) => `$${value.toFixed(2)}`;

    //     const downloadPDF = () => {
    //         window.print();
    //     };

    //     const sendEmail = () => {
    //         const subject = "Invoice INV-2024-001";

    //         const body = `Hello Alex,

    // Please find your invoice details below.

    // Invoice Number: INV-2024-001
    // Total Amount: ${money(total)}
    // Payment Status: Paid

    // Thank you,
    // FitCore Gym`;

    //         window.location.href =
    //             `mailto:alex.mercer@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    //     };


    const { id } = useParams();

    const [payment, setPayment] = useState(null);
    const [invoice, setInvoice] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {

        const fetchDetails = async () => {

            try {
                setLoading(true);
                setError("");

                const [paymentResponse, invoiceResponse] =
                    await Promise.all([
                        getPaymentById(id),
                        getInvoice(id)
                    ]);

                console.log("Selected Payment:", paymentResponse);
                console.log("Selected Invoice:", invoiceResponse);

                setPayment(
                    paymentResponse.data || paymentResponse
                );

                setInvoice(
                    invoiceResponse.data || invoiceResponse
                );

            } catch (error) {

                console.error(error);
                setError("Unable to load invoice details.");

            } finally {
                setLoading(false);
            }
        };

        fetchDetails();

    }, [id]);


    const downloadPDF = async () => {

        try {
            const file = await downloadInvoice(id);

            const url = URL.createObjectURL(file);

            const link = document.createElement("a");

            link.href = url;
            link.download = `Invoice-${id}.pdf`;

            link.click();

            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Download failed:", error);
            alert("Unable to download invoice.");
        }
    };


    const sendEmail = async () => {

        try {
            setSending(true);

            await emailInvoice(id);

            alert("Invoice email request completed.");

        } catch (error) {

            console.error(error);
            alert("Unable to send invoice.");

        } finally {
            setSending(false);
        }
    };


    if (loading) {
        return <p>Loading invoice details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!invoice || !payment) {
        return <p>Invoice not found.</p>;
    }


    return (
        <div className="invoicePage">

            {/* Page Header */}

            <div className="header">

                <div>
                    <h1>Invoice Details</h1>
                    <p>Manage and review billing information.</p>
                </div>

                <div className="buttons">

                    <button className="download" onClick={downloadPDF}>
                        <Download size={16} />
                        Download PDF
                    </button>

                    <button className="email" onClick={sendEmail}>
                        <Mail size={16} />
                        Send Email
                    </button>

                </div>

            </div>

            {/* Invoice Card */}

            <div className="invoice">

                {/* Invoice Top */}

                <div className="top">

                    <div>
                        <h1>Invoice</h1>
                        <h2>#INV-2024-001</h2>
                    </div>

                    <div className="dates">

                        <span className="paid">
                            <span className="dot"></span>
                            Paid
                        </span>

                        <p>Issue Date: <strong>Oct 24, 2024</strong></p>
                        <p>Due Date: <strong>Nov 07, 2024</strong></p>

                    </div>

                </div>

                <hr />

                {/* Billing Information */}

                <div className="bill">

                    <div>
                        <label>BILLED TO</label>

                        <h2>Alex Mercer</h2>

                        <p>123 Fitness Blvd, Suite 4B</p>
                        <p>Metropolis, NY 10001</p>

                        <span>alex.mercer@example.com</span>
                    </div>

                    <div className="from">
                        <label>FROM</label>

                        <h2>FitCore Gym</h2>

                        <p>99 Ironworks Way</p>
                        <p>Metropolis, NY 10005</p>

                        <span>billing@fitcore.io</span>
                    </div>

                </div>

                {/* Invoice Items */}

                <div className="items">

                    <table>

                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>

                            {items.map((item, index) => (

                                <tr key={index}>

                                    <td>
                                        <div className="description">
                                            <span>{item.name}</span>

                                            {item.note && (
                                                <small>{item.note}</small>
                                            )}
                                        </div>
                                    </td>

                                    <td>{item.qty}</td>

                                    <td>{money(item.price)}</td>

                                    <td>{money(item.qty * item.price)}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Total */}

                <div className="summary">

                    <div className="line">
                        <span>Subtotal</span>
                        <strong>{money(subtotal)}</strong>
                    </div>

                    <div className="line">
                        <span>Tax (8.875%)</span>
                        <strong>{money(tax)}</strong>
                    </div>

                    <div className="grand">
                        <h2>Grand Total</h2>
                        <h2>{money(total)}</h2>
                    </div>

                </div>

            </div>

            {/* Payment History */}

            <div className="history">

                <h2>
                    <History size={21} />
                    Payment History
                </h2>

                <div className="timeline">

                    <div className="event">

                        <div className="point active"></div>

                        <div className="details">

                            <h4>Oct 24, 2024 at 10:15 AM</h4>

                            <p>
                                Payment of {money(total)} processed successfully.
                            </p>

                            <span>
                                <CreditCard size={15} />
                                Visa ending in 4242
                            </span>

                        </div>

                    </div>

                    <div className="event">

                        <div className="point"></div>

                        <div className="details">

                            <h4>Oct 24, 2024 at 08:00 AM</h4>

                            <p>Invoice generated and sent to customer.</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
