import { JSX, useState } from "react";
import { AppContext, AppContextProps } from "./AppContext";
import * as api from '../api/index'

interface AppContextProviderProps {
  children: JSX.Element | JSX.Element[];
};

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<api.Users.User>();

  const contextValue: AppContextProps = {
    loggedUser,
    setLoggedUser
  };

  return (
    <AppContext.Provider value={contextValue}> 
      {children}
    </AppContext.Provider> 
  )
}

