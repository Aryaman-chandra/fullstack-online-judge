import {  createContext  } from "react";
  
  type IAuthContext = {
    isAuthenticated: boolean;
    setAuthenticated: (newState: boolean) => void
  }
  
  const initialValue = {
    isAuthenticated: false,
    setAuthenticated: () => {}
  }
  
export const  AuthContext = createContext<IAuthContext>(initialValue)
  
  