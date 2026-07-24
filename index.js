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
        .setName('spam50')
        .setDescription('٥٠ نامەی سپام لەسەر یەک دەنێرێت')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('ئەو دەقەی دەتەوێت سپام بێت')
                .setRequired(true)
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

    if (interaction.commandName === 'spam50') {
        const text = interaction.options.getString('text');
        
        await interaction.reply({ content: 'دەستکرا بە ناردنی ٥٠ نامە...', ephemeral: true });

        for (let i = 1; i <= 50; i++) {
            setTimeout(async () => {
                await interaction.channel.send(`${text} (${i})`);
            }, i * 600);
        }
    }
});

client.login(TOKEN);
