const discord = require('discord.js');
const bot = new discord.Client();
const config = require("./config/config.json");
const weatherStatus = require("./weatherStatus.json");
const weatherupdater = require("./weatherupdater.js");
const weatherData = require("./weatherData.json");
const weather = require("./weather.json");
const functions = require("./functions.js");
const fs = require("fs");


bot.login(config.token);

bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('message', message => {
    if (message.content === config.prefix + 'help'){
      let embedHelp = new discord.RichEmbed()
        .setTitle("help command")
        .setColor(functions.colors())
        .addField("Standard", "`Help`, `ping`, `prefix`")
        .addField("Settings", "`setpref`")
        .addField("weather/Events", "`weather`, `weather Alter`, `Events`, `Event Alter`")
      return message.channel.send(embedHelp);
    }  
  });

  bot.on('message', message =>{
    if (message.content === ';;prefix') {
      let curpref = new discord.RichEmbed()
        .setTitle("whats ur prefix?")
        .setColor(functions.colors())
        .addField(":b: prefix", "The current prefix is set to " + config.prefix)
      return message.channel.send(curpref)
}
});

bot.on('message', message =>{ 
    if(message.content.startsWith(config.prefix + 'setpref')){
        if(message.member.hasPermission('ADMINISTRATOR')){
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        config.prefix = newPrefix;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        let prefEmb = new discord.RichEmbed()
         .setColor(fuinctios.colors())
         .addField("Success!", "the command has been run perfectly")
         .addField(":gear: prefix", 'The prefix is now set to ' + config.prefix)
        return message.channel.send(prefEmb);
    }
        else{
            return console.log("yeet")
        }};
  });

  bot.on('message', message => {     
    if(message.content === config.prefix + 'ping') {
      message.channel.send('Pong');
      weatherupdater.updateC();
    }
});

bot.on('message', message => {
    if(message.content === config.prefix + 'weather'){
      let weatherEmb = new discord.RichEmbed()
       .setColor(weather.C)
       .addField(":earth_africa: weather", 'What\'s the weather today?')
       .addField(weather.E1 + ' ' + weatherData.weather, weather.E2 + ' ' + weather.D)
      return message.channel.send(weatherEmb);
    }
});