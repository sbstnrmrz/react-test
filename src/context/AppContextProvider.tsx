import { JSX } from "react";
import { AppContext, AppContextProps } from "./AppContext";
import * as api from '../api/index'

interface AppContextProviderProps {
  children: JSX.Element | JSX.Element[];
};

const initialState: AppContextProps = {
};

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  return (
    <AppContext.Provider value={initialState}> 
      {children}
    </AppContext.Provider> 
  )
}

