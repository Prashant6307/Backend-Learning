import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./components/Body"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import CreateBlog from "./components/CreateBlog"


function App() {


  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Body />}>

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create" element={<CreateBlog />} />

          </Route>

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
