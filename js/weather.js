const city = document.querySelector("#top__left__city");
const temp = document.querySelector("#top__left__temp");
const weather = document.querySelector("#top__left__weather");

let condition;
const weatherOptions = {
    Thunderstorm: {
        icon: `<i class="fas fa-bolt"></i>`,
        img: ["thunderstorm1.webp", "thunderstorm2.png"]
    },
    Drizzle: {
        icon: `<i class="fas fa-cloud-sun-rain"></i>`,
        img: ["drizzle1.jpg", "drizzle2.jpg"]
    },
    Rain: {
        icon: `<i class="fas fa-cloud-showers-heavy"></i>`,
        img: ["rain1.webp", "rain2.jpg"]
    },
    Snow: {
        icon: `<i class="far fa-snowflake"></i>`,
        img: ["snow1.jfif", "snow2.jpg"]
    },
    Atmosphere: {
        icon: `<i class="fas fa-smog"></i>`,
        img: ["", ""]
    },
    Clear: {
        icon: `<i class="fas fa-sun"></i>`,
        img: ["clear1.jpg", "clear2.jpg"]
    },
    Clouds: {
        icon: `<i class="fas fa-cloud"></i>`,
        img: ["cloud1.webp", "cloud2.jfif"]
    },
    Mist: {
        icon: `<i class="fas fa-smog"></i>`,
        img: ["mist1.jpg", "mist2.jpg"]
    },
    Dust: {
        icon: `<i class="fas fa-smog"></i>`,
        img: ["dust1.png", "dust2.jpg"]
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
            condition = data.weather[0].main;
            weather.innerHTML = weatherOptions[condition].icon;
            const chosenImage = weatherOptions[condition].img[Math.floor(Math.random() * 2)];
            document.getElementById("bd").style.backgroundImage = `url("img/${chosenImage}")`;
        });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);