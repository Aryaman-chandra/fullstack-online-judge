import './globals.css'
import { ThemeProvider } from './components/ui/theme-provider';
import { RouterProvider  } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContext } from './config/contexts/AuthContext.tsx'
import { useState } from 'react'
import  router  from './root/routes.tsx'


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
