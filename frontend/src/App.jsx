// import React from "react"
import { BrowserRouter , Route, Routes  } from "react-router-dom"
// import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/SendMoney" element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
