import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUp } from "./pages/Signup"
import { Login } from "./pages/Login"

function App() {

  return (
    <>
      <BrowserRouter>
         <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
