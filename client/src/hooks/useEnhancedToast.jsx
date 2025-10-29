import { useToast } from "./useToast";

export const useEnhancedToast = () => {
  const { toast, removeToast } = useToast();

  const enhancedToast = {
    ...toast,

    // Professional success toast
    success: (message, description, options = {}) => {
      return toast.success(message, {
        description,
        icon: (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },

    // Professional error toast
    error: (message, description, options = {}) => {
      return toast.error(message, {
        description,
        icon: (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },

    // Professional warning toast
    warning: (message, description, options = {}) => {
      return toast.warning(message, {
        description,
        icon: (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },

    // Professional info toast
    info: (message, description, options = {}) => {
      return toast.info(message, {
        description,
        icon: (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },

    // Loading toast
    loading: (message, description, options = {}) => {
      return toast(message, {
        description,
        type: "loading",
        icon: (
          <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        ),
        duration: Infinity, // Stays until manually removed
        ...options,
      });
    },

    // Promise-based toast
    promise: async (promise, messages, options = {}) => {
      const { loading, success, error } = messages;

      const loadingId = enhancedToast.loading(loading, "", options);

      try {
        const result = await promise;
        removeToast(loadingId);
        enhancedToast.success(success, "", options);
        return result;
      } catch (err) {
        removeToast(loadingId);
        enhancedToast.error(error || "Something went wrong", "", options);
        throw err;
      }
    },

    // Action toast with buttons
    action: (message, description, actions, options = {}) => {
      return toast(message, {
        description,
        type: "action",
        actions,
        ...options,
      });
    },
  };

  return {
    toast: enhancedToast,
    removeToast,
  };
};
