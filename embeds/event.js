const discord = require('discord.js');
const event = require('../events.json')

module.exports = {
    event: function evnt(){
        let emb = new discord.RichEmbed()
            .setAuthor("Event", icon_url = `${event.icon}`)
            .setColor(event.C)
            .setDescription("What was the last event?")
            .addField(event.E2 + '  ' + event.N, '***      ***' + '  ' + event.D, false)
        return emb
    }
}