import React from 'react'
import Select from "react-select";
import "./DropdownSimple.scss";

function DropdownSimple() {
    const option = [
        {
          value: "Owner",
          label:(<div className='contdetails' >Owner</div>),
        },
        {
          value: "Accountant",
          label: (<div className='contdetails'>Accountant</div>),
        },
        {
          value: "Sales Person",
          label: (<div className='contdetails' >Sales Person</div>),
        },
        {
          value: "Key Person",
          label: (<div className='contdetails'>Key Person</div>),
        },
        {
          value: "Technician",
          label: (<div className='contdetails'>Technician</div>),
        },
        {
            value: "Manager",
            label: (<div className='contdetails'>Manager</div>),
          },
      ];
  return (
    <div className='drpsimple'>
       <Select placeholder="Select value" options={option} />
    </div>
  )
}

export default DropdownSimple
