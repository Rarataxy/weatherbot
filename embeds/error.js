const discord = require('discord.js');

module.exports = {
    error: function error() {
            let emb = new discord.RichEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#ff0a16")
                .setTitle(":x: ***Error!***")
                .setDescription("*You don't have permission to do this!*")
            return emb;
}}