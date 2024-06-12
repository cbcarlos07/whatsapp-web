
let client = null


module.exports = {
    clientWP: cli => {
        client = cli
    },
    welcome: async (req, res) => {
        const {number, message} =  req.body
        
        try {
            const numberPhone = formatNumber(number)
            client.sendMessage(numberPhone, message);
            const isRegistered = await client.isRegisteredUser(numberPhone);
            console.log(`${number} isRegistered`,isRegistered);
            res.json({msg: message})
        } catch (error) {
            res.json({msg: error.message})
        }
    }
}

const formatNumber = phone =>{
    return `${phone}@c.us`
}