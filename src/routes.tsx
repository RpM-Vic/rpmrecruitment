import { createBrowserRouter } from "react-router";
import { RecruitmentForm } from "./pages/RecruitmentForm";
import { Layout1 } from "./pages/Layout1";
import { Leaderboard } from "./pages/Leaderboard";
import { Home } from "./pages/Home";
import { SubmitTimeForm } from "./pages/SubmitTimeForm";


export const router2=createBrowserRouter([  
  {
    path:"/",
    element:<Layout1/>,
    children:[{
      index:true,
      element:<Home/>}
    ]
  },
  {
    path:"/leaderboard",
    element:<Layout1/>,
    children:[{
      index:true,
      element:<Leaderboard/>}
    ]
  },
    {
    path:"/submittime",
    element:<Layout1/>,
    children:[{
      index:true,
      element:<SubmitTimeForm/>}
    ]
  },
    {
    path:"/joinus",
    element:<Layout1/>,
    children:[{
      index:true,
      element:<RecruitmentForm/>}
    ]
  },
])