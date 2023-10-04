import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/command";
import { CommandContext } from "../classes/commandContext";

const command_data = new SlashCommandBuilder()
    .setName("about")
    .setDMPermission(false)
    .setDescription(`Shows information about this bot`)

export default class extends Command {
    constructor() {
        super({
            name: "about",
            command_data: command_data.toJSON(),
            staff_only: false,
        })
    }

    override async run(ctx: CommandContext): Promise<any> {
        const counts = await ctx.database?.query("SELECT (SELECT COUNT(*) FROM user_tokens) as user_tokens, (SELECT COUNT(*) FROM parties) as parties, (SELECT COUNT(*) FROM pending_kudos) as pending_kudos").then(res => res.rows[0]).catch(console.error)

        await ctx.client.loadHordeStyles()
        await ctx.client.loadHordeStyleCategories()

        const embed = new EmbedBuilder({
            color: Colors.Blue,
            title: "Official AI Horde Discord Bot",
            description: `This Discord Bot was made by Zelda_Fan#0225 with <3. It is hosted by db0#1625\nYou can [view the code on GitHub](https://github.com/ZeldaFan0225/AI_Horde_Discord).\nIf you find any bugs you can [report them on GitHub](https://github.com/ZeldaFan0225/AI_Horde_Discord/issues).\n\n**Bot Version** \`${ctx.client.bot_version}\`\n**Package Version** \`${ctx.ai_horde_manager.VERSION}\`\n\nThis bot currently is in ${ctx.client.guilds.cache.size} servers${counts ? `\nThere are \`${counts.user_tokens}\` users logged in, \`${counts.parties}\` parties and \`${counts.pending_kudos}\` pending kudos gifts.` : ""}`
        })
        return ctx.interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}
