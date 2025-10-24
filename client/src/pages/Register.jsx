import React from "react";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import ThemeToggle from "../components/ThemeToggle";


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "deneme123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Now You Can Look Around");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <>
      {/* Navbar with Theme Toggle */}
      <div
        className="flex justify-between items-center w-full fixed top-0 
      left-0 right-0 z-[60] pointer-events-auto !p-4"
      >
        {/* Empty for balance */}
        <div className="w-1/3"></div>

        {/* Right - ThemeToggle */}
        <div className="w-1/3 flex justify-end">
          {/* Desktop */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center !p-4">
        <div
          className="w-full  max-w-lg rounded-2xl shadow-xl overflow-hidden 
        flex flex-col md:flex-row"
        >
          {/* Left Side - Illustration */}
          <div
            className="md:w-2/5 bg-gradient-to-b from-primary-600 
          to-primary-800 !p-10 flex flex-col justify-center items-center
           text-white"
          >
            <div className="text-center !mb-6">
              <div
                className="w-16 h-16 bg-black/50 dark:bg-white/20 rounded-full 
              flex items-center justify-center !mx-auto !mb-4"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3
                className="!text-xl !font-bold text-gray-700 
              dark:text-gray-400"
              >
                Join Our Community
              </h3>
              <p
                className="text-primary-100 text-gray-600 
              dark:text-gray-600 !mt-2 text-sm"
              >
                Create your account and get started
              </p>
            </div>
            <div className="!space-y-3 text-sm">
              <div
                className="flex items-center text-gray-800 
              dark:text-gray-400"
              >
                <svg
                  className="w-5 h-5 !mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Easy registration
              </div>
              <div
                className="flex items-center whitespace-nowrap text-gray-800 
              dark:text-gray-400"
              >
                <svg
                  className="w-5 h-5 !mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure data protection
              </div>
              <div
                className="flex items-center text-gray-800 
              dark:text-gray-400"
              >
                <svg
                  className="w-5 h-5 !mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant access
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-3/5 !p-5 ">
            <div className="text-center !mb-2 items-center justify-center flex">
              <Link to="/">
              <Logo/>
              </Link>
            </div>
            <h2
              className="!text-2xl !font-bold text-center !font-sans !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-2"
            >
              Create Account
            </h2>
            <p className="text-gray-600 text-center !text-sm !mb-6">
              Fill in your details to register
            </p>

            <Form method="post" className="!space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormRow
                  type="text"
                  name="name"
                  placeholder="First Name"
                  simpleLayout={true}
                />
                <FormRow
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  simpleLayout={true}
                />
              </div>
              <FormRow
                type="text"
                name="location"
                placeholder="Location"
                simpleLayout={true}
              />
              <FormRow
                type="email"
                name="email"
                placeholder="Email Address"
                simpleLayout={true}
              />
              <FormRow
                type="password"
                name="password"
                placeholder="Password"
                simpleLayout={true}
              />

              {/* Custom Submit Button */}
              <div className="flex justify-center !pt-6">
                <button
                  type="submit"
                  className="group relative !px-8 sm:!px-12 !py-3 sm:!py-4 bg-gradient-to-r from-purple-900 to-pink-800 
                  hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 
                  transform hover:scale-105 hover:shadow-2xl min-w-[160px] sm:min-w-[200px] overflow-hidden w-full"
                >
                  <span className="relative z-10 flex items-center justify-center !space-x-2 sm:!space-x-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">Create Account</span>
                  </span>

                  {/* Animated background effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                </button>
              </div>

              <div className="relative !my-6">
                <div className="absolute inset-0 flex items-center"></div>
                <div className="relative flex justify-center">
                  <div className="flex flex-col items-center space-y-3">
                    {/* Text with solid background and subtle glow */}
                    <span
                      className="!px-4 !py-2 bg-white dark:bg-gray-900 font-medium rounded-full
                      bg-gradient-to-r from-purple-900 via-pink-500 to-purple-600 
                      bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent
                      border border-gray-200 dark:border-gray-700 shadow-lg
                      backdrop-blur-sm relative"
                    >
                      Or try the demo
                      {/* Subtle pulse effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-800/30 via-pink-900/30 to-purple-800/30 animate-pulse -z-10"></div>
                    </span>

                    {/* Animated Arrow*/}
                    <div className="flex flex-col items-center !space-y-1 group">
                      <div className="animate-bounce transition-transform group-hover:scale-110">
                        <svg
                          className="w-4 h-4 mt-2 text-purple-500 dark:text-purple-400 
                          transition-colors group-hover:text-purple-600 
                          dark:group-hover:text-purple-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="group relative w-full cursor-pointer text-white font-medium py-3 px-4 
             rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 
             focus:ring-amber-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl 
             overflow-hidden"
                onClick={loginDemoUser}
              >
                {/* Base Color */}
                <div className="absolute inset-0 bg-amber-500"></div>

                {/* Animated Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r 
                  from-amber-500 via-purple-700 to-amber-700 
                  bg-[length:300%_100%] animate-gradient-sweep"
                ></div>

                {/* Content */}
                <span className="relative z-10 flex items-center justify-center !space-x-3">
                  <svg
                    className="w-5 h-5 transform group-hover:scale-110 group-hover:rotate-12 
                   transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="font-semibold text-sm sm:text-base">
                    Explore the App
                  </span>
                </span>
              </button>

              <div className="!pt-4 text-center border-t border-gray-600">
                <p className="text-gray-600">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="text-gray-950 dark:text-gray-200 hover:text-purple-800 
                    font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
