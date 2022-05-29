function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperature = document.querySelector("#actual-temp");
  let city = document.querySelector("#actual-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#actual-date");
  let icon = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  temperature.innerHTML = Math.round(celciusTemp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "23cbb82cefe3f543fc2729ccb9d974f4";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#actual-temp");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#actual-temp");
  temperature.innerHTML = Math.round(celciusTemp);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelcius);

search("London");
