import Header from "@/components/ui/Header"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
    <Header/>
    <div className="sm:mx-3 md:mx-5 lg:mx-64 mt-9">
      <Outlet/>
    </div>
    </>
  )
}

export default RootLayout
