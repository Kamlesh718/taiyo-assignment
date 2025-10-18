import { useQuery } from "@tanstack/react-query";

export interface CountryInfo {
  lat: number;
  long: number;
}

export interface CountryData {
  cases: number;
  country: string;
  countryInfo: CountryInfo;
  active: number;
  recovered: number;
  deaths: number;
}

async function fetchCountriesData(): Promise<CountryData[]> {
  const res = await fetch("https://disease.sh/v3/covid-19/countries");
  if (!res.ok) throw new Error("Failed to fetch countries data");
  return res.json();
}

export const useCountriesData = () => {
  const { data, isLoading, error } = useQuery<CountryData[]>({
    queryKey: ["countries"],
    queryFn: fetchCountriesData,
  });

  return { data, isLoading, error };
};
