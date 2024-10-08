import { NavLink } from 'react-router-dom';
import { NavigationMenu,  NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useAuth } from '@/hooks/useAuth';
import { navigate } from '@/lib/navigation';
const Header = () => {
    const { user } = useAuth();
  return (
      <div className=' sticky top-0 z-50 flex justify-between items-center mx-6  h-12 backdrop-blur-lg border-b border-neutral-700/80'>
      <div onClick={()=> navigate("/home")}>Home</div>
      <div className='justify-self-center'>
        <NavigationMenu>
      <NavigationMenuList>
         <NavigationMenuItem >
          <NavLink className={navigationMenuTriggerStyle()} to="/problems">{"Problems"}</NavLink>
        </NavigationMenuItem>
         <NavigationMenuItem >
          <NavLink className={navigationMenuTriggerStyle()} to="/contests">{"Contests"}</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
    { (user)?<div className='p-2 justify-self-end w-12 h-12' ><img src='assets/user-square.svg'alt='user logo'onClick={()=>navigate("/home/settings/")} className='h-full'/> </div>: <></>}
    </div>
  )
}

export default Header
