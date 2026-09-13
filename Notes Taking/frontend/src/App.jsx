import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Notes from "./components/Notes"
import Note from "./components/Note"

function App() {


  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="notes" element={<Notes />} />
            <Route path="note" element={<Note />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
