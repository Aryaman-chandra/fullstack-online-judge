import Header from "@/components/ui/Header"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
    <Header/>
    <div className="w-full mt-3 h-full">
      <Outlet/>
    </div>
    </>
  )
}

export default RootLayout
