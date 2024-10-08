import './globals.css'
import { ThemeProvider } from './components/ui/theme-provider';
import { RouterProvider } from 'react-router-dom';
import {  QueryClientProvider } from '@tanstack/react-query'
import  router  from './root/routes.tsx'
import { useQueryClient } from './config/queryClient.ts';



const App = () => {
  const queryClient = useQueryClient();                        
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
       <main className=' flex-col'>
              <RouterProvider router={router}/>
            </main>
    </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App

