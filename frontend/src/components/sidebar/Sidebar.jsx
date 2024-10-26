// import React, { useEffect, useRef, useState } from "react";
// import Logout from "../logout/Logout";
// import useGetConversation from "../../hooks/useGetConversation";
// import useConversation from "../../zustand/useConversation";
// import { useSocketContext } from "../../context/SocketContext";
// import Logo from "../../assets/Logo.png";
// const Sidebar = () => {
//   const { loading, conversation } = useGetConversation();
//   const sidebarRef = useRef(null);
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const isSelected = selectedConversation?._id === conversation?._id;
//   const [show, setShow] = useState(false);
//   const { onlineUsers } = useSocketContext();
//   const handleSidebarShowHide = () => {
//     setShow(!show);
//   };
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setShow(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarRef.current]);

//   return (
//     <>
//       <nav className="fixed top-0 z-50 w-full bg-[rgb(12,150,90)] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               <button
//                 onClick={handleSidebarShowHide}
//                 data-drawer-target="logo-sidebar"
//                 data-drawer-toggle="logo-sidebar"
//                 aria-controls="logo-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                   />
//                 </svg>
//               </button>
//               <div className="mb-2">
//                 <img src={Logo} alt="" className="rounded-full h-10 " />
//               </div>
//             </div>
//             <div className="flex items-center">
//               {selectedConversation && (
//                 <div className="flex items-center ms-3">
//                   <div className="flex justify-end items-center gap-3">
//                     <img
//                       className="w-12 h-12 object-cover rounded-full"
//                       src={selectedConversation?.profile}
//                       alt="img"
//                     />
//                     <p className="text-white">
//                       {selectedConversation?.username}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//       <aside
//         ref={sidebarRef}
//         id="logo-sidebar"
//         className={`fixed top-0 border-2 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
//           show ? "" : "-translate-x-full"
//         }   sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 bg-slate-100`}
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-1 pb-4 overflow-y-auto  dark:bg-gray-800">
//           <ul className="space-y-2 font-medium">
//             <div className="h-full px-1 pb-4 overflow-y-auto  dark:bg-gray-800 gap-1 flex flex-col">
//               {conversation?.map((user, index) => (
//                 <div
//                   onClick={() => setSelectedConversation(user)}
//                   key={user?._id}
//                   class={`flex  flex-row py-2 p-1 top-2 items-center rounded-md border-2 hover:bg-sky-400  cursor-pointer ${
//                     isSelected ? "bg-sky-400 text-white uppercase" : ""
//                   }`}
//                 >
//                   <div class="w-40 relative">
//                     <img
//                       src={user?.profile}
//                       class="object-cover h-14 w-14 rounded-full"
//                       alt={user?.username}
//                     />
//                     {onlineUsers?.includes(user?._id) && (
//                       <div className="h-3 w-3 bg-green-600 rounded-full absolute top-0 right-0"></div>
//                     )}
//                   </div>
//                   <div class="w-full px-3">
//                     <div class="text-md font-semibold">{user?.username}</div>
//                   </div>
//                   <div />
//                 </div>
//               ))}
//             </div>
//           </ul>
//         </div>

//         <Logout />
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
import React, { useEffect, useRef, useState } from "react";
import Logout from "../logout/Logout";
import useGetConversation from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import Logo from "../../assets/Logo.png";
import useGetMessages from "../../hooks/useGetMessages";

const Sidebar = () => {
  const { loading, conversation } = useGetConversation();
  const sidebarRef = useRef(null);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation?._id;
  const [show, setShow] = useState(false);
  const { onlineUsers } = useSocketContext();
  const { messages } = useGetMessages();
  const handleSidebarShowHide = () => {
    setShow(!show);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef.current]);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[rgb(12,150,90)] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={handleSidebarShowHide}
                type="button"
                className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <div className="mb-2">
                <img src={Logo} alt="" className="rounded-full h-10 " />
              </div>
            </div>
            <div className="flex items-center">
              {selectedConversation && (
                <div className="flex items-center ms-3">
                  <div className="flex justify-end items-center gap-3">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={selectedConversation?.profile}
                      alt="img"
                    />
                    <p className="text-white">
                      {selectedConversation?.username}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 border-2 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          show ? "" : "-translate-x-full"
        } sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 bg-slate-100`}
        aria-label="Sidebar"
      >
        <div className="h-full px-1 pb-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <div className="h-full px-1 pb-4 overflow-y-auto dark:bg-gray-800 gap-1 flex flex-col">
              {conversation?.map((user) => (
                <div
                  onClick={() => setSelectedConversation(user)}
                  key={user?._id}
                  className={`flex flex-row py-2 p-1 items-center rounded-md border-2 hover:bg-sky-400 cursor-pointer ${
                    isSelected ? "bg-sky-400 text-white uppercase" : ""
                  }`}
                >
                  <div className="w-40 relative">
                    <img
                      src={user?.profile}
                      className="object-cover h-14 w-14 rounded-full"
                      alt={user?.username}
                    />
                    {onlineUsers?.includes(user?._id) && (
                      <div className="h-3 w-3 bg-green-600 rounded-full absolute top-0 right-0"></div>
                    )}
                    {/* Display unread message count */}
                    {user?.unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
                        {user.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="w-full px-3">
                    <div className="text-md font-semibold">{user?.username}</div>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          </ul>
        </div>

        <Logout />
      </aside>
    </>
  );
};

export default Sidebar;
