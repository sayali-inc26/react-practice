import api from "./api";

export const createMember = async (memberData) => {
    try {
        console.log("Sending member data ", memberData);

        const response = await api.post(
            "/members",
            memberData
        );

        console.log("APi Response:", response.data);
        return response.data;
    }catch(error){
        console.log("Error:", error.message);

        throw error;
    }
}

export const getMember = async () =>{
    
}