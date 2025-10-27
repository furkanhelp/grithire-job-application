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
      className="min-h-screen !py-8 !px-4 
    sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl !mx-auto">
        <div className="text-center !mb-12">
          <h1
            className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-3"
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
