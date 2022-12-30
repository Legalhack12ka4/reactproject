import React from 'react'
import Select from "react-select";
import "./DropdownWithLarge.scss";

function DropdownWithLarge() {
    const options = [
        {
          value: "1",
          label:(<div className='contdetails' >Regsitered Business-Regular</div>),
        },
        {
          value: "2",
          label: (<div className='contdetails'>Registered Business- Composition</div>),
        },
        {
          value: "3",
          label: (<div className='contdetails' >Unregistered Business</div>),
        },
        {
          value: "4",
          label: (<div className='contdetails' >Consumer</div>),
        },
        {
          value: "5",
          label: (<div className='contdetails' >Overseas</div>),
        },
        {
          value: "6",
          label: (<div className='contdetails' >Special Ex=conomic Zone</div>),
        },
        {
          value: "7",
          label: (<div className='contdetails' >Deemed Export</div>),
        },
        {
          value: "8",
          label: (<div className='contdetails' >Tax Deductor</div>),
        },
        {
          value: "9",
          label: (<div className='contdetails' >SEZ Developer</div>),
        },

       
      ];

    //  const options=[
    //     {
    //       value: '1',
    //       label: (<div>
    //         <p>Registered Business - Regular</p>
    //         </div>),
    //     },
    //     {
    //       value: '2',
    //       label: (<div>
    //         <p>Registered Business - Composition</p>
    //         <p>Business that is registerd under the Composition Scheme in GST</p>
    //         </div>),
    //     },
    //     {
    //       value: '3',
    //       label: (<div>
    //         <p>Unregistered Business</p>
    //         <p>Business that has not been registered under GST</p>
    //         </div>),
    //     },
    //     {
    //       value: '4',
    //       label: (<div>
    //         <p>Consumer</p>
    //         <p>A customer who is regualr consumer</p>
    //         </div>),
    //     },
    //     {
    //       value: '5',
    //       label: (<div>
    //         <p>Overseas</p>
    //         <p>Person with whom you do import or export of supplies outside India</p>
    //         </div>),
    //     },
    //     {
    //       value: '6',
    //       label: (<div>
    //         <p>Special Economic Zone</p>
    //         <p>Business (Unit) that is located in a Special Ecoomic Zone (SEZ) of India or a SEZ Developer</p>
    //         </div>),
    //     },
    //     {
    //       value: '7',
    //       label: (<div>
    //         <p>Deemed Export</p>
    //         <p>Supply of goods to an Export Oriented Unit or against Advanced Authorization/Export Promotion Captial Goods.</p>
    //         </div>),
    //     },
    //     {
    //       value: '8',
    //       label: (<div>
    //         <p>Tax Deductor Business</p>
    //         <p>Department of the State/Central government, governmental agencies or local authorities</p>
    //         </div>),
    //     },
    //     {
    //       value: '9',
    //       label: (<div>
    //         <p>SEZ Developer</p>
    //         <p>A person/organisation who owns at least 26% of the equity in creating business units in a Special Economic Zone (SEZ)</p>
    //         </div>),
    //     },
    //   ]
  return (
    <div className='drpwidth'>
       <Select placeholder="Select value" options={options} />
    </div>
  )
}

export default DropdownWithLarge
