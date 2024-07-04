import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <div className='flex'>
       
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
    </div>
  )
}

export default AuthLayout
