import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      const getToken = localStorage.getItem("token");
      const token = JSON.parse(getToken);
      const response = await fetch(
        `/api/sendmessage/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data]);
      } else {
        throw new Error("Something is wrong !");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
