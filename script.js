document.addEventListener('DOMContentLoaded' , ()=> {
    const cityInput=document.getElementById("city-input")
    const getWeatherBtn =document.getElementById("get-weather-btn")
    const weatherInfo=document.getElementById("weather-info")
    const citynamedisply=document.getElementById("city-name")
    const temperaturedisplay=document.getElementById("temperature")
    const descriptiondisplay=document.getElementById("description")
    const errordisplay=document.getElementById("error-message")

    const API_KEY="5878b94dfe5477c1516719e69ffbd463"  //env varibale.
    //STEP 2...
    
getWeatherBtn.addEventListener('click',async()=>{
    const city=cityInput.value.trim()
    if(!city) return ;  

    //it may through an error
    //server/database is always in another country..

    try {
       const weatherdata= await fetweatherdata(city);
       displayweatherdata(weatherdata);
    } catch (error) {
        showerror();
    }
})
// when press enter it works as click the getbutton weather..
cityInput.addEventListener("keydown", (event)=>{
    if(event.key=="Enter"){
        getWeatherBtn.click(); //calss the getweather fucntion
    }
})


  // Step 3 Now making a web request ...
async function fetweatherdata(city){
    //get the data....
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

   //STEP 4...
   const response= await fetch(url);  //await means wait here until the task is nnot finished
   console.log(typeof response);
   console.log("response" ,response);
    if(!response.ok){
        throw new Error("City not found")
    }
    const data = await response.json()
    return data
}
//STEP 5...
function displayweatherdata(data){
    //display weather data
    console.log(data);
    const{name,main,weather}=data
    citynamedisply.textContent=name;
temperaturedisplay.textContent = `${Math.round(main.temp)}°C`;
   descriptiondisplay.textContent =
    `Weather: ${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}`;
    
    cityInput.value="";
    //unlock the display....
    weatherInfo.classList.remove('hidden');
    errordisplay.classList.add('hidden');
    
}
// step 4..
function showerror(){
    weatherInfo.classList.add('hidden');  //hide the weather info
    errordisplay.classList.remove('hidden'); // unhide the error
    cityInput.value="";
}


});