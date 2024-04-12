const APIkey = `e02b7308485038b3527e580f3e4bf55f`;
const checkbox = document.querySelector(`.search__checkbox`);
const mainContent = document.querySelector(`.main__content`);
const input = document.querySelector(`.search__input`);
const form = document.querySelector(`.search__form`);
const btn = document.querySelector(`.search__current`);
let arrData = [];
let arrData2 = [];
let arrData3 = [];
let data =[];
let data2 =[];
let data3 = [];
const time = new Date();

form.addEventListener(`submit`, (evt)=>{
    evt.preventDefault();
    const city = input.value;
    mainContent.innerHTML =``;
    getData(city);
});

btn.addEventListener(`click`, ()=>{
    mainContent.innerHTML =``;
    input.value = ``;
    getPogodaAPI();
})

checkbox.addEventListener(`change`, (evt)=>{
if (evt.target.checked){
    document.body.style = `background: linear-gradient(to bottom, #444, #222);`
    document.querySelector(`.search__input`).classList.add(`dark__mode-input`);
    document.querySelectorAll(`p`).forEach(p =>{
        p.classList.add(`dark__mode-p`);
    })
    document.querySelector(`.info__temp`).classList.add(`info__temp-dark`);
    document.querySelector(`.card__time`).classList.add(`dark__mode-body`);
    document.querySelector(`.card__info`).classList.add(`dark__mode-body`);
    document.querySelector(`.card__days`).classList.add(`dark__mode-body`);
    document.querySelector(`.cards__forecast`).classList.add(`dark__mode-body`);
    document.querySelector(`.sun__img`).src = `./img/sunrise-white-dark.png`;
    document.querySelector(`.sun__img2`).src = `./img/sunset-white-dark2.png`;
    document.querySelector(`#humidity`).src = `./img/humidity-dark.png`;
    document.querySelector(`#wind`).src = `./img/wind-dark.png`;
    document.querySelector(`#clock`).src = `./img/clock-dark.png`;
    document.querySelector(`#uv`).src = `./img/uv-dark.png`;
    document.querySelectorAll(`.card__forecast`).forEach(card =>{
        card.classList.add(`card__forecast-darked`);
    });
    document.querySelector(`.weather__search`).classList.add(`weather__search-dark`);
} else {
    document.body.style = `background: linear-gradient(to bottom, #ffffff, #777777);`
    document.querySelector(`.search__input`).classList.remove(`dark__mode-input`);
    document.querySelectorAll(`p`).forEach(p =>{
        p.classList.remove(`dark__mode-p`);
    })
    document.querySelector(`.info__temp`).classList.remove(`info__temp-dark`);
    document.querySelector(`.card__time`).classList.remove(`dark__mode-body`);
    document.querySelector(`.card__info`).classList.remove(`dark__mode-body`);
    document.querySelector(`.card__days`).classList.remove(`dark__mode-body`);
    document.querySelector(`.cards__forecast`).classList.remove(`dark__mode-body`);
    document.querySelector(`.sun__img`).src = `./img/sunrise-white.png`;
    document.querySelector(`.sun__img2`).src = `./img/sunset-white2.png`;
    document.querySelector(`#humidity`).src = `./img/right__img.png`;
    document.querySelector(`#wind`).src = `./img/wind.png`;
    document.querySelector(`#clock`).src = `./img/pressure-white.png`;
    document.querySelector(`#uv`).src = `./img/uv-white.png`;
    document.querySelectorAll(`.card__forecast`).forEach(card =>{
        card.classList.remove(`card__forecast-darked`);
    });
    document.querySelector(`.weather__search`).classList.remove(`weather__search-dark`);
}
})

const getCardTime = (arrData) =>{
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 );
    const localTime = new Date(utcTime.getTime() + arrData.timezone * 1000 + 10000000 + 1000000);

    const cardTime = document.createElement(`div`);
    cardTime.classList.add(`card__time`);
    cardTime.innerHTML = `
        <p class="name__city">${arrData.name}</p>
        <p class="card__clock">${localTime.getUTCHours()}:${localTime.getUTCMinutes().toString().padStart(2, '0')}</p>
        <p class="card__weak">${localTime.toLocaleString("en", {weekday: "long", timeZone: 'UTC'} )}, ${localTime.getUTCDate()} ${localTime.toLocaleString("en", {month: "short", timeZone: 'UTC'})}</p>
    `;
    mainContent.append(cardTime);
}

