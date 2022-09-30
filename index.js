console.log("Weather");
let weather=document.querySelector("#btn");
let container=document.querySelector("#container");
let map=document.querySelector("#gmap_canvas");
weather.addEventListener("click",getData);
let city=document.querySelector("#city");
let forecast=document.querySelector("#forecast");
const key="ea88282707681f4858fa13b74de257c9";

function getData(){
    event.preventDefault();
    let c=city.value; 
    container.innerHTML="";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${key}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${c}&appid=${key}`

    fetch(url).then((res)=>{
        return res.json();
    }).then((res)=>{
        displayData(res,c);
    })

    fetch(forecastUrl).then((response)=>{
        return response.json();
    }).then((response)=>{
        showData(response);
    })
}

function displayData(res,c){
    let box1=document.createElement("div");
    box1.setAttribute("class","box1");
    let box2=document.createElement("div");
    box2.setAttribute("class","box2");
    // let temp_min=document.createElement("div");
    let temp_max=document.createElement("div");
    let air_pressure=document.createElement("div");
    let humidity=document.createElement("div");
    let wind=document.createElement("div");
    let temp=Math.floor(res.main.temp-273);
    temp_max.innerHTML=`MAX <br>${Math.floor(res.main.temp_max-273)}°`;
    air_pressure.innerHTML=`PRESSURE <br>${res.main.pressure} mb` 
    humidity.innerHTML=`HUMIDITY <br> ${res.main.humidity}%`;
    wind.innerHTML=`WIND <br> ${res.wind.speed}km/h`;
    box1.innerHTML=`<h5>${res.name}</h5><br><h1><img src="https://img.icons8.com/fluency/96/000000/sun.png"/> ${temp}°C </h1>FEELS LIKE ${Math.floor(res.main.feels_like-273)}°<br><p>The skies will be ${res.weather[0].main}. The low will be ${Math.floor(res.main.temp_min-273)}°`
    box2.append(temp_max,air_pressure,humidity,wind)
    container.append(box1,box2);
    container.style.backgroundImage="url('https://media1.giphy.com/media/uOuiK4F5zZkZ2/giphy.gif?cid=ecf05e47k22honuy3rhghjqijm8hn7v1uzjv72roe8kbry9e&rid=giphy.gif&ct=g')";
    map.src=`https://maps.google.com/maps?q=${c}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

function showData(data){
    forecast.innerHTML=null;
    const list=data.list;
    let days=[];
    let arr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    for(let i=2;i<list.length;i=i+8){
        days.push(list[i]);
    }
    days.forEach(element => {
        let box= document.createElement("div");
        let day= document.createElement("h6");
        let img=document.createElement("img");
        let maxTemp=document.createElement("h6");
        let minTemp=document.createElement("h6");
        box.setAttribute("class","foreBox");
        let date=element.dt_txt;
        date=new Date(date);
        let d=date.getDay();
        day.innerText=arr[d];
        maxTemp.innerText=`${Math.floor(element.main.temp_max-273)}°`;
        minTemp.innerText=`${Math.floor(element.main.temp_min-273)}°`;
        img.src=`http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
        box.append(day,img,maxTemp,minTemp);
        forecast.append(box)   
    });

}
