// import React from "react"
import { BrowserRouter , Route, Routes  } from "react-router-dom"
// import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp.jsx"
import { SignIn } from "./pages/SignIn.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { SendMoney } from "./pages/SendMoney.jsx"
import { SetUpiPin } from "./pages/SetUpiPin.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/SetUpiPin" element={<SetUpiPin/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/SendMoney" element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
