const weatherApi = {
    key: "38d93dde30f36a6738016eab26179dc5",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
const body = document.querySelector("body");
const txtInput = document.getElementById("input-box");
const btnWeather = document.getElementById("button");

const hTemp = document.getElementById("temp")
const hCity = document.getElementById("city")

const divWeatherBody = document.getElementById("weather-body")
const divErrorMsg = document.getElementById("error-msg")

const pDate = document.getElementById("date")
const pMinMax = document.getElementById("min-max")
const pWeather = document.getElementById("weather")
const pHumidity = document.getElementById("humidity")
const pWind = document.getElementById("wind")
const pPressure = document.getElementById("pressure")


txtInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        await getWeatherReport(event.target.value);
    }
});


btnWeather.addEventListener("click", async () => {
    await getWeatherReport(txtInput.value);

});



async function getWeatherReport(city) {
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        if (!response.ok) {
            throw new Error("City Not Found!");
        }
        const data = await response.json();
        showWeatherReport(data);
        divWeatherBody.classList.remove("d-none")
        divErrorMsg.classList.add("d-none")

    } catch (error) {
        console.log(`error:${error}`);
        divWeatherBody.classList.add("d-none");
        divErrorMsg.classList.remove("d-none");
        clearWeatherDisplay();

    }
}


function showWeatherReport(weather) {
    hCity.innerText = `${weather.name}, ${weather.sys.country}`
    pDate.innerText = formatDate(new Date());
    hTemp.innerHTML = `${Math.round(weather.main.temp)} &deg;C`
    pMinMax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg; (min) / ${Math.ceil(weather.main.temp_max)}&deg; (max)`;
    pWeather.innerText = `${weather.weather[0].main}`;
    pWind.innerText = `${weather.wind.speed} kmphr`;
    pHumidity.innerText = `${weather.main.humidity}%`
    pPressure.innerText = `${weather.main.pressure} hPa`;
    updateBg(weather.weather[0].main);


}

function formatDate(date) {
    const obj = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return date.toLocaleDateString(undefined, obj);
}

function updateBg(weatherType) {
    const bg = {
        Clear: "imgs/clear1.jpg",
        Clouds: "imgs/clouds.jpg",
        Haze: "imgs/haze.jpeg",
        Rain: "imgs/rain.jpeg",
        Thunderstorm: "imgs/thander.jpg",
        Sunny: "imgs/sunny.jpg",
        Snow: "imgs/snow.jpeg",
    };

    document.body.style.backgroundImage = `url(${bg[weatherType] || "/imgs/clear1.jpg"})`;
}


function clearWeatherDisplay() {
    hCity.innerText = "";
    pDate.innerText = "";
    hTemp.innerHTML = "";
    pMinMax.innerHTML = "";
    pWind.innerText = "";
    pHumidity.innerText = "";
    pPressure.innerText = "";

}


window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const response = await fetch(`${weatherApi.baseUrl}?lat=${lat}&lon=${lon}&appid=${weatherApi.key}&units=metric`);
                    if (!response.ok) {
                        throw new Error("Unable to fetch weather for your location.");
                    }
                    const data = await response.json();
                    showWeatherReport(data);
                    divWeatherBody.classList.remove("d-none");
                    divErrorMsg.classList.add("d-none");
                } catch (error) {
                    console.log(`Geolocation Error: ${error}`);
                    divWeatherBody.classList.add("d-none");
                    divErrorMsg.classList.remove("d-none");
                    clearWeatherDisplay();
                }
            },
            (error) => {
                console.log(`User denied geolocation or error occurred: ${error.message}`);
               
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});
