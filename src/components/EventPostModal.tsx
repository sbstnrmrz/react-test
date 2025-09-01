import { useState } from "react"

interface EventPostModalProps {
  show?: boolean,
  onClose?: () => void,
}

export const EventPostModal = (props: EventPostModalProps) => {


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
        <div className="my-4">
          <h1 className="font-bold text-xl mb-2">Descripcion del Evento</h1>
          <textarea className="w-100 h-64 resize-none text-2xl outline-0 rounded-[6px] border-1 p-4" name="" id="" placeholder="New Event"></textarea>
        </div>
        <div className="flex justify-between items-end">
          <div>
          <h1>Takes Place</h1>
          <input className="input-style" type="text" />
          </div>
          <button className="button-style ">
            Post
          </button>
        </div>

      </div>
    </div>
  )
}

