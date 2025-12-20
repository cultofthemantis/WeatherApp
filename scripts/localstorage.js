const day1Name = document.getElementById("day-1-name");

const day1Temp = document.getElementById("day-1-temp");

const day2Name = document.getElementById("day-2-name");

const day2Temp = document.getElementById("day-2-temp");

const day3Name = document.getElementById("day-3-name");

const day3Temp = document.getElementById("day-3-temp");

const day4Name = document.getElementById("day-4-name");

const day4Temp = document.getElementById("day-4-temp");

const day5Name = document.getElementById("day-5-name");

const day5Temp = document.getElementById("day-5-temp");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function renderFavorites() {
  const dropdown = document.getElementById("favorites-dropdown");
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";

  const favorites = getFavorites();

  favorites.forEach((cityName) => {
    const li = document.createElement("li");
    li.textContent = cityName;

    li.addEventListener("click", function() {
      loadCityWeather(cityName); 
    });

    favoritesList.appendChild(li);
  });
}

function removeFavorite(cityName) {
  const favorites = getFavorites().filter((c) => c !== cityName);
  saveFavorites(favorites);
  renderFavorites();
}

async function loadCityWeather(cityName) {
  const city = document.getElementById("city");
  const currentTemp = document.getElementById("current-temp");
  const weatherIcon = document.getElementById("weather-icon");
  const highTemp = document.getElementById("high-temp");
  const lowTemp = document.getElementById("low-temp");
  const rainChance = document.getElementById("rain-chance");
  // get lat/lon from city name
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=8661d7c45684fcb7eb85cafb35ec6eaf`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.length) return;

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  // current weather
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  // update ui
  console.log(weatherData.name);
  city.textContent = weatherData.name;
  currentTemp.textContent = Math.round(weatherData.main.temp);
  highTemp.textContent = Math.round(weatherData.main.temp_max);
  lowTemp.textContent = Math.round(weatherData.main.temp_min);
  rainChance.textContent = weatherData.rain?.["1h"] ?? "0%";

  //forecast
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;
  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();
  const days = [
    forecastData.list[0].dt_txt,
    forecastData.list[8].dt_txt,
    forecastData.list[16].dt_txt,
    forecastData.list[24].dt_txt,
    forecastData.list[32].dt_txt,
    forecastData.list[39].dt_txt,
  ];

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const day1 = new Date(days[0]);
  const day2 = new Date(days[1]);
  const day3 = new Date(days[2]);
  const day4 = new Date(days[3]);
  const day5 = new Date(days[4]);



  day1Name.textContent = weekDays[day1.getDay()];
  day1Temp.textContent = `${Math.round(
    forecastData.list[0].main.temp_max
  )} / ${Math.round(forecastData.list[0].main.temp_min)}`;

  day2Name.textContent = weekDays[day2.getDay()];
  day2Temp.textContent = `${Math.round(
    forecastData.list[8].main.temp_max
  )} / ${Math.round(forecastData.list[8].main.temp_min)}`;

  day3Name.textContent = weekDays[day3.getDay()];
  day3Temp.textContent = `${Math.round(
    forecastData.list[16].main.temp_max
  )} / ${Math.round(forecastData.list[16].main.temp_min)}`;

  day4Name.textContent = weekDays[day4.getDay()];
  day4Temp.textContent = `${Math.round(
    forecastData.list[24].main.temp_max
  )} / ${Math.round(forecastData.list[24].main.temp_min)}`;
  
  day5Name.textContent = weekDays[day5.getDay()];
  day5Temp.textContent = `${Math.round(
    forecastData.list[32].main.temp_max
  )} / ${Math.round(forecastData.list[32].main.temp_min)}`;

}

export {
  saveFavorites,
  renderFavorites,
  getFavorites,
  removeFavorite,
  loadCityWeather,
};
