const discord = require('discord.js');

module.exports = {
    help: function help() {
            let emb = new discord.RichEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#956a6a")
                .setTitle("List of all commands")
                .addField("General", "`help`, `start`", true)
                .addField("Settings", "`setpref`, `togglevents`", true)
                .addField("Weather", "`weather`, `event`, `weatheralter`", true)
            return emb;
}}