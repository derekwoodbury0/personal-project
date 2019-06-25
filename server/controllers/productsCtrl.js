module.exports = {
    getAllProducts: (req, res) => {
        let db = req.app.get('db')

        db.get_products().then(response => {
            res.status(200).send(response)
        })
        .catch(error => res.status(500).send(error))
    },
    getProduct: (req, res) => {
        let db = req.app.get('db')
        let { id } = req.params
        db.get_product(id).then(response => {
            res.status(200).send(response)
        })
        .catch(error => res.status(500).send(error))
    }
}