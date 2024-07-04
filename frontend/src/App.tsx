import './globals.css'
import { ThemeProvider } from './components/ui/theme-provider';
import { RouterProvider } from 'react-router-dom';
import {  QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import  router  from './root/routes.tsx'
import { useQueryClient } from './config/queryClient.ts';



const App = () => {
  const queryClient = useQueryClient();                        
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
       <main className=' flex-col h-screen '>
              <RouterProvider router={router}/>
            </main>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App

