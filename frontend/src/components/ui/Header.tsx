import { NavLink } from 'react-router-dom';
import { NavigationMenu,  NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useAuth } from '@/hooks/useAuth';
import { navigate } from '@/lib/navigation';
const Header = () => {
    const { user } = useAuth();
  return (
      <div className='flex justify-around h-12'>
      <div></div>
      <div>
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
    { (user)?<div className='p-2 justify-self-end' ><img src='assets/user-square.svg'alt='user logo'onClick={()=>navigate("/home/settings/")} className='h-full'/> </div>: <></>}
    </div>
  )
}

export default Header
