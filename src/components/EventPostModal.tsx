import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext";
import * as api from '../api/index'

interface EventPostModalProps {
  show?: boolean,
  onClose?: () => void,
}

export const EventPostModal = (props: EventPostModalProps) => {
  const {loggedUser} = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [takePlaceDate, setTakePlaceData] = useState('');
  const [postButtonDisabled, setPostButtonDisabled] = useState(false);

  return (
    <div className="modal-container">
      <div className="p-8 bg-[#292929] shadow-xl rounded-[8px]">
        <div className="flex">
          <button 
            className="flex cursor-pointer items-center justify-center w-[32px] h-[32px] text-[24px] hover:bg-white/20 rounded-[6px]"
            onClick={props.onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="text-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03" style={{"color": '#ffffff'}}><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
          </button>
        </div>
        <div className="flex flex-col my-4 gap-4">
          <input className="input-style2 block h-12 text-[24px]" 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea className="w-100 h-64 resize-none text-2xl outline-0 rounded-[6px] border-1 p-4" 
            name="" id="" 
            placeholder="Event Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log('modal desc: ' + description);
            }}
          >
          </textarea>
          <span>{description}</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
          <h1>Takes Place</h1>
          <input className="input-style" type="text" />
          </div>
          <button 
            className="button-style "
            onClick={async() => {
              console.log('clicked post');
              const userId = loggedUser?.id ? loggedUser.id : 'noIdProvided';
              const _event: api.Events._Event = {
                title: title,
                description: description,
                userId: userId,
                createdAt: Date.now(),
                takesPlace: Date.now() + 1000,
              } 
              console.log('event:');
              console.log(_event);

              setPostButtonDisabled(true);
              await api.Events.createEventPost(_event);
              setPostButtonDisabled(false);

              if (props.onClose != undefined) props.onClose();
            }}  
            disabled={postButtonDisabled}
          >
            Post
          </button>
        </div>

      </div>
    </div>
  )
}

