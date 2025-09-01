import { createContext } from "react"
import * as api from '../api/index'

export type AppContextProps = {
  loggedUser?: api.Users.User; 
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
