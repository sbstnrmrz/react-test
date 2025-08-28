import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Users from '../api/users'

type Inputs = {
  username: string,
  password: string,
};

export const LoginAccountForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const [data, setData] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setData(JSON.stringify(data));
    console.log(data);

    const checkUserExists = await Users.checkUserExists(data.username);
    if (!checkUserExists) return; 
  
    const passwordMatch = await Users.checkPasswordMatch(data.username, data.password);
    if (!passwordMatch) return; 

    console.log(`login with user: ${data.username} successful!`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 ">
      <div>
        <span className="block text-base font-bold">Username</span>
        <input className="input-style" type="text" 
          {...register("username", {
            required: 'Username is required',
            pattern: {
              value: /^\S*$/,
              message: 'Invalid username',
            },
          })
          } 
        />

      </div>
      <div>
        <span className="block text-base font-bold">Password</span>
        <input className="input-style" type="password" 
          {...register("password", {required: 'password is required'})} 
        />
      </div>
      <div>
        {errors.username && 
          <p className="error-msg">{errors.username?.message}</p>
        }
        {errors.password && 
          <p className="error-msg">{errors.password?.message}</p>
        }
      </div>
      {data && 
        <pre className="text-xs">{data}</pre>
      }
      <button className="button-style">Login</button>
    </form>
  )
}

