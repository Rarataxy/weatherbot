const discord = require('discord.js');
const wtthr = require("../weather.json");

module.exports = {
    weather: function () {
        let emb = new discord.RichEmbed()
            .setAuthor("Weather", icon_url = `${wtthr.icon}`)
            .setColor(wtthr.C)
            .setDescription("What's the current weather?")
            .addField(wtthr.E1 + '  ' + wtthr.N, '***      ***' + '  ' + wtthr.D, false)
        return emb
    }
}