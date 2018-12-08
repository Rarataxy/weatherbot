const discord = require('discord.js');
const bot = new discord.Client();
const config = require("./config/config.json");
const weatherupdater = require("./weatherupdater.js");
const eventUpdater = require("./eventUpdater.js");
const weatherData = require("./weatherData.json");
const functions = require("./functions.js");
const weather = require("./weather.json");
const event = require("./events.json");
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
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        let prefEmb = new discord.RichEmbed()
         .setColor(functions.colors())
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
      message.channel.send('Pong!');
      weatherupdater.cloudy();
      eventUpdater.eclypse();
    }
});


//actuall weather stuff



bot.on('message', message => {
    if(message.content === config.prefix + 'weather'){
      let weatherEmb = new discord.RichEmbed()
       .setColor(weather.C)
       .addField(":earth_africa: Weather", 'What\'s the weather today?')
       .addField(weather.E1 + ' ' + weatherData.weather, weather.E2 + ' ' + weather.D)
      return message.channel.send(weatherEmb);
    }
});

bot.on('message', message =>{
  if(message.content === config.prefix + 'event'){
    let eventEmb = new discord.RichEmbed()
     .setAuthor("WeatherBot Events", icon_url="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fluchesa-vol-9%2F128%2FWeather-512.png&f=1")
     .setColor(event.C)
     .setTitle(event.E1 + "  Events")
     .setDescription("What's the current event?")
     .addField(event.E2 + '  ' + weatherData.event, '***                  ***' + '  ' + event.D, false)
     .setFooter("------------------------ events ------------------------")
     return message.channel.send(eventEmb);
  }
});


//alter commands
bot.on('message', message =>{
  if (message.content.startsWith(config.prefix + 'weatheralter')) {
    if(message.member.roles.find("name", "weather mage")){
      let wArg = message.content.split(" ").slice(1, 2)[0];
      if( wArg === '1' || wArg === 'sunny'){
        weatherupdater.sunny();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle('@everyone ' + author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if ( wArg === '2' || wArg === 'windy') {
        weatherupdater.windy();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle(author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if ( wArg === '3' || wArg === 'cloudy'){
        weatherupdater.cloudy();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle(author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if ( wArg === '4' || wArg === 'rainy'){
        weatherupdater.rainy();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle(author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if ( wArg === '5' || wArg === 'stormy'){
        weatherupdater.stormy();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle(author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if ( wArg === '6' || wArg === 'snowy'){
        weatherupdater.snowy();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle(author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if( wArg === undefined){
        let alterEmb = new discord.RichEmbed()
      .setColor("#7CFC00")
      .setTitle("Weather Altering Spell")
      .setDescription("Select an option to change weather:")
      .addField("[1] sunny\n[2] windy\n[3] cloudy\n[4] rainy\n[5] stormy\n[6] snowy", "Usage: " + config.prefix + 'alter <1-6> || ' + config.prefix + 'alter <weather>', false)
    message.channel.send(alterEmb)
      }
      else{
        message.channel.send('Invalid weather condition. Type ' + config.prefix + 'alter for more info.')
      }
    }
    else{
      message.channel.send('yah yeet no can do')
    }
}})