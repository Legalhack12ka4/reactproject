import React from 'react'
import { Link } from 'react-router-dom'
import Page_heading from '../../Page_Heading/Page_heading'
import "./Module.scss"

function Module() {
  return (
    <>
    <div className='Module_heading'>
    <Page_heading  parent={"List of Module"} child={"Module List"}/>
    </div>
    <div className=''>
    <div className='Module'>
   <Link exact to="/module/module_paymenttable"><button type='button' className='payment_btn'>Payment Terms</button></Link>
    </div>
    </div>
    </>
  )
}

export default Module
