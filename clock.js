const clockContainer = document.getElementById('jsClock')
const clockTitle = clockContainer.querySelector('h1')
const clockDate = clockContainer.querySelector('h2')

function getTime() {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}`

}

function getDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    // console.log(year, month, day);
    clockDate.innerHTML = `${day < 10 ? `0${day}`: day}.${month < 10 ? `0${month}`: month}.${year < 10 ? `0${year}`: year}`
}

function init() {
    getTime()
    setInterval(getTime, 1000)
    getDate()
}

init()