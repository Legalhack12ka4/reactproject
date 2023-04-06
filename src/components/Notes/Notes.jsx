import React, { useState } from 'react'
import { useEffect } from 'react'
import { ContainedButton, ContainedIconButtonGray, ContainedSecondaryButton, GhostButton } from '../Buttons/Button'
import CustomInput from '../CustomInput/CustomInput'
import config from '../Database/config'
import './Notes.scss'
import { Button, Modal, Popover } from 'antd'
import axios from 'axios'
import { toast } from 'react-toastify'

const Notes = (props) => {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
    const [notesData, setNotesData] = useState({title:"", description:""})
    const [assignedDataNotes, setAssignedDataNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteRecord, setDeleteRecord] = useState(null);
    const [confirm, setCofirm] = useState(false);
    const [updateNoteActive, setUpdateNoteActive] = useState(false);
    const [getRecord, setGetRecord] = useState({title:"", discription:""});
    const [isEditing, setIsEditing] = useState(false);
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
        setUpdateNoteActive(false);
    }

    const onChangeNotes = (e) => {
        const { value, name } = e.target;
      
        setNotesData({ ...notesData, [name]: value });
        console.log(value);
        console.log(name);
      };
    
//console.log(notesData);

//delete data

const handleConfirmCancel = (record) => {
    setDeleteRecord(record)
      setCofirm(true);
    //  console.log(record)
    };
  
    const handleSubmitModal = () => {
        deleteUser(deleteRecord);
        getNoteAssigedData();
        setCofirm(false);
        getNoteAssigedData();
      }
      const handleConfirm = () => {
        setCofirm(false);
        setDeleteRecord(null);
      };
      
      const deleteUser = (record) => {
        axios.delete(`${config.baseUrl}/contactnotes/${record.id}/`).then((response) => {
          setDeleteRecord(null);
    
        //  console.log("data delete ho raha hai");
          toast.error("Note Deleted Successfuly", {
            border: "1px solid red",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          getNoteAssigedData();
        });
      };;
//delete code end 

//#region Update

const handleUpdate = (record) => {
    setGetRecord(record)
    setUpdateNoteActive(true);
    setIsEditing(true);
    // showModal();
  };

  const onChangeNotesUpdate = (e) => {
    const { value, name } = e.target;
  
    setGetRecord({ ...getRecord, [name]: value });
    console.log(value);
    console.log(name);
  };

  const handleFormUpdate = (e) =>
  {
    e.preventDefault();
    axios.put(
      `${config.baseUrl}/contactnotes/` + getRecord.id + "/",
      {
        "title": getRecord.title,
        "discription":getRecord.discription,
        "contact_id": props.notesData.id,
        "company_id": 1,
        "created_by": 1,
        "updated_by": 1
      },
      getRecord
    ).then((response) => 
    {
        
        getNoteAssigedData();
        setUpdateNoteActive(false);
        setIsEditing(false);
      
        toast.success("Notes Updated Successfuly", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        
    })
  }
  //console.log(getRecord.id);
//#endregion 


let assignedId=props.notesData?.id
//console.log(assignedId)
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
   //   console.log(data);
    });
};

//console.log(assignedDataNotes)

const handleSubmit=(e) =>
{
    e.preventDefault();
    props.onSubmit(notesData);
    getNoteAssigedData();
    props.createNoteFalse();
     getNoteAssigedData();
    setNotesData({title:"", description:""})
    getNoteAssigedData();
//    console.log(props.onSubmit)
  //  console.log(notesData)
}

