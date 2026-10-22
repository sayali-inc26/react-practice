import api from "./api";

export const createMember = async (memberData) => {
    try {
        console.log("Sending member data:", [...memberData.entries()]);

        const response = await api.post(
            "/members",
            memberData,
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

export const getMember = async () =>{
    try{
        const response = await api.get("members");

        console.log("Members",response.data);

        return response.data;
    }catch(error){
        console.error(
            "Error fetching member:",
            error.response?.data || error.message
        );

        throw error;
        
    }
};

export const deleteMember = async (id) =>{
    try{
        console.log("Deleting Plan ID:", id);

        const response = await api.delete(
            `/members/${id}`
        );

        console.log("Deleted successfully:",response.status);

        return response.data;
    }catch(error){
        console.log("Delete URL:", `/members/${id}`);

        console.log("Status:", error.response?.status);

        console.log("Backend Error:", error.response?.data);

        throw error;
    }

}


// Get Member By ID

export const getMemberById = async (id) => {
    try {
        const response = await api.get(`/members/${id}`);

        console.log("Selected Member:", response.data);

        return response.data;

    } catch (error) {
        console.error(
            "Error fetching member:",
            error.response?.data || error.message
        );

        throw error;
    }
};
