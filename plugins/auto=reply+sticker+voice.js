const fs = require('fs');
const path = require('path');
const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

//auto reply 
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const data = await fetchJson(`https://raw.githubusercontent.com/Methu-v1/sudu/refs/heads/main/my_data/autoreply.json`)
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_REPLY === 'true') {
                if (isOwner) return;        
                await conn.sendMessage(from,{sticker: { url : data[text]},package: 'Queen Nethu Md'},{ quoted: mek })   
            
            }
        }
    }                
});
