const apiKey = "85b408ea9c674f7d74f4ed5637e54c60"; 
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city!");

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    if (weatherData.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `<p>❌ City not found!</p>`;
      return;
    }

    // Current Weather
    document.getElementById("weatherResult").innerHTML = `
      <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
      <p>🌡️ Temp: ${weatherData.main.temp} °C</p>
      <p>☁️ ${weatherData.weather[0].description}</p>
      <p>💨 Wind: ${weatherData.wind.speed} m/s</p>
    `;

    // Forecast (next 5 days - every 24h at 12:00)
    let forecastHTML = "<h3>5-Day Forecast</h3>";
    const forecastList = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    forecastList.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString();
      forecastHTML += `
        <div class="forecast-card">
          <p>${date}</p>
          <p>🌡️ ${day.main.temp} °C</p>
          <p>${day.weather[0].description}</p>
        </div>
      `;
    });

    document.getElementById("forecast").innerHTML = forecastHTML;

  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("weatherResult").innerHTML = `<p>⚠️ Error fetching data</p>`;
  }
}