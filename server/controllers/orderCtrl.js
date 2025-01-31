module.exports = {
    completeOrder: async(req, res) => {
        let db = req.app.get('db')
        let { user_id } = req.session.user
        let {stripeId:stripe_id} = req.body
        let carts = await db.get_cart(user_id)
        let cart = carts[0]
        let { cart_id:order_id } = cart
        await carts.forEach(product => {
            let { product_id, quantity } = product
            db.create_order({user_id, product_id, order_id, quantity, stripe_id})
        })
        await db.erase_cart(cart.cart_id)
        res.send('success')
    }
}