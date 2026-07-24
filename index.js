const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
    new SlashCommandBuilder()
        .setName('spam1000')
        .setDescription('١٠٠٠ نامەی سپام لەگەڵ وێنە لەسەر یەک دەنێرێت')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('ئەو دەقەی دەتەوێت سپام بێت')
                .setRequired(true)
        )
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('ئەو وێنەیەی دەتەوێت لەگەڵ نامەکان بنێردرێت')
                .setRequired(false)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('ready', async () => {
    console.log(`بۆتەکە ئامادەیە: ${client.user.tag}`);
    try {
        console.log('دەستکرا بە تۆمارکردنی فەرمانەکانی سلاش...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        console.log('فەرمانەکانی سلاش بە سەرکەوتوویی تۆمار کران.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'spam1000') {
        const text = interaction.options.getString('text');
        const image = interaction.options.getAttachment('image');
        
        await interaction.reply({ content: 'دەستکرا بە ناردنی ١٠٠٠ نامە و وێنە...', ephemeral: true });

        for (let i = 1; i <= 1000; i++) {
            setTimeout(async () => {
                const messageData = { content: `${text} (${i})` };
                
                // ئەگەر وێنە دیاری کرابێت، لەگەڵ نامەکە دەنێردرێت
                if (image) {
                    messageData.files = [image.url];
                }

                await interaction.channel.send(messageData);
            }, i * 1000); // ١ چرکە جیاوازی نێوان هەر نامەیەک بۆ پاراستنی بۆت
        }
    }
});

client.login(TOKEN);
