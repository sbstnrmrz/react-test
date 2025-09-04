import { JSX, useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { Sidebar } from "./Sidebar"
import * as api from '../api/index'
import { useNavigate } from "react-router-dom"

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({children}: LayoutProps) => {
  const {loggedUser, setLoggedUser} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (api.Users.isUserLogged()) {
      const user = api.Users.getUserFromLocalStorage();
      if (user == undefined) return;
      setLoggedUser(user);
    } else {
      navigate('/login');
    } 
  }, []);

  return (
    <>
      <Sidebar/>
      {children}
    </>
  )
}

