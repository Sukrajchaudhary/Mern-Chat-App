import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const getToken=localStorage.getItem("token")
        const token = JSON.parse(getToken);
  
        const response = await fetch(
          `/api/getmessage/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token && { "Authorization": `Bearer ${token}` }), 
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        toast.error(error.message); // corrected from error.messages to error.message
      }
      finally{
        setLoading(false)
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);
  return { messages, loading };
};

export default useGetMessages;
