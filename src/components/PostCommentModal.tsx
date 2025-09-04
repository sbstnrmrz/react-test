import { useContext, useState } from "react";
import { createComment, _Comment } from "../api/comments";
import { AppContext } from "../context/AppContext";

interface PostCommentModalProps {
  show?: boolean,
  onClose?: () => void,
  eventId: string,
}

export const PostCommentModal = (props: PostCommentModalProps) => {
  const {loggedUser} = useContext(AppContext);
  const [commentText, setCommentText] = useState('');;
  const [postCommentDisabled, setPostCommentDisabled] = useState(false);

  return (
    <div className="modal-container">
      <div className="p-8 bg-[#292929] shadow-xl rounded-[8px]">
        <div className="flex">
          <button 
            className="flex cursor-pointer items-center justify-center w-[32px] h-[32px] text-[24px] hover:bg-white/20 rounded-[6px]"
            onClick={props.onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03" style={{"color": '#ffffff'}}><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
          </button>
        </div>
        <div className="flex flex-col my-4 gap-4">
          <textarea className="w-100 h-64 resize-none text-2xl outline-0 rounded-[6px] border-1 p-4" 
            name="" id="" 
            placeholder="Write a comment"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              console.log('modal desc: ' + commentText);
            }}
          >
          </textarea>
        </div>
        <div className="flex justify-end">
          <button 
            className="button-style "
            onClick={async() => {
              if (loggedUser?.id == undefined) return;
              const comment: _Comment = {
                text: commentText,
                userId: loggedUser.id,
                eventId: props.eventId,
                createdAt: Date.now()
              }

                          
              setPostCommentDisabled(true);
              await createComment(comment);
              setPostCommentDisabled(false);
            }}  
            disabled={postCommentDisabled}
          >
            Post Comment
          </button>
        </div>

      </div>
    </div>
  )
}

