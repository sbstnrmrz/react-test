import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext";
import * as api from '../api/index'
import { useNavigate } from "react-router-dom";
import { DatePicker } from "./DatePicker";
import { DateTimePicker } from "./DateTimePicker";
import { log } from "console";

interface EventPostModalProps {
  show?: boolean,
  onClose?: () => void,
}

export const EventPostModal = (props: EventPostModalProps) => {
  const {loggedUser} = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [takePlaceDate, setTakePlaceDate] = useState<Date | undefined>();
  const [postButtonDisabled, setPostButtonDisabled] = useState(false);


  const navigate = useNavigate();

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
          <DateTimePicker onDateSelected={(date) => {
            setTakePlaceDate(date);
          }}
          />
          <input className="input-style block border-1 border-white " 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            maxLength={30}
          />
          <textarea className="w-100 h-64 resize-none text-2xl outline-0 rounded-[6px] border-1 p-4" 
            name="" id="" 
            placeholder="Event Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log('modal desc: ' + description);
            }}
            maxLength={150}
          >
          </textarea>
        </div>
        <div className="flex justify-end">
          <button 
            className="button-style "
            onClick={async() => {
              console.log('clicked post');
              const userId = loggedUser?.id ? loggedUser.id : 'noIdProvided';
              console.log('takes place');
              
              console.log(takePlaceDate);
              if (takePlaceDate == undefined || takePlaceDate.getTime() <= Date.now()) {
                console.log('date is less than current date');
                return;
              }
              if (description.length < 1 || title.length < 1) {
                console.log('description or title is empty');
                return;
              }
              const _event: api.Events._Event = {
                title: title,
                description: description,
                userId: userId,
                createdAt: Date.now(),
                takesPlace: takePlaceDate.getTime(),
              } 
              console.log('event:');
              console.log(_event);

              setPostButtonDisabled(true);
              const createdEvent = await api.Events.createEventPost(_event);
              navigate(`/event/${createdEvent.id}`);

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