const getCardInfo = (arrData, arrData2) =>{
    const iconCode = arrData.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    const cardInfo = document.createElement(`div`);
    cardInfo.classList.add(`card__info`);
    const sunriseTime = new Date(arrData.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunsetTime = new Date(arrData.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});


    cardInfo.innerHTML = `
    <div class="box__left">
        <p class="info__temp">${Math.ceil(arrData.main.temp)}°C</p>
        <div class="feels__like">
            <p class="feels__text">Feels like:</p>
            <p class="feels__temp">${Math.ceil(arrData.main.feels_like)}°C</p>
        </div>
        <div class="info__sun">
            <img src="./img/sunrise-white.png" alt="" class="sun__img">
            <div class="sunrise__block">
                <p class="sunrise__text">Sunrise</p>
                <p class="sunrise__time">${sunriseTime} AM</p>
            </div>
        </div>
        <div class="info__sun">
            <img src="./img/sunset-white2.png" alt="" class="sun__img2">
            <div class="sunrise__block">
                <p class="sunrise__text">Sunset</p>
                <p class="sunrise__time">${sunsetTime} AM</p>
            </div>
        </div>
    </div>
    <div class="box__mid">
        <img src="${weatherIconUrl}" alt="" class="mid__img">
        <p class="mid__text">${arrData.weather[0].main}</p>
    </div>
    <div class="box__right">
        <div class="right__column">
            <img src="./img/right__img.png" alt="" class="right__img" id="humidity">
            <p class="right__text">${arrData.main.humidity}%</p>
            <p class="right__text2">Humidity</p>
        </div>
        <div class="right__column">
            <img src="./img/wind.png" alt="" class="right__img" id="wind">
            <p class="right__text">${arrData.wind.speed}km/h</p>
            <p class="right__text2">Wind Speed</p>
        </div>
        <div class="right__column">
            <img src="./img/pressure-white.png" alt="" class="right__img" id="clock">
            <p class="right__text">${arrData.main.pressure}hPa</p>
            <p class="right__text2">Pressure</p>
        </div>
        <div class="right__column">
            <img src="./img/uv-white.png" alt="" class="right__img" id="uv">
            <p class="right__text">${arrData2.now.uvi}</p>
            <p class="right__text2">UV</p>
        </div>
    </div>
    `
    mainContent.append(cardInfo);
}

