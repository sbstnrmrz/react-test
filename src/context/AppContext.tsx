import { createContext } from "react"
import * as api from '../api/index'

export type AppContextProps = {
  loggedUser?: api.Users.User; 
  setLoggedUser: (user: api.Users.User) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
