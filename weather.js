const COORDS_LS = 'coords'
const API_KEY = '3add0df8cd60074880ae83777aafe663'

const weatherDisplay = document.getElementById('js-weather')
const btnWeather = document.getElementById('js-btnWeather')
const inputWeather = document.getElementById('js-inputWeather')
const formInputWeather = document.getElementById('js-formInputWeather')

function clearDisplayWeather(elem) {
    elem.innerHTML = ''
}

function setWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                // console.log('json: ', json);
                // console.log('json.cod:', json.cod);
                if (json.cod >= 200 && json.cod < 300) {
                    let latitude = json.coord.lat
                    let longitude = json.coord.lon
                    const positionObj = {
                        latitude,
                        longitude
                    }
                    clearDisplayWeather(weatherDisplay)
                    saveCoords(positionObj)
                    getWeather(latitude, longitude)
                    inputWeather.classList.add('hide')
                    btnWeather.classList.remove('hide')
                } else {
                    // console.log('json.cod', json.cod);
                    let errorMessage = json.message.toUpperCase()
                    clearDisplayWeather(weatherDisplay)
                    weatherDisplay.insertAdjacentHTML('afterbegin',
                    `<h2 class="displayWeather__place">${errorMessage}</h2>`)
                }
            })
            
}

function submitHandler(event) {
    event.preventDefault()
    // console.log('event', event);
    let inputValue = inputWeather.value
    // console.log('inputValue:', inputValue);
    setWeather(inputValue)
}
function showAndAskInput() {
    inputWeather.classList.remove('hide')
    btnWeather.classList.add('hide')
    formInputWeather.addEventListener('submit', submitHandler)
    // let nameCity = inputWeather.value
    // console.log(nameCity);
}

btnWeather.addEventListener('click', showAndAskInput)

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${API_KEY}`)
        .then(function(response) {
            // console.log('response:', response.json())
            return response.json()
        })
        .then(function(json) {
            // console.log('json: ', json);
            const temp = json.main.temp.toFixed(0)
            // const description = json.weather[0].description
            const desc = json.weather[0]['description']
            const wind = json.wind.speed
            const place = json.name
            // weatherDisplay.innerText = `${temp}${description}${wind}${place}`

            weatherDisplay.insertAdjacentHTML('afterbegin',
            `<h2 class="displayWeather__place">${place}</h2>
             <p class="displayWeather__desc">${desc}</p>
             <p class="displayWeather__wind">${wind}м/с</p>
             <p class="displayWeather__temp">${temp}&deg;C</p>`)
        })
}

function saveCoords(positionObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj))
}

function succesGetCoords(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    // console.log(position);
    const positionObj = {
        latitude,
        longitude
    }
    saveCoords(positionObj)
    getWeather(latitude, longitude)
    // console.log(positionObj);
    // console.log('Получена геолокация');
}

function errorGetCoords() {
    console.log('Ваша геолокация не определена');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(succesGetCoords, errorGetCoords)
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LS)
    if (coords === null) {
        // координат нет в ls
        askForCoords()
    } else {
        // КООРДИНАТЫ ЕСТЬ В KS
        const loadedCoords = JSON.parse(coords)
        // console.log(loadedCoords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude)
    }
}

function init() {
    getCoords()
}

init()