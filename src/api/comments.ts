export type _Comment = {
  text: string,
  userId: string,
  eventId: string,
  createdAt: number
};

const apiUrl = process.env.REACT_APP_API_URL != undefined ? process.env.REACT_APP_API_URL : 'localhost:3333'; 

export const createComment = async(comment: _Comment) => {
  try {
    const res = await fetch(`${apiUrl}/comments`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    });

    console.log('res status:', res.statusText); 
    console.log('comment created for event:', comment.eventId); 
    const data = await res.json();
    return data;

  } catch (error) {
    throw `Error creating comment for event: ${comment.eventId}. ${error}` 
  }
}

export const getEventComments = async(eventId: string): Promise<_Comment[]> => {
  try {
    const res = await fetch(`${apiUrl}/comments?eventId=${eventId}`);
    console.log(`fetched comments for event: ${eventId}. status: ${res.statusText}`);
    
    const data = await res.json();
    return data;
  } catch (error) {
    throw `error fetching comments. Error: ${error}`;  
  }
}

