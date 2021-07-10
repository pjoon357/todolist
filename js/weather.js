const city = document.querySelector("#top__left__city");
const temp = document.querySelector("#top__left__temp");
const weather = document.querySelector("#top__left__weather");

const weatherOptions = {
    Thunderstorm: {
        icon: "⛈",
    },
    Drizzle: {
        icon: "🌦",
    },
    Rain: {
        icon: "🌧",
    },
    Snow: {
        icon: "🌨",
    },
    Atmosphere: {
        icon: "🌫",
    },
    Clear: {
        icon: "🌞",
    },
    Clouds: {
        icon: "☁",
    },
    Mist: {
        icon: "🌫",
    },
    Dust: {
        icon: "🌫"
    }
}

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            city.innerText = data.name;
            temp.innerText = `${Math.round(data.main.temp)}℃`;
            weather.innerText = weatherOptions[data.weather[0].main].icon;
        });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);