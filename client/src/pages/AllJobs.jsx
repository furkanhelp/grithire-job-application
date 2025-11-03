import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useLocation } from "react-router-dom";
import { React, useContext, createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, priority, isRemote, page } = params;

  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      priority ?? "all",
      isRemote ?? "all",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams.entries());

      const searchParams = {
        search: params.search || "",
        jobStatus: params.jobStatus || "all",
        jobType: params.jobType || "all",
        sort: params.sort || "newest",
        priority: params.priority || "all",
        isRemote: params.isRemote || "all",
        page: params.page || 1,
      };

      await queryClient.ensureQueryData(allJobsQuery(searchParams));
      return { searchValues: searchParams };
    } catch (error) {
      toast.error("Failed to load jobs");
      return { searchValues: {} };
    }
  };

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const location = useLocation();
  const { data, isLoading, error } = useQuery(allJobsQuery(searchValues));

  // Log any errors
  useEffect(() => {
    if (error) {
      toast.error("Failed to load jobs");
    }
  }, [error]);

  return (
    <AllJobsContext.Provider
      value={{
        data,
        searchValues,
        isLoading,
      }}
    >
      <div className="w-full">
        <div className="space-y-8 w-full">
          <SearchContainer />
          <JobsContainer />
        </div>
      </div>
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  const context = useContext(AllJobsContext);
  if (!context) {
    throw new Error("useAllJobsContext must be used within an AllJobsProvider");
  }
  return context;
};

export default AllJobs;
