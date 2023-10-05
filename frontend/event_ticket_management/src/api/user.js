import axios from "axios"
import { API_URL } from "../constants/API"

const fetchUser = () => {
  return axios.get("http://localhost:2000/user")
}

const registerUser = (data) => {
  return axios.post("http://localhost:2000/user", data)
}

const login = (params) => {
  let newParams = { username: params.username, password: params.password }

  // validasi pengechekan apakah dia email atau bukan ?
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (params.username.match(validRegex)) {
    newParams = { email: params.username, password: params.password }
  }

  return axios.get("http://localhost:2000/user", {
    params: newParams,
  })
}

export const checkEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/register?email=${email}`)
    return response.data.length > 0
  } catch (error) {
    console.log("Error checking email: ", error)
    throw error
  }
}
export const checkEmailLogin = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/login?email=${email}`)
    return response.data.length > 0
  } catch (error) {
    console.log("Error checking email: ", error)
    throw error
  }
}

export const checkUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/register?username=${username}`)
    return response.data.length > 0
  } catch (error) {
    console.log("Error checking email: ", error)
    throw error
  }
}

export default {
  fetchUser,
  registerUser,
  login,
  checkEmail,
  checkUsername,
  checkEmailLogin,
}
