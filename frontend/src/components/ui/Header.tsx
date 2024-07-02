import {headers} from '@/constants/headers'
import { NavLink } from 'react-router-dom';
import { NavigationMenu,  NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
const Header = () => {
  const headerList = headers.map((header,index)=>{
        return <NavigationMenuItem key={index}>
          <NavLink className={navigationMenuTriggerStyle()} to={header.link}>{header.name}</NavLink>
        </NavigationMenuItem>
  })
  return (
        <NavigationMenu className='h-10'>
      <NavigationMenuList>
        {headerList}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Header
