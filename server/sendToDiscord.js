import 'dotenv/config';

const DISCORD_WEBHOOK_URL = process.env.DiscordWebhook;

export async function sendToDiscord(data) {
    if (!DISCORD_WEBHOOK_URL?.trim()) {
        console.error("Discord webhook URL is missing or invalid");
        return;
    }

    // Transform the data into Discord embed fields
    const embedFields = data.map(item => ({
        name: item.question,
        value: item.answer || "Not provided",
        inline: item.question.length < 20 // Make shorter questions inline
    }));

    const embed = {
        title: "New RpM Team Application",
        color: 0x80FF00, // Green color
        fields: embedFields,
        footer: {
            text: "RpM Recruitment System"
        },
        timestamp: new Date().toISOString(),
        thumbnail: {
            url: "https://i.imgur.com/your-logo.png" // Add your logo URL here
        }
    };

    const payload = {
        username: "RpM Recruitment Bot",
        avatar_url: "https://i.imgur.com/bot-avatar.png", // Optional bot avatar
        embeds: [embed]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Discord API error: ${response.status} ${response.statusText}`);
        }

        console.log("Application successfully sent to Discord!");
        return true;
    } catch (error) {
        console.error("Failed to send to Discord:", error.message);
        return false;
    }
}