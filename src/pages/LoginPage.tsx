import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as Users from '../api/users'
import { CreateAccountForm } from "../components/CreateAccountForm";
import { LoginAccountForm } from "../components/LoginAccountForm";
import * as api from '../api/index'

export const LoginPage = () => {
  let sectionMsg: string[] = [
   'Don\'t have an account? Create one here', 
    'Already have an account? Login here',
  ];
  const [isLogin, setIsLogin] = useState(true);
  const [currSectionMsg, setCurrSectionMsg] = useState(sectionMsg[0]);

  const renderSection = () => {
    if (isLogin) {
      return <LoginAccountForm/>;
    } 

    return <CreateAccountForm/>;
  }
  
  return (
    <div className="">
      <div className="p-8 bg-[#292929] shadow-xl rounded-[8px]">
        {renderSection()}
        <a 
          onClick={() => {
            setCurrSectionMsg(isLogin ? sectionMsg[0] : sectionMsg[1]);
            setIsLogin(!isLogin);
          }}
          href='#' className="mt-4 text-blue-300 underline flex justify-center text-xs">{currSectionMsg}
        </a>
      </div>
    </div>
  )
}

