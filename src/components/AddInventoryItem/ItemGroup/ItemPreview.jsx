import React from 'react'
import Page_heading from '../../Page_Heading/Page_heading';
import "../ItemGroup/ItemPreview.scss";
import edit from "../../../assets/Images/ItemPreview/Edit.svg"
import dob from "../../../assets/Images/FormIcon/DOB.svg";

function ItemPreview() {
  return (
    <div className="itempreview">
       <Page_heading parent={"Item or Service"}  child={"Inventory Items"} />
       <div className="previewcontainer">
    <div className='previewheader'>
        {/* //first */}
    <div style={{display:"flex", alignItems:"center"}}><div className='activeheader'></div>
    <div className='nameheader'>
        <p>Grick Chexed</p>
        <p1 style={{color:"#697A8D", fontSize:"14px"}}>GR-0000001</p1>
    </div>
    </div>
{/* //second */}
<div style={{display:"flex", alignItems:"center"}}>
    <div className='dateheader'>
   
    <div  className="previewinput">
                <img src={dob} className="customerimg" />
                {/* <DateRangePickerComp /> */}
                <input
                  type="text"
                  className="inputpreview"
                  placeholder="Select Date to filter Data"
                  name="name"
                />
               </div>
               </div>
    <div className='editheader'>
    <img src={edit} style={{marginRight:"5px"}}/>
    <div><p>Edit Group</p></div>
    </div>
    </div>
    </div>

    {/* //body_gradient */}
    <div className='previewbody'>

    </div>
       </div>
   </div>
  )
}

export default ItemPreview
