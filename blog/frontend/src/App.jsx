import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./components/Body"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import CreateBlog from "./components/CreateBlog"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import BlogDetails from "./components/BlogDetails"


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter >
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Body />}>

              <Route path="/blogs" element={<Blogs />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />

            </Route>

          </Routes>

        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
