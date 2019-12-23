const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    if(message.channel.id != "601625571289464832") return message.reply(`Você não pode executar comandos aqui, vá em <#601625571289464832>`).then(msg => msg.delete(5000))
   message.delete().catch(O_o=>{})
    const form = new Discord.RichEmbed()
       .setColor("#4a4a4a")
       .setAuthor("© BlackMC - Formuláros")
       
       .setDescription("Aqui você ira encontrar todos os nossos forms.")
       .addField("Formulário para ``Trial-Moderador``:","https://goo.gl/forms/lGdFwT3STe25raVg2")
       
       .setTimestamp()
       .setFooter(`© BlackMC - Formulários`)
    
    message.channel.send(message.author , form).then(msg => msg.delete(3000));

}