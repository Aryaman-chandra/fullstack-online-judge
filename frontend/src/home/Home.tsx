import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

  const Home = () => {
    const { user } = useAuth();
    if(!user) {
        <Navigate to={"/"}/>
    }
  return (
      <>
      <div className="h-full w-full">
      <Outlet/>
      </div>
    </> 
  )
}

  export default Home
