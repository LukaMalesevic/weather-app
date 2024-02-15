import "./style.css";
import sunnyBackground from "../dist/images/sunny-weather.jpg";

const changeDegButton = document.getElementById('change-degrees-btn');
const animatedCircle = document.getElementsByClassName('circle');
const degreesMain = document.getElementsByClassName('degrees');
const degreeFeelsLike = document.getElementsByClassName('feels-like');
const form = document.getElementById('submit-form');
let temp = ['', ''];
let feelstemp = ['', ''];

let circleStyle = window.getComputedStyle(animatedCircle[0]);
const fahrenheitSVG = `<svg viewBox="-3 -2 30 30" id='Fahrenheit_Symbol_24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect stroke='none' fill='#000000' opacity='0'/> <g transform="matrix(0.83 0 0 0.83 12 12)" > <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-14.99, -15)" d="M 6.4003906 3 C 4.4193906 3 3 4.3512813 3 6.2382812 C 3 8.1522813 4.4323906 9.5185781 6.4003906 9.5175781 C 8.3413906 9.5175781 9.7597656 8.1522813 9.7597656 6.2382812 C 9.7597656 4.3512813 8.3543906 3 6.4003906 3 z M 6.3867188 4.96875 C 7.1227188 4.96875 7.6855469 5.5179063 7.6855469 6.2539062 C 7.6855469 7.0029062 7.1497187 7.5507812 6.3867188 7.5507812 C 5.6377188 7.5507813 5.0878906 7.0169062 5.0878906 6.2539062 C 5.0878906 5.5309063 5.6367188 4.98175 6.3867188 4.96875 z M 13 5 C 12.448 5 12 5.448 12 6 L 12 26 C 12 26.552 12.448 27 13 27 L 16 27 C 16.552 27 17 26.552 17 26 L 17 18 L 25 18 C 25.552 18 26 17.552 26 17 L 26 15 C 26 14.448 25.552 14 25 14 L 17 14 L 17 9 L 25.972656 9 C 26.524656 9 26.972656 8.552 26.972656 8 L 26.972656 6 C 26.972656 5.448 26.524656 5 25.972656 5 L 13 5 z" stroke-linecap="round" /> </g></svg>`
const celsiusSVG = `<svg id='temperature-celsius_24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/> <g transform="matrix(1 0 0 1 12 12)" > <g style="" > <g transform="matrix(1 0 0 1 0 0)" > <path style="stroke: none; stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 0 0 L 24 0 L 24 24 L 0 24 z" stroke-linecap="round" /> </g> <g transform="matrix(1 0 0 1 -6 -4)" > <circle style="stroke: rgb(33,33,33); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" cx="0" cy="0" r="2" /> </g> <g transform="matrix(1 0 0 1 4.5 0)" > <path style="stroke: rgb(33,33,33); stroke-width: 3; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-16.5, -12)" d="M 20 9 C 20 7.343145750507619 18.65685424949238 6 17 6 L 16 6 C 14.34314575050762 6 13 7.343145750507619 13 9 L 13 15 C 13 16.65685424949238 14.34314575050762 18 16 18 L 17 18 C 18.65685424949238 18 20 16.65685424949238 20 15" stroke-linecap="round" /> </g> </g> </g> </svg>`

document.body.style.backgroundImage = `url("${sunnyBackground}")`;

form.addEventListener('submit', ()=>{
    event.preventDefault()
    getLocationFromUser();
})

getWeatherData('novi-sad');

async function getWeatherData(location)
{
    try{
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=82564c6c39af4d99b9882829241502&q=${location}`,
            {
              mode: 'cors',
            }
        );
        
        const weatherData = await response.json();
        const newData = processWeatherData(weatherData);
        displayWeatherData(newData);
        form.reset();
        
    }catch(error){
        console.log(error);
    }
}

function processWeatherData(weatherData)
{
    let currentWeatherData = {
        name: weatherData.location.name,
        country: weatherData.location.country,
        temperature: {
            f: Math.round(weatherData.current.temp_f),
            c: Math.round(weatherData.current.temp_c),
        },
        feelsLike: {
            f: Math.round(weatherData.current.feelslike_f),
            c: Math.round(weatherData.current.feelslike_c),
        },
        wind: Math.round(weatherData.current.wind_mph),
        humidity: Math.round(weatherData.current.humidity)
    };

    temp[0] = (currentWeatherData.temperature.f);
    temp[1] = (currentWeatherData.temperature.c);

    feelstemp[0] = (currentWeatherData.feelsLike.f);
    feelstemp[1] = (currentWeatherData.feelsLike.c);

    return currentWeatherData;
}


function displayWeatherData(newData)
{
    const locationHeading = document.getElementsByTagName('h1');
    locationHeading[0].innerHTML = newData.name + ', ' + newData.country;
    if(circleStyle.marginLeft === "52px"){
        
        degreeFeelsLike[0].innerHTML = 'FEELS LIKE: '+ newData.feelsLike.c + celsiusSVG;
        degreesMain[0].innerHTML = newData.temperature.c + celsiusSVG;

    }else{
        degreeFeelsLike[0].innerHTML = 'FEELS LIKE: '+ newData.feelsLike.f + fahrenheitSVG;
        degreesMain[0].innerHTML = newData.temperature.f + fahrenheitSVG;
    }

    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');

    wind.innerHTML = 'WIND: ' + newData.wind + ' MPH';
    humidity.innerHTML = 'HUMIDITY: ' + newData.humidity + ' %';

}

function getLocationFromUser()
{
    const locationInput = document.getElementById('search-city');
    const location = locationInput.value;
    getWeatherData(location);
}

changeDegButton.addEventListener("click", ()=>{
    if(circleStyle.marginLeft === "0px")
    {
        animatedCircle[0].innerHTML = celsiusSVG;
        animatedCircle[0].style.marginLeft = "52px";

        degreesMain[0].innerHTML = temp[1] + celsiusSVG;
        degreeFeelsLike[0].innerHTML = 'FEELS LIKE : ' + feelstemp[1] + celsiusSVG;

        
    }else if(circleStyle.marginLeft === "52px")
    {
        animatedCircle[0].style.marginLeft = "0px";
        animatedCircle[0].innerHTML = fahrenheitSVG;

        degreesMain[0].innerHTML = temp[0] + fahrenheitSVG;
        degreeFeelsLike[0].innerHTML = 'FEELS LIKE : ' + feelstemp[0] + fahrenheitSVG;
        
    }
})
