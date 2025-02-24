document.getElementById('submit').addEventListener('click', () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    if (!latitude || !longitude) {
        alert("Please enter valid latitude and longitude");
        return;
    }

    fetchWeather(latitude, longitude);
});

function fetchWeather(lat, lon) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m&hourly=temperature_2m,precipitation,wind_speed_10m&forecast_days=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data.");
        });
}

function updateWeatherInfo(data) {
    if (!data || !data.current || !data.hourly) {
        alert("Invalid weather data received.");
        console.log("API Response:", data);
        return;
    }

    document.getElementById('current-temp').innerText = data.current.temperature_2m;
    document.getElementById('wind-speed').innerText = data.current.wind_speed_10m;
    document.getElementById('precipitation').innerText = data.current.precipitation || "0";

    const hourlyList = document.getElementById('hourly-forecast');
    hourlyList.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const temp = data.hourly.temperature_2m[i];
        const time = new Date(data.hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const listItem = document.createElement('li');
        listItem.innerText = `${time}: ${temp}°C`;
        hourlyList.appendChild(listItem);
    }
}

}
