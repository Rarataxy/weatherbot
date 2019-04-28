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
const fs = require("fs");

//embeds
const ehelp = require('./embeds/help');
const ewthr = require('./embeds/weather');
const eevnt = require('./embeds/event');
const estrt = require('./embeds/start');
const eeror = require('./embeds/error');
const esucc = require('./embeds/success');
const ealtr = require('./embeds/alter');
const etogg = require('./embeds/togglevents')

//variables
var forecast;
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
  forecast = bot.channels.find(x => x.name === mainchannel);
  if (!forecast) {
    console.log(`[ERR] No ${mainchannel} decected! ${bot.user.username} will now shutdown`);
    bot.destroy(bot)
  } else {
    return forecast.send(estrt.start());
  }
});

//in case shit goes wrong
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if(message.content.toLowerCase() === `${config.prefix}start`) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(errorembed);
    else {
      weatherUp();
      eventUp();
      message.delete();
    }
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


// togglevents
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if (message.content.startsWith(`${config.prefix}togglevents`)) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      let arg = message.content.split(" ").slice(1, 2)[0];
      if (arg === "on") {
        config.events = "on"
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        message.channel.send(etogg.on())
      } else if(arg === "off"){
        config.events = "off"
        fs.writeFile("./config/config.json", JSON.stringify(config), (err) => console.error);
        message.channel.send(etogg.off())
      } else {
        message.channel.send(etogg.help())
      }
    } else {
      return message.channel.send('`yah yeet no can do`');
    }
  }
});

//actuall weather stuff

//whats the weather
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if (message.content.toLowerCase() === config.prefix + 'weather') {
    return message.channel.send(ewthr.weather());
  }
});

//whats the event
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if (message.content.toLowerCase() === config.prefix + 'event') {
    return message.channel.send(eevnt.event());
  }
});

// WeatherAlter magic
bot.on('message', message => {
  if(message.author.bot || message.channel.type === 'dm') return;

  if (message.content.startsWith(config.prefix + 'weatheralter')) {
    if (message.member.roles.find(x => x.name === "Weather Mage")) {
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

const moment = require('moment');
var weatherTimer
var eventTimer

const weathers = [weatherupdater.cloudy, weatherupdater.cloudy, weatherupdater.cloudy, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.sunny, weatherupdater.windy, weatherupdater.windy, weatherupdater.rainy, weatherupdater.rainy, weatherupdater.stormy, weatherupdater.stormy]
const events = [eventUpdater.fstars, eventUpdater.moon, eventUpdater.stars, eventUpdater.tornado]

weatherTimer = moment().add(30, 'minutes');
eventTimer = moment().add(4, 'days')

setInterval(() => {
        var tmer = moment();
        if(weatherTimer.diff(tmer, 'minutes') <= 1){
          weatherTimer = moment().add(30, 'minutes');
          weatherUp();
        };
        if(eventTimer.diff(tmer, 'minutes') <= 1 && config.events === "on"){
          eventTimer = moment().add(4, 'days');
          eventUp();
        }
    }, 6000);

function weatherUp() {
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    (rand)()
    forecast.send(ewthr.weathernn())
}

function eventUp() {
    let rand = events[Math.floor(Math.random() * events.length)];
    (rand)()
    forecast.send(eevnt.event())
}