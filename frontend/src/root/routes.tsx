import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { Home } from "./pages";
import Problems from "./pages/Problems";
import AuthLayout from "@/auth/AuthLayout";
import SigninForm from "@/auth/forms/SigninForm";
import SignupForm from "@/auth/forms/SignupForm";
import ProblemPage from "./pages/ProblemPage";
const router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout/>,
    children : [
      {
        path : "/home",
        element: <Home/>
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
