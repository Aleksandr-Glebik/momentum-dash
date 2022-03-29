const body = document.querySelector('body')
const IMAGE_NUMBER = 15

function showImage(number) {
    const img = new Image()
    img.classList.add('bgImg')
    img.src = `img/${number + 1}.jpg`
    body.prepend(img)
}

function getNumber() {
    let number = Math.floor(Math.random() * IMAGE_NUMBER)
    return number
}

function init() {
    const randomNumber = getNumber()
    // console.log(randomNumber);
    showImage(randomNumber)
}

init()