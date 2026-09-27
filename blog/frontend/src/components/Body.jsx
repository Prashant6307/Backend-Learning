import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"


const Body = () => {

    
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>

        <main className="flex-1">
                <Outlet />
            </main>

        <Footer></Footer>
    </div>
  )
}

export default Body
