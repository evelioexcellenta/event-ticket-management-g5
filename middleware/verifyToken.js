const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send("Access denied")

  try {
    const token = authHeader.split(" ")[1]
    if (token === null || !token) {
      return res.status(401).send("Unauthorized request")
    }
    let verifiedUser = jwt.verify(token, "tokenasal")
    if (!verifiedUser) return res.status(401).send("Unauthorized request")
    next()
  } catch (err) {
    res.status(400).send("Invalid token")
  }
}

module.exports = verifyToken
