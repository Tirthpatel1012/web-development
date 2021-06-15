const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

res.sendFile(__dirname+"/index.html");


});

app.post("/", function(req,res){
console.log(req.body.cityName);
const query = req.body.cityName;
const apiKey = "60ca90f63d76b2b3a5831b0ad4e1e5d2";
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url, function(response){
console.log("response");

response.on("data",function(data){
const weatherData =  JSON.parse(data);

const object = {
  name: "tirth",
  favouriteFood: "pizza",
  favouritecar: "mercides"
}
console.log(JSON.stringify(object));

const temp = weatherData.main.temp

const dis = weatherData.weather[0].description

const icon = weatherData.weather[0].icon;
const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
res.write("<h1>the temperature in "+query+" is "+temp+" degress celcius.</h1>");
res.write("<h3>The weather is currently "+dis+"</h3>");
res.write("<img src="+imageURL+">");
res.send();
});
});

});

app.listen(3000 , function()
{
    console.log("Server is running on port 3000");
});
