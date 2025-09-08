export type _Event =  {
  id?: string,
  title: string,
  description: string,
  userId: string,
  createdAt: number,
  takesPlace: number,
};

const apiUrl = process.env.REACT_APP_API_URL != undefined ? process.env.REACT_APP_API_URL : 'localhost:3333'; 

export const createEventPost = async(_event: _Event) => {
  try {
    const res = await fetch(`${apiUrl}/events`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_event)
    }); 
    const data: _Event = await res.json();
    console.log(data);
    console.log('create event post response: ' + res.statusText);
    return data;
  } catch (error) {
    throw `error creating event post: ${error}`;
  }
}

export const getUserEventPosts = async(userId: string) => {
  try {
    const res = await fetch(`${apiUrl}/events?userId=${userId}`); 
    console.log(`get user: ${userId} event posts response: ` + res.statusText);
    const data: _Event[] = await res.json();
    return data;
  } catch (error) {
    throw `error gettin user '${userId}' event post: ${error}`;
  }
}

export const getEventPosts = async() => {
  try {
    const res = await fetch(`${apiUrl}/events`);
    console.log(`fetched all event posts: ` + res.statusText);
    const data: _Event[] = await res.json();
    return data;
    
  } catch (error) {
    throw `error gettin event posts: ${error}`;
  }

}

export const getEventPost = async(id: string) => {
  try {
    const res = await fetch(`${apiUrl}/events?id=${id}`); 
    console.log(`get post by id: ${id} event posts response: ` + res.statusText);
    const data: _Event = (await res.json())[0];
    return data;
  } catch (error) {
    throw `error gettin user '${id}' event post: ${error}`;
  }
}


export const deleteEvent = async(eventId: string) => {
  try {
    const res = await fetch(`${apiUrl}/events/${eventId}`, {
      method: 'DELETE'
    });
    console.log(`deleted event: ${eventId}`);
  } catch (error) {
    throw `error deleting event: ${error}`;  
  }
}

export const checkEventExists = async(id: string) => {
  try {
    const res = await fetch(`${apiUrl}/events?id=${id}`); 
    if (res.status === 404) {
      return false;
    }

    return true;
  } catch (error) {
    throw `error deleting event: ${error}`;  
  }
}

