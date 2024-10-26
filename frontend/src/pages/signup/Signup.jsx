import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, X, Loader } from "lucide-react"; // Import the Loader icon
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
    profile: null,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setValue({ ...value, [e.target.name]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const removeImage = () => {
    setValue({ ...value, profile: null });
    setImagePreview(null);
  };

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!value.username) {
      newErrors.username = "Username is required.";
    }
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

    const formdata = new FormData();
    for (let key in value) {
      formdata.append(key, value[key]);
    }

    setLoading(true); 

    try {
      const response = await fetch(`/api/signup`, {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        if (data?.success) {
          navigate("/login", { replace: true });
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
        username: "",
        password: "",
        email: "",
        profile: null,
      });
      setImagePreview(null);
    }
  };

  return (
    <section className="rounded-md p-2">
      <div className="flex items-center justify-center bg-white px-4 py-5 sm:px-2 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border-2 p-4">
          <div className="mb-2">
            <img src={Logo} alt="Logo" className="rounded-full h-10" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Welcome to Chatify
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="text-base font-medium text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type="text"
                    placeholder="Full Name"
                    name="username"
                    onChange={handleChange}
                    value={value.username}
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    className={`flex h-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1`}
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
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="profile" className="text-base font-medium text-gray-900">
                  Select Profile Picture
                </label>
                <div className="mt-2 relative">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                    type="file"
                    name="profile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-full object-cover" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-0 p-1 bg-white rounded-full border border-gray-300 hover:bg-gray-200"
                        aria-label="Remove image"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading} 
                  className={`inline-flex w-full items-center justify-center rounded-md bg-[#105B63] px-3.5 py-2.5 font-semibold leading-7 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? <Loader className="animate-spin mr-2" size={16} /> : "Create Account"}
                  <ArrowRight className="ml-2" size={16} />
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
