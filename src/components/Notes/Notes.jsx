import React, { useState } from 'react'
import { useEffect } from 'react'
import { ContainedIconButtonGray, ContainedSecondaryButton, GhostButton } from '../Buttons/Button'
import CustomInput from '../CustomInput/CustomInput'
import config from '../Database/config'
import './Notes.scss'

const Notes = (props) => {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
    const [notesData, setNotesData] = useState({title:"", description:""})
    const [assignedDataNotes, setAssignedDataNotes] = useState([]);

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

   console.log(props.notesData)

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

    const onChangeNotes = (e) => {
        const { value, name } = e.target;
      
        setNotesData({ ...notesData, [name]: value });
        console.log(value);
        console.log(name);
      };
    
console.log(notesData);



let assignedId=props.notesData.id
console.log(assignedId)
useEffect(() => {
  getNoteAssigedData();
}, [assignedId]);

const getNoteAssigedData = () => {
  return fetch(`${config.baseUrl}/contactnotes/?company_id=1&contact_id=${assignedId}`)
    .then((response) => response.json())
    .then((data) => {
    //  const customerVendorIds = data.data.items.map(item => item.contact_id);
      setAssignedDataNotes(data.data.items);
     // console.log(customerVendorIds)
      console.log(data);
    });
};

console.log(assignedDataNotes)

const handleSubmit=(e) =>
{
    e.preventDefault();
    props.onSubmit(notesData);
    getNoteAssigedData();
    props.createNoteFalse();
    // getNoteAssigedData();
    setNotesData({title:"", description:""})
    getNoteAssigedData();
    console.log(props.onSubmit)
    console.log(notesData)
}



  return (
    <form onSubmit={handleSubmit}  >
    <div className='notes-container-main'>

        {props.createNoteActive && <div className="create-note-container">
            <input type="text" className='title-input mb-10' placeholder='Note Title' onChange={onChangeNotes} name="title" value={notesData.title} />
            <textarea type="text" className='note-description' placeholder='Note description' onChange={onChangeNotes} name="description" value={notesData.description} />

            <div className="button-container">
                <GhostButton value="Create Note" type="submit" />
                <ContainedSecondaryButton  value="Cancel" onClick={handleClick}/>
            </div>

        </div>}


        {assignedDataNotes.map((note, index) => {
            return (
            <div key={index} className="note-container">
            <div className="note-open-container">
            <div className="note" onClick={() => handleNoteClick(index)}>
                <div className="right-container">
                    <img src="/images/icons/right-arrow-icon.svg" alt="arrow" className={`${selectedNoteIndex === index && "active"}`}  />
                    <div className='note-icon'><img src="/images/icons/note-icon.svg" alt="" /></div>
                    <p className='sc-body-md note-title'>Note <span>by</span> <span className='name'>{props.notesData.name}</span></p>
                </div>
                <div className="left-container">
                    <img src="/images/icons/calendar.svg" alt="calendar" className='calendar-icon'/>
                    <p className='date-time sc-body-md'>{note.updated_date_time}</p>
                    <img src="/images/icons/three-dot.svg" alt="more" className='more-icon' />
                </div>
            </div>
            {selectedNoteIndex === index  && <hr className='h-line' />}
            {selectedNoteIndex === index  && <div className="note-text">
            <p className='note-title subtitle-sb'>{note.title}</p>
            <p className='mt-10 sc-body-rg'>{note.discription}</p>
            </div>}
            </div>
        </div>)
        })
        }


    </div>
    </form>
  )
}

export default Notes