import { useGlobalData } from "../hooks/useGlobalData";

/**
 * GlobalStats Component
 *
 * Displays key global statistics such as total cases, recovered, deaths, and active cases.
 * - Uses a custom hook `useGlobalData` to fetch global data.
 * - Shows a loading message while data is being fetched.
 * - Uses a responsive grid layout for displaying stats.
 */
function GlobalStats() {
  // Fetch global data using custom hook
  const { data: globalData, isLoading: isLoadingGlobal } = useGlobalData();
  return (
    <>
      {" "}
      {isLoadingGlobal ? (
        // Loading state
        <p className="text-center text-gray-400">Loading global stats...</p>
      ) : (
        // Stats grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-500 p-4 rounded-md shadow text-center sm:text-left">
            <p className="text-sm text-gray-200">Total Cases</p>
            <p className="text-xl font-bold">
              {globalData?.cases.toLocaleString()}
            </p>
          </div>

          {/* Recovered */}
          <div className="bg-green-500 p-4 rounded-md shadow text-center sm:text-left">
            <p className="text-sm text-gray-200">Recovered</p>
            <p className="text-xl font-bold">
              {globalData?.recovered.toLocaleString()}
            </p>
          </div>

          {/* Deaths */}
          <div className="bg-red-500 p-4 rounded-md shadow text-center sm:text-left">
            <p className="text-sm text-gray-200">Deaths</p>
            <p className="text-xl font-bold">
              {globalData?.deaths.toLocaleString()}
            </p>
          </div>

          {/* Active Cases */}
          <div className="bg-yellow-500 p-4 rounded-md shadow text-center sm:text-left">
            <p className="text-sm text-gray-200">Active</p>
            <p className="text-xl font-bold">
              {globalData?.active.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default GlobalStats;
