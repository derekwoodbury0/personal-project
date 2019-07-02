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
    },
    changeAdmin: async(req, res) => {
        let db = req.app.get('db')
        let { is_admin, user_id } = req.body
        if (is_admin) {
            await db.change_admin( false, user_id ) 
        } else {
            await db.change_admin( true, user_id )
        }
        let updatedUsers = await db.get_users()
        res.send(updatedUsers)
    },
    deleteUser: async(req, res) => {
        let db = req.app.get('db')
        let {id} = req.params
        console.log(id)
        await db.delete_user(id)

        let updatedUsers = await db.get_users()
        res.send(updatedUsers)
    }
}