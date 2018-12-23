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
var chann;
var mnt;

bot.login(config.token);

bot.on('ready', () => {
    console.log('Ready!');
    config.ready = "off";
    config.events = "on";
    fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
});

bot.on('message', message => {
  if(message.content === config.prefix + 'start'){
      if(config.ready === "off"){
          channel = message.client.channels.find('name', 'weather-forecast');
          mnt = message.client.channels.find('name', 'mountain');
          if(!mnt){
              config.mnt = "no";
              fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
          }
          else{
              config.mnt = "ye";
              fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
              setTimeout(function(){
                  config.events = "on";
              fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
              }, 500)
          }
          if(!channel){
              let emb = new discord.RichEmbed()
              .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
              .setColor("#ff0040")
              .setTitle("No *weather-forecast* detected.\n Please make one and then run this command again.")
              return message.channel.send(emb);      
          }
          else{
              config.ready = "on"
              fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);      
              let emb = new discord.RichEmbed()
              .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
              .setColor("#ff0040")
              .setTitle("Started successfully!")
              .setDescription('Events are on dy default.\n To turn them off run `' + config.prefix + 'togglevents on/off`')
              return message.channel.send(emb);  
          }
      }
      else{
          let emb = new discord.RichEmbed()
              .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
              .setColor("#ff0040")
              .setTitle("The bot is already on!")
              return message.channel.send(emb);      
      }
  }
})

bot.on('message', message => {
    if (message.content === config.prefix + 'help'){
      let emb = new discord.RichEmbed()
      .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
      .setColor("#956a6a")
      .setTitle("List of all commands")
      .addField("General", "`help`, `prefix`, `start`", true)
      .addField("Settings", "`setpref`, `togglevents`", true)
      .addField("Weather", "`weather`, `event`, `weatheralter`", true)
      return message.channel.send(emb);  
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
          let prefEmb = new discord.RichEmbed()
            .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
            .setColor("#c0150c")
            .setTitle(":x: ***Error!***")
            .setDescription("*You don't have permission to do this!*")
          return message.channel.send(prefEmb);
        }};
  });


//actuall weather stuff

function eventup(){
  if(config.ready === "on"){
    const events = [eventUpdater.avalanche, eventUpdater.fstars, eventUpdater.moon, eventUpdater.stars, eventUpdater.tornado]
    let rand = events[Math.floor(Math.random() * events.length)];
    (rand)();
    let eventEmb = new discord.RichEmbed()
      .setAuthor("WeatherBot Events", icon_url="https://i.imgur.com/38ayDN2.jpg")
      .setColor(event.C)
      .setTitle(event.E1 + "  Events")
      .setDescription("What's the current event?")
      .addField(event.E2 + '  ' + event.N, '***                  ***' + '  ' + event.D, false)
      .setFooter("------------------------ events ------------------------")
    channel.send(eventEmb)
  }
  else{
   return
  }
}

setInterval(eventup, Math.floor(Math.random()*100000000))

bot.on('message', message => {
  if(message.content.startsWith(config.prefix + 'togglevents')){
    if(message.member.hasPermission('ADMINISTRATOR')){
      let arg = message.content.split(" ").slice(1, 2)[0];
      if( arg === "on"){
        config.events = "on"
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        let emb = new discord.RichEmbed()
        .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
        .setColor("#39b01c")
        .setTitle("Events had been turned on!")
      return message.channel.send(emb)
      }
      else if( arg === "off"){
        config.events = "off"
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        let emb = new discord.RichEmbed()
          .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
          .setColor("#c0150c")
          .setTitle("Events had been turned off!")
        return message.channel.send(emb)
      }
    }
    else{
      return;
    }
}})

bot.on('message', message => {
    if(message.content === config.prefix + 'weather'){
      let weatherEmb = new discord.RichEmbed()
      .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
      .setColor(weather.C)
      .setTitle(weather.E1 + "  Weather")
      .setDescription("What's the current weather?")
      .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
      .setFooter("----------------------- weather -----------------------")
      return message.channel.send(weatherEmb);
    }
});

bot.on('message', message =>{
  if(message.content === config.prefix + 'event'){
    let eventEmb = new discord.RichEmbed()
     .setAuthor("WeatherBot Events", icon_url="https://i.imgur.com/38ayDN2.jpg")
     .setColor(event.C)
     .setTitle(event.E1 + "  Events")
     .setDescription("What's the current event?")
     .addField(event.E2 + '  ' + event.N, '***                  ***' + '  ' + event.D, false)
     .setFooter("------------------------ events ------------------------")
     return message.channel.send(eventEmb);
  }
});


//alter commands

