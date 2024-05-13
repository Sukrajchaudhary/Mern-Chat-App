import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
// import { host } from "./common/Api";
const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {setAuthUser}=useAuthContext();
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(value),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("userinfo", JSON.stringify(data.user));
          setAuthUser(data.user);
          toast.success(data.message);
          navigate("/", { replace: true });
        }
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setValue({
        email: "",
        password: "",
      });
    }
  };
  return (
    <section className="rounded-md  p-2">
      <div className="flex items-center justify-center bg-white px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border-2 p-4">
          <div className="mb-2">
            <img src={Logo} alt="" className="rounded-full h-10 " />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Well Come to our Chatify
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Dont't have an account?{" "}
            <Link
              to="/"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8 ">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={value.password}
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#105B63] px-3.5 py-2.5 font-semibold leading-7 text-white "
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
