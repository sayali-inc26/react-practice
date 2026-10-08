export const register = async (userName, email, password) => {

    const userData = {
        username: userName,
        email: email,
        password: password
    };

    try {

        const response = await fetch(
            "http://192.168.1.81:8085/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(
                data?.message || "Failed to create account"
            );
        }

        console.log("Signup successful:", data);

        return data;

    } catch (error) {

        console.error("Signup Error:", error);

        throw error;
    }
};


export const login = async (email, password) => {

    const userData = {
        email: email,
        password: password
    };

    try {

        const response = await fetch(
            "http://192.168.1.81:8085/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(
                data?.message || "Invalid email or password"
            );
        }

        console.log("Login successful:", data);

        return data;

    } catch (error) {

        console.error("Login Error:", error);

        throw error;
    }
};