const { TWILIO_ACCOUNT_SECRET_ID, TWILIO_AUTH_TOKEN, PERSONAL_PHONE_NUMBER, TWILIO_PHONE_NUMBER } = process.env

module.exports = {
    sendTextToSelf: (req, res) => {
        const { name, message } = req.body
        const client = require('twilio')(TWILIO_ACCOUNT_SECRET_ID, TWILIO_AUTH_TOKEN)

        client.messages.create({
            body: name + ' sent: ' + message,
            from: TWILIO_PHONE_NUMBER,
            to: PERSONAL_PHONE_NUMBER
        })
        .then(message => {
            //do something here
            res.send(message)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    },
    sendTextOut: (req, res) => {
        const { name, number } = req.body
        const client = require('twilio')(TWILIO_ACCOUNT_SECRET_ID, TWILIO_AUTH_TOKEN)

        client.messages.create({
            body: `Hey ${name}! Thanks for signing up for news and updates from Jaybird!`,
            to: number,
            from: TWILIO_PHONE_NUMBER
        })
        .then(message => res.send(message))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    }
}