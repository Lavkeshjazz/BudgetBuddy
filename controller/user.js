
var bodyParser = require('body-parser');
const axios = require("axios");

const place="New Delhi";
const place2="Mumbai";
const place3="Kolkata";
const place4="Bangalore";
const place5="Pune";
const place6="Hyderabad";


const API_URL = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";
const options = {
    // method: 'GET',
     // url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
     // params: {city: 'Seattle'},
     headers: {
       'X-RapidAPI-Key': '735e72ee60msh6ec9764972a47e2p159ad9jsn95a7f88fe07d',
       'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
     }
   };

async function defaultPage(req,res){
    const response1 = await axios.get(API_URL+"?city="+place,options);
// const response2 = await axios.get(API_URL+"?city="+place2,options);
// const response3= await axios.get(API_URL+"?city="+place3,options);
// const response4= await axios.get(API_URL+"?city="+place4,options);
// const response5= await axios.get(API_URL+"?city="+place5,options);
// const response6= await axios.get(API_URL+"?city="+place6,options);
    try {
        const response = await axios.get(API_URL+"?city="+place,options);
      res.render("index.ejs",{
          heading : "Weather for "+place,
          temp: response.data.feels_like,
          mintemp: response.data.min_temp,
          maxtemp:response.data.max_temp,
          wspeed:response.data.wind_speed,
          hmdtiy:response.data.humidity,
          wdegree:response.data.wind_degrees,
          feels1:response1.data.feels_like,
          humid1:response1.data.humidity,
          max1:response1.data.max_temp,
          min1:response1.data.min_temp,
          ws1:response1.data.wind_speed,
    
          feels2:response1.data.feels_like,
          humid2:response1.data.humidity,
          max2:response1.data.max_temp,
          min2:response1.data.min_temp,
          ws2:response1.data.wind_speed,
    
          feels3:response1.data.feels_like,
          humid3:response1.data.humidity,
          max3:response1.data.max_temp,
          min3:response1.data.min_temp,
          sunr3:response1.data.sunrise,
          suns3:response1.data.sunset,
          ws3:response1.data.wind_speed,
    
          feels4:response1.data.feels_like,
          humid4:response1.data.humidity,
          max4:response1.data.max_temp,
          min4:response1.data.min_temp,
          ws4:response1.data.wind_speed,
    
          feels5:response1.data.feels_like,
          humid5:response1.data.humidity,
          max5:response1.data.max_temp,
          min5:response1.data.min_temp,
          ws5:response1.data.wind_speed,
    
          feels6:response1.data.feels_like,
          humid6:response1.data.humidity,
          max6:response1.data.max_temp,
          min6:response1.data.min_temp,
          ws6:response1.data.wind_speed,
        })
    } catch (error) {
        console.error(error);
      res.render("index1.ejs",{
        heading:"Oops...! It seem's like you entered wrong spelling.",
        heading1:"Please correct it and try again :)",
      });
    }
}

async function searchResult(req,res){
    const searchjagah =req.body.city;
    const firstLetter = searchjagah.charAt(0);
    const capitalizedFirstLetter = firstLetter.toUpperCase();
    const capitalizedString = capitalizedFirstLetter + searchjagah.slice(1);
    const response1 = await axios.get(API_URL+"?city="+place,options);
// const response2 = await axios.get(API_URL+"?city="+place2,options);
// const response3= await axios.get(API_URL+"?city="+place3,options);
// const response4= await axios.get(API_URL+"?city="+place4,options);
// const response5= await axios.get(API_URL+"?city="+place5,options);
// const response6= await axios.get(API_URL+"?city="+place6,options);
    try{
      const response = await axios.get(API_URL+"?city="+searchjagah,options);
      //console.log(response.data);
  
    res.render("index.ejs",{
      heading : "Weather for "+capitalizedString,
      temp: response.data.feels_like,
        mintemp: response.data.min_temp,
        maxtemp:response.data.max_temp,
        wspeed:response.data.wind_speed,
        hmdtiy:response.data.humidity,
        wdegree:response.data.wind_degrees,
  
        feels1:response1.data.feels_like,
        humid1:response1.data.humidity,
        max1:response1.data.max_temp,
        min1:response1.data.min_temp,
        ws1:response1.data.wind_speed,
  
        feels2:response1.data.feels_like,
        humid2:response1.data.humidity,
        max2:response1.data.max_temp,
        min2:response1.data.min_temp,
        ws2:response1.data.wind_speed,
  
        feels3:response1.data.feels_like,
        humid3:response1.data.humidity,
        max3:response1.data.max_temp,
        min3:response1.data.min_temp,
        ws3:response1.data.wind_speed,
  
        feels4:response1.data.feels_like,
        humid4:response1.data.humidity,
        max4:response1.data.max_temp,
        min4:response1.data.min_temp,
        ws4:response1.data.wind_speed,
  
        feels5:response1.data.feels_like,
        humid5:response1.data.humidity,
        max5:response1.data.max_temp,
        min5:response1.data.min_temp,
        ws5:response1.data.wind_speed,
  
        feels6:response1.data.feels_like,
        humid6:response1.data.humidity,
        max6:response1.data.max_temp,
        min6:response1.data.min_temp,
        ws6:response1.data.wind_speed,
        
    })
    }catch (error) {
      console.log(error);
      res.render("index1.ejs",{
        heading:"Oops...! It seem's like you entered wrong spelling.",
        heading1:"Please correct it and try again :)",
      });
    }
}
module.exports = {
    defaultPage,searchResult
};