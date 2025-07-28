import { createBrowserRouter } from "react-router";
import { RecruitmentForm } from "./pages/RecruitmentForm";
import { Layout1 } from "./pages/Layout1";
import { Dashboard } from "./pages/Dashboard";
import { Session } from "./pages/session/page";
import { Home } from "./pages/Home";
import { SubmitTimeForm } from "./pages/SubmitTimeForm";

export const router=createBrowserRouter([{
  path:"/",
  element:<Layout1/>,
  errorElement:<Session/>,
  children:[{
    index:true,
    element:<Home/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/session",
    element:<Session/>
  },
  {
    path:"/SubmitTime",
    element:<SubmitTimeForm/>
  },
    {
    path:"/joinus",
    element:<RecruitmentForm/>
  },

]
}])