import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { useQueryClient } from '@/config/queryClient'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/lib/api'
import { navigate } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'
const sidebarNavItems = [
  {
    title: "Profile",
    role: "user",
    href: "/home/settings/profile",
  },
  {
      title: "Create Contest",
      role : "admin",
      href : "/home/settings/admin/create/contest"
  },
  {
      title: "Add Problem",
      role : "admin",
      href : "/home/settings/admin/create/Problem"
  },
  {
      title : "My problems",
      role : "admin",
      href : "/home/settings/admin/myproblems"
  },
  {
      title : "My Contests",
      role : "admin",
      href : "/home/settings/admin/myContests"
  }
]
const SettingsLayout = () => {
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const onLogout =async ()=>{
        await logout();
        queryClient.clear(); 
        navigate("/",{replace :true});
    }
  return (
      <>
          <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
              <p className='text-3xl text-primary'>Welcome! {(user)?user.username:"Guest"}</p>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your Account here.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav items={sidebarNavItems} />
               <div  className={(user)? cn( buttonVariants({ variant: "ghost" }), "hover:bg-primary hover:underline", "justify-start"):''} onClick={()=> onLogout()}>
                Logout
                </div>
              </aside>
              <div className="flex-1 lg:max-w-2xl"><Outlet/></div>
            </div>
          </div>
    </>
  )
}

export default SettingsLayout
