console.log('Conectando...');
const Discord = require('discord.js');
const Youtube = require('simple-youtube-api');
const Ytdl = require('ytdl-core');
const filaDeMusicas = [];
let estouPronto = false;
const {GOOGLE_KEY } = require('./config.js');
const youtube = new Youtube(GOOGLE_KEY);
const client = new Discord.Client();
const preferencias = require('./config.json');
const prefix = preferencias.prefix;
const prefixow = preferencias.prefixow;
const fs = require('fs');
var comandos = new Discord.Collection();

client.on('ready', () =>{
console.log('\n==============================');
console.log('CONECTADO! BOT ONLINE!');
console.log(`O meu prefixo é ${prefix}`);
console.log('==============================');
	
    const activities = ['no Blackmc.cf', 'jogos como Vocês 😍', 'use ;ajuda para ver meus cmds.', 'criado por Sloowy#1630.']
    let counter = 0
    setInterval(function() {
        client.user.setGame(activities[counter], "https://www.twitch.tv/marcelloowdlc")
        counter+= 1
        counter %= activities.length
    }, 10000)

});
client.on('guildMemberAdd', member => {

console.log(`${member}`, "entrou!" + `${member.guild.name}`)

});
client.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', 'Em Captcha');
    var role2 = member.guild.roles.find('name', '👤| Membros');
    member.addRole(role)
    let captcha = new Discord.RichEmbed()
     .setDescription('CAPTCHA\n\n<@' + member.id + '> Isso é apenas um captcha, para seguir para o discord\nreaja abaixo com :tickets: ')
     .setColor('#0a9fb3')
     .setTimestamp()
      let entrada = member.guild.channels.find(c => c.name == 'captcha') ;
      entrada.send(captcha).then(msg => {
        msg.react('🎟')
     const admfilter = (reaction, user) => reaction.emoji.name === '🎟' && user.id === member.id;
     const adm = msg.createReactionCollector(admfilter, { time: 60000 }); 
 adm.on('collect', async bot => {
                member.addRole(role2)
                member.removeRole(role)
                client.message.delete(captcha)
        })})})
client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', '🚪│entrada');
  let avatar = member.user.avatarURL
  if (!channel) return;
  let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(avatar)
      .addField('🎊 Bem vindo ao discord.', `Bem vindo(a) ${member} ao discord oficial do BlackMC!\n Você foi o __${member.guild.memberCount}__ player a entrar em nosso servidor\n \nPara interagir com os player vá em: <#601625999687286784>\nPara ver os nossos anúncios vá em: <#588053875324616704>\n`)
      .setFooter(`Black - Entrada`);
      channel.sendEmbed(embed);
});
client.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', '🚪│saída');
    let avatar = member.user.avatarURL
    if (!channel) return;
    let embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(avatar)
        .addField('🎈 Saiu do servidor.', `O ${member} saiu do BlackMC =(\n Agora temos __${member.guild.memberCount}__ Player(s) em nosso servidor.\n`)
        .setFooter(`Black - Saída`);
	channel.sendEmbed(embed2);
  
    });
