
import api from "./api";

// Create Trainer
export const createTrainer = async (trainerData) => {
    try {
        console.log("Sending trainer data:", [...trainerData.entries()]);

        const response = await api.post(
            "/trainers",
            trainerData,
            {
                headers: {
                    "Content-Type": undefined
                }
            }
        );

        console.log("API Response:", response.data);

        return response.data;

    } catch (error) {

        console.error("Status:", error.response?.status);
        console.error("Backend Error:", error.response?.data);

        throw error;
    }
};


// Get All Trainers
export const getTrainer = async () => {
    try {
        const response = await api.get("/trainers");

        console.log("Trainers:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching trainers:",
            error.response?.data || error.message
        );

        throw error;
    }
};


// Delete Trainer
export const deleteTrainer = async (id) => {
    try {
        console.log("Deleting Trainer ID:", id);

        const response = await api.delete(
            `/trainers/${id}`
        );

        console.log("Deleted successfully:", response.status);

        return response.data;

    } catch (error) {

        console.log("Delete URL:", `/trainers/${id}`);

        console.log("Status:", error.response?.status);

        console.log("Backend Error:", error.response?.data);

        throw error;
    }
};


export const getTrainerById = async (id) => {
    try {
        const response = await api.get(`/trainers/${id}`);

        console.log("Trainer Details:", response.data);

        return response.data;

    } catch (error) {
        console.error(
            "Error fetching trainer:",
            error.response?.data || error.message
        );

        throw error;
    }
};

// Assign member to trainer
export const assignMemberToTrainer = async (trainerId, memberId) => {
    const response = await api.put(
        `/trainers/${trainerId}/members/${memberId}`
    );

    return response.data;
};