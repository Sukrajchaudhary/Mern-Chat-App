import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import sound  from"../assets/notification.mp3"
const useListenMessages = () => {
  const { socket,} = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(()=>{
  socket?.on("newMessage",(newmessages)=>{
    const audio= new Audio(sound);
    audio.play();
  setMessages([...messages,newmessages])
  })
return ()=>socket?.off("newMessage")
  },[socket,setMessages,messages])
};

export default useListenMessages;
