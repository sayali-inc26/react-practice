
import api from "./api";


// Get all payments with pagination
export const getPayments = async (page = 0, size = 20) => {

    const response = await api.get("/payments", {
        params: {
            page,
            size
        }
    });

    return response.data;
};

// Get selected payment details
export const getPaymentById = async (id) => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
};

// Get invoice details
export const getInvoice = async (id) => {
    const response = await api.get(`/payments/${id}/invoice`);
    return response.data;
};

// Download invoice PDF
export const downloadInvoice = async (id) => {
    const response = await api.get(
        `/payments/${id}/invoice/pdf`,
        {
            responseType: "blob"
        }
    );

    return response.data;
};

// Email invoice
export const emailInvoice = async (id) => {
    const response = await api.post(
        `/payments/${id}/invoice/email`
    );

    return response.data;
};


// Create Payment
export const createPayment = async (paymentData) => {

    const response = await api.post(
        "/payments",
        paymentData
    );

    return response.data;
};