import './globals.css'
import SignupForm from './auth/forms/SignupForm'
import SigninForm from './auth/forms/SigninForm'
import { Home } from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { ThemeProvider } from './components/ui/theme-provider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContext } from './config/contexts/AuthContext.tsx'
import { useState } from 'react'
import Problems from './root/pages/Problems.tsx'
const router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout/>,
    children : [
      {
        path : "/home",
        element: <Home/>
      },
      {
        path:"/problems",
        element: <Problems/>
      }

    ]
  },
  {
    path:"/auth",
    element: <AuthLayout/>,
    children:[
      {
        path: "sign-in",
        element: <SigninForm/>
      },
      {
        path:"sign-up",
        element:<SignupForm/>
      }
    ]
  }
])
const queryClient = new QueryClient();
const App = () => {
  const [isAuthenticated , setAuthenticated ] = useState(false);                         
  return (
    <AuthContext.Provider value={{isAuthenticated , setAuthenticated}}>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
       <main className=' flex-col h-screen '>
              <RouterProvider router={router}/>
            </main>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </AuthContext.Provider>
    )
}

export default App
