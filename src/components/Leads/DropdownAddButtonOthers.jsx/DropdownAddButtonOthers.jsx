import React from 'react'
import { Link } from 'react-router-dom';
import Select from "react-select";
import "./DropdownAddButtonOthers.scss";

function DropdownAddButtonOthers() {

    // const handlecheck = () =>
    // {
    //   alert("Click for add");
    // }
    const option = [
        {
          value: "Owner",
          label:(<div className='contdetails' >ITME 2022</div>),
        },
        {
          value: "Accountant",
          label: (<div className='contdetails'>IT Sol 2019</div>),
        },
        {
          value: "Sales Person",
          label: (<div className='contdetails' >ITME 2018</div>),
        },
        {
          value: "Key Person",
          label: (<div className='contdetails'>Colortax</div>),
        },
        {
          value: "Technician",
          label: (<div className='contdetails'>The Cloth 2K19</div>),
        },
        {
            value: "Manager",
            
            label: (<div><Link className='contbtndetails' type="button"  exact to="/customers" >+ Add New </Link></div>),
            isDisabled: true,
          },
      ];
  return (
    <div className='drpsimple'>
       <Select placeholder="Select value" options={option} 
       onMenuClose={false}
       />
    </div>
  )
}

export default DropdownAddButtonOthers
