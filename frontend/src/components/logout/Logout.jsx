import React from "react";
import { LoaderCircle, LogOut } from "lucide-react";
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
      {loading ? (
        <LoaderCircle
          className="animate-spin"
          size={40}
          color="#2032b6"
          strokeWidth={2.5}
        />
      ) : (
        <button onClick={handleLogut} className="flex justify-center items-center">
          <LogOut color="#ffffff" />
          <div className="border-r-2 border-black p-1">Sign-Out</div>
        </button>
      )}

      <div className="text-white flex flex-col justify-start items-center ">
        <p>Well Come</p>
        <span className="uppercase"> {authUser?.username}</span>
      </div>
    </div>
  );
};

export default Logout;
