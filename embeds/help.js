const discord = require('discord.js');
const config = require('../config/config.json')
module.exports = {
    help: function help() {
            let emb = new discord.RichEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#956a6a")
                .setTitle("List of all commands")
                .addField("General", "`help`, `start`", false)
                .addField("Settings", "`setpref`, `togglevents`", false)
                .addField("Weather", "`weather`, `event`, `weatheralter`", false)
                .setFooter(`The current prefix is ${config.prefix}`)
            return emb;
}}