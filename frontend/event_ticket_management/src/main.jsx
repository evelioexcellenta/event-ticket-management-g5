import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import rootReducer from "./redux/reducers"
import { Provider } from "react-redux"
import { ChakraProvider } from "@chakra-ui/react"
import "bulma/css/bulma.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
