//requirements

//config/ dcjs
const discord = require('discord.js');
const config = require("./config/config.json");

//weather/ event stuff
const weatherupdater = require("./weatherupdater.js");
const eventUpdater = require("./eventUpdater.js");
const weatherData = require("./weatherData.json");
const weather = require("./weather.json");
const event = require("./events.json");

//other usefull stuff
const functions = require("./functions.js");
const fs = require("fs");

//embeds
const ehelp = require('./embeds/help');
const ewthr = require('./embeds/weather');
const eevnt = require('./embeds/event');
const estrt = require('./embeds/start');
const eeror = require('./embeds/error');
const esucc = require('./embeds/success');
const ealtr = require('./embeds/alter');

//variables
var forecast;
var mnt;
let prefix = config.prefix;
let mainchannel = config.channel;

//login
const bot = new discord.Client({disableEveryone: true});
bot.login(config.token);


//log on start
bot.on('ready', () => {
  console.log(`${bot.user.username} is ready!`);
  bot.user.setActivity('the human realm', {type: "WATCHING"});
});

//find channels, start embed
bot.on('ready', () => {
  forecast = bot.channels.find('name', mainchannel);
  mountain = bot.channels.find('name', 'mountain');
  if (!forecast) {
    console.log(`[ERR] No ${mainchannel} decected! ZEUS will now shutdown`);
    bot.destroy(bot)
  } else {
    return forecast.send(estrt.start());
  }
});

//help command
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if (message.content.toLowerCase() === config.prefix + 'help') {
    return message.channel.send(ehelp.help())
  }
});

//set the prefix
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if (message.content.startsWith(config.prefix + 'setpref')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(eeror.error());
    }
    else {
      let newPrefix = message.content.split(" ").slice(1, 2)[0];
      config.prefix = newPrefix;
      fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
      message.guild.member(bot.user).setNickname(`[${config.prefix}]${bot.user.username}`);
      return message.channel.send(esucc.success())
    }
  };
});

bot.on('message', message => {
  if (message.content.toLowerCase() === `${config.prefix}togglevents`) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      let arg = message.content.split(" ").slice(1, 2)[0];
      if (arg === "on") {
        config.events = "on"
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        let emb = new discord.RichEmbed()
          .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
          .setColor("#39b01c")
          .setTitle("Events had been turned on!")
        return message.channel.send(emb)
      } else {
        config.events = "off"
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        let emb = new discord.RichEmbed()
          .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
          .setColor("#c0150c")
          .setTitle("Events had been turned off!")
        return message.channel.send(emb)
      }
    } else {
      return;
    }
  }
});

//actuall weather stuff

//whats the weather
bot.on('message', message => {
  if (message.content.toLowerCase() === config.prefix + 'weather') {
    return message.channel.send(ewthr.weather());
  }
});

//whats the event
bot.on('message', message => {
  if (message.content.toLowerCase() === config.prefix + 'event') {
    return message.channel.send(eevnt.event());
  }
});

// WeatherAlter magic
bot.on('message', message => {
  if (message.content.startsWith(config.prefix + 'weatheralter')) {
    if (message.member.roles.find("name", "weather mage")) {
      let wArg = message.content.split(" ").slice(1, 2)[0];
      if (wArg === '1' || wArg === 'sunny') {
        weatherupdater.sunny();
        weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        forecast.send(ewthr.weather());
        const author = message.author.username;
        message.channel.send(ealtr.alter(author));

      } else if (wArg === '2' || wArg === 'windy') {
        weatherupdater.windy();
        weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        forecast.send(ewthr.weather());
        const author = message.author.username;
        message.channel.send(ealtr.alter(author));

      } else if (wArg === '3' || wArg === 'cloudy') {
        weatherupdater.cloudy();
        weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        forecast.send(ewthr.weather());
        const author = message.author.username;
        message.channel.send(ealtr.alter(author));

      } else if (wArg === '4' || wArg === 'rainy') {
        weatherupdater.rainy();
        weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        forecast.send(ewthr.weather());
        const author = message.author.username;
        message.channel.send(ealtr.alter(author));

      } else if (wArg === '5' || wArg === 'stormy') {
        weatherupdater.stormy();
        weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        forecast.send(ewthr.weather());
        const author = message.author.username;
        message.channel.send(ealtr.alter(author));

      } else if (wArg === '6' || wArg === 'snowy') {
        weatherupdater.snowy();
        weatherData.weather = weather.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        forecast.send(ewthr.weather());
        const author = message.author.username;
        message.channel.send(ealtr.alter(author));

      } else if (wArg === undefined) {
        message.channel.send(ealtr.help())
      } else {
        message.channel.send('`Invalid weather condition. Type ' + config.prefix + 'weatheralter for more info.`')
      }
    } else {
      message.channel.send('`Yah Yeet No can do`')
    }
  }
})





