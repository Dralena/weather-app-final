function showTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#actual-temp");
  let city = document.querySelector("#actual-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
}

let apiKey = "23cbb82cefe3f543fc2729ccb9d974f4";
let units = "metric";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = `${day} ${hours}:${minutes}`;
