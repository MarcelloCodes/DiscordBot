const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: false});

module.exports.run = (bot, message, args) => {
    if(!message.member.roles.find("name", '👑 Dono')) return message.channel.sendMessage(":x: | Você não possui permissão")
    const msg = args.join(" ");
    message.delete().catch();

  bot.channels.get('643493967463448598').send({
    "embed": {
        "author": { 
            "name": "© BlackMC - Logs",
            "icon_url": "https://cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif"
        },
        "description": `<@${message.author.id}> enviou um aviso no canal: <#${message.channel.id}> contendo a mensagem: \`\`\`${msg}\`\`\``,
        "color": 3553598,  
        "timestamp": new Date(),
        "footer": {
            "icon_url": 'https://images-ext-1.discordapp.net/external/e582qwSV-ODGJLTgWGp8MwHwscZj_U3z5SHexKV4YJ8/https/cdn.discordapp.com/emojis/460157783300636682.gif',
            "text": "© BlackMC - Logs"
        },
    }
  })
  message.channel.send("@everyone")
  message.channel.send({
    "embed": {
        "author": { 
            "name": "© BlackMC - Anúncios",
            "icon_url": "https://media.discordapp.net/attachments/450286752888782848/482340628940849153/Server_Icon.Logo.png?width=591&height=473",
            "url": "https://hastebin.com/kequkuqawu.nginx"
        },
        "description": msg,
        "color": 3553598,  
        "timestamp": new Date(),
        "footer": {
            "icon_url": 'https://cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif',
            "text": "© BlackMC - Anúncios"
        },
    }
})
}