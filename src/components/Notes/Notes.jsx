import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { ContainedButton, ContainedIconButtonGray, ContainedSecondaryButton, GhostButton } from '../Buttons/Button'
import CustomInput from '../CustomInput/CustomInput'
import config from '../Database/config'
import './Notes.scss'
import { Button, Modal, Popover } from 'antd'
import axios from 'axios'
import { toast } from 'react-toastify'

const Notes = ({notesData,noteBy,handleCreate,handleDelete,handleUpdate, ...props}) => {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [confirm, setCofirm] = useState(false);
    const [updateNoteActive, setUpdateNoteActive] = useState(false);
    const [notesContent, setNotesContent] = useState({title:"", description:""});
    const [editId, setEditId] = useState(null);
    
 

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
        setUpdateNoteActive(false);
        setNotesContent({title:"", description:""});
        setEditId(null);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNotesContent({...notesContent, [name]:value});
    }

    const handleCreateNote = () => {
      let data = {
        title: notesContent.title,
        description: notesContent.description,
      };
      handleCreate(data).then((response) => {
      if (response.status === 200 || response.status === 201) {
        setNotesContent({title: "", description: ""});
      }
    })
    }

    const handleUpdateNoteSubmit = async () => {
      let data = {
        title: notesContent.title,
        description: notesContent.description,
        id: editId
      };
    
      try {
        await handleUpdate(data);
        setNotesContent({ title: "", description: "" });
        setUpdateNoteActive(false);
        setEditId(null);
      } catch (error) {
      }
    };
    

    const handleDeleteNote = (note) => {
        setCofirm(note);
        setOpen(null);
    }

    const handleUpdateNote = (note) => {
        console.log(note);
        setUpdateNoteActive(true);
        setEditId(note.id);
        setNotesContent({title:note.title, description:note.discription, id:note.id});
        setOpen(null);
    }
  
  const handleDeleteNoteSubmit = async () => {
    try {
      await handleDelete(confirm);
      setCofirm(false);
      setOpen(null);
    } catch (error) {
    }
  };

  // const handleDelete = async (noteId) => {
  //   try {
  //     await handleDelete(noteId);
  //     setCofirm(false);
  //     setOpen(null);
  //   } catch (error) {
  //   }
  // };


    const handleClickOutside = (e) => {
      const isInsidePopover = e.target.closest('.ant-popover');

      if (!isInsidePopover && open !== null) {
        setOpen(null);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open]);

  return (
<>
    <div className='notes-container-main'>
        {props.createNoteActive ? <div className="create-note-container">
            <input type="text" className='title-input mb-10' placeholder='Note Title'  name="title" value={notesContent.title} onChange={handleChange}  />
            <textarea type="text" className='note-description' placeholder='Note description' name="description" value={notesContent.description} onChange={handleChange}  />

            <div className="button-container">
                <GhostButton value="Create Note" onClick={handleCreateNote}  />
                <ContainedSecondaryButton  value="Cancel" onClick={handleClick}/>
            </div>

        </div> : updateNoteActive ? <div className="create-note-container">
            <input type="text" className='title-input mb-10' placeholder='Note Title'   name="title" value={notesContent.title} onChange={handleChange} />
            {/* <textarea type="text" className='note-description' placeholder='Note description' onChange={onChangeNotesUpdate} name="description" value={getRecord.discription} /> */}
            <textarea type="text" className='note-description' placeholder='Note description'  name="description"  onChange={handleChange} value={notesContent.description} />

            <div className="button-container">
                <GhostButton value="Update Note" onClick={handleUpdateNoteSubmit}   />
                <ContainedSecondaryButton  value="Cancel" onClick={handleClick}/>
            </div> </div>:""}


        {notesData?.map((note, index) => {

            const timestamp = note.updated_date_time;
const date = new Date(timestamp);

const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()} ${formatTime(date)}`;

// Function to format time in "hh:mm AM/PM" format
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${amPm}`;
}

            return (
            <div key={index} style={{ display: editId === note.id && "none"}} className={`note-container`}  >
            <div className="note-open-container">
            <div className="note" >
                <div className="right-container" onClick={() => handleNoteClick(index)}>
                    <img src="/images/icons/right-arrow-icon.svg" alt="arrow" className={`${selectedNoteIndex === index && "active"}`}  />
                    <div className='note-icon'><img src="/images/icons/note-icon.svg" alt="" /></div>
                    <p className='sc-body-md note-title'>Note <span>by</span> <span className='name'>{noteBy}</span></p>
                </div>
                <div className="left-container">
                    <img src="/images/icons/calendar.svg" alt="calendar" className='calendar-icon'/>
                    <p className='date-time sc-body-md'>{formattedDate}</p>
                    <Popover
            id="popoverhide"
            getPopupContainer={(trigger) => trigger.parentElement}
            showArrow={true}
            placement="bottom"
            open={open === note.id}
            content={
              <>
                <div
                className='delete-hover popover-menu-item'
                  onClick={()=>handleDeleteNote(note.id)}

                >
                  <img src="\images\icons\delete_record.svg" />
                  <div>
                    <button
                      className="actionlabel sc-body-md"
                      
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div
                className='edit-hover popover-menu-item'
                onClick={() => {
                  handleUpdateNote(note);}}

                >
                  <img src="\images\icons\edit_record.svg" />
                  <div>
                    <button
                      className="actionlabel sc-body-md"
                      
                    >
                     Edit
                    </button>
                  </div>
                </div>
              </>
            }
            title=""
            height={100}
            trigger="click"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
               // width: "100%",
                cursor: "pointer",
                height: "100%",
              }}
              onClick={(e) => {
                // setOpen(note.id);
                setOpen(open === note.id ? null : note.id);
              }}
              
            >
                  <img src="/images/icons/three-dot.svg" alt="more" className='more-icon' />
              {/* <img src={editdelete} style={{ transform: "rotate(90deg)" }} /> */}
            </div>
          </Popover>
                  
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

    <Modal
        open={confirm}
        width={"max-content"}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        onCancel={()=>setCofirm(false)}
        footer={ false
    }
        closeIcon={
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.51"
              height="13"
              viewBox="0 0 13.51 13"
            >
              <path
                id="Path_34362"
                data-name="Path 34362"
                d="M15.386,13.167l-4.593-4.42,4.593-4.42a1.183,1.183,0,0,0,0-1.723,1.3,1.3,0,0,0-1.79,0L9,7.025,4.41,2.605a1.3,1.3,0,0,0-1.79,0,1.183,1.183,0,0,0,0,1.723l4.593,4.42L2.62,13.167a1.183,1.183,0,0,0,0,1.723,1.3,1.3,0,0,0,1.79,0L9,10.47,13.6,14.89a1.3,1.3,0,0,0,1.79,0A1.189,1.189,0,0,0,15.386,13.167Z"
                transform="translate(-2.248 -2.248)"
                fill="#697a8d"
              />
            </svg>
          </div>
        }
      >

<div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <img
                  src="\images\icons\confirmation-alert-delete.svg"
                  style={{ width: "46px", height: "46px" }}
                />
                <p className="mt-20 heading-sb">Delete Notes</p>
                <p className="sc-body-rg mt-10">
                  Are you sure you want to delete selected notes?
                </p>
                <div className="delete-cancel-btn d-flex gap-16 mt-30">
                  <ContainedButton
                    value="Delete"
                    color="danger"
                    onClick={() => { handleDeleteNoteSubmit();}}
                  />
                  <ContainedSecondaryButton
                    value="Cancel"
                    onClick={()=>setCofirm(false)}/>
                </div>
                <div></div>
              </div>
      </Modal>
      </>

  )
}

export default Notes