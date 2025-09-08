export type User = {
  id?: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  createdAt: Date,
}

const apiUrl = process.env.REACT_APP_API_URL != undefined ? process.env.REACT_APP_API_URL : 'localhost:3333'; 

export const createUser = async(user: User) => {
  try {
    const res = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    });
    const resData = await res.json();
    console.log('res status:', res.statusText); 
    console.log(resData);
  } catch (error) {
    throw `error creating new user: ${user.username}. Error ${error}`;  
  }
}

export const getUser = async(username: string): Promise<User> => {
  try {
    const res = await fetch(`${apiUrl}/users?username=${username}`);
    const data = (await res.json())[0];
    console.log(`fetched user:`);
    console.log(data);
    return data;
  } catch (error) {
    throw `error fetching user: ${username}. Error: ${error}`;
  }
}

export const getUserById = async(id: string): Promise<User> => {
  try {
    const res = await fetch(`${apiUrl}/users?id=${id}`);
    const data = (await res.json())[0];
    console.log(`fetched user:`);
    console.log(data);
    return data;
  } catch (error) {
    throw `error fetching user by id: ${id}. Error: ${error}`;
  }
}

export const getUsers = async(): Promise<User[]> => {
  let data;
  try {
    const res = await fetch(`${apiUrl}/users`);
    data = await res.json();
  } catch (error) {
    throw `error fetching users. Error: ${error}`;  
  }

  return data;
}

export const checkUserExists = async(username: string) => {
  try {
    const res = await fetch(`${apiUrl}/users`); 
    const data = await res.json();
    const exists = data.some((user: any) => user.username === username);
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
    const res = await fetch(`${apiUrl}/users`); 
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

export const isUserLogged = () => {
  const item = localStorage.getItem('user');
  if (item != undefined) {
    return true;
  }

  return false;
}

export const getUserFromLocalStorage = () => {
  const localItem = localStorage.getItem('user');
  if (localItem == undefined) return;

  const user: User = JSON.parse(localItem);

  return user;
}

export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const logoutUser = () => {
  localStorage.removeItem('user');
}

export const setCookies = async() => {

}

export const modifyUser = async (user: User) => {
  try {
    const res = await fetch(`${apiUrl}/users/${user?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = res.json();
    console.log(`patch user ${user?.id}. status: ${res.statusText}`);
  } catch (error) {
    throw `error modifying user ${user?.id}`
  }
}

