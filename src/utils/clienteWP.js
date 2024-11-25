const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios')

let startConversation = true
const wwebVersion = '2.3000.1012058694-alpha';
// Create a new client instance
const client = new Client({
	authStrategy: new LocalAuth({ clientId: 'test' }),
    puppeteer: { 
        headless: true,
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
        ] },
        webVersionCache: {
        type: "remote",
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
        },
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});


// When the client received QR-Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {

    console.log('number', message.from);
    if( message.from == '559295105867@c.us' ){
        const number = message.from.split('@')
        const from = number[0]
        axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                type: "text",
                text: message.body
            },
            url: "http://127.0.0.1:3001/api/v1/bots/test/converse/5522981290226"
        }).then(async res => {
            const {responses} = res.data
            
            for (let index = 0; index < responses.length; index++) {
                console.log('responses', responses[index]);
                const {text, choices} = responses[index]
                let choice = ''
                if( choices ){
            
                    const rows = choices.map(c => `> *${c.value}*: ${c.title}`)
                    choice = rows.join('\n')
                }
                const msg = `${text}\n${choice}`
                console.log('msg', msg);
                client.sendMessage(message.from, msg)
                await delay(message.from)   
            }
        }).catch(e =>{
            console.log('error',e.response.data);
            console.log('error',e.message);
        })
    }
  
});

const delay = number => {
   // Mostrar status "digitando..."
   return new Promise(resolve => {
      client.sendPresenceAvailable();
      client.sendPresenceAvailable(number); // O número é necessário no último método
        setTimeout(() => resolve(), 2000)
    })
}
// Start your client
client.initialize();

const waitAuth = () => {
    return new Promise((resolve)=> {
      client.on('authenticated', session => {
          console.log('Client is authenticated!',session);
          resolve()
      });
  
    })
  }
  

module.exports = { client, waitAuth }
