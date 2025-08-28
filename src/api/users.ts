export type User = {
  name: string,
  email: string,
  password: string,
  createdAt: Date,
}

const api_url = process.env.REACT_APP_API_URL != undefined ? process.env.REACT_APP_API_URL : 'localhost:3333'; 

export const createUser = async(user: User) => {

}

export const getUser = async(username: string): Promise<User> => {
  try {
    const res = await fetch(`${api_url}/users?name=${username}`);
    const data = (await res.json())[0];
    console.log(`fetched user:`);
    console.log(data);
    return data;
  } catch (error) {
    throw `error fetching user: ${username}. Error: ${error}`;
  }
}

export const getUsers = async(): Promise<User[]> => {
  let data;
  try {
    const res = await fetch(`${api_url}/users`);
    data = await res.json();
  } catch (error) {
    throw `error fetching users. Error: ${error}`;  
  }

  return data;
}

export const checkUserExists = async(username: string) => {
  try {
    const res = await fetch(`${api_url}/users`); 
    const data = await res.json();
    const exists = data.some((user: any) => user.name === username);
    if (exists) {
      console.log('user:', username,'already exists!');
    }
    console.log('user:', username,'doesnt exists!');
    return exists;

  } catch (error) {
    throw `error checking if user: ${username} exists. Error: ${error}`;
  }
}

export const checkEmailExists = async(email: string) => {
  try {
    const res = await fetch(`${api_url}/users`); 
    const data = await res.json();
    const exists = data.some((user: User) => user.email === email);
    if (exists) {
      console.log('email:', email,'already exists!');
    }
    return exists;

  } catch (error) {
    throw `error checking if email: ${email} exists. Error: ${error}`;
  }
}

export const checkPasswordMatch = async(username: string, _password: string): Promise<boolean> => {
  try {
    // maybe this is redundant
//  const userExists = await checkUserExists(username);
//  if (!userExists) {
//    console.log('user for check password doesnt exists!');
//    return false;
//  }

    console.warn(`trying to get user c=for comparing: ${username}`);
    
    const user = await getUser(username);
    console.log('user for password:');
    console.log(user);
    
    
    console.warn(`savedpass: ${user.password}, inputpass: ${_password}`);
    
    const match = _password === user.password;
    if (match) {
      console.log(`password match`);
      return true;
    }
    console.log(`password doesnt match`);
    return false;

  } catch (error) {
    throw `error checking password match. Error: ${error}`; 
  }
}
