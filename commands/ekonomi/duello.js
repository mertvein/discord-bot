const Discord = require('discord.js');

exports.run = async (client, message, args, mongo, ayarlar, prefix, dil) => {
    const db = require('quick.db');

	if(!await db.fetch(`s.${message.author.id}`)) {
		message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(client.ayarlar.footer,message.author.avatarURL({dynamic:true})).setDescription(`
		**⚠️ Kullanım Şartı ⚠️ **
		
		  Botun ekonomi sisteminde bug ve illegal kasmanız bottan **__sınırsız engelleneceğiniz__** ve paranızın sıfırlanacağı anlamına gelmektedir.
		  Oluşabilecek herhangi bir problem sizin sorumluluğunuz altındadır. 
		  Onaylamak ve devam etmek için \`onayla\` yazmalısınız, iptal etmek için herhangi bir şey yazabilirsiniz.`))
      
        const filter = response => {
          return response.author.id === message.author.id;
        };
      
        message.channel.awaitMessages(filter, { max: 1, time: 0, errors: ['time'] }).then(async collected => {  
          if(collected.first().content === 'onayla') {
           await db.set(`s.${message.author.id}`, true);
            return global.oky(message,`Ekonomi şartlarını onayladınız!`,true)
          } else return;
        });
      
      } else {
	const yes = ['evet'];
	const no = ['hayır']

	const randomRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const verify = async(channel, user, time = 30000) => {
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice)) return true;
		if (no.includes(choice)) return false;
		return false;
	}
  this.fighting = new Set();
  
	let opponent = message.mentions.users.first()
	if (!opponent) {
		const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        Eğer düello komutunu kullanmak istiyorsan bir kişiyi etiketle lütfen!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
       return message.channel.send(embed)
	}
