module.exports = {
    getOrders: async(req, res) => {
        let db = req.app.get('db')
        let orders = await db.select_orders()
        res.send(orders)
    },
    getUsers: async(req, res) => {
        let db = req.app.get('db')
        let users = await db.get_users()
        res.send(users)
    }
}