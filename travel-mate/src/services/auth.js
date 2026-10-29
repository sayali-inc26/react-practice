
import api from "./api";

export const register = async (fullName, email, password, travelStyle, acceptedTerms) => {

    const userData = {
        fullName: fullName,
        email: email,
        password: password,
        travelStyle: travelStyle,
        acceptedTerms: acceptedTerms,

    };

    try {

        const response = await api.post(
            "/auth/register",
            userData
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to create account"
        );

    }
};

export const login = async (email, password, rememberMe) => {

    const userData = {
        email: email,
        password: password,
        rememberMe: rememberMe
    };

    try {

        const response = await api.post(
            "/auth/login",
            userData
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Invalid email or password"
        );

    }
};

export const getMe = async () => {

    const response = await api.get("/auth/me");

    return response.data;
};



export const getTravelStyles = async () => {

    const response = await api.get("/auth/travel-styles");

    return response.data;
};
