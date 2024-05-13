import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const useLogout = () => {
const [loading,setLoading]=useState(false);
const { setAuthUser }=useAuthContext()
const logout =async ()=>{
    setLoading(true);
    try {
        const response= await fetch("http://localhost:8080/api/logout",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            credentials:"include"

        });
        if(response.ok){
        localStorage.removeItem('userinfo');
        setAuthUser(null)
        }
    } catch (error) {
        toast.error(error.message)
    }
    finally{
        setLoading(false);
    }
}
return {loading,logout}
}

export default useLogout
