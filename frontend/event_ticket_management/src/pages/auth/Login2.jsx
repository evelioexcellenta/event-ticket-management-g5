import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import { checkEmailLogin } from "../../api/user"
import { useToast } from "@chakra-ui/react"
import { API_URL } from "../../constants/API"

const Login2 = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const toast = useToast()

  const Auth = async (e) => {
    e.preventDefault()
    // const checkLogin = await checkEmailLogin(email)
    // if (!checkLogin) {
    //   setMsg("Email or password are incorrect")
    //   setEmail("")
    //   setPassword("")
    //   return
    // }

    try {
      await axios.post(`${API_URL}/users/login`, {
        email: email,
        password: password,
      })
      navigate("/")
      toast({
        title: "Login Succeed",
        description: "Enjoy !!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data)
      }
    }
  }
  return (
    <section className="hero  is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={Auth}>
                <p className="has-text-centered has-text-danger has-text-weight-semibold is-size-6">
                  {msg}
                </p>
                <p className="has-text-centered has-text-weight-bold is-size-3">
                  Login
                </p>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
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
                  <button className="button is-success is-fullwidth">
                    Login
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

export default Login2
