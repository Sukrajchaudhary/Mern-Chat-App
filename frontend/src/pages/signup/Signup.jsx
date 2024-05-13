import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
// import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
    profile: "",
  });
  // const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setValue({ ...value, [e.target.name]: e.target.files[0] });
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let key in value) {
      formdata.append(key, value[key]);
    }

    try {
      const response = await fetch(`http://localhost:8080/api/signup`, {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        const data = await response.json();

        toast.success(data.message);
        if (data?.success) {
          // localStorage.setItem("userinfo", JSON.stringify(data.info));
          // setAuthUser(data.info);
          navigate("/login", { replace: true });
        }
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setValue({
        username: "",
        password: "",
        email: "",
        profile: "",
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
            Already have an account?{" "}
            <Link
              to="/login"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mt-8 "
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    name="username"
                    onChange={handleChange}
                    value={value.username}
                  ></input>
                </div>
              </div>
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="profile"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Select Profile Picture{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    placeholder="profile"
                    name="profile"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#105B63] px-3.5 py-2.5 font-semibold leading-7 text-white "
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
