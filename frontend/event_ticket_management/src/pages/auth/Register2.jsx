import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { registerUser } from "../../features/user/userSlice"
// import { checkEmail, checkUsername } from "../../api/user"
import { useToast } from "@chakra-ui/react"
import { API_URL } from "../../constants/API"

const Register2 = () => {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_password] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const toast = useToast()

  const Register = async (e) => {
    e.preventDefault()
    if (password !== confirm_password) {
      setMsg("Password is not the same")
      setPassword("")
      setConfirm_password("")
      return
    }

    // const emailExists = await checkEmail(email)
    // if (emailExists) {
    //   setMsg("Email is exists, please use another email")
    //   setEmail("")
    //   return
    // }
    // const usernameExists = await checkUsername(username)
    // if (usernameExists) {
    //   setMsg("Username is exists,please use another username")
    //   setUsername("")
    //   return
    // }
    try {
      await axios.post(`${API_URL}/users/register`, {
        fullname,
        username,
        email,
        password: password,
        confirm_password: confirm_password,
      })

      navigate("/login")
      toast({
        title: "Account Created",
        description: "We've prepared your account",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Register} className="box">
                <p className="has-text-centered has-text-danger has-text-weight-semibold is-size-6">
                  {msg}
                </p>
                <p className="has-text-centered has-text-weight-bold is-size-3">
                  Register Now
                </p>
                <div className="field mt-5">
                  <label className="label">Fullname</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="********"
                      value={confirm_password}
                      onChange={(e) => setConfirm_password(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register2
