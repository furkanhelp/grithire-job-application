import React from "react";
import {
  Link,
  Form,
  redirect,
  useNavigate,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import ThemeToggle from "../components/ThemeToggle";
import { useToast } from "../hooks/useToast";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/auth/login", data);

      const userResponse = await customFetch.get("/users/current-user");
      const userData = userResponse.data.user;

      localStorage.setItem("user", JSON.stringify(userData));
      queryClient.setQueryData(["user"], userData);

      return {
        success: true,
        message: "Login successful! Welcome back.",
        user: userData,
      };
    } catch (error) {
      console.error("Login action error:", error);

      // network error vs server error
      const serverMsg = error?.response?.data?.msg;
      const status = error?.response?.status;
      const message = serverMsg || error?.message || "Login failed.";

      return {
        success: false,
        error: message,
        status,
      };
    }
  };


const Login = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation(); 
  const hasShownToastRef = React.useRef(false); // Prevents multiple toasts
 
  const { data: currentUser, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await customFetch.get("/users/current-user");
        return response.data.user;
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    },
    enabled: false,
  });

    const displayUser = actionData?.user || currentUser;

  // Handle action data (success/error)
  React.useEffect(() => {
    if (actionData && !hasShownToastRef.current) {
      hasShownToastRef.current = true;

      if (actionData.success) {
        login(actionData.user);

        refetch();
        const userName = actionData.user?.name || displayUser?.name || "User";
        toast.success(
          `Welcome Back ${userName}! 👋`,
          "You have successfully logged in to your account"
        );

        setTimeout(() => {
          navigate("/dashboard", {
            replace: true,
            state: {
              timestamp: Date.now(),
              from: "login",
            },
          });
        }, 2000);
      } else if (actionData.error) {
        toast.error("Login Failed", actionData.error);
      }
    }
  }, [actionData, toast, login, navigate, displayUser, refetch]);

  // Reset the ref when the form is submitted again
  React.useEffect(() => {
    if (navigation?.state === "submitting") {
      hasShownToastRef.current = false;
    }
  }, [navigation]);

  return (
    <>
      {/* Navbar with Theme Toggle */}
      <div className="flex justify-between items-center w-full fixed top-0 left-0 right-0 z-[60] pointer-events-auto !p-4">
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-end">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center !p-4">
        <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
          <div className="w-full !p-8">
            <div className="text-center items-center justify-center flex !mb-5">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <h2 className="!text-4xl whitespace-nowrap !font-bold text-center !font-sans !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center text-sm !mb-6">
              Sign in to your account
            </p>

            <Form method="post" className="!space-y-5 capitalize">
              <FormRow
                type="email"
                name="email"
                placeholder="Email Address"
                className="!px-2 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <FormRow
                type="password"
                name="password"
                placeholder="Password"
                className="!px-2 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />

              <div className="flex items-center justify-between !pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="flex justify-center !pt-5">
                <button
                  type="submit"
                  className="group relative !px-8 sm:!px-12 !py-3 sm:!py-4 bg-gradient-to-r from-purple-900 to-pink-800 hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-w-[160px] sm:min-w-[200px] overflow-hidden"
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
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">Login</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="!pt-4 text-center border-t border-gray-200">
                <p className="text-gray-600">
                  Not a member yet?{" "}
                  <Link
                    to="/register"
                    className="text-gray-950 dark:text-gray-200 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    Register
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

export default Login;
