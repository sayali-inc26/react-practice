
import api from "./api";

// Get Dashboard
export const getDashboard = async () => {
    try {
        const response = await api.get("/dashboard", {
            params: {
                recentLimit: 5,
                expiringDays: 7,
                expiringLimit: 5
            }
        });

        console.log("Dashboard API:", response.data);

        return response.data;

    } catch (error) {
        console.error(
            "Dashboard Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};
