const city = document.getElementById("city");
const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const todayTitle = document.getElementById("today-title");

function getData() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=8661d7c45684fcb7eb85cafb35ec6eaf`;

    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data);
    
    
    currentTemp.textContent = `${data.main.temp}`;
    city.textContent = `${data.name}`;
    return data;
  });
}

getData();

