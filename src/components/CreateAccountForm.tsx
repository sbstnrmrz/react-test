import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as Users from '../api/users'

type Inputs = {
  email: string,
  username: string,
  password: string,
};

export const CreateAccountForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const [data, setData] = useState('');
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setData(JSON.stringify(data));
    console.log(data);

    const checkUserExists = await Users.checkUserExists(data.username);
    if (checkUserExists) return; 

    const checkEmailExists = await Users.checkEmailExists(data.email);
    if (checkEmailExists) return; 

    const user: Users.User = {
      name: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date()
    };

    const res = await fetch('http://localhost:3333/users', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    });
    const resData = await res.json();
    console.log('res status:', res.statusText); 

    console.log(resData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}className="p-8 bg-[#292929] shadow-xl rounded-[8px] flex flex-col gap-7">
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
        {errors.username && 
          <p className="error-msg">{errors.username?.message}</p>
        }
        {errors.email && 
          <p className="error-msg">{errors.email?.message}</p>
        }
        {errors.password && 
          <p className="error-msg">{errors.password?.message}</p>
        }
      </div>
      <button className="button-style">Create Account</button>
      <a href='#' className="underline flex justify-center text-xs">Already have an account? Login here</a>
    </form>
  )
}



