import React from 'react'
import Page_heading from '../../../Page_Heading/Page_heading'
import "../New Estimate/NewEstimate.scss";

function NewEstimate() {
  return (
    <div className="newestimate">
    {/* <Page_heading parent={"List of Modules"} subchild={(<Link exact to= "/module">{"Module"}</Link>)} child={"Payment Terms"} /> */}
    <Page_heading parent={"Sales"}  child={"New Estimate"} />
    <div className="newestimate-container">
        <div className='container1estimate'></div>
        <div className='conatiner2estimate'>
            {/* <button>Save as Draft</button> */}
        </div>
    </div>
    </div>
  )
}

export default NewEstimate
