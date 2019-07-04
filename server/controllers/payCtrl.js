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
                    return res.status(200).send(charge.id)
                }
            }
        )
    },
    refund: (req, res) => {
        let db = req.app.get('db')
        console.log(req.body)
        let { order_id, stripe_id } = req.body
        
        stripe.refunds.create({
            charge: `${stripe_id}`
            },
            async (err, refund) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log('successful refund', refund)
                    await db.refund_order(order_id)
                    let orders = await db.select_orders()
                    return res.status(200).send(orders)
                }
            }
        )
    }
}