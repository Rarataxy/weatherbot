const weatherData = require("./weatherData.json");
const weather = require("./weather.json")
const weatherStatus = require("./weatherStatus.json");
const fs = require("fs");

module.exports = {
updateR:    function UpdateR(){
                 weather.C = weatherStatus.RC;
                 weather.E1 = weatherStatus.RE1;
                 weather.E2 = weatherStatus.RE2;
                 weather.D = weatherStatus.RD;
                fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
            },

updateS:    function UpdateS(){
                 weather.C = weatherStatus.SNC;
                 weather.E1 = weatherStatus.SNE1;
                 weather.E2 = weatherStatus.SNE2;
                 weather.D = weatherStatus.SND;
                fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
            },

updateT:    function UpdateT(){
                 weather.C = weatherStatus.TC;
                 weather.E1 = weatherStatus.TE1;
                 weather.E2 = weatherStatus.TE2;
                 weather.D = weatherStatus.TD;
                fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
            },

updateW:    function UpdateW(){
                 weather.C = weatherStatus.WC;
                 weather.E1 = weatherStatus.WE1;
                 weather.E2 = weatherStatus.WE2;
                 weather.D = weatherStatus.WD;
                fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
            },

updateC:    function UpdateC(){
                 weather.C = weatherStatus.CC;
                 weather.E1 = weatherStatus.CE1;
                 weather.E2 = weatherStatus.CE2;
                 weather.D = weatherStatus.CD;
                fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
            },

updateS:    function UpdateS(){
                 weather.C = weatherStatus.SC;
                 weather.E1 = weatherStatus.SE1;
                 weather.E2 = weatherStatus.SE2;
                 weather.D = weatherStatus.SD;
                fs.writeFile("./weather.json", JSON.stringify(weather), (err) => console.error);
            }
};