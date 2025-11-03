import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">
            {label}
          </p>
          <p className="text-purple-600 dark:text-purple-400 font-bold">
            {payload[0].value} Applications
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            {/* Main area gradient */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.05} />
            </linearGradient>

            {/* Glow effect gradient */}
            <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.6} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
            strokeOpacity={0.5}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
            tickMargin={10}
          />

          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
            tickMargin={10}
            width={35}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Main filled area */}
          <Area
            type="monotone"
            dataKey="count"
            stroke="url(#glowGradient)"
            strokeWidth={4}
            fill="url(#areaGradient)"
            fillOpacity={1}
            dot={{
              fill: "#8B5CF6",
              stroke: "#fff",
              strokeWidth: 2,
              r: 6,
              filter: "drop-shadow(0 4px 6px rgba(139, 92, 246, 0.3))",
            }}
            activeDot={{
              r: 8,
              fill: "#fff",
              stroke: "#8B5CF6",
              strokeWidth: 3,
              filter: "drop-shadow(0 6px 10px rgba(139, 92, 246, 0.4))",
            }}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />

       
          <Area
            type="monotone"
            dataKey="count"
            stroke="url(#glowGradient)"
            strokeWidth={8}
            fill="transparent"
            strokeOpacity={0.2}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
