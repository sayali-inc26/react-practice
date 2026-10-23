
import {
    Download,
    Mail,
    History,
    CreditCard
} from "lucide-react";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    getPaymentById,
    getInvoice,
    downloadInvoice,
    emailInvoice
} from "../../services/payments";

import "./InvoiceDetailsPage.css";

export default function InvoiceDetailsPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [payment, setPayment] = useState(null);
    const [invoice, setInvoice] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Fetch selected payment and invoice

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

                console.log("Payment:", paymentResponse);
                console.log("Invoice:", invoiceResponse);

                setPayment(
                    paymentResponse.data || paymentResponse
                );

                setInvoice(
                    invoiceResponse.data || invoiceResponse
                );

            } catch (error) {

                console.error("Invoice Error:", error);

                setError("Unable to load invoice details.");

            } finally {

                setLoading(false);

            }

        };

        fetchDetails();

    }, [id]);


    // Download PDF

    const downloadPDF = async () => {

        try {

            setDownloading(true);

            const file = await downloadInvoice(id);

            const url = URL.createObjectURL(file);

            const link = document.createElement("a");

            link.href = url;

            link.download = `Invoice-${id}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            setTimeout(() => URL.revokeObjectURL(url), 1000);

        } catch (error) {

            console.error(error);

            alert("Unable to download invoice.");

        } finally {

            setDownloading(false);

        }

    };


    // Email Invoice

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


    // Loading and error

    if (loading) {
        return <p>Loading invoice details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!payment || !invoice) {
        return <p>Invoice not found.</p>;
    }


    // Formatting

    const money = (value) => {

        if (value == null) return "N/A";

        return `$${Number(value).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

    };


    const formatDate = (value) => {

        if (!value) return "N/A";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "N/A";

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    };


    // Invoice Information

    const invoiceNumber =
        invoice.invoiceNumber ||
        payment.invoiceNumber ||
        "N/A";

    const status = payment.status || "N/A";

    const memberName =
        invoice.memberName ||
        payment.memberName ||
        "N/A";

    const planName =
        payment.planType ||
        "Membership";

    // Use the line items returned by the invoice API.
    // Confirm the property name against your Swagger response.

    const items = Array.isArray(invoice.lineItems)
        ? invoice.lineItems
        : Array.isArray(invoice.items)
            ? invoice.items
            : [];

    const subtotal = invoice.subtotal;
    const tax = invoice.tax ?? invoice.taxAmount;

    const total = invoice.total ?? invoice.totalAmount ?? payment.amount;


    return (

        <div className="invoicePage">

            {/* Page Header */}

            <div className="header">

                <div>

                    <button
                        onClick={() => navigate("/home/payments")}
                        style={{ marginBottom: "15px" }}
                    >
                        ← Back to Payments
                    </button>

                    <h1>Invoice Details</h1>

                    <p>Manage and review billing information.</p>

                </div>


                <div className="buttons">

                    <button
                        className="download"
                        onClick={downloadPDF}
                        disabled={downloading}
                    >

                        <Download size={16} />

                        {downloading ? "Downloading..." : "Download PDF"}

                    </button>


                    <button
                        className="email"
                        onClick={sendEmail}
                        disabled={sending}
                    >

                        <Mail size={16} />

                        {sending ? "Sending..." : "Send Email"}

                    </button>

                </div>

            </div>


            {/* Invoice Card */}

            <div className="invoice">

                <div className="top">

                    <div>

                        <h1>Invoice</h1>

                        <h2>#{invoiceNumber}</h2>

                    </div>


                    <div className="dates">

                        <span className={`paid ${status.toLowerCase()}`}>

                            <span className="dot"></span>

                            {status}

                        </span>

                        <p>
                            Issue Date:
                            <strong>
                                {" "}{formatDate(
                                    invoice.issueDate ||
                                    payment.createdAt
                                )}
                            </strong>
                        </p>

                        <p>
                            Due Date:
                            <strong>
                                {" "}{formatDate(
                                    invoice.dueDate ||
                                    payment.dueDate
                                )}
                            </strong>
                        </p>

                    </div>

                </div>


                <hr />


                {/* Billing Information */}

                <div className="bill">

                    <div>

                        <label>BILLED TO</label>

                        <h2>{memberName}</h2>

                        <p>
                            Member ID: {payment.memberId ?? "N/A"}
                        </p>

                        {invoice.billedTo?.address && (
                            <p>{invoice.billedTo.address}</p>
                        )}

                        {invoice.billedTo?.email && (
                            <span>{invoice.billedTo.email}</span>
                        )}

                    </div>


                    <div className="from">

                        <label>FROM</label>

                        <h2>
                            {invoice.from?.name || "FitCore Gym"}
                        </h2>

                        {invoice.from?.address && (
                            <p>{invoice.from.address}</p>
                        )}

                        {invoice.from?.email && (
                            <span>{invoice.from.email}</span>
                        )}

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

                            {items.length > 0 ? (

                                items.map((item, index) => {

                                    const qty = Number(
                                        item.quantity ?? item.qty ?? 1
                                    );

                                    const price = Number(
                                        item.unitPrice ?? item.price ?? 0
                                    );

                                    return (

                                        <tr key={item.id ?? index}>

                                            <td>

                                                <div className="description">

                                                    <span>
                                                        {item.description ||
                                                            item.name ||
                                                            planName}
                                                    </span>

                                                    {item.note && (
                                                        <small>{item.note}</small>
                                                    )}

                                                </div>

                                            </td>

                                            <td>{qty}</td>

                                            <td>{money(price)}</td>

                                            <td>
                                                {money(
                                                    item.total ?? qty * price
                                                )}
                                            </td>

                                        </tr>

                                    );

                                })

                            ) : (

                                <tr>
                                    <td colSpan="4">
                                        No invoice line items available.
                                    </td>
                                </tr>

                            )}

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

                        <span>Tax</span>

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

                            <h4>
                                {formatDate(
                                    payment.paidAt ||
                                    payment.paymentDate
                                )}
                            </h4>

                            <p>
                                Payment of {money(payment.amount)}
                                {" - "}{status}
                            </p>

                            <span>

                                <CreditCard size={15} />

                                {payment.method || "N/A"}

                            </span>

                            {payment.transactionRef && (

                                <p>
                                    Transaction:
                                    {" "}{payment.transactionRef}
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}
