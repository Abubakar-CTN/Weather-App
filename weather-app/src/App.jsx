import { useState, useEffect, useRef, useCallback } from "react";
import Weather from "./Weather";
import "./App.css";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_CITY = "Chishtian";

const ERROR_MESSAGES = {
  EMPTY: "Please enter a city name.",
  NOT_FOUND: "City not found. Please check the spelling and try again.",
  NETWORK: "Network error. Please check your internet connection and try again.",
  SERVER: "The weather service returned an error. Please try again later.",
  NO_DATA: "Weather data is not available for this location right now.",
};

class WeatherError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

// Shared fetch helper: handles network errors, bad HTTP status and bad JSON.
async function fetchJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new WeatherError("NETWORK");
  }

  if (!response.ok) {
    throw new WeatherError("SERVER");
  }

  try {
    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new WeatherError("SERVER");
  }
}

// Step 1: city name -> latitude/longitude
async function geocodeCity(city, signal) {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
  });
  const data = await fetchJson(`${GEO_URL}?${params}`, signal);

  // When nothing matches, Open-Meteo returns no "results" key at all.
  const place = data?.results?.[0];
  if (
    !place ||
    !Number.isFinite(place.latitude) ||
    !Number.isFinite(place.longitude)
  ) {
    throw new WeatherError("NOT_FOUND");
  }

  return {
    name: place.name,
    admin1: place.admin1,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
  };
}

// Step 2: coordinates -> current weather + 6 days of daily data
async function fetchForecast(place, signal) {
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
    forecast_days: "6", // today + next 5 days
  });
  return fetchJson(`${FORECAST_URL}?${params}`, signal);
}

// Step 3: validate the response and shape it for the UI.
// If essential data is missing we throw, so no fake values are ever shown.
function buildWeather(place, forecast) {
  const { current, daily } = forecast || {};

  if (
    !current ||
    !daily ||
    !Array.isArray(daily.time) ||
    daily.time.length === 0 ||
    !Number.isFinite(current.temperature_2m) ||
    !Number.isFinite(current.weather_code)
  ) {
    throw new WeatherError("NO_DATA");
  }

  const valueAt = (arr, i) =>
    Array.isArray(arr) && Number.isFinite(arr[i]) ? arr[i] : null;

  const days = daily.time.map((date, i) => ({
    date,
    code: valueAt(daily.weather_code, i),
    max: valueAt(daily.temperature_2m_max, i),
    min: valueAt(daily.temperature_2m_min, i),
  }));

  const locationParts = [place.name, place.admin1, place.country].filter(
    (part, i, arr) => part && arr.indexOf(part) === i
  );

  return {
    location: locationParts.join(", "),
    temperature: current.temperature_2m,
    code: current.weather_code,
    isDay: current.is_day !== 0,
    humidity: Number.isFinite(current.relative_humidity_2m)
      ? current.relative_humidity_2m
      : null,
    windSpeed: Number.isFinite(current.wind_speed_10m)
      ? current.wind_speed_10m
      : null,
    today: days[0],
    forecast: days.slice(1, 6),
  };
}

function App() {
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  const loadWeather = useCallback(async (cityName) => {
    const city = cityName.trim();

    if (!city) {
      setError(ERROR_MESSAGES.EMPTY);
      return;
    }

    // Cancel any earlier request that is still running.
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const place = await geocodeCity(city, controller.signal);
      const forecast = await fetchForecast(place, controller.signal);
      setWeather(buildWeather(place, forecast));
    } catch (err) {
      // An aborted request means a newer search replaced it: ignore silently.
      if (err.name === "AbortError") return;
      setWeather(null);
      setError(ERROR_MESSAGES[err.code] || ERROR_MESSAGES.NETWORK);
    } finally {
      // Only the latest request is allowed to turn the loader off.
      if (controllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  // Load a default city once when the app opens.
  useEffect(() => {
    loadWeather(DEFAULT_CITY);
    return () => controllerRef.current?.abort();
  }, [loadWeather]);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadWeather(query);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Weather App</h1>
        <p className="app-subtitle">Search Any City For Live Weather</p>
      </header>

      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city, e.g. Karachi"
          aria-label="City name"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <main className="content">
        {loading && (
          <div className="status-box" role="status">
            <div className="spinner" aria-hidden="true" />
            <p>Loading weather...</p>
          </div>
        )}

        {!loading && error && (
          <div className="status-box error-box" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && weather && <Weather data={weather} />}
      </main>
    </div>
  );
}

export default App;