bot.on('message', message =>{
  if (message.content.startsWith(config.prefix + 'weatheralter')) {
    if(message.member.roles.find("name", "weather mage")){
      let wArg = message.content.split(" ").slice(1, 2)[0];
      channel = message.client.channels.find('name', 'weather-forecast');
      if( wArg === '1' || wArg === 'sunny'){
        weatherupdater.sunny();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let weatherEmb = new discord.RichEmbed()
        .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
        .setColor(weather.C)
        .setTitle(weather.E1 + "  Weather")
        .setDescription("What's the current weather?")
        .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
        .setFooter("----------------------- weather -----------------------")
        channel.send(weatherEmb);
        let confEmb = new discord.RichEmbed()
         .setColor(weather.C)
         .setTitle(author + ' has used weather magic!')
         .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return message.channel.send(confEmb)
      }
      else if ( wArg === '2' || wArg === 'windy') {
        weatherupdater.windy();
         weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        const author = message.author.username;
        let weatherEmb = new discord.RichEmbed()
        .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
        .setColor(weather.C)
        .setTitle(weather.E1 + "  Weather")
        .setDescription("What's the current weather?")
        .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
        .setFooter("----------------------- weather -----------------------")
        channel.send(weatherEmb);
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
        let weatherEmb = new discord.RichEmbed()
        .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
        .setColor(weather.C)
        .setTitle(weather.E1 + "  Weather")
        .setDescription("What's the current weather?")
        .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
        .setFooter("----------------------- weather -----------------------")
        channel.send(weatherEmb);
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
        let weatherEmb = new discord.RichEmbed()
        .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
        .setColor(weather.C)
        .setTitle(weather.E1 + "  Weather")
        .setDescription("What's the current weather?")
        .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
        .setFooter("----------------------- weather -----------------------")
        channel.send(weatherEmb);
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
        let weatherEmb = new discord.RichEmbed()
        .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
        .setColor(weather.C)
        .setTitle(weather.E1 + "  Weather")
        .setDescription("What's the current weather?")
        .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
        .setFooter("----------------------- weather -----------------------")
        channel.send(weatherEmb);
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
        let weatherEmb = new discord.RichEmbed()
        .setAuthor("WeatherBot Weather", icon_url="https://i.imgur.com/38ayDN2.jpg")
        .setColor(weather.C)
        .setTitle(weather.E1 + "  Weather")
        .setDescription("What's the current weather?")
        .addField(weather.E2 + '  ' + weather.N, '***                  ***' + '  ' + weather.D, false)
        .setFooter("----------------------- weather -----------------------")
        channel.send(weatherEmb);
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

function seasonUp(){
  let season = weatherData.season;
  let eclypse =  weatherData.eclypse;
  if( season < 4 ){
      weatherData.season = season + 1;
      fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
  }
  else {
      weatherData.season = 1;
      weatherData.eclypse = eclypse + 1;
      fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
  
      if( weatherData.eclypse === 4 && config.events === "on" ){
          let rand = Math.floor(Math.random()*1000);
          setTimeout( function(){
              weatherData.eclypse = 0;
              fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
              eventUpdater.eclypse();
              weatherData.event = event.N;
              fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
              let eventEmb = new discord.RichEmbed()
              .setAuthor("WeatherBot Events", icon_url="https://i.imgur.com/38ayDN2.jpg")
              .setColor(event.C)
              .setTitle(event.E1 + "  Events")
              .setDescription("What's the current event?")
              .addField(event.E2 + '  ' + event.N, '***                  ***' + '  ' + event.D, false)
              .setFooter("------------------------ events ------------------------")
              channel.send(eventEmb)
          }, rand);
      }
  }
}

setInterval(seasonUp, 327600000)

function weatherUp(){
  let season = weatherData.season;
  if ( season === 4 ) {
    const weathers = [weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.cloudy, weatherupdater.windy, weatherupdater.sunny, weatherupdater.rainy, weatherupdater.stormy]
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
  }
  else if ( season === 3) {
    const weathers = [weatherupdater.cloudy, weatherupdater.rainy, weatherupdater.sunny, weatherupdater.stormy, weatherupdater.windy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.windy, weatherupdater.cloudy, weatherupdater.rainy]
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
  }
  else if ( season === 2) {
      const weathers =[weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.cloudy, weatherupdater.cloudy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.windy]
      let rand = weathers[Math.floor(Math.random() * weathers.length)];
      (rand)()
  }
  else {
      const weathers =[weatherupdater.windy, weatherupdater.windy, weatherupdater.windy, weatherupdater.cloudy, weatherupdater.cloudy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.sunny]
      let rand = weathers[Math.floor(Math.random() * weathers.length)];
      (rand)()
  }
}

setInterval(weatherUp, 1800000)

function avalanche(){
  if(config.mnt === "ye" && config.events === "on" ){
      let rand = Math.floor(Math.random()*10000);
      setTimeout( function(){
              eventUpdater.avalanche();
              weatherData.event = event.N;
              fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
              let eventEmb = new discord.RichEmbed()
              .setAuthor("WeatherBot Events", icon_url="https://i.imgur.com/38ayDN2.jpg")
              .setColor(event.C)
              .setTitle(event.E1 + "  Events")
              .setDescription("Huh? smonethings off...")
              .addField(event.E2 + '  ' + event.N, '***                  ***' + '  ' + event.D, false)
              .setFooter("------------------------ events ------------------------")
              mnt.send(eventEmb)
      }, rand)
  }
  else{
      return;
  }
}

setInterval(avalanche, 162000000)
