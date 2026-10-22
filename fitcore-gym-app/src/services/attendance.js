
import api from "./api";

// Check In Member
export const checkInMember = async (query, workoutType) => {

    try {
        const response = await api.post(
            "/attendance/check-in",
            {
                query: query,
                workoutType: workoutType
            }
        );

        console.log("Check-in successful:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Check-in failed:",
            error.response?.data || error.message
        );

        throw error;
    }
};

// Check Out Member
export const checkOutAttendance = async (id) => {

    try {
        const response = await api.post(
            `/attendance/${id}/check-out`
        );

        console.log("Check-out successful:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Check-out failed:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const getAttendance = async () => {
    try {
        const response = await api.get("/attendance");

        console.log("Attendance Records:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Failed to fetch attendance:",
            error.response?.data || error.message
        );

        throw error;
    }
};

