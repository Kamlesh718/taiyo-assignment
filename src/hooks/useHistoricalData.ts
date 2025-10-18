import { useQuery } from "@tanstack/react-query";
export interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

async function fetchHistoricalData(): Promise<HistoricalData> {
  const res = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  if (!res.ok) throw new Error("Failed to fetch historical data");
  return res.json();
}

export const useHistoricalData = () => {
  const { data, isLoading, error } = useQuery<HistoricalData>({
    queryKey: ["historical"],
    queryFn: fetchHistoricalData,
  });

  return { data, isLoading, error };
};
