// Replace time with current time

let now = new Date();

let currentDayTime = document.querySelector("h2");

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentDay = now.getDate();

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentWeekDay = week[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];

currentDayTime.innerHTML = `${currentDay} ${currentMonth}, ${currentWeekDay} 
<div class="hour"> ${currentHour}:${currentMinutes}</div>`;

// Change the city name after the user types the name in the form

// Connect with weather API to display real temperature & city data

function searchCity(city) {
  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  // console.log(response.data.name);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp-main").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
  document.querySelector("#weather-desc-value").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity-value"
  ).innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind-value").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
  //Old method - if we just use the input from the form
  // let cityInput = document.querySelector("#city-search-input");
  // //console.log(cityInput.value);
  // let currentCity = document.querySelector("h1");
  // currentCity.innerHTML = `${cityInput.value}`;
  // return cityInput.value;
}

function searchLocation(position) {
  //position.coords.latitude
  //position.coords.longitude
  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}0&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentPlace(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let citySearch = document.querySelector("#city-search-form");

citySearch.addEventListener("submit", handleSubmit);

searchCity("London");

// When user clicks on Celsius, it's one value, when he clicks on Farenheit it's another value

// function changeTempToFar(event) {
//   event.preventDefault();
//   //alert("??");
//   let temperatureMain = document.querySelector("#temp-main");
//   temperatureMain.innerHTML = "38";
// }

// function changeTempToCel(event) {
//   event.preventDefault();
//   //alert("??");
//   let temperatureMain = document.querySelector("#temp-main");
//   temperatureMain.innerHTML = "3";
// }

// let tempInFar = document.querySelector("#farenheit-main");
// tempInFar.addEventListener("click", changeTempToFar);

// let tempInCel = document.querySelector("#celsius-main");
// tempInCel.addEventListener("click", changeTempToCel);

// Allow to get current location and update city & search for temp based on that

let buttonGetPosition = document.querySelector("#get-location-button");
buttonGetPosition.addEventListener("click", getCurrentPlace);
