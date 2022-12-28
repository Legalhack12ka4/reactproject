import React from 'react'
import Select from "react-select";
import "./DropdownSimpleCategory.scss";

function DropdownSimpleCategory() {
    const option = [
        {
          value: "Wholesaler",
          label:(<div className='contdetails' >Wholesaler</div>),
        },
        {
          value: "Retailor",
          label: (<div className='contdetails'>Retailor</div>),
        },
        {
          value: "Manufacturer",
          label: (<div className='contdetails' >Manufacturer</div>),
        },
        // {
        //   value: "Key Person",
        //   label: (<div className='contdetails'>Key Person</div>),
        // },
        // {
        //   value: "Technician",
        //   label: (<div className='contdetails'>Technician</div>),
        // },
        // {
        //     value: "Manager",
        //     label: (<div className='contdetails'>Manager</div>),
        //   },
      ];
  return (
    <div className='drpsimple'>
       <Select placeholder="Select value" options={option} />
    </div>
  )
}

export default DropdownSimpleCategory
