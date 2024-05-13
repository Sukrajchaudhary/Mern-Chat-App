import React from "react";
import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
const Logout = () => {
  const { loading, logout } = useLogout();
  const handleLogut = () => {
    logout();
  };
  const { authUser } = useAuthContext();
  return (
    <div className="w-64 absolute bottom-0 text-white left-0 h-12 bg-green-900 cursor-pointer border-r-2 flex justify-start gap-2 p-4 items-center">
      <div>
        <LogOut color="#ffffff" onClick={handleLogut} />
      </div>
      <div className="border-r-2 border-black p-1">Sign-Out</div>
      <div className="text-white flex flex-col justify-start items-center ">
        <p>Well Come</p>
        <span className="uppercase"> {authUser?.username}</span>
      </div>
    </div>
  );
};

export default Logout;
