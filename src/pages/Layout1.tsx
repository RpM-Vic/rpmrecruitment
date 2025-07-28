import { Outlet } from "react-router"
import { Navbar } from "../components/Navbar"

export const Layout1=()=>{
  return(
    <div className="">
      <Navbar/>
      <div className="bg-amber-100 flex flex-col 
        m-8 shadow-2xl rounded-2xl
        bg-[radial-gradient(at_25%_25%,_white,_75%,_#18181b)]
        ">
        <Outlet/>
      </div>

    </div>
  )
}