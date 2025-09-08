import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostComment } from "../components/PostComment"
import { createComment, getEventComments, _Comment } from "../api/comments";
import { getUserById, User } from "../api/users";
import { checkEventExists, getEventPost, _Event } from "../api/events";
import { getFmtDate, getFmtDuration, getFmtTime, getFmtTimeSecs } from "../utils/utils";
import { AppContext } from "../context/AppContext";
import { EventPostModal } from "../components/EventPostModal";
import { PostCommentModal } from "../components/PostCommentModal";

export const EventPostPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const _id = id != undefined ? id : '';

  const {loggedUser} = useContext(AppContext); 

  const [event, setEvent] = useState<_Event | undefined>();

  const [comments, setComments] = useState<_Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<_Comment[]>([]);
  const [user, setUser] = useState<User | undefined>();
  const [commentText, setCommentText] = useState('');
  const [postCommentDisabled, setPostCommentDisabled] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [reloadCommentsTrigger, setReloadCommentsTrigger] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  const [commentsFilter, setCommentsFilter] = useState('Last Added');

  useEffect(() => {
    const controller = new AbortController();

    const loadEvent = async() => {
      if (!id) {
        navigate('/dashboard'); 
      }
      try {
        const _event = await getEventPost(_id);
        if (!_event) {
          console.log(`event ${id} not found`);
          navigate('/not-found');
        }
        setEvent(_event);
        console.log(`event ${_event.id} info loaded`);

        const _user = await getUserById(_event?.userId != undefined ? _event.userId : '' );
        console.log(`got user from event ${_event?.id}: ${_user.username}`);

        setUser(_user);
        console.log(`user ${_user.username} loaded`);
        setTimeLeft(_event?.takesPlace - Date.now());

      } catch (error) {
        console.error('failed to fetch event:', error);
        navigate('/not-found');
      }
    }

    loadEvent();

    return () => {
      controller.abort();
    }
  }, [_id]);

  useEffect(() => {
    const loadComments = async() => {
      const _comments = await getEventComments(_id);
      setComments(_comments);
      setFilteredComments(_comments);
      console.log('comments loaded');
    }

    if (comments.length < 1) loadComments();
    const sorted = [...comments].sort((a, b) => {
      // if comment B - A is negative means that A was created before
        if (commentsFilter === 'Last Added') {
          return b.createdAt - a.createdAt;
        } else {
          return a.createdAt - b.createdAt;
        }
    });
    setFilteredComments(sorted);
  
    return () => {
    }
  }, [reloadCommentsTrigger]);

  useEffect(() => {
    if (!event) {
      return;
    }
    const calcTimeLeft = () => event.takesPlace - Date.now();
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const handleCommentAdded = () => {
    setShowCommentModal(false);
    setReloadCommentsTrigger(prev => prev + 1);
  }

  const renderComments = () => {
    return filteredComments.map(comment => 
      <PostComment 
        key={comment.id}
        comment={comment}
        onDelete={() => {setReloadCommentsTrigger(prev => prev+1)}}
      />);
  }

  const fmtName = `${user?.firstName} ${user?.lastName}`;
  const date = event?.createdAt != undefined ? event.createdAt : Date.now();
  const takesPlaceDate = event?.takesPlace != undefined ? event.takesPlace : Date.now();

  return (
    <div className=" p-6 w-full max-w-[650px] h-[100vh] overflow-auto">
      <div>
        <span className="block text-[15px] font-bold">{fmtName}</span>
        <span className="block text-[15px] text-white/50">{`@${user?.username}`}</span>
      </div>
      <div className="my-4 break-words">
        <span className="block text-[24px] font-bold">{event?.title}</span>
        <p>{event?.description}</p>
      </div>

      <div className="bottom-0 text-gray-400 my-2">
        <span className="block">{`Published: ${getFmtDate(date)} - ${getFmtTime(date)}`}</span>
        <span className="block">{`Takes place: ${getFmtDate(takesPlaceDate)} - ${getFmtTime(takesPlaceDate)}`}</span>
        <span>Time left: {`${timeLeft != undefined ? getFmtDuration(timeLeft) : undefined}`}</span>
        
      </div>

      <hr/>

      {showCommentModal &&
        <PostCommentModal onClose={() => {handleCommentAdded()}}
          eventId={event?.id != undefined ? event.id : 'noId'}
        />
      }
      <div className="flex grow-0 bottom-0 py-2 text-gray-400">
        <a className="flex items-center gap-1 fill-gray-400 text-gray-400 hover:text-white hover:fill-white cursor-pointer"
          onClick={() => {setShowCommentModal(true)}}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
          <span className="">{comments.length}</span>
        </a>
      </div>
      <hr/>

      <div>
        <textarea name="" id="comment-textarea"
          className="resize-none placeholder-gray-400 w-full text-[20px] p-2 outline-0"
          placeholder="Write a comment"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        >
        </textarea>
        <div className="flex justify-end py-2">
          <button className="button-style"
            onClick={async() => {
              if (commentText.length < 1) return; 
              if (loggedUser?.id == undefined || event?.id == undefined) return;
              const comment: _Comment = {
                text: commentText,
                userId: loggedUser.id,
                eventId: event?.id,
                createdAt: Date.now(),
              };

              setPostCommentDisabled(true);
              const newComment = await createComment(comment);
              setComments([...comments, newComment]);
              setCommentText('');
              setPostCommentDisabled(false);
            }}
            disabled={postCommentDisabled}
          >
            Post comment
          </button>
        </div>

      </div>
      <hr/>
      <label htmlFor="">Filter</label>
      <select name="" id="" 
        className="input-style mt-4 ml-2"
        onChange={(e) => {
          setCommentsFilter(e.target.value);
          setReloadCommentsTrigger(prev => prev + 1);
        }}
      >
        <option value="Last Added">Last Added</option>
        <option value="First Added">First Added</option>
      </select>

      <div className="comments-container flex flex-col mt-4 gap-4 w-full">
        {renderComments()}
      </div>
    </div>
  )
}
