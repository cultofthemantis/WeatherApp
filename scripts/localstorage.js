function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function renderFavorites() {
    const favoritesList = document.getElementById("favoritesList")
    favoritesList.innerHTML = "";
    const favorites = getFavorites();

    favorites.forEach((cityName) => {
    const li = document.createElement("li");
    li.className = "favorite-item";

    li.innerHTML = `
      <span class="city-name">${cityName}</span>
      <span class="star active">★</span>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.classList.contains("star")) {
        removeFavorite(cityName);
      } 
      else if (e.target.classList.contains("city-name")) {
        loadCityWeather(cityName); 
        hideDropdown();
      }
    });

    favoritesList.appendChild(li);
  });
}

function removeFavorite(cityName) {
  const favorites = getFavorites().filter(c => c !== cityName);
  saveFavorites(favorites);
  renderFavorites();
}


async function loadCityWeather(cityName) {
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
  city.textContent = weatherData.name;
  currentTemp.textContent = Math.round(weatherData.main.temp);
  highTemp.textContent = Math.round(weatherData.main.temp_max);
  lowTemp.textContent = Math.round(weatherData.main.temp_min);
  rainChance.textContent = weatherData.rain?.["1h"] ?? "0%";

  //forecast
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;
  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();
 
}





export {saveFavorites, renderFavorites, getFavorites, loadCityWeather, removeFavorite};