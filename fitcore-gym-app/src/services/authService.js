import api from "./api";

export const register = async (userName, email, password) => {
  const userData = {
    fullName:userName,
    email:email,
    password:password
  };

  try{

    const response = await api.post(
        "/auth/signup",
        userData
    );
    console.log("Signup successful: ",response.data);
    return response.data;

  }catch(error){
    console.error("Signup Error: ", error);

    throw new Error(
        error.response?.data?.message||error.message || "Failed to create account"
    );
  }
};

export const login = async(email, password)=>{
    const userData = {
        email:email,
        password:password
    };

    try{
        const response = await api.post(
            "auth/login",
            userData
        );

        console.log("Login Successful",response);
    }catch(error){
         console.error("Login Error:", error);

        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Invalid email or password"
        );
        
    }

}