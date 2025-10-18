import { Line } from "react-chartjs-2";
import { useHistoricalData } from "../hooks/useHistoricalData";

/**
 * LineChart Component
 *
 * Displays a line chart showing worldwide COVID-19 cases over time.
 * - Uses a custom hook `useHistoricalData` to fetch historical data.
 * - Shows a loading message while data is being fetched.
 * - Uses Chart.js via react-chartjs-2 to render the line chart.
 */

function LineChart() {
  // Fetch historical data
  const { data: historicalData, isLoading: isLoadingHistorical } =
    useHistoricalData();

  // Prepare chart data if historical data exists
  const chartData = historicalData
    ? {
        labels: Object.keys(historicalData.cases), // Dates
        datasets: [
          {
            label: "Cases",
            data: Object.values(historicalData.cases), // Case numbers
            borderColor: "rgba(99, 102, 241,1)", // Indigo line
            backgroundColor: "rgba(99, 102, 241,0.2)", // Fill under line
            fill: true,
          },
        ],
      }
    : null;
  return (
    <section className="bg-gray-800 rounded-lg shadow-md p-4 md:p-5 mb-6">
      {/* Section title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-4 text-center md:text-left">
        Worldwide Cases
      </h2>
      {isLoadingHistorical ? (
        // Loading state
        <p className="text-gray-400 text-center">Loading chart...</p>
      ) : (
        // Chart container
        <div className="w-full overflow-x-auto">
          <Line
            data={chartData!}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={300}
          />
        </div>
      )}
    </section>
  );
}

export default LineChart;
