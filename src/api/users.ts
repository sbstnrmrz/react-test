export type User = {
  name: string,
  email: string,
  password: string,
  createdAt: Date,
}

const api_url = process.env.REACT_APP_API_URL != undefined ? process.env.REACT_APP_API_URL : 'localhost:3333'; 

export const createUser = async(user: User) => {

}

export const getUser = async(username: string) => {
  let data;
  try {
    const res = await fetch(`${api_url}/users?name=${username}`);
    data = await res.json();
  } catch (error) {
    throw `error fetching user: ${username}. Error: ${error}`;
  }

  return JSON.parse(data);
}

export const getUsers = async() => {
  let data;
  try {
    const res = await fetch(`${api_url}/users`);
    data = await res.json();
  } catch (error) {
    throw `error fetching users. Error: ${error}`;  
  }


  return JSON.parse(data);
}

export const checkUserExists = async(username: string) => {
  try {
    const res = await fetch(`${api_url}/users`); 
    const data = await res.json();
    const exists = data.some((user: any) => user.name === username);
    if (exists) {
      console.log('user:', username,'already exists!');
      return true;
    }
  } catch (error) {
    throw `error checking if user: ${username} exists. Error: ${error}`;
  }

  return false;
}

export const checkEmailExists = async(email: string) => {
  try {
    const res = await fetch(`${api_url}/users`); 
    const data = await res.json();
    const exists = data.some((user: User) => user.email === email);
    if (exists) {
      console.log('email:', email,'already exists!');
      return true;
    }
  } catch (error) {
    throw `error checking if email: ${email} exists. Error: ${error}`;
  }

  return false;
}


