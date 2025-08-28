import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as api from '../api/index'

type Inputs = {
  firstName: string,
  lastName: string,
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

    const checkUserExists = await api.Users.checkUserExists(data.username);
    if (checkUserExists) return; 

    const checkEmailExists = await api.Users.checkEmailExists(data.email);
    if (checkEmailExists) return; 

    const user: api.Users.User = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date()
    };

    await api.Users.createUser(user);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}className="flex flex-col gap-7">
      <div>
        <span className="block text-base font-bold">First name</span>
        <input className="input-style" type="text" 
          {...register("firstName", {
            required: 'first name is required',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Invalid first name',
            },
            maxLength: 30
          })
          } 
        />
      </div>
      <div>
        <span className="block text-base font-bold">Last name</span>
        <input className="input-style" type="text" 
          {...register("lastName", {
            required: 'last name is required',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Invalid last name',
            },
            maxLength: 30
          })
          } 
        />
      </div>
      <div>
        <span className="block text-base font-bold">Email</span>
        <input className="input-style" type="text" 
          {...register("email", {
            required: 'email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email format',
            },
            minLength: 10
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
              value: /^[A-Za-z0-9$*#_\-.]+$/,
              message: 'invalid username',
            },
          })
          } 
        />
      </div>
      <div>
        <span className="block text-base font-bold">Password</span>
        <input className="input-style" type="text" 
          {...register("password", {
            required: 'password is required',
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$&*_.-]).+$/,
              message: 'invalid password format',
            },
            minLength: 8
          })} 
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
    </form>
  )
}



