import { createBrowserRouter } from "react-router";
import { Form } from "./pages/Form";
import { Layout1 } from "./pages/Layout1";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

export const router=createBrowserRouter([{
  path:"/",
  element:<Layout1/>,
  errorElement:<Form/>,
  children:[{
    index:true,
    element:<Form/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/login",
    element:<Login/>
  }]
}])