client.on('guildMemberAdd', member => {
  let embed = new Discord.RichEmbed()
    .setColor('#2fd12c')
    .setDescription(`Olá. Seja **bem-vindo(a)** ao Discord da nossa Rede Black! :tada: 
:small_blue_diamond: Antes de interagir, leia o canal de **regras**.
:small_blue_diamond: **Twitter:** @BlackMC.
:small_blue_diamond: **IP:** BlackMC.cf`)
    .setTimestamp()

  member.sendEmbed(embed);
});
client.on('message', async (msg) => {
  if (msg.content === ';entrar'){
      if (msg.member.voiceChannel){
          msg.member.voiceChannel.join();
          estouPronto = true;
  } 
    else {
         msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
 }
}
  else if (msg.content === ';sair'){
      if (msg.member.voiceChannel){
          msg.member.voiceChannel.leave();
          estouPronto = false;
  } 
    else {
         msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
  }
 }
  else if (msg.content.startsWith(';tocar ')){
      if (estouPronto){
          let oQueTocar = msg.content.replace(';tocar ', '');
          try {
            let video = await youtube.getVideo(oQueTocar);
            msg.channel.send(`Video encontrado! ${video.title}`);
            filaDeMusicas.push(oQueTocar);
              if (filaDeMusicas.length === 1) {
                tocarMusica(msg);
           }
          } catch(error) {
             try {
               let videosPesquisados = await youtube.searchVideos(oQueTocar, 5);
               let videoEncontrado;
               for (let i in videosPesquisados){
                 videoEncontrado = await youtube.getVideoByID(videosPesquisados[i].id);
                 msg.channel.send(`${i}: Video encontrado: ${videoEncontrado.title}`);
               }
               msg.channel.send({embed: {
                 color: 3447003,
                 description: 'Escolha uma música de acordo com as cores, clicando nas reações!'
               }}).then( async (embedMessage) => {
                 await embedMessage.react('🟥');
                 await embedMessage.react('🟦');
                 await embedMessage.react('🟧');
                 await embedMessage.react('🟩');
                 await embedMessage.react('🟫');
                 
               const filter = (reaction, user) => {
               return ['🟥', '🟦', '🟧', '🟩', '🟫'].includes(reaction.emoji.name)
                 && user.id === msg.author.id;
            }

            let collector = embedMessage.createReactionCollector(filter, {time: 20000});
            collector.on('collect', async (reaction, rectionCollector) => {
             if (reaction.emoji.name === '🟥'){
            videoEncontrado = await youtube.getVideoByID(videosPesquisados[0].id);
            filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
          }
          else if (reaction.emoji.name === '🟦'){
            videoEncontrado = await youtube.getVideoByID(videosPesquisados[1].id);
            filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
          }
           else if (reaction.emoji.name === '🟧'){
            videoEncontrado = await youtube.getVideoByID(videosPesquisados[2].id);
            filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
           }
           else if (reaction.emoji.name === '🟩'){
            videoEncontrado = await youtube.getVideoByID(videosPesquisados[3].id);
            filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
          }
          else if (reaction.emoji.name === '🟫'){
            videoEncontrado = await youtube.getVideoByID(videosPesquisados[4].id);
            filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
          }
              if (filaDeMusicas.length === 1) {
                tocarMusica(msg);
}
});
               });
             } catch(error) {
               msg.channel.send('Nenhum video foi encontrado!');
             }
          }
  } 
}
    else if (msg.content === ';pausar'){
      if (msg.member.voiceChannel){
        if (msg.member.voiceChannel.connection.dispatcher){  
        if (!msg.member.voiceChannel.connection.dispatcher.paused){
          msg.member.voiceChannel.connection.dispatcher.pause();
            } 
        else {
          msg.channel.send('Eu já estou Pausado!');     
            }
      }
        else {
          msg.channel.send('Eu nem estou tocando nada..');
        }
  } 
    else {
         msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
 }
}
      else if (msg.content === ';retomar'){
      if (msg.member.voiceChannel){
        if (msg.member.voiceChannel.connection.dispatcher){  
        if (msg.member.voiceChannel.connection.dispatcher.paused){
          msg.member.voiceChannel.connection.dispatcher.resume();
            } 
        else {
          msg.channel.send('Eu não estou Pausado!');     
            }
      }
        else {
          msg.channel.send('Eu nem estou tocando nada..');
        }
  } 
    else {
         msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
 }
}
    else if (msg.content === ';fim'){
      if (msg.member.voiceChannel){
        if (msg.member.voiceChannel.connection.dispatcher){
            msg.member.voiceChannel.connection.dispatcher.end();
            while (filaDeMusicas.length > 0){
                   filaDeMusicas.shift();
              }
            }
      else {
        msg.channel.send('');
      }
  } 
    else {
         msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
  }
 }
    else if (msg.content === ';pular'){
      if (msg.member.voiceChannel){
        if (msg.member.voiceChannel.connection.dispatcher){
            if (filaDeMusicas.length > 1){
                msg.member.voiceChannel.connection.dispatcher.end();
                }
          else {
            msg.channel.send('Não existem mais músicas para serem tocadas!');
          }
            }
        else {
          msg.channel.send('Não estou tocando nada!');
        }
  } 
    else {
         msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
  }
 }
});
function tocarMusica(msg){
  msg.member.voiceChannel.connection.playStream(Ytdl(filaDeMusicas[0]))
      .on('end', () => {
    filaDeMusicas.shift();
    if(filaDeMusicas.length >= 1) {
       tocarMusica(msg);
       }
  });
}
client.on('message', message =>{
  if(message.content.includes("https://discord.gg/")){
    message.delete()
    message.channel.send(`${message.author}, Neste grupo, é proibido à divulgação de convites de outros grupos!`)
  }
})
client.on('message', message =>{
  if(message.content.includes("https://discord.me/")){
    message.delete()
    message.channel.send(`${message.author}, Neste grupo, é proibido à divulgação de convites de outros grupos!`)
  }
})

client.on("error", e => console.log(e));

client.on('message', message =>{

var autor = message.author;
var msg = message.content.toUpperCase();
var cont = message.content.slice(prefix.lenght).split('');
  
if(message.channel.type === "dm") return;
if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const allargs = args.join(" ");
  
  try {
    let commandFile = require(`./comandos/${command}.js`);
    commandFile.run(client, message, args);
	  
	  
   } catch (err) {
	   return;
   }
	
});
client.login(process.env.TOKEN);
