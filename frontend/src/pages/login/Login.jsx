import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react"; 
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!value.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!value.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(value.password)) {
      newErrors.password = "Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
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
          
          localStorage.setItem("userinfo", JSON.stringify(data?.user));
          localStorage.setItem("token", JSON.stringify(data?.accessToken));
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
      setLoading(false);
      setValue({
        email: "",
        password: "",
      });
    }
  };

  return (
    <section className="rounded-md p-2">
      <div className="flex items-center justify-center bg-white px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border-2 p-4">
          <div className="mb-2">
            <img src={Logo} alt="Logo" className="rounded-full h-10" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Welcome to Chatify
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={value.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${
                    loading ? 'bg-gray-500' : 'bg-[#105B63] hover:bg-[#0e4e54]'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader"></span> 
                  ) : (
                    <>
                      Login <ArrowRight className="ml-2" size={16} />
                    </>
                  )}
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
