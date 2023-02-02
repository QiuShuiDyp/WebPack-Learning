import logo from "./logo.svg"
import logo192 from "../../public/img/logo192.png"
import "./App.scss"
import { useState } from "react"
function App() {
  const [text, setText] = useState("")
  const loadComponent = () => {
    return import("@/index/test.jsx").then((text) => {
      console.log(123)
      setText(text)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        {text ? text : null}
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onClick={loadComponent}
        />
        <img src={logo192} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* Right by QiuShui */}
      </header>
    </div>
  )
}

export default App
