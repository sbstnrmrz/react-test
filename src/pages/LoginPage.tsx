import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as Users from '../api/users'
import { CreateAccountForm } from "../components/CreateAccountForm";
import { LoginAccountForm } from "../components/LoginAccountForm";

export const LoginPage = () => {
  
  return (
    <div className="">
      <LoginAccountForm/>
    </div>
  )
}

