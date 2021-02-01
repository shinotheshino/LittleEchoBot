import Eris, * as eris from "eris";
import * as parser from "discord-command-parser";

import config from "./config";

const client = new eris.Client(config.token, {
  intents:
    eris.Constants.Intents.guilds |
    eris.Constants.Intents.guildMembers |
    eris.Constants.Intents.guildMessages,
  autoreconnect: true,
});

client.on("messageCreate", async message => {
  const parsed = parser.parse(message, config.prefix);
  if (!parsed.success)
    return;

  switch (parsed.command.toLowerCase()) {

    case "ping": {
      await message.channel.createMessage("Pong!");
      break;
    }

  }
});

client.on("guildMemberAdd", async (guild, member) => {
  if (member.bot)
    return;

  for (const autorole of config.autoroles) {
    await member.addRole(autorole, "Autorole");
  }
  await client.createMessage(config.welcomechannel, {
    embed: {
      author: "New Member",
      title: member.username,
      description: `Welcome to **${guild.name}**, <@${member.id}>!`,
      color: 0xf59342,
      thumbnail: {
        url: member.user.dynamicAvatarURL("gif", 256),
      },
      timestamp: new Date(),
    },
  });
});

client.on("ready", () => {
  console.log(`Ready as ${client.user.username}!`);
});

await client.connect();
