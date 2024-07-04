import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
<<<<<<< HEAD
=======
import { Home } from "./pages";
>>>>>>> main
import Problems from "./pages/Problems";
import AuthLayout from "@/auth/AuthLayout";
import SigninForm from "@/auth/forms/SigninForm";
import SignupForm from "@/auth/forms/SignupForm";
import ProblemPage from "./pages/ProblemPage";
<<<<<<< HEAD
import ProfilePage from "@/home/ProfilePage";
import Home from "@/home/Home";
import SettingsLayout from "@/home/SettingsLayout";
import CreateContestPage from "@/home/admin/CreateContestPage";
import CreateProblemPage from "@/home/admin/createProblemPage";
import { LandingPage } from "./pages/LandingPage";
=======
>>>>>>> main
const router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout/>,
    children : [
<<<<<<< HEAD
        {
            path : "/",
            element : <LandingPage/>
        },
      {
        path : "/home",
        element: <Home/>,
        children:[
            {
                path: "settings",
                element : <SettingsLayout/>,
                children:[
                {
                    index: true,
                    path:"profile",
                    element : <ProfilePage/>
                },
                {
                    path:"create/problem",
                    element : <CreateProblemPage/>
                },
                {
                    path:"create/contest",
                    element: <CreateContestPage/>
                },
            ]
        
      }]
=======
      {
        path : "/home",
        element: <Home/>
>>>>>>> main
      },
      {
        path:"/problems",
        element: <Problems/>,
      },
      {
          path: "problems/:p_id",
          element : <ProblemPage/>
      }

    ]
  },
  {
    path:"/auth",
    element: <AuthLayout/>,
    children:[
      {
        path: "sign-in",
        element: <SigninForm/>
      },
      {
        path:"sign-up",
        element:<SignupForm/>
      }
    ]
  }
])

export default router