const getCardsDays = (arrData3) =>{
    const cardDays = document.createElement(`div`);
    cardDays.classList.add(`card__days`);
    const forecasts = arrData3.list;

    // Начало содержимого cardDays
    let content = '<p class="days__title">5 Days Forecast:</p>';

    // Выборка и добавление одного прогноза на день
    for (let i = 0; i < forecasts.length; i += 8) {
        const forecast = forecasts[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = Math.round(forecast.main.temp);
        
        // Добавление нового элемента прогноза к содержимому
        content += `
            <div class="days__row">
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="" class="days__img">
                <p class="days__temp">${temperature}°C</p>
                <p class="days__text">${dayName}, ${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}</p>
            </div>
        `;
    }

    cardDays.innerHTML = content;
    mainContent.append(cardDays);
}

const getCardForecast = (arrData3) =>{
    const cardForecast = document.createElement(`div`);
cardForecast.classList.add(`cards__forecast`);

let cardsContent = `
<div class="title__box">
    <p class="forecast__title">Hourly Forecast:</p>
</div>
<div class="cards__box">`;

// Фильтруем данные, чтобы получить прогнозы начиная с 12:00 до 00:00
const filteredForecasts = arrData3.list.filter(forecast => {
    const hour = new Date(forecast.dt * 1000).getHours();
    return hour >= 12 && hour <= 24; // От 12:00 до 00:00 (примечание: 24 не включается, т.к. это 00:00 следующего дня)
}).slice(0, 5); // Ограничиваем количество карточек до 5

// Добавляем карточки для каждого временного промежутка
filteredForecasts.forEach((forecast, index) => { // Добавлен index
    const date = new Date(forecast.dt * 1000);
    const hours = date.getHours();
    const temp = Math.round(forecast.main.temp);
    const windSpeed = forecast.wind.speed;
    const windDirection = forecast.wind.deg; // Добавлено для угла направления ветра
    const formattedHour = hours === 0 ? '00:00' : `${hours}:00`;

    // Проверяем, является ли текущий элемент одним из последних двух
    const isDark = index >= filteredForecasts.length - 2 ? 'card__forecast-dark' : '';

    // Добавляем inline стиль для поворота изображения
    const rotationStyle = `style="transform: rotate(${windDirection}deg);"`;

    cardsContent += `
    <div class="card__forecast ${isDark}"> <!-- Использование isDark -->
        <p class="forecast__time">${formattedHour}</p>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="weather icon" class="forecast__img">
        <p class="forecast__temp">${temp}°C</p>
        <img src="./img/forecast__navigation.png" alt="img" class="forecast__navigation" ${rotationStyle}>
        <p class="forecast__km">${windSpeed}km/h</p>
    </div>`;
});

cardsContent += `</div>`;
cardForecast.innerHTML = cardsContent;
mainContent.append(cardForecast);
}

const getErrorContent = () =>{
    // const errorContent = document.createElement(`div`);
    // errorContent.classList.add(`main__error`);
    mainContent.innerHTML = `
    <div class="main__error">
        <p class="error__text">Ooops. Something went wrong.</p>
        <p class="error__text-mini">Error info</p>
    </div>
    `
    if(checkbox.checked) {
        document.querySelectorAll(`p`).forEach(p => {p.classList.add(`.main__error`)})
    } else {
        document.querySelectorAll(`p`).forEach(p => {p.classList.remove(`.main__error-dark`)})
    }
}

const getDataUV = async (data) =>{
    const uvAPI = `https://currentuvindex.com/api/v1/uvi?latitude=${data.coord.lat}&longitude=${data.coord.lon}`;
    try{
        const response = await fetch(uvAPI);
        if (!response.ok) throw new Error(`Network response was not ok`);
        data2 = await response.json();
        console.log(data2);
        return data2;
    } catch (error) {
        getErrorContent(error.message);
    }
}
const getDataFiveDays = async (lat, lon) =>{
    const fiveDaysAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    try {
        const response = await fetch(fiveDaysAPI);
        if (!response.ok) throw new Error(`Network response was not ok`);
        const data3 = await response.json();
        console.log(data3);
        return data3;
    } catch (error) {
        getErrorContent(error.message);
    }
}

const getData = async (city) =>{
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
    try{
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`Network response was not ok`);
        data = await response.json();
        console.log(data);
        getCardTime(data);
        const dataUV = await getDataUV(data);

        const lat = data.coord.lat;
        const lon = data.coord.lon;

        getCardInfo(data, dataUV);
        const dataFiveDays = await getDataFiveDays(lat, lon)
        getCardsDays(dataFiveDays);
        getCardForecast(dataFiveDays)
    } catch (error) {
        getErrorContent(error.message);
    }
}


const getPogodaAPI = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiURLAnother = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
        const uvAPI = `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`;
        const fiveDaysAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
        try {
            const response = await fetch(apiURLAnother);
            const response2 = await fetch(uvAPI); 
            const response3 = await fetch(fiveDaysAPI)
            if (!response.ok) throw new Error(`Network response was not ok`);
            arrData = await response.json();
            arrData2 = await response2.json();
            arrData3 = await response3.json();
            console.log(arrData);
            console.log(arrData2);
            console.log(arrData3);
            getCardTime(arrData);
            getCardInfo(arrData,arrData2);
            getCardsDays(arrData3);
            getCardForecast(arrData3);
        } catch (error) {
            console.log(error);
            getErrorContent(error.message);
        }
    }, error => {
        console.error("Error getting location: ", error);
        // getErrorContent("Error getting location");
        // getPogodaIP();
    });
};
getPogodaAPI();

