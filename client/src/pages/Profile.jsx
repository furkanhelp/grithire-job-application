import { FormRow } from "../components";
import { redirect, useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("avatar");
    const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Image size too large (max 1MB)");
      return null;
    }
    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const Profile = () => {
  const { user } = useAuth();
  const { name, lastName, email, location } = user;
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("Image size too large (max 1MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen !py-8 !px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center !mb-8">
          <h1
            className="text-3xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-2"
          >
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information and preferences
          </p>
        </div>

        <Form
          method="post"
          className="!space-y-10"
          encType="multipart/form-data"
        >
          {/* Profile Image Section */}
          <div className="rounded-2xl shadow-lg !p-6 border border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-4"
            >
              Profile Picture
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center text-white font-semibold text-xl">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      `${name?.charAt(0)}${lastName?.charAt(0)}`
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
              </div>

              {/* File Upload */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select an image file (max 1MB)
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      id="avatar"
                      accept="image/*"
                      name="avatar"
                      onChange={handleImageChange}
                    />
                    <span
                      className="inline-flex items-center px-4 py-3 border-2 
                    border-gray-700 dark:border-gray-600 rounded-2xl bg-white 
                    dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 
                    hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Choose File
                    </span>
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG up to 1MB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="rounded-2xl shadow-lg !p-6 border border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-6"
            >
              Personal Information
            </h3>

            <div className="!space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="!space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={name}
                    className="w-full px-4 py-3 border-2 border-gray-700 dark:border-gray-600 
                    rounded-2xl text-gray-900 dark:text-white 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all 
                    duration-300"
                  />
                </div>

                <div className="!space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={lastName}
                    className="w-full px-4 py-3 border-2 border-gray-700 dark:border-gray-600 
                    rounded-2xl  text-gray-900 dark:text-white 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all 
                    duration-300"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  className="w-full px-4 py-3 border-2 border-gray-700 dark:border-gray-600 
                  rounded-2xl text-gray-900 dark:text-white 
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all 
                  duration-300"
                />
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={location}
                  className="w-full px-4 py-3 border-2 border-gray-700 dark:border-gray-600 
                  rounded-2xl  text-gray-900 dark:text-white 
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all 
                  duration-300"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end !pt-6">
            <button
              type="button"
              className="px-8 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-2xl text-gray-700 dark:text-gray-300 font-medium hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group relative !px-8 !py-3 bg-gradient-to-r from-purple-900 to-pink-800
             hover:from-purple-900 hover:to-pink-800 text-white 
             font-bold rounded-2xl shadow-2xl transition-all duration-300 transform 
             hover:scale-105 hover:shadow-2xl min-w-[200px] overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center !space-x-3">
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Update Profile</span>
              </span>

              {/* Animated background effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
