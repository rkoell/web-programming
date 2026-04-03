// Add event listener to button
document.getElementById("weatherBtn").addEventListener("click", getWeather);

// Function to convert weather code to icon
function getWeatherIcon(code) {

  // TODO: Add conditions for weather codes
  if (code === 0) return "☀️ Clear sky";
  if (code === 1) return "☁️ Mainly clear";
  if (code === 2) return "☁️ Partly cloudy";
  if (code === 3) return "☁️ Overcast";
  if (code === 45 || code === 48) return "🌫️ Fog";
  if (code === 51 || code === 53 || code === 55) return "🌧️ Drizzle";
  if (code === 56 || code === 57) return "🌧️ Freezing drizzle";
  if (code === 61 || code === 63 || code === 65) return "🌧️ Rain";
  if (code === 66 || code === 67) return "🌧️ Freezing rain";
  if (code === 71 || code === 73 || code === 75) return "❄️ Snow";
  if (code === 77) return "❄️ Snow grains";
  if (code === 80 || code === 81 || code === 82) return "🌧️ Rain showers";
  if (code === 85 || code === 86) return "❄️ Snow showers";
  if (code === 95) return "⛈️ Thunderstorm";
  if (code === 96) return "⛈️ Thunderstorm with slight hail";
  if (code === 99) return "⛈️ Thunderstorm with heavy hail";

  return "🌍"; // default icon
}

async function getWeather() {

  const output = document.getElementById("output");

  // Step 1: Get city input
  let city = document.getElementById("city").value.trim();

  // TODO: Handle empty input
  // If city is empty → show error message

  if (city === "") {
    output.innerHTML = "<p>Enter a city name.</p>"
    return;
  }

  try {

    // Step 2: Call Geocoding API
    let geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    let geoResponse = await fetch(geoURL);

    // TODO: Check if response is OK

    let geoData = await geoResponse.json();

    // TODO: Check if city exists in response
    if (!geoData.results) {
      throw new Error("City does not exist.")
    }

    // TODO: Extract latitude and longitude
    let latitude = geoData.results[0].latitude;
    let longitude = geoData.results[0].longitude;
    let displayCity = geoData.results[0].name;

    // Step 3: Call Weather API
    let weatherURL =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
      `&temperature_unit=fahrenheit&wind_speed_unit=mph`;

    let weatherResponse = await fetch(weatherURL);

    // TODO: Check if response is OK
    if (!weatherResponse.ok) {
      throw new Error("Weather response did not work.")
    }

    let weatherData = await weatherResponse.json();

    // TODO: Extract required data:
    let tempF = weatherData.current.temperature_2m;
    let humidity = weatherData.current.relative_humidity_2m;
    let windMph = weatherData.current.wind_speed_10m;
    let weatherCode = weatherData.current.weather_code;

    // TODO: Get icon using function
    let icon = getWeatherIcon(weatherCode);

    // Step 4: Display output
    output.innerHTML = `
      <h3>📍 ${displayCity}</h3>
      <p>🌡 Temperature: ${tempF} °F</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>💨 Wind: ${windMph} mph</p>
      <p>🌥 Condition: ${icon}</p>
    `;

  } catch (error) {

    // TODO: Show error message
    output.innerHTML = `<p style='color:red;'>${error.message}</p>`;

  }
}