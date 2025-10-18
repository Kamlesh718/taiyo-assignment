import { useCountriesData } from "../hooks/useCountriesData";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

/**
 * Fix default Leaflet marker icons
 * - Leaflet requires explicit URLs for marker images in some bundlers
 */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * Map Component
 *
 * Displays a world map with markers for each country showing COVID-19 cases.
 * - Fetches country-level data using the `useCountriesData` hook.
 * - Displays a loading message while data is being fetched.
 * - Uses react-leaflet for map rendering.
 * - Shows a popup with Active, Recovered, and Deaths for each country.
 */
function Map() {
  // Fetch country-level COVID-19 data
  const { data: countriesData, isLoading: isLoadingCountries } =
    useCountriesData();
  return (
    <section className="bg-gray-800 rounded-lg shadow-md p-4 md:p-5 pb-16 md:pb-0">
      {/* Section title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-4 text-center md:text-left">
        Country Cases Map
      </h2>
      {isLoadingCountries ? (
        // Loading state
        <p className="text-gray-400 text-center">Loading map...</p>
      ) : (
        // Leaflet map container
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className="w-full h-64 md:h-[500px] rounded-md "
        >
          {/* Base map tiles from OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Markers for each country */}
          {countriesData!.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              {/* Popup displaying country statistics */}
              <Popup>
                <div className="space-y-1">
                  <p>
                    <strong>{country.country}</strong>
                  </p>
                  <p>Cases: {country.cases.toLocaleString()}</p>
                  <p>Active: {country.active.toLocaleString()}</p>
                  <p>Recovered: {country.recovered.toLocaleString()}</p>
                  <p>Deaths: {country.deaths.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </section>
  );
}

export default Map;
