const city = document.getElementById("city");
const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const todayTitle = document.getElementById("today-title");


function getData(){
  navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf`;
  
      const response = fetch(url);
      const data =  response.json;
  
      const weatherData = data;
      
      console.log(weatherData.main.temp);
      return weatherData;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  });

}

getData();