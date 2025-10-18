import { useQuery } from "@tanstack/react-query";

export interface GlobalData {
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
}

async function fetchGlobalData(): Promise<GlobalData> {
  const res = await fetch("https://disease.sh/v3/covid-19/all");
  if (!res.ok) throw new Error("Failed to fetch global data");
  return res.json();
}

export const useGlobalData = () => {
  const { data, isLoading, isError, error } = useQuery<GlobalData>({
    queryKey: ["global"],
    queryFn: fetchGlobalData,
  });

  return { data, isLoading, isError, error };
};
