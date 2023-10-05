const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "host",
  user: "username",
  password: null,
  database: "event_ticket_management",
  port: 3306, // Default MySQL port
})

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err)
    return
  }
  console.log("Connected to database")
})
