import { useQuery } from "@tanstack/react-query";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data; 
};


const Stats = () => {
  const loaderData = useLoaderData();
  const { data } = useQuery(statsQuery);
  
  const statsData = data || loaderData;

  if (!statsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const { defaultStats, monthlyApplications, additionalStats } = statsData;

  return (
    <div className="min-h-screen !py-8 !px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl !mx-auto">
        <div className="text-center !mb-12">
          <h1 className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-3">
            Application Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl !mx-auto">
            Track your job search progress with detailed insights and visual analytics
          </p>
        </div>

        
        <StatsContainer 
          defaultStats={defaultStats} 
          additionalStats={additionalStats} 
        />

        
        {monthlyApplications && monthlyApplications.length > 0 ? (
          <ChartsContainer data={monthlyApplications} />
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Not enough data to display charts. Add more jobs to see your application trends.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
