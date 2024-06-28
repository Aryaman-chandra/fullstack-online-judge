import { useContext } from 'react';
import { Outlet , Navigate } from 'react-router-dom';
import { AuthContext } from '@/config/contexts/AuthContext';
const AuthLayout = () => {
  const { isAuthenticated }  = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <div className='flex'>
      { isAuthenticated?
        (<Navigate to="/home"/>):
        (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet/>
          </section>
          <img
           src="/assets/auth-layout-image.jpg"
           alt="logo"
           className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </>
        )}
    </div>
  )
}

export default AuthLayout
