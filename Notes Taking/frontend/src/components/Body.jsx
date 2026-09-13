import { Outlet } from "react-router-dom"
import Notify from "./Notify"

const Body = () => {
  return (
    <div>
        
      <Outlet ></Outlet>
      <Notify></Notify>
    </div>
  )
}

export default Body
