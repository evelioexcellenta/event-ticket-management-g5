const db = require("./../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = db.User

const userController = {
  verifyEmail: async (req, res) => {},

  register: async (req, res) => {
    try {
      const { fullname, username, email, password, confirm_password } = req.body
      if (!fullname || !username || !email || !password || !confirm_password) {
        return res.status(400).json("Please fill all the fields required")
      }

      if (password !== confirm_password) {
        return res.status(400).json("Password must same as password confirm")
      }

      const isEmailExist = await User.findOne({
        where: { email },
      })

      if (isEmailExist) {
        return res.status(400).json("Your email is exist, please login")
      }
      const isUsernameExist = await User.findOne({
        where: { username },
      })

      if (isUsernameExist) {
        return res.status(400).json("Your username is exist, please login")
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const hashConfirmPassword = await bcrypt.hash(confirm_password, salt)

      await User.create({
        fullname,
        username,
        email,
        password: hashPassword,
        confirm_password: hashConfirmPassword,
        is_active: 1,
        is_admin: null,
      })

      return res.status(200).json({
        message: "Register success",
      })
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await User.findOne({
        where: { email },
      })
      if (!user) {
        return res.status(401).json({
          message: "Email or password are incorrect",
        })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match)
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" })

      let payload = { id: user.id, is_admin: user.is_admin }
      const token = jwt.sign(payload, "tokenasal", {
        expiresIn: "1h",
      })
      return res.status(200).json({
        message: "Login success",
        token,
      })
    } catch (err) {
      return res.status(404).json({
        message: err.message,
      })
    }
  },
  users: async (req, res) => {
    const user = await User.findAll({
      attributes: { exclude: ["password", "confirm_password"] },
    })
    return res.status(200).json({
      message: "Fetch successfully",
      data: user,
    })
  },
}

module.exports = { userController }
