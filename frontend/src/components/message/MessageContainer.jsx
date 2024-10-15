import React, { useEffect, useRef } from "react";
import MessageInput from "../messageinput/MessageInput";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  useListenMessages();
  const lastMessageRef = useRef(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
      {/* component */}
      <div className="flex  sm:ml-64 h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-y-auto">
          <div className="flex flex-col flex-auto h-full ">
            <div className="flex flex-col flex-auto flex-shrink-0 bg-[#EFE6DB] h-full ">
              <div className="flex flex-col h-full overflow-x-auto mb-4 mt-16 px-5">
                {selectedConversation ? (
                  messages?.map((usermessage, index) => (
                    <>
                      {" "}
                      <div
                        key={usermessage._id}
                        ref={lastMessageRef}
                        className={`chat ${
                          usermessage.senderId === authUser?._id
                            ? "chat-end"
                            : "chat-start"
                        }`}
                      >
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="img"
                              src={
                                selectedConversation?._id !==
                                usermessage?.receiverId
                                  ? selectedConversation?.profile
                                  : authUser.profile
                              }
                            />
                          </div>
                        </div>
                        <div className="chat-header">
                          <time className="text-xs opacity-50">
                            {usermessage?.createdAt
                              ? new Date(
                                  usermessage?.createdAt
                                ).toLocaleTimeString()
                              : ""}
                          </time>
                        </div>
                        <div
                          className={`chat-bubble ${
                            usermessage.senderId === authUser?._id
                              ? "bg-blue-500"
                              : ""
                          }`}
                        >
                          {usermessage?.message}
                        </div>
                        <div className="chat-footer opacity-50">Delivered</div>
                      </div>
                    </>
                  ))
                ) : (
                  <div className="text-black justify-center items-center flex h-full w-full">
                    <div className="">Please select a conversation</div>
                    {
                      loading &&  <div className="">Please wait message is Loadding........</div>
                    }
                  </div>
                )}
                
              </div>
              <MessageInput></MessageInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
