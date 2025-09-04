import { useEffect, useState } from 'react';
import * as api from '../api/index'
import { getUserById, User } from '../api/users';
import { getFmtDate, getFmtTime } from '../utils/utils';

interface PostCommentProps {
  comment: api.Comments._Comment;
}

export const PostComment = ({comment}: PostCommentProps) => {
  const apiUrl = process.env.REACT_APP_API_URL != undefined ? process.env.REACT_APP_API_URL : 'localhost:3333'; 
  const [text, setText] = useState(comment.text);
  const [user, setUser] = useState<User | undefined>();
  const date = getFmtDate(comment.createdAt);
  const time = getFmtTime(comment.createdAt);

  useEffect(() => {
    const controller = new AbortController();

    const loadUser = async() => {
      const _user = await getUserById(comment.userId);
      setUser(_user);
      console.log(`user ${_user.username} loaded`);
    }

    loadUser();
  
    return () => {
      controller.abort();
    }
  }, [])
  
  const fmtName = `${user?.firstName} ${user?.lastName}`;

  return (
    <div className=" rounded-[8px] bg-[#292929]/80 p-4 break-words">
      <div className="flex justify-start mb-4">
        <a className="cursor-pointer"
          href={`/profile/${user?.username}`}
        >
          <span className="block text-[15px] font-bold hover:underline">{fmtName}</span>
          <span className="block text-[15px] text-white/50">{`@${user?.username}`}</span>
        </a>
      </div>

      <p>{text}</p>
      <div className="bottom-0 text-gray-400 my-2">
        {`${date} - ${time}`}
      </div>
    </div>
  )
}
