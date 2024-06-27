import { AuthContext } from "@/config/contexts/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";

  const Home = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(isAuthenticated)
    const goSignUp = ()=>{
      navigate("/auth/sign-in")
    }
  return (
    <div >
      </div>
  )
}

  export default Home
