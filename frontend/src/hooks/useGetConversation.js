import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setConversation(data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);
  return { loading, conversation };
};

export default useGetConversation;
