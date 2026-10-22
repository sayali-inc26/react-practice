
import api from "./api";

// Get all payments
export const getPayments = async () => {
    const response = await api.get("/payments");
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
