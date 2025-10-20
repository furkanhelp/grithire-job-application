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
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-gray-300 dark:from-[#1a0f2e] to-[#26143f] !py-8 !px-4 
    sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl !mx-auto">
        <div className="text-center !mb-12">
          <h1
            className="text-2xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] !tracking-[-0.025em] from-white
         !leading-[1.5] bg-clip-text text-transparent !mb-3"
          >
            Application Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl !mx-auto">
            Track your job search progress with detailed insights and visual
            analytics
          </p>
        </div>

        <StatsContainer defaultStats={defaultStats} />

        {monthlyApplications?.length > 1 && (
          <ChartsContainer data={monthlyApplications} />
        )}
      </div>
    </div>
  );
};
export default Stats;
