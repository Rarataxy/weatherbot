const discord = require('discord.js');
const event = require('../events.json');
const config = require('../config/config.json');

module.exports = {
    on: function (){
            let emb = new discord.RichEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#39b01c")
                .setTitle("Events had been turned on!")
            return emb
    },
    off: function() {
            let emb = new discord.RichEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#c0150c")
                .setTitle("Events had been turned off!")
            return emb
    },
    help: function() {
            let emb = new discord.RichEmbed()
            .setColor("#7CFC00")
            .setTitle("Weather Altering Spell")
            .setDescription("Choose an option:")
            .addField("on, off", `Usage: ${config.prefix}togglevents <on/off>`, false)
            return emb
        }
}