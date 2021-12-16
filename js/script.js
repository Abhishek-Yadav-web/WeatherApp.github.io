let searchBx = document.getElementById("searchBx");
let searchBtn = document.getElementById("searchBtn");
let weatherIcon = document.getElementById("weatherIcon");
let counName = document.getElementById("counName");
let DateTime = document.getElementById("DateTime");
let weatherInfo = document.getElementById("weatherInfo");
var Data = [];

searchBtn.onclick = () => {
    if(searchBx.value != ""){
        getWeatherInfo(searchBx.value);
    }else{
        alert("Please Write Something In Input Box.")
    }
}

async function getWeatherInfo(ccName){
    let apiKey = 'fc811d90abd841419a3193401211612';
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ccName}&aqi=no`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        Data = data;
        update(Data);
    } catch (error) {
        console.log(`Something Went Wrong, ${error}`)
    }
}

let update = (info) => {
    let icon = info.current.condition.icon;
    weatherIcon.setAttribute('src',`http:${icon}`)
    let ccnamE = `${info.location.name}, ${info.location.region}`;
    counName.innerText = ccnamE;
    setDayNTime(info);
    let temp = `${info.current.temp_c} °C`;
    let weather = info.current.condition.text;
    let cloud = info.current.cloud;
    weatherInfo.innerText = `Temp : ${temp}
    Weather : ${weather}
    cloud : ${cloud}`;
}

let setDayNTime = (info) => {
    let today = new Date();
    let Days = ['Sun','Mon','Tue','Wed','Thu','Fir','Sat']
    let todayDay = Days[today.getDay()];
    let todayDateNTime = info.location.localtime;
    DateTime.innerText = `${todayDay}, ${todayDateNTime}`;    
    
}