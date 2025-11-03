import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BarChartComponent = ({ data }) => {

  const colors = [
    "url(#barGradient1)",
    "url(#barGradient2)",
    "url(#barGradient3)",
    "url(#barGradient4)",
    "url(#barGradient5)",
    "url(#barGradient6)",
  ];

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
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#5B21B6" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="barGradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B21B6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4C1D95" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="barGradient5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4C1D95" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3730A3" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="barGradient6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3730A3" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#312E81" stopOpacity={0.9} />
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

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
          />

          <Bar
            dataKey="count"
            radius={[12, 12, 0, 0]}
            barSize={32}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="none"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
