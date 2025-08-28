import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as Users from '../api/users'

export const CreateAccountForm = () => {
  return (
    <div className="p-8 bg-[#292929] shadow-xl rounded-[8px]">
      <form onSubmit={handleSubmit(onSubmit)}className="flex flex-col gap-7">
        <div>

          <span className="block text-base font-bold">Email</span>
          <input className="input-style" type="text" 
            {...register("email", {
              required: 'email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })
            } 
          />

        </div>
        <div>
          <span className="block text-base font-bold">Username</span>
          <input className="input-style" type="text" 
            {...register("username", {
              required: 'username is required',
                pattern: {
                  value: /^\S+$/,
                  message: 'invalid username',
                },
              })
            } 
          />

        </div>
        <div>
          <span className="block text-base font-bold">Password</span>
          <input className="input-style" type="text" 
            {...register("password", {required: 'password is required'})} 
          />
        </div>
        <div>
          <p className="text-center text-base text-red-300">{errors.username?.message}</p>
          <p className="text-center text-base text-red-300">{errors.password?.message}</p>
          <p className="text-center text-base text-red-300">{errors.email?.message}</p>
        </div>
        <pre className="text-xs">{data}</pre>
        <button className="button-style">Create Account</button>
      </form>

    </div>
  )
}