//timeline

const weathers = [weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.cloudy, weatherupdater.windy, weatherupdater.sunny, weatherupdater.rainy, weatherupdater.stormy]
const events = [eventUpdater.avalanche, eventUpdater.fstars, eventUpdater.moon, eventUpdater.stars, eventUpdater.tornado]


function seasonUp() {
  let season = weatherData.season;
  let eclypse = weatherData.eclypse;
  if (season < 4) {
    weatherData.season = season + 1;
    fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
  } else {
    weatherData.season = 1;
    weatherData.eclypse = eclypse + 1;
    fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);

    if (weatherData.eclypse === 4 && config.events === "on") {
      let rand = Math.floor(Math.random() * 1000);
      setTimeout(function () {
        weatherData.eclypse = 0;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        eventUpdater.eclypse();
        weatherData.event = event.N;
        fs.writeFile("./weatherData.json", JSON.stringify(weatherData), (err) => console.error);
        let eventEmb = new discord.RichEmbed()
          .setAuthor("Event", icon_url = `${event.E1}`)
          .setColor(event.C)
          .setDescription("What's the current event?")
          .addField(event.E2 + '  ' + event.N, '***      ***' + '  ' + event.D, false)
        forecast.send(eventEmb)
      }, rand);
    }
  }
}

function weatherUp() {
  let season = weatherData.season;
  if (season === 4) {
    const weathers = [weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.cloudy, weatherupdater.windy, weatherupdater.sunny, weatherupdater.rainy, weatherupdater.stormy]
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
    let eventEmb = new discord.RichEmbed()
      .setColor(weather.C)
      .setAuthor('The weather for now:', icon_url = weather.E2)
      .addField(weather.E1 + '  ' + weather.N, '***      ***' + '  ' + weather.D, false)
    forecast.send(eventEmb)
  } else if (season === 3) {
    const weathers = [weatherupdater.cloudy, weatherupdater.rainy, weatherupdater.sunny, weatherupdater.stormy, weatherupdater.windy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.windy, weatherupdater.cloudy, weatherupdater.rainy]
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
    let eventEmb = new discord.RichEmbed()
      .setColor(weather.C)
      .setAuthor('The weather for now:', icon_url = weather.E2)
      .addField(weather.E1 + '  ' + weather.N, '***      ***' + '  ' + weather.D, false)
    forecast.send(eventEmb)
  } else if (season === 2) {
    const weathers = [weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.cloudy, weatherupdater.cloudy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.windy]
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
    let eventEmb = new discord.RichEmbed()
      .setColor(weather.C)
      .setAuthor('The weather for now:', icon_url = weather.E2)
      .addField(weather.E1 + '  ' + weather.N, '***      ***' + '  ' + weather.D, false)
    forecast.send(eventEmb)
  } else {
    const weathers = [weatherupdater.windy, weatherupdater.windy, weatherupdater.windy, weatherupdater.cloudy, weatherupdater.cloudy, weatherupdater.snowy, weatherupdater.snowy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.sunny]
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
    let eventEmb = new discord.RichEmbed()
      .setColor(weather.C)
      .setAuthor('The weather for now:', icon_url = weather.E2)
      .addField(weather.E1 + '  ' + weather.N, '***      ***' + '  ' + weather.D, false)
    forecast.send(eventEmb)
  }
}

function eventup() {
  if (config.ready === "on") {

    let rand = events[Math.floor(Math.random() * events.length)];
    (rand)();
    let eventEmb = new discord.RichEmbed()
      .setAuthor("Event", icon_url = `${event.E1}`)
      .setColor(event.C)
      .setDescription("What's the current event?")
      .addField(event.E2 + '  ' + event.N, '***      ***' + '  ' + event.D, false)
    channel.send(eventEmb)
  } else {
    return
  }
}


//in case shit goes wrong
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if(message.content.toLowerCase() === `${config.prefix}emergencystartup`) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(errorembed);
    else {
      eventUpdater.eclypse();
      weatherupdater.stormy();
      message.delete();
    }
  }
});
