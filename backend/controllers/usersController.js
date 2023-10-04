const { db } = require('../database')
module.exports = {
    getData: (req, res) => {
        let scriptQuery = `Select * from users`

        if (req.query && req.query.username) {
            scriptQuery = `Select * from users where username = ${db.escape(req.query.username)};`
        }

        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    addData: (req, res) => {
        console.log(req.body)
        let { fullname, username, email, password, role } = req.body
        let insertQuery = `Insert into users values (null,${db.escape(fullname)},${db.escape(username)},${db.escape(email)},${db.escape(password)},${db.escape(role)})`

        console.log(insertQuery)
        db.query(insertQuery, (err, results) => {
            if (err) res.status(500).send(err)

            db.query(`Select * from users where username = ${db.escape(username)}`, (err2, results2) => {
                    res.status(200).send({
                        message: `penambahan users berhasil`,
                        data: results2
                    })
                })
                // res.status(200).send(results)
        })
    },
}