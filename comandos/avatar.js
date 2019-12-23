const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{
    if(message.channel.id != "601625571289464832") return message.reply(`Você não pode executar comandos aqui, vá em <#601625571289464832>`).then(msg => msg.delete(5000))
    

   let member = message.mentions.members.first();
   
   if(member) {
     
   const avatar = new Discord.RichEmbed()
      
      .setTitle("🖼 Avatar de " + `${member.user.username}`)
      .setDescription(`Clique [aqui](${member.user.avatarURL}) para fazer o download da imagem.`)
      .setImage(member.user.avatarURL)
      .setColor("#4a4a4a")
      .setFooter("© BlackMC - Avatar ")
   
      message.channel.send(avatar)
   
   } else {
      
   const avatar = new Discord.RichEmbed()
      .setTitle("🖼 Avatar de " + `${message.author.username}`)
      .setDescription(`Clique [aqui](${message.author.avatarURL}) para fazer o downlaod do seu avatar.`)
      .setImage(message.author.avatarURL)
      .setColor("#4a4a4a")
      .setFooter("© BlackMC - Avatar")
   
      message.channel.send(avatar)
      
   }
}