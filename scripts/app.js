const city = document.getElementById("city");
const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const todayTitle = document.getElementById("today-title");
const highTemp = document.getElementById("high-temp");
const lowTemp = document.getElementById("low-temp");
const windSpeed = document.getElementById("wind-speed");
function getData() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf`;

    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data.name);
    console.log(data.main.temp);
    console.log(data.main.temp_min);
    console.log(data.main.temp_max);
    console.log(data.main.feels_like);
    console.log(data.wind.speed);

    
    
    
    currentTemp.textContent = `${data.list.main.temp}`;
    city.textContent = `${data.list.name}`;
    highTemp.textContent = `${data.main.temp_max}`;
    lowTemp.textContent = `${data.main.temp_min}`;
    windSpeed.textContent = `${data.wind.speed}`;
    return data;
  });
}

getData();

