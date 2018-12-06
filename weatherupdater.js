const weatherData = require("./weatherData.json");
const weather = require("./weather.json")
const weatherStatus = require("./weatherStatus.json");
const fs = require("fs");


function weatherUpdateR(){
    weather.C = weatherStatus.RC;
    weather.E1 = weatherStatus.RE1;
    weather.E2 = weatherStatus.RE2;
    weather.D = weatherStatus.RD;
    fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
}

function weatherUpdateS(){
    weather.C = weatherStatus.SC;
    weather.E1 = weatherStatus.SE1;
    weather.E2 = weatherStatus.SE2;
    weather.D = weatherStatus.SD;
    fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
}

function weatherUpdateT(){
    weather.C = weatherStatus.TC;
    weather.E1 = weatherStatus.TE1;
    weather.E2 = weatherStatus.TE2;
    weather.D = weatherStatus.TD;
    fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
}

function weatherUpdateW(){
    weather.C = weatherStatus.WC;
    weather.E1 = weatherStatus.WE1;
    weather.E2 = weatherStatus.WE2;
    weather.D = weatherStatus.WD;
    fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
}
