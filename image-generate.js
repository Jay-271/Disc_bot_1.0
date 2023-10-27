//generates an image using openai
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.GPT_API,
})

module.exports = {
    data: new SlashCommandBuilder()
    .setName('img-generation')
    .setDescription('generates an img duh')
    .addStringOption(option => option.setName('prompt').setDescription('describe what img u want')),
    async execute (interaction) {

        const prompt = interaction.options.getString('prompt');
        await interaction.deferReply();

        
        try {
            if (String(`here's a \`\`\`${prompt}\`\`\``).length > 256) {
                throw new Error('Too long of a prompt boss')
            }

            const response  = await openai.images.generate({
                prompt: prompt,
                n: 1,
                size: `512x512`
            });
            const image = response.data[0].url;
            

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`here's a \`\`\`${prompt}\`\`\``)
            .setImage(image)
            .setTimestamp()
            .setFooter({ text: `Image Generator`})

            await interaction.followUp({embeds: [embed]});
        } catch (e) {
            console.error(e);
            console.log(e.data);
            return await interaction.followUp({content: `request failed cuz of this: ${e}`});
            
        }
    }
}
