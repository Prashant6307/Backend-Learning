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
              <Route index element={<Blogs />} />

              <Route path="/blogs" element={<Blogs />} />

              <Route path="/blog/:id" element={<BlogDetails />} />

            </Route>

            <Route path="/create" element={<CreateBlog />} />

          </Routes>

        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
