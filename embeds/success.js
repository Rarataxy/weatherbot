const discord = require('discord.js');
const config = require('../config/config.json')
module.exports = {
    success: function success() {
        let  emb = new discord.RichEmbed()
            .setColor("#2c9601")
            .addField("Success!", "the command has been run perfectly")
            .addField(":gear: prefix", 'The prefix is now set to ' + config.prefix)
        return emb;
}}