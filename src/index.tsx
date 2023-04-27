import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const container = document.getElementById("root")
const root = createRoot(container!)

function StrictApp() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
root.render(
  <StrictApp />
  // <App />
)
serviceWorkerRegistration.register()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
