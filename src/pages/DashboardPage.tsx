import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import GlobalStats from "../components/GlobalStats";
import LineChart from "../components/LineChart";
import Map from "../components/Map";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * DashboardPage Component
 *
 * Displays an overview of global statistics and visual data:
 * - GlobalStats: shows key numerical stats
 * - LineChart: visualizes trends over time
 * - Map: geographical data visualization
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen md:rounded-lg p-4 md:p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
      <h1 className="text-2xl md:text-3xl font-semibold text-indigo-400 mb-6 text-center md:text-left">
        Dashboard
      </h1>

      {/* Global statistics cards or summary */}
      <GlobalStats />

      {/* Line chart for trends */}
      <LineChart />

      {/* Map visualization */}
      <Map />
    </div>
  );
}
