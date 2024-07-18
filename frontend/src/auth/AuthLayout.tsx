import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
const AuthLayout = () => {
  const navigate = useNavigate();

  // Function to navigate back
  const goBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div className='flex relative'>
      <ArrowLeftIcon
        onClick={goBack}
        className='absolute top-4 left-4 h-8 w-8 text-primary cursor-pointer'
      />
      <section className='flex flex-1 justify-center items-center flex-col py-10'>
        <Outlet />
      </section>
      <img
        src="/assets/auth-layout-image.jpg"
        alt="logo"
        className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
      />
    </div>
  );
}

export default AuthLayout;
