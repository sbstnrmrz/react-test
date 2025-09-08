import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventComments, _Comment } from "../api/comments";
import { _Event } from "../api/events"
import { getUserById, User } from "../api/users";
import { getFmtDate, getFmtTime } from "../utils/utils";
import { PostCommentModal } from "./PostCommentModal";

interface EventPostProps {
  eventPost: _Event
}

export const EventPost = (props: EventPostProps) => {
  const {title, description, createdAt, id, userId, takesPlace} = props.eventPost;
  const _id = id == undefined ? 'noId' : id;

  const navigate = useNavigate();

  const fmtPublishedDate = getFmtDate(createdAt);
  const fmtPublishedTime = getFmtTime(createdAt);

  const fmtTakesPlaceDate = getFmtDate(takesPlace);
  const fmtTakesPlaceTime = getFmtTime(takesPlace);

  const [comments, setComments] = useState<_Comment[]>([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const controller = new AbortController(); 

    const loadUserInfo = async() => {
      const _user = await getUserById(userId);
      console.log(`event post - got user: ${_user.username}`);
      
      setUser(_user);
    }
    
    const loadComments = async() => {
      const _comments = await getEventComments(_id);
      setComments(_comments);
    }
     
    loadUserInfo();
    loadComments();
  
    return () => {
      controller.abort();
    }
  }, [])

  const fmtName = `${user?.firstName} ${user?.lastName}`;

  return (
    <div className="event-post">
      {showCommentModal &&
        <PostCommentModal eventId={_id} onClose={() => setShowCommentModal(false)}/>
      }
      <div className="flex justify-start mb-1"
        onClick={() => {
          console.log('wasa');
          
          navigate(`/event/${_id}`);
        }}  

      >
        <a className="cursor-pointer"
          href={`/profile/${user?.username}`}
        >
          <span className="block text-[15px] font-bold hover:underline">{fmtName}</span>
          <span className="block text-[15px] text-white/50">{`@${user?.username}`}</span>
        </a>
      </div>
      <span className="block text-[22px] font-bold">{title}</span>
      <p>{description}</p>
      <div className="flex flex-col bottom-0 text-gray-400 my-2">
        <span>{`Published: ${fmtPublishedDate} - ${fmtPublishedTime}`}</span>
        <span>{`Takes place: ${fmtTakesPlaceDate} - ${fmtTakesPlaceTime}`}</span>
        
      </div>
      <div className="flex grow-0 bottom-0 text-gray-400">
        <a className="flex items-center gap-1 fill-gray-400 text-gray-400 hover:text-white hover:fill-white cursor-pointer"
          onClick={() => {
            setShowCommentModal(true); 
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
          <span>{comments.length}</span>
        </a>
      </div>
    </div>
  )
}
