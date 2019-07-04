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
                    console.log('successful payment', charge.id)
                    emailCtrl.sendReceipt(charge.receipt_url, charge.source.name)
                    return res.status(200)
                }
            }
        )
    },
    refund: async(req, res) => {
        let db = req.app.get('db')
        let { id } = req.params

        await db.refund_order(id)
        let orders = await db.select_orders()
        // console.log(orders)
        res.send(orders)
    }
}