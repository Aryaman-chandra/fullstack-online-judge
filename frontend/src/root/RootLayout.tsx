import Header from "@/components/ui/Header"
import { setNavigate } from "@/lib/navigation";
import { Outlet, useNavigate } from "react-router-dom"

const RootLayout = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <>
    <Header/>
    <div className="w-full mt-3 px-6 h-full">
      <Outlet/>
    </div>
    </>
  )
}

export default RootLayout