/*
	if(opponent.presence.status === "offline") {
		const embed = new Discord.MessageEmbed()
		.setColor(client.ayarlar.embedRenk)
		.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
		.setDescription(`
		${opponent} Adlı kişi aktif değil bu yüzden bu kişi ile oynayamazsın!
		`)
		.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
	   return message.channel.send(embed)
	}*/

	if(await db.fetch(`pasifmod_${opponent.id}`) === "aktif") {
		const embed = new Discord.MessageEmbed()
		.setColor(client.ayarlar.embedRenk)
		.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
		.setDescription(`
		${opponent} Adlı kişinin **Pasif Mod** Özelliği aktif bu yüzden onun ile düello yapamazsın!
		`)
		.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
	   return message.channel.send(embed)
	  }
	
	  if(await db.fetch(`pasifmod_${message.author.id}`) === "aktif") {
		const embed = new Discord.MessageEmbed()
		.setColor(client.ayarlar.embedRenk)
		.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
		.setDescription(`
		**Pasif Mod** aktif, bu yüzden her hangi bir kişi ile düello yapamazsın!
		`)
		.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
	   return message.channel.send(embed)
	  }
  
  if (opponent.bot) {
	const embed = new Discord.MessageEmbed()
	.setColor(client.ayarlar.embedRenk)
	.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
	.setDescription(`
	Botlar ile oynayamazsın!
	`)
	.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
   return message.channel.send(embed)
  }
  if (opponent.id === message.author.id) {
	const embed = new Discord.MessageEmbed()
	.setColor(client.ayarlar.embedRenk)
	.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
	.setDescription(`
	Kendin ile oynayamazsın!
	`)
	.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
   return message.channel.send(embed)
  }

		if (this.fighting.has(message.channel.id)) {
			const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        Kanal başına sadece bir düello oynayabilirsin!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
       return message.channel.send(embed)
		}

		if (this.fighting.has(message.author.id)) {
			const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        Şuanda bir kişi ile zaten düellodasın, bu yüzden düello yapamazsın!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
       return message.channel.send(embed)
		}

		this.fighting.add(message.channel.id);
		this.fighting.add(message.author.id);
		try {
			if (!opponent.bot) {
				const embed = new Discord.MessageEmbed()
                .setColor(client.ayarlar.embedRenk)
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
                .setDescription(`
                ${opponent}, düello isteği geldi. Düello'yu kabul ediyor musun? (\`evet\` veya \`hayir\` olarak cevap veriniz.)
                `)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
			  message.channel.send(embed)
			  
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					this.fighting.delete(message.author.id);
					const embed = new Discord.MessageEmbed()
                .setColor(client.ayarlar.embedRenk)
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
                .setDescription(`
                Maalesefki düello kabul edilmedi.
                `)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
                return message.channel.send(embed)
				}
			}
			
			let userHP = 500;
			let oppoHP = 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			}; 

			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) {
				const user = userTurn ? message.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, user.avatarURL({dynamic: true}))
        .setDescription(`
        ${user}, Hangi hamleyi yapmak istersin?
        Hamleler: \`saldır\`, \`savun\`, \`ultra\`, veya \`kaç\`

        » | **${message.author.username}**: ${userHP} :heartpulse:
        » | **${opponent.username}**: ${oppoHP} :heartpulse:
        `)
        .setFooter(client.ayarlar.embedFooter, user.avatarURL({dynamic: true}))
	  message.channel.send(embed)
	  
					const filter = res => res.author.id === user.id && ['saldır', 'savun', 'ultra', 'kaç'].includes(res.content.toLowerCase());
					const turn = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        ${user}, Üzgünüm ancak süren doldu!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        message.channel.send(embed)
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = ['saldır', 'savun', 'ultra'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'saldır') {
						const damage = Math.floor(Math.random() * (guard ? 30 : 100)) + 1;
						const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        ${user}, Başarılı bir şekilde **${damage}** Miktarında hasar vurdun!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        message.channel.send(embed)
						dealDamage(damage);
						reset();				
				} else if (choice === 'savun') {
					const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        ${user}, Kendisini **Kaptan Amerikanın** Kalkanı ile savundu!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        message.channel.send(embed)
					guard = true;
					reset(false);
				} else if (choice === 'ultra') {
					const miss = Math.floor(Math.random() * 10);
					if (!miss) {
						const damage = randomRange(100, guard ? 150 : 300);
                    dealDamage(damage);
        const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setDescription(`
        ${user}, Öte diyarlardan gelen bir ultra sonik güç ile saldırdın ve **${damage}** Miktarında hasar verdin!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        message.channel.send(embed)
						dealDamage(damage);
					} else {
						const embed = new Discord.MessageEmbed()
                    .setColor(client.ayarlar.embedRenk)
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
                    .setDescription(`
                    ${user}, Her ne kadar Öte Diyarlardan güç gelsede onu doğru düzgün kullanamadın...
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
                    message.channel.send(embed)
					}	
							reset();
			
				
						} else if (choice === 'kaç') {
							const embed = new Discord.MessageEmbed()
							.setColor(client.ayarlar.embedRenk)
							.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
							.setDescription(`
							${user}, Aşağılamak gibi olmasın ancak bir korkak tavuk gibi kaçtın!
							`)
							.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
							message.channel.send(embed)
					forfeit();
					break;
				} else {
					const embed = new Discord.MessageEmbed()
                    .setColor(client.ayarlar.embedRenk)
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
                    .setDescription(`
                    ${user}, Ne yapmak istediğini anlayamadım...
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
                    message.channel.send(embed)
				}
			}
			this.fighting.delete(message.channel.id);
			this.fighting.delete(message.author.id);
            const winner = userHP > oppoHP ? message.author : opponent;
			let sa = Math.floor(Math.random() * 5000)
            await db.add(`goldkredi_${winner.id}`, sa)

            const embed = new Discord.MessageEmbed()
            .setColor(client.ayarlar.embedRenk)
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setDescription(`
            ${winner}, Tebrikler oyunu kazandın!
			Hediye olarak sana **${sa}** Miktarında kredi verdim.

            » | **${message.author.username}**: ${userHP} :heartpulse:
            » | **${opponent.username}**: ${oppoHP} :heartpulse:
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
		} catch (err) {
			this.fighting.delete(message.channel.id);
			this.fighting.delete(message.author.id);

		}
	}
	
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["duello"]
};
exports.help = {
  name: 'düello',
  description: 'İstediğiniz bir kişi ile düello atarsınız!',
  usage: 'duello <@kullanıcı>'
};
