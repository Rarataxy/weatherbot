const event = require("./events.json");
const eventStatus = require("./eventStatus.json")
const fs = require("fs");

module.exports = {
    avalanche:    function A(){
                     event.C = eventStatus.AC;
                     event.E1 = eventStatus.AE1;
                     event.E2 = eventStatus.AE2;
                     event.D = eventStatus.AD;
                    fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
                },
    
    stars:    function S(){
                     event.C = eventStatus.SNC;
                     event.E1 = eventStatus.SNE1;
                     event.E2 = eventStatus.SNE2;
                     event.D = eventStatus.SND;
                    fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
                },
    
    tornado:    function T(){
                     event.C = eventStatus.TC;
                     event.E1 = eventStatus.TE1;
                     event.E2 = eventStatus.TE2;
                     event.D = eventStatus.TD;
                    fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
                },
    
    moon:    function FM(){
                     event.C = eventStatus.FMC;
                     event.E1 = eventStatus.FME1;
                     event.E2 = eventStatus.FME2;
                     event.D = eventStatus.FMD;
                    fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
                },
    
    fstars:    function FS(){
                     event.C = eventStatus.FSC;
                     event.E1 = eventStatus.FSE1;
                     event.E2 = eventStatus.FSE2;
                     event.D = eventStatus.FSD;
                    fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
                },
    
    eclypse:    function E(){
                     event.C = eventStatus.EC;
                     event.E1 = eventStatus.EE1;
                     event.E2 = eventStatus.EE2;
                     event.D = eventStatus.ED;
                    fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
                }
    };