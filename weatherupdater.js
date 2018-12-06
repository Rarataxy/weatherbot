const weatherData = require("./weatherData.json");
const weather = require("./weather.json")
const weatherStatus = require("./weatherStatus.json");
const fs = require("fs");


function weatherUpdateR(){
    weatherStatus.C = weather.RC;
    weatherStatus.E1 = weather.RE1;
    weatherStatus.E2 = weather.RE2;
    weatherStatus.D = weather.RD;
    fs.writeFile("./weatherStatus.json", JSON.stringify(weatherStatus), (err) => console.error);
}

function weatherUpdateS(){
    weatherStatus.C = weather.SC;
    weatherStatus.E1 = weather.SE1;
    weatherStatus.E2 = weather.SE2;
    weatherStatus.D = weather.SD;
    fs.writeFile("./weatherStatus.json", JSON.stringify(weatherStatus), (err) => console.error);
}

function weatherUpdateT(){
    weatherStatus.C = weather.TC;
    weatherStatus.E1 = weather.TE1;
    weatherStatus.E2 = weather.TE2;
    weatherStatus.D = weather.TD;
    fs.writeFile("./weatherStatus.json", JSON.stringify(weatherStatus), (err) => console.error);
}

function weatherUpdateW(){
    weatherStatus.C = weather.WC;
    weatherStatus.E1 = weather.WE1;
    weatherStatus.E2 = weather.WE2;
    weatherStatus.D = weather.WD;
    fs.writeFile("./weatherStatus.json", JSON.stringify(weatherStatus), (err) => console.error);
}
