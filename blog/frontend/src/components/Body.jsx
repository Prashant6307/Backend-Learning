import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"


const Body = () => {

    
  return (
    <div >
        <Navbar></Navbar>

        <Outlet className="max-w-7xl mx-auto"></Outlet>

        <Footer></Footer>
    </div>
  )
}

export default Body
