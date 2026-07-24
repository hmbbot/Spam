const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
    new SlashCommandBuilder()
        .setName('spamuser')
        .setDescription('ناردنی ١٠٠٠ نامەی سپام بۆ چاتی تایبەتی کەسێکی دیاریکراو')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('ئەو کەسەی دەتەوێت سپامی بکەیت')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('text')
                .setDescription('ئەو دەقەی دەتەوێت سپام بێت')
                .setRequired(true)
        )
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('وێنە لەگەڵ نامەکان (ئارەزوومەندانە)')
                .setRequired(false)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('ready', async () => {
    console.log(`بۆتەکە ئامادەیە: ${client.user.tag}`);
    try {
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        console.log('فەرمانەکان بە سەرکەوتوویی تۆمار کران.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'spamuser') {
        const targetUser = interaction.options.getUser('target');
        const text = interaction.options.getString('text');
        const image = interaction.options.getAttachment('image');
        
        await interaction.reply({ content: `دەستکرا بە ناردنی ١٠٠٠ نامە بۆ چاتی ${targetUser.tag}...`, ephemeral: true });

        for (let i = 1; i <= 1000; i++) {
            setTimeout(async () => {
                try {
                    const messageData = { content: `${text} (${i})` };
                    
                    if (image) {
                        messageData.files = [image.url];
                    }

                    await targetUser.send(messageData);
                } catch (error) {
                    console.error(`هەڵە لە ناردنی نامە بۆ ${targetUser.tag}:`, error.message);
                }
            }, i * 1000);
        }
    }
});

client.login(TOKEN);
