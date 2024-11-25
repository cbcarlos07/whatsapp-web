
let client = null
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    clientWP: cli => {
        client = cli
    },
    welcome: async (req, res) => {
        const {number, message} =  req.body
        console.log('welcome',number);
        
        try {
            const numberPhone = formatNumber(number)
            client.sendMessage(numberPhone, message);
            const isRegistered = await client.isRegisteredUser(numberPhone);
            console.log(`${number} isRegistered`,isRegistered);
            res.json({msg: 'Msg enviada'})
        } catch (error) {
            res.json({msg: error.message})
        }
    },
    sendMedia: (req, res) => {
        const {number, base64} = req.body
        console.log('sendMedia', req.body);
        
        const media = new MessageMedia(
            'png',
            base64,
            'qrcode',
         )
         const numberPhone = formatNumber(number)
         client.sendMessage(numberPhone, media)
         res.json({msg: 'Mensagem enviada'})
    }
}

const formatNumber = phone =>{
    return `${phone}@c.us`
}