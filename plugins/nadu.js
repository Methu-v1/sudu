cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const data = await fetchJson(`your json link`)
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_REPLY === 'true') {
                if (isOwner) return;        
                await conn.sendMessage(from,{sticker: { url : data[text]},package: 'Queen Nethu Md'},{ quoted: mek })   
            
            }
        }
    }                
});
