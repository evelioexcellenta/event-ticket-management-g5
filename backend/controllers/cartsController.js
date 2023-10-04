const { db } = require('../database')
module.exports = {
    getData: (req, res) => {
        let scriptQuery = `Select * from carts`

        if (req.query && req.query.productName) {
            scriptQuery = `Select * from carts where productName = ${db.escape(req.query.productName)};`
        }

        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },

    addData: (req, res) => {
        console.log(req.body)
        let { productName, price, productImage, description, category } = req.body
        let insertQuery = `Insert into carts values (null,${db.escape(productName)},${db.escape(price)},${db.escape(productImage)},${db.escape(description)},${db.escape(category)})`

        console.log(insertQuery)
        db.query(insertQuery, (err, results) => {
            if (err) res.status(500).send(err)

            db.query(`Select * from carts where productName = ${db.escape(productName)}`, (err2, results2) => {
                    res.status(200).send({
                        message: `penambahan carts berhasil`,
                        data: results2
                    })
                })
                // res.status(200).send(results)
        })
    },
    editData: (req, res) => {
        let dataUpdate = []
        for (let prop in req.body) {
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }

        let updateQuery = `UPDATE carts set ${dataUpdate} where id = ${req.params.id}`
        console.log(updateQuery)
        db.query(updateQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    deleteData: (req, res) => {
        let deleteQuery = `DELETE from carts where id = ${db.escape(req.params.id)}`

        db.query(deleteQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}