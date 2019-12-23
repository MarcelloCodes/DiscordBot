const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

   message.delete().catch(O_o=>{});

   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão! :x:");
   
   const comousar = new Discord.RichEmbed()
   .setAuthor("BlackMC", client.user.avatarURL)
   .setDescription(`Ao executar, ira limpar a quantia de mensagens definida`)
   .setColor("#cc22a7")
   .setFooter("© BlackMC - Limpar")
   .addField("Como usar:", "`;limpar (quantidade)`")

   const num = args.join(" ");

   if(!num) return message.channel.send(comousar).then(msg => msg.delete(10000));
   if(isNaN(num) == true) return message.reply("por favor, digite somente números, de 2 a 100. :x:").then(msg => msg.delete(10000));
   if(num < 2) return message.reply("por favor, digite o número maior que 2 para deletar as mensagens. :x:").then(msg => msg.delete(8000));
   if(num > 100) return message.reply("por favor, digite o número maior que 2 e menos que 100. :x:").then(msg => msg.delete(8000));
   message.channel.bulkDelete(args[0]).catch(error => message.reply(`algumas mensagens não puderam ser deletadas.`));
   
   message.channel.send(`O chat foi limpo! Limpado __${args[0]}__ mensagens por __${message.author}.__`).then(msg => msg.delete(5000));
   
}