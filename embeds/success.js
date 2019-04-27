const discord = require('discord.js');
const config = require('../config/config.json')
module.exports = {
    success: function success() {
        let  emb = new discord.RichEmbed()
            .setColor("#2c9601")
            .addField("Success!", "The command has been run")
        return emb;
}}