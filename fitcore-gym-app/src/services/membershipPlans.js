import api from "./api";

export const createMembershipPlan = async (planData) => {

    try {

        console.log("Sending plan data:", planData);

        const response = await api.post(
            "/membership-plans",
            planData
        );

        console.log("API Response:", response.data);

        return response.data;

    } catch (error) {

        console.log("Status:", error.response?.status);

        console.log("Response:", error.response?.data);

        console.log("Headers:", error.response?.headers);

        console.log("Error:", error.message);

        throw error;
    }



};

export const getMembershipPlans = async () => {

    try {

        const response = await api.get("/membership-plans");

        console.log("Membership Plans:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching membership plans:",
            error.response?.data || error.message
        );

        throw error;
    }
};
export const deleteMembershipPlan = async (id) => {

    try {

        console.log("Deleting Plan ID:", id);

        const response = await api.delete(
            `/membership-plans/${id}`
        );

        console.log("Delete successful:", response.status);

        return response.data;

    } catch (error) {

        console.log("Delete URL:", `/membership-plans/${id}`);

        console.log("Status:", error.response?.status);

        console.log("Backend Error:", error.response?.data);

        throw error;
    }

};