//console.log(getRecord)

  return (
    <form onSubmit={ updateNoteActive ? handleFormUpdate : handleSubmit}  >
    <div className='notes-container-main'>

        {props.createNoteActive ? <div className="create-note-container">
            <input type="text" className='title-input mb-10' placeholder='Note Title' onChange={onChangeNotes} name="title" value={notesData.title} />
            <textarea type="text" className='note-description' placeholder='Note description' onChange={onChangeNotes} name="description" value={notesData.description} />

            <div className="button-container">
                <GhostButton value="Create Note" type="submit" />
                <ContainedSecondaryButton  value="Cancel" onClick={handleClick}/>
            </div>

        </div> : updateNoteActive ? <div className="create-note-container">
            <input type="text" className='title-input mb-10' placeholder='Note Title' value={getRecord.title} onChange={onChangeNotesUpdate} name="title" />
            {/* <textarea type="text" className='note-description' placeholder='Note description' onChange={onChangeNotesUpdate} name="description" value={getRecord.discription} /> */}
            <textarea type="text" className='note-description' placeholder='Note description' onChange={onChangeNotesUpdate} name="discription" value={getRecord.discription} />

            <div className="button-container">
                <GhostButton value="Update Note" onClick={handleFormUpdate} />
                <ContainedSecondaryButton  value="Cancel" onClick={handleClick}/>
            </div> </div>:""}


        {assignedDataNotes.map((note, index) => {

          //  console.log(note.updated_date_time)
            const timestamp = note.updated_date_time;
const date = new Date(timestamp);

// Format the date into "dd, mmm yyyy hh:mm AM/PM" format
const formattedDate = `${date.getDate()}, ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()} ${formatTime(date)}`;

// Function to format time in "hh:mm AM/PM" format
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${amPm}`;
}

//console.log(formattedDate);
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
                    <p className='date-time sc-body-md'>{formattedDate}</p>
                    <Popover
            id="popoverhide"
            defaultOpen={open}
            onOpenChange={setOpen}
            getPopupContainer={(trigger) => trigger.parentElement}
            showArrow={true}
            placement="bottom"
            content={
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                    marginBottom: "10px",
                  }}
                >
                  <img src="\images\icons\delete_record.svg" />
                  <div>
                    <button
                      className="actionlabel sc-body-md"
                      onClick={() => {
                       handleConfirmCancel(note);
                        //hide();
                      }}
                      //onClick={hide}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "11px" }}
                >
                  <img src="\images\icons\edit_record.svg" />
                  <div>
                    <button
                      className="actionlabel sc-body-md"
                      onClick={() => handleUpdate(note)}
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
                setOpen(open);
               // popvisible(e);
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
     //   onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirm}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={ false
           //</form> [
        //   <div style={{ marginLeft: "331px" }}>
        //     <Button
        //       key="cancel"
        //       className="btn_hover_animation"
        //       onClick={handleConfirm}
        //       style={{
        //         width: "86px",
        //         height: "38px",
        //         fontSize: "14px",
        //         fontWeight: "700",
        //         color: "#8E9CAA",
        //         borderColor: "#C2CAD2",
        //       }}
        //     >
        //       Cancel
        //     </Button>
        //     <Button
        //       key="submit"
        //       className="btn_hover_animation"
        //       type="primary"
        //       onClick={handleSubmitModal}
        //       style={{
        //         width: "88px",
        //         height: "38px",
        //         backgroundColor: "#DA2F58",
        //         fontSize: "14px",
        //         fontWeight: "700",
        //         color: "#FFFFFF",
        //       }}
        //     >
        //       Delete
        //     </Button>
        //   </div>,
   //     ]
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
                    onClick={handleSubmitModal}
                    color="danger"
                  />
                  <ContainedSecondaryButton
                    value="Cancel"
                    onClick={handleConfirm}
                  />
                </div>
                <div></div>
              </div>

        {/* <div className="confirmCoontainer">
          <div className="confirmresources">
            <div className="imgsetting">
              <div className="imgbackground">
                <img src={alert} style={{ width: "38px", height: "38px" }} />
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: "22px",
                  color: "#2B3347",
                  fontWeight: "500",
                  padding: "21px 0px 0px 0px",
                }}
              >
                Delete Currency
              </p>
            </div>
          </div>
          <div>
            <p className="confirmationtext">
              Are you sure you want to close this window? <br /> All the value
              which you filled in the fields will be deleted.
              <br /> This action cannot recover the value.
            </p>
          </div>
        </div> */}
      </Modal>
    </form>
  )
}

export default Notes