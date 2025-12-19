const city = document.getElementById("city");
const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const todayTitle = document.getElementById("today-title");
const highTemp = document.getElementById("high-temp");
const lowTemp = document.getElementById("low-temp");
const windSpeed = document.getElementById("wind-speed");
const rainChance = document.getElementById("rain-chance");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const day1Name = document.getElementById("day-1-name");
const day1Icon = document.getElementById("day-1-icon");
const day1Desc = document.getElementById("day-1-desc");
const day1Temp = document.getElementById("day-1-temp");

const day2Name = document.getElementById("day-2-name");
const day2Icon = document.getElementById("day-2-icon");
const day2Desc = document.getElementById("day-2-desc");
const day2Temp = document.getElementById("day-2-temp");

const day3Name = document.getElementById("day-3-name");
const day3Icon = document.getElementById("day-3-icon");
const day3Desc = document.getElementById("day-3-desc");
const day3Temp = document.getElementById("day-3-temp");

const day4Name = document.getElementById("day-4-name");
const day4Icon = document.getElementById("day-4-icon");
const day4Desc = document.getElementById("day-4-desc");
const day4Temp = document.getElementById("day-4-temp");

const day5Name = document.getElementById("day-5-name");
const day5Icon = document.getElementById("day-5-icon");
const day5Desc = document.getElementById("day-5-desc");
const day5Temp = document.getElementById("day-5-temp");

function getLocalData() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data.name);
    console.log(data.main.temp);
    console.log(data.main.temp_min);
    console.log(data.main.temp_max);
    console.log(data.main.feels_like);
    console.log(data.wind.speed);

    currentTemp.textContent = Math.round(data.main.temp);
    city.textContent = data.name;
    highTemp.textContent = Math.round(data.main.temp_max);
    lowTemp.textContent = Math.round(data.main.temp_min);
    rainChance.textContent = Math.round(data.rain);

    if (isNaN(data.main.rain)) {
      rainChance.textContent = "0%";
    }
    return data;
  });
}

getLocalData();

function getForecastData() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data.list[0].dt_txt);
    console.log(data.list[0].main.temp);
    console.log(data.list[0].main.feels_like);
    console.log(data.list[0].main.temp_max);
    console.log(data.list[0].wind.speed);

    const days = [
      data.list[0].dt_txt,
      data.list[8].dt_txt,
      data.list[16].dt_txt,
      data.list[24].dt_txt,
      data.list[32].dt_txt,
      data.list[39].dt_txt,
    ];

    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day1 = new Date(days[0]);
    const day2 = new Date(days[1]);
    const day3 = new Date(days[2]);
    const day4 = new Date(days[3]);
    const day5 = new Date(days[4]);
    console.log(day1.getDay());
    console.log(day2.getDay());
    console.log(day3.getDay());
    console.log(day4.getDay());
    console.log(day5.getDay());

    todayTitle.textContent = weekDays[day1.getDay() - 1];

    //gets data and rounds it to the nearest integer then displays it
    day1Name.textContent = weekDays[day1.getDay()];
    day1Temp.textContent = `${Math.round(
      data.list[0].main.temp_max
    )} / ${Math.round(data.list[0].main.temp_min)}`;
    day2Name.textContent = weekDays[day2.getDay()];
    day2Temp.textContent = `${Math.round(
      data.list[8].main.temp_max
    )} / ${Math.round(data.list[8].main.temp_min)}`;
    day3Name.textContent = weekDays[day3.getDay()];
    day3Temp.textContent = `${Math.round(
      data.list[16].main.temp_max
    )} / ${Math.round(data.list[16].main.temp_min)}`;
    day4Name.textContent = weekDays[day4.getDay()];
    day4Temp.textContent = `${Math.round(
      data.list[24].main.temp_max
    )} / ${Math.round(data.list[24].main.temp_min)}`;
    day5Name.textContent = weekDays[day5.getDay()];
    day5Temp.textContent = `${Math.round(
      data.list[32].main.temp_max
    )} / ${Math.round(data.list[32].main.temp_min)}`;
  });
}

getForecastData();

let cityName;

searchBtn.addEventListener("click", async function () {
  //complicated ass search mechanism gets input value and uses it to get the lon/lat of said location, which then resets the lon lat variables in the api link to the new lat and lon from the search, so it does another api call and resets the data to the new location

  const cityName = searchInput.value;
  const searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=8661d7c45684fcb7eb85cafb35ec6eaf`;

  const res = await fetch(searchUrl);
  const searchData = await res.json();
  console.log(searchData[0].lat);
  console.log(searchData[0].lon);

  const lat = searchData[0].lat;
  const lon = searchData[0].lon;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;
  
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  
  //changing layout to searched location
  currentTemp.textContent = Math.round(weatherData.main.temp);
  city.textContent = weatherData.name;
  highTemp.textContent = Math.round(weatherData.main.temp_max);
  lowTemp.textContent = Math.round(weatherData.main.temp_min);
  rainChance.textContent = Math.round(weatherData.rain);
  
  if (isNaN(weatherData.main.rain)) {
    rainChance.textContent = "0%";
  };
  
  
  
  
  //forecast
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8661d7c45684fcb7eb85cafb35ec6eaf&units=imperial`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const days = [
      data.list[0].dt_txt,
      data.list[8].dt_txt,
      data.list[16].dt_txt,
      data.list[24].dt_txt,
      data.list[32].dt_txt,
      data.list[39].dt_txt,
    ];

    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day1 = new Date(days[0]);
    const day2 = new Date(days[1]);
    const day3 = new Date(days[2]);
    const day4 = new Date(days[3]);
    const day5 = new Date(days[4]);

        todayTitle.textContent = weekDays[day1.getDay() - 1];

    day1Name.textContent = weekDays[day1.getDay()];
    day1Temp.textContent = `${Math.round(
      data.list[0].main.temp_max
    )} / ${Math.round(data.list[0].main.temp_min)}`;
    day2Name.textContent = weekDays[day2.getDay()];
    day2Temp.textContent = `${Math.round(
      data.list[8].main.temp_max
    )} / ${Math.round(data.list[8].main.temp_min)}`;
    day3Name.textContent = weekDays[day3.getDay()];
    day3Temp.textContent = `${Math.round(
      data.list[16].main.temp_max
    )} / ${Math.round(data.list[16].main.temp_min)}`;
    day4Name.textContent = weekDays[day4.getDay()];
    day4Temp.textContent = `${Math.round(
      data.list[24].main.temp_max
    )} / ${Math.round(data.list[24].main.temp_min)}`;
    day5Name.textContent = weekDays[day5.getDay()];
    day5Temp.textContent = `${Math.round(
      data.list[32].main.temp_max
    )} / ${Math.round(data.list[32].main.temp_min)}`;
  

});
