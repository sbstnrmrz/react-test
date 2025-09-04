import { useContext, useEffect } from "react"
import { Sidebar } from "../components/Sidebar"
import { AppContext } from "../context/AppContext"
import * as api from '../api/index'
import { useNavigate } from "react-router-dom"

export const DashboardPage = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  console.log('profile context:');
  console.log(context);
  
//useEffect(() => {
//  if (context.loggedUser) {
//    return;
//  }

//  if (api.Users.isUserLogged()) {
//    const user = api.Users.getUserFromLocalStorage();
//    if (user == undefined) return;
//    context.setLoggedUser(user);
//    console.log('user is logged');
//    return;
//  }

//  navigate(`/login`);
//}, []);

  return (
    <div>
    </div>
  )
}

