import { NavLink, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center px-4">
          <div className=" w-full text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Oops! Something went wrong</h1>
            <p className="text-white mb-8">We're sorry for the inconvenience. Our team has been notified of this issue.</p>
            <div className="space-y-4">
             <a 
                href={`mailto:aryamanch14@gmail.com?subject=Error%20Report&body=I%20encountered%20an%20error%20on%20your%20website.`}
                className="inline-block bg-primary text-white py-2 px-4 rounded hover:bg-rose-900 transition duration-200"
              >
                Contact Developer
              </a>
              <NavLink
                to="/"
                className="block w-sm border border-red-900 text-primary  py-2 px-4 rounded hover:bg-primary hover:text-white transition duration-200"
              >
                Go to Homepage
              </NavLink>
            </div>
          </div>
        </div>
      );
    }

export default ErrorPage
