const discord = require('discord.js');
const config = require("../config/config.json");

module.exports = {
    start: function start() {
            let emb = new discord.RichEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#ff0040")
                .setTitle("Started successfully!")
                .setDescription('Events are on dy default.\n To turn them off run `' + config.prefix + 'togglevents on/off`')
            return emb;
}}