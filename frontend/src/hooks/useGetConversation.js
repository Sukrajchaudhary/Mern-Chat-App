import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true);
        const getToken=localStorage.getItem("token")
        const token = JSON.parse(getToken);
  
        const response = await fetch("/api/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }), 
          },
          credentials: "include",
        });

        if (!response.ok) {
       
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch conversations");
        }

        const data = await response.json();
        setConversation(data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversation();
  }, []);

  return { loading, conversation, error }; 
};

export default useGetConversation;
