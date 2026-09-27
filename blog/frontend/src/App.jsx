import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Body from "./components/Body"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import CreateBlog from "./components/CreateBlog"
import BlogDetails from "./components/BlogDetails"
import { addLoggedInUserInfo } from "./utils/userSlice"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"


function App() {
  const dispatch = useDispatch()

  const getLoggedInUser = async () => {


    const res = await axios.get(import.meta.env.VITE_BASE_URL + "/profile", { withCredentials: true })

    dispatch(addLoggedInUserInfo(res.data.data))

  }

  useEffect(()=>{
    getLoggedInUser()
  },[])

  return (
    <>

        <BrowserRouter >
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Body />}>
              <Route index element={<Blogs />} />

              <Route path="/blogs" element={<Blogs />} />

              <Route path="/blog/:id" element={<BlogDetails />} />

            </Route>

            <Route path="/create" element={<CreateBlog />} />

          </Routes>

        </BrowserRouter>

    </>
  )
}

export default App
