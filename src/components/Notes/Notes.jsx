import React, { useState } from 'react'
import { ContainedIconButtonGray, ContainedSecondaryButton, GhostButton } from '../Buttons/Button'
import CustomInput from '../CustomInput/CustomInput'
import './Notes.scss'

const Notes = (props) => {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
    const [note, setNote] = useState([
        {
            title: 'Note1'
        },
        {
            title: 'Note2'
        },
        {
            title: 'Note3'
        },
    ])

    // const createNoteClick = () => {
    //     setCreateNoteActive(true);
    // }

   

    const handleNoteClick = (index) => {
        if (index === selectedNoteIndex) {
            // if the note is already selected, unselect it
            setSelectedNoteIndex(-1);
        } else {
            // otherwise, select the note
            setSelectedNoteIndex(index);
        }
    };

    const handleClick = () => {
        props.createNoteFalse();
    }

    
  return (
    <div className='notes-container-main'>

        {props.createNoteActive && <div className="create-note-container">
            <input type="text" className='title-input mb-10' placeholder='Note Title' />
            <textarea type="text" className='note-description' placeholder='Note description' />

            <div className="button-container">
                <GhostButton value="Create Note" />
                <ContainedSecondaryButton  value="Cancel" onClick={handleClick}/>
            </div>

        </div>}


        {note.map((note, index) => {
            return (
            <div key={index} className="note-container">
            <div className="note-open-container">
            <div className="note" onClick={() => handleNoteClick(index)}>
                <div className="right-container">
                    <img src="/images/icons/right-arrow-icon.svg" alt="arrow" className={`${selectedNoteIndex === index && "active"}`}  />
                    <div className='note-icon'><img src="/images/icons/note-icon.svg" alt="" /></div>
                    <p className='sc-body-md note-title'>Note <span>by</span> <span className='name'>Ashish Jaria</span></p>
                </div>
                <div className="left-container">
                    <img src="/images/icons/calendar.svg" alt="calendar" className='calendar-icon'/>
                    <p className='date-time sc-body-md'>12 March, 10:00 AM</p>
                    <img src="/images/icons/three-dot.svg" alt="more" className='more-icon' />
                </div>
            </div>
            {selectedNoteIndex === index  && <hr className='h-line' />}
            {selectedNoteIndex === index  && <div className="note-text">
            <p className='note-title subtitle-sb'>Note Title</p>
            <p className='mt-10 sc-body-rg'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est</p>
            </div>}
            </div>
        </div>)
        })
        }


    </div>
  )
}

export default Notes