// ----- *X N X X  D L 🤤* -----
//------ *BY NADU*----

const { cmd, commands } = require('../command');
const xnxx = require("xnxx-dl");
const { fetchJson, getBuffer } = require('../lib/functions');

cmd({
    pattern: "xnxx",
    desc: "Downloads a video from XNXX",
    use: '.xnxx <search_term>',
    react: "📥",
    category: "downloads",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply }) => {
    const searchTerm = q.trim();
    if (!searchTerm) return reply(`Please provide a search term`);

    reply(`Searching For Your Video...`);
    try {
        // Search for the video and download
        const videoInfo = await xnxx.download(searchTerm);
        if (!videoInfo || !videoInfo.link_dl) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        reply(`Downloading video...`);
        const videoUrl = videoInfo.link_dl;
        await conn.sendMessage(
            from,
            { video: { url: videoUrl }, caption: '*Danuzz ❤️*', mimetype: 'video/mp4' }, 
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});

module.exports = {};

//==============pronhub downoad===============
cmd({
    pattern: 'phdl',
    desc: 'Download and send videos from Pornhub',
    react: '📥',
    category: 'download',
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, isMe, isOwner }) => {
    try {
        // Check if a URL was provided
        if (!q) {
            return reply('Please provide a Pornhub video URL. Example: .phdl https://www.pornhub.com/view_video.php?viewkey=ph5b76f02a92fd6');
        }

        // Construct the API URL with proper URL encoding
        const videoUrl = `https://www.dark-yasiya-api.site/download/phub?url=${encodeURIComponent(q)}`;

        // Make the request to the API to fetch the video data
        const response = await fetch(videoUrl);
        const data = await response.json();

        // Check if the API response contains valid video data
        if (data.status && data.result && data.result.length > 0) {
            // Get the first video result from the response
const video = data.result[0];

            // Prepare the message content for the video
            const caption = `Title:{video.title}\nCategory: video.category:{video.views_count}\nShares: ${video.share_count}`;

            // Send the video to the user
            await conn.sendMessage(from, { 
                video: { url: video.video_1 }, 
                caption: caption 
            }, { quoted: mek });

        } else {
            // Handle error if no valid video data is found
            return reply('Could not fetch video data. Please check the URL and try again.');
        }

    } catch (error) {
        // Log the error and reply to the user in case of an issue
        console.error(error);
        return reply('Something went wrong. Please try again later.');
    }
});

//=============BY NADU====================
