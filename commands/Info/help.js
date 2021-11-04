const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Discord
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const { swap_pages2 } = require("../../handlers/functions");
module.exports = {
    name: "help",
    category: "Info",
    aliases: ["h", "commandinfo", "commands"],
    cooldown: 3,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, guildData, player, prefix) => {

         if (args[0]) {
        const embed = new MessageEmbed()
        .setColor("#FFC0CB");
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          embed.setColor("RED");
          embed.setDescription(`Nothing found for **${args[0].toLowerCase()}**`)
          return message.channel.send({embeds: [embed]});
        } else if (!cmd && cat) {
          var category = cat;

          const catcommands = client.commands.filter(x => x.category === category).map(x => '`' + x.name + '`').join(", ")

          const embed = new MessageEmbed()
          .setColor("#FFC0CB")
          .setDescription(`● To get help on a specific command type \`${prefix}help <command>\`!`)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp()
          .addField(`${emoji.categories[category]} **${category} - (${client.commands.filter((cmd) => cmd.category === category).size})**`, catcommands)
          .setFooter(ee.footertext, client.user.displayAvatarURL());
        
          return message.channel.send({embeds: [embed]})
        }
        if (cmd.name) embed.addField(`**Command name**`, `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information of | \`${cmd.name}\``);
        if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases) try {
          embed.addField("**Aliases**", cmd.aliases.length > 0 ? cmd.aliases.map(a => "`" + a + "`").join("\n") : "No Aliases")
        } catch {}
        if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
        else embed.addField("**Cooldown**", `\`3 Seconds\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        if (cmd.useage) {
          embed.addField("**Useage**", `\`${prefix}${cmd.useage}\``);
          embed.setFooter("Melo Music");
        }
        embed.setColor(ee.color)
        return message.channel.send({embeds: [embed]});
      } 

        
    let helpmenu = new MessageEmbed()
        .setThumbnail(`https://camo.githubusercontent.com/3f4d9b3d610ba072183513f414efa108a77e35ee0cf8dcd9e9cffacb500c8485/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3631353732353536353236353035313634382f3634343531393232363734303137383935342f383058556234354a65487776576561504659716e33423438306673576272546a624830593349414a59466a4c4e4141414141456c46546b5375516d43432e706e67`)
        .setAuthor(`Melo Help Panel Command`, ee.footericon)
        .setDescription(`
**Hey ${message.author}, I am ${client.user}**.
 
**A Discord Music Bot With Many Awesome Features, Buttons, Menus, Context Menu, Support Many Sources, Customizable Settings.**
**__Melo Bot Is__ Discord Music Bot That Aims To Provide Better Quality To People**

**Select A Category From Below Menus.**
 `)

        .setFooter(ee.footertext, ee.footericon)
        .setColor(`#FFC0CB`)

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder('❯ Melo Help Menu')
                .addOptions([
                {
                    label: 'Custom Playlist',
                    description: 'Commands for creating custom playlist',
                    value: 'first',
                    emoji: emoji.categories.Playlist
                },
                {
                    label: ' Filters',
                    description: 'Filter commands like bassboost and nightcore',
                    value: 'second',
                    emoji: emoji.categories.AstrozMusic
                },
                {
                    label: 'Info Commands',
                    description: 'To get some imformation of Melo Music',
                    value: 'third',
                    emoji: emoji.categories.Info
                },
                {
                    label: 'Music Commands',
                    description: 'Music commands with high quality',
                    value: 'fourth',
                    emoji: emoji.categories.Playing
                },
                {
                    label: 'Settings',
                    description: 'Melo Music Settings',
                    value: 'fifth',
                    emoji: emoji.categories.Settings
                },
            ])
        )
        message.channel.send({ embeds: [helpmenu], components: [row] })
      
    }
}