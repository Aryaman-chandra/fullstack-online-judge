import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Problems from "./pages/Problems";
import AuthLayout from "@/auth/AuthLayout";
import SigninForm from "@/auth/forms/SigninForm";
import SignupForm from "@/auth/forms/SignupForm";
import ProblemPage from "./pages/ProblemPage";
import ProfilePage from "@/home/ProfilePage";
import Home from "@/home/Home";
import SettingsLayout from "@/home/SettingsLayout";
import CreateContestPage from "@/home/admin/CreateContestPage";
import CreateProblemPage from "@/home/admin/createProblemPage";
import ContestList from "./pages/ContestList";
import MyProblems from "@/home/admin/MyProblems";
import ContestPage from "./pages/ContestPage";
import MyContests from "@/home/admin/MyContests";
import { LandingPage } from "@/LandingPage/LandingPage";
import HomePage from "@/home/HomePage";
import SubmissionPage from "@/home/SubmissionPage";
import SubmissionsList from "@/home/SubmissionsList";
import ErrorPage from "./pages/ErrorPage";
const router = createBrowserRouter([
        {
            path : "/",
            element : <LandingPage/>
        },
  {
    path:"/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children : [
      {
        path : "/home",
        element: <Home/>,
        children:[
            {
                path: "",
                index: true,
                element:<HomePage/> 
            },
            {
                path: "submissions",
                element:<SubmissionsList/> 
            },
            {
                path: "submissions/:s_id",
                element:<SubmissionPage/> 
            },
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
                    path:"admin/create/problem",
                    element : <CreateProblemPage/>
                },
                {
                    path:"admin/create/contest",
                    element: <CreateContestPage/>
                },
                {
                    path:"admin/myproblems",
                    element:<MyProblems/> 
                },
                {
                    path:"admin/myContests",
                    element:<MyContests/> 
                },
            ]
        
      }]
      },
      {
        path:"/problems",
        element: <Problems/>,
      },
      {
          path: "problems/:p_id",
          element : <ProblemPage/>
      },
      {
          path: "contests/",
          element : <ContestList/>
      },
      {
          path: "contests/:c_id",
          element : <ContestPage/>
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
