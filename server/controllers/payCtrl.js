const stripe = require('stripe')(process.env.STRIPE_SECRET)
const emailCtrl = require('./emailCtrl')


module.exports = {
    pay: (req, res) => {
        const {token:{id}, amount} = req.body
        stripe.charges.create(
            {
                amount: amount,
                currency: 'usd',
                source: id
            },
            (err, charge) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log('successful payment')
                    emailCtrl.sendReceipt(charge.receipt_url, charge.source.name)
                    return res.status(200).send(charge)
                }
            }
        )
    }
}