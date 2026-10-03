import "./Weather.css";

// WMO weather codes used by Open-Meteo -> label + emoji icon
const WEATHER_CODES = {
    0: { label: "Clear sky", icon: "☀️", nightIcon: "🌙" },
    1: { label: "Mainly clear", icon: "🌤️", nightIcon: "🌙" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Rime fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Moderate drizzle", icon: "🌦️" },
    55: { label: "Dense drizzle", icon: "🌦️" },
    56: { label: "Light freezing drizzle", icon: "🌧️" },
    57: { label: "Dense freezing drizzle", icon: "🌧️" },
    61: { label: "Slight rain", icon: "🌧️" },
    63: { label: "Moderate rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    66: { label: "Light freezing rain", icon: "🌧️" },
    67: { label: "Heavy freezing rain", icon: "🌧️" },
    71: { label: "Slight snow", icon: "🌨️" },
    73: { label: "Moderate snow", icon: "🌨️" },
    75: { label: "Heavy snow", icon: "❄️" },
    77: { label: "Snow grains", icon: "❄️" },
    80: { label: "Slight rain showers", icon: "🌦️" },
    81: { label: "Moderate rain showers", icon: "🌧️" },
    82: { label: "Violent rain showers", icon: "⛈️" },
    85: { label: "Slight snow showers", icon: "🌨️" },
    86: { label: "Heavy snow showers", icon: "🌨️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with slight hail", icon: "⛈️" },
    99: { label: "Thunderstorm with heavy hail", icon: "⛈️" },
};

function getWeatherInfo(code, isDay = true) {
    const info = WEATHER_CODES[code];
    if (!info) return { label: "Unknown conditions", icon: "❓" };
    return {
        label: info.label,
        icon: !isDay && info.nightIcon ? info.nightIcon : info.icon,
    };
}

function formatTemp(value) {
    return Number.isFinite(value) ? `${Math.round(value)}°C` : "--";
}

function formatDay(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

function Weather({ data }) {
    if (!data) return null;

    const { location, temperature, code, isDay, humidity, windSpeed, today, forecast } = data;
    const current = getWeatherInfo(code, isDay);

    return (
        <section className="weather">
            <div className="weather-card current">
                <h2 className="current-location">{location}</h2>

                <div className="current-main">
                    <span className="current-icon" role="img" aria-label={current.label}>
                        {current.icon}
                    </span>
                    <span className="current-temp">{formatTemp(temperature)}</span>
                </div>

                <p className="current-condition">{current.label}</p>

                <div className="stats">
                    <div className="stat">
                        <span className="stat-label">Humidity</span>
                        <span className="stat-value">
                            {humidity === null ? "--" : `${Math.round(humidity)}%`}
                        </span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Wind</span>
                        <span className="stat-value">
                            {windSpeed === null ? "--" : `${Math.round(windSpeed)} km/h`}
                        </span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Min</span>
                        <span className="stat-value">{formatTemp(today?.min)}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Max</span>
                        <span className="stat-value">{formatTemp(today?.max)}</span>
                    </div>
                </div>
            </div>

            <div className="weather-card">
                <h3 className="forecast-title">5-Day Forecast</h3>
                {forecast.length === 0 ? (
                    <p className="forecast-empty">Forecast data is not available.</p>
                ) : (
                    <ul className="forecast-list">
                        {forecast.map((day) => {
                            const info = getWeatherInfo(day.code);
                            return (
                                <li className="forecast-item" key={day.date}>
                                    <span className="forecast-day">{formatDay(day.date)}</span>
                                    <span className="forecast-icon" role="img" aria-label={info.label}>
                                        {info.icon}
                                    </span>
                                    <span className="forecast-label">{info.label}</span>
                                    <span className="forecast-temps">
                                        <strong>{formatTemp(day.max)}</strong>
                                        <span className="forecast-min">{formatTemp(day.min)}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Weather;