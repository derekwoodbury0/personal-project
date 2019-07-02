module.exports = {
    addToCart: async (req, res) => {
        let { id } = req.params 
        let db = req.app.get('db')
        let { user_id } = req.session.user

        let foundCart = await db.check_user_cart(user_id)

        if (foundCart[0]) {
            // if exists, push new items to carts
            // if items already exists in cart, change quantity plus one
            let foundItem = foundCart.find(product => +product.product_id === +id)
            if (foundItem) {
                foundItem.quantity += 1
                await db.update_quantity(foundItem)
            }
            else {
                //if cart exists, but item does not, add item to cart
                let { cart_id } = foundCart[0]
                await db.add_to_cart({ id, cart_id, quantity:1})
            }
        } else {

            // if cart doesnt exist, code will continue past this function
            //create new cart and add item to it
            let newCart = await db.create_cart({user_id})
            let { cart_id } = newCart[0]
            
            await db.add_to_cart({ id, cart_id, quantity: 1 })
        }
            
            let cart = await db.get_cart(user_id)
            
            res.send(cart)
    },
    getCart: async (req, res) => {
        if (req.session.user) {
            let { user_id } = req.session.user
            let db = req.app.get('db')
            let cart = await db.get_cart(user_id)
            res.send(cart)
        }
    },
    updateQuantity: async (req, res) => {
        let db = req.app.get('db')
        let { user_id } = req.session.user
        let { id: product_id } = req.params
        let { updatedQuantity } = req.body
        
        let foundCarts = await db.get_cart(user_id)
        let foundCart = foundCarts[0]
        let { cart_id } = foundCart
        foundCart.quantity = updatedQuantity
        await db.update_quantity({ quantity: updatedQuantity, product_id, cart_id })
        let updatedCart = await db.get_cart(user_id)
        res.send(updatedCart)
    },
    removeFromCart: async (req, res) => {
        let db = req.app.get('db')
        let { user_id } = req.session.user 
        let { id: product_id } = req.params
        let carts = await db.get_cart(user_id)
        let cart = carts[0]
        let { cart_id } = cart

        await db.remove_from_cart({ product_id, cart_id})
        let updatedCart = await db.get_cart(user_id)
        res.send(updatedCart)
    }
}