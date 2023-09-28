const { SlashCommandBuilder } = require('discord.js');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.GPT_API,
})

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rizz-ply')
    .setDescription('Creates a response (with rizz) to a prompt given')
    .addStringOption(option => option.setName('prompt').setDescription('Type something to give a reply (with rizz)')),
    async execute (interaction) {

        const prompt = interaction.options.getString('prompt');
        await interaction.deferReply();

        try {
            const response  = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": `You are a flirty assistant that responds with rizz. Rizz is a slang term for a playful or flirtatious response to any prompt given.
                    This can also be referred to as "rizing someone up". Here are a few examples:
                    Girl: Then in next fall Semester aka 2024 Agust im going to start school at Delaware state and finish my bachelors. I wanna be a lawyer.
                    Guy: Then Imma be ur first client and make a case for stealing my heart.

                    Girl: Im not sure what my red flag is. I think its probs i take everything personal but i can't tell cause I hven't dated in a while so i might have outgrown that. Like being petty.
                    Guy: Well, if taking things personally is your red flag then I must be a matador cause i wouldn't mind facing that challenge with you. Let's find out together if you've really outgrown it.
                    
                    Girl: What do you like to do for fun?
                    Guy: For fun? Well usually I enjoy hiking, reading, or cooking up something special in the kitchen... but now I think my new favorite hobby might be getting to know you better.
                    
                    Now, "rizz reply". Do not say "Girl:" or "Guy". Also try to say words different like:
                    your to ur
                    because to cuz
                    etc...
                    
                    Do not say rizz or concatinate rizz in your response, just be extra flirty and playful with words. Whatever the prompt is, rizz it up and limit it to a sentence or two max.
                    Also, try to "type" more human-like and add an emoji to express better.
                    DO NOT say anything with "rizz-" in your context. Rizz is a flirtatious way of texting!! Its wordplay!`},
                    { "role": "user", "content": prompt }
                ]
            });
            
            const responseMessage = response.choices[0].message.content;
            const chunkSizeLimit = 2000;
            await interaction.followUp(`Prompt: ${prompt}`);
                for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
                    const chunk = responseMessage.substring(i, i + chunkSizeLimit);
                    await interaction.followUp(chunk);
                };

        } catch (e) {
            console.error(e);
            console.log(e.data);
            return await interaction.followUp({content: `request failed cuz of this error: ${e}`});
        }

    }
}