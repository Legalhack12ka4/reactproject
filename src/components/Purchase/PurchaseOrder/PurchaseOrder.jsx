import React from 'react'
import Page_heading from '../../Page_Heading/Page_heading'
import "../../Sales/Estimate/New Estimate/NewEstimate.scss";
import logo from "../../../assets/Images/NewEstimate/Logo.svg";
import r from "../../../assets/Images/NewEstimate/R.svg";
import setting from "../../../assets/Images/NewEstimate/setting.svg";
import draft from "../../../assets/Images/NewEstimate/draft.svg";
import customerdetilslogo from "../../../assets/Images/NewEstimate/editdelete.svg";
import custlogo from "../../../assets/Images/NewEstimate/custlogo.svg";
import arrow from "../../../assets/Images/NewEstimate/arrow.svg";
import email from "../../../assets/Images/FormIcon/Email.svg";
import phone from "../../../assets/Images/FormIcon/Phone.svg";
import SearchDropown from "../../AllDropdowns/SearchDropdown/SearchDropdown"
import { Button, Collapse, message, Switch, Upload } from 'antd';
import icon from "../../../assets/Images/Confirmation/editdelete.svg"
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useState } from 'react';
import config from '../../Database/config';
import { useEffect } from 'react';
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function PurchaseOrder() {
  const [isShown, setIsShown] = useState(false);
    const [customer, setCustomer] = useState([]);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  //Dropdown customer

  const getCustomer = () => {
    return fetch(`${config.baseUrl}/customervendor/`)
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
        // console.log(data);
      });
  };
  const customerdata = customer.map((cust) => ({
    key:cust.id,
    label: (<div onClick={handleClick}>{cust.business_name}</div>),
    value: cust.business_name,

  }));

  useEffect(() => {
    getCustomer();
   // getData();
  }, []);

  return (
    <div className="newestimate">
    {/* <Page_heading parent={"List of Modules"} subchild={(<Link exact to= "/module">{"Module"}</Link>)} child={"Payment Terms"} /> */}
    <Page_heading parent={"Purchase"}  child={"Purchase Order"} />
    <div className="newestimate-container">
        <div className='container1estimate'>
          <div style={{padding:"30px 30px 0px 30px"}}>
          <div className='estimateheader'>
            <div>
              <img src={logo} className="logo1"/><img src={r} className="logo2"/><p className='brandr'>R</p>
            <p className='addressdetails'>308, 3rd Floor, "B" Wing, International
              <br/>Commerce Center, Near Kadiwala School
              <br/> Ring Road, Surat ,Gujarat -395002
            </p>
            </div>
            <div>
              <div style={{display: "flex", alignItems: "center",gap: "20px"}}>
              <p className='estimatelabel' style={{minWidth:"111px"}}>Estimate #  </p>
                  <div className="inputestimate_container">
                    <div className="settingestimate">
                      <input
                      className='estimate1'
                        type="text"
                        placeholder="EST-0090"
                      />
                    </div>
                    <img
                      src={setting}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  </div>

            <div style={{display: "flex", alignItems: "center",gap: "20px",marginBottom: "10px",marginTop: "10px", marginLeft:"13px"}}>
              <p className='estimatedateexpiry'>Estimate Date :  </p>
                 
                    <div className="inputestimate_container">
                      <input
                       className='estimate1'
                        type="text"
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
                   
                  </div>
                 

                  <div style={{display: "flex", alignItems: "center",gap: "20px", marginLeft:"29px"}}>
              <p className='estimatedateexpiry'>Expiry Date :  </p>
                 
                    <div className="inputestimate_container">
                      <input
                       className='estimate1'
                        type="text"
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
                   
                  </div>
                
             
           
            </div>
          </div>

            </div>

            {/* //collapse */}
          <div className='bill'>
        <p className='billabel'>Bill to</p>
        <div style={{marginLeft:"30px", marginTop:"15px", marginBottom:"15px"}}>
        {/* <Collapse key={10} ghost>
   <Panel header="This is panel header 1" key="10">
      <p>{text}</p>
    </Panel>
   
  </Collapse> */}
   {!isShown && <SearchDropown  width={250} options={customerdata} />}
   {/* {!isShown && <div onClick={handleClick}  className="showcustomer">Select Customer <img src={arrow} style={{transform: "rotate(90deg)"}}/></div>} */}

{/* 👇️ show elements on click */}
{isShown && (
  <div style={{display:"flex", gap:"70px"}}>
    <div>
      <p style={{fontSize:"14px", color:"#5C5AD0", fontWeight:"400", marginBottom:"5px"}}>Freda Fashion Ltd</p>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"5px"}}>24AA56IU12KITF6</p>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"2px"}}>G-2, Ground Floor, International
      <br/>Business Center, Piplod, Surat
      <br/>Gujarat- 395002</p>
      {/* <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"2px"}}></p>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"17px"}}>
      </p> */}
    </div>
    <div className='billabel'>
      <p  style={{marginTop:"-48px"}}>Ship To</p>
      <div style={{marginTop:"16px"}}>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"5px"}}>Taj Resort & Convention Center <br/>
      Vainguinim Beach, Dona Paula,<br/>
      Panaji, Goa- 403004
      </p>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginTop:"25px"}}>+91 9998888877</p>
      {/* <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"2px"}}>Business Center, Piplod, Surat</p>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"17px"}}>Gujarat- 395002
      </p> */}
    </div>
    </div>
    <div className='billabel' >
      <p style={{marginTop:"-48px"}}>Place of Supply</p>
      <div style={{marginTop:"16px"}}>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"5px"}}>Goa
      </p>
      </div>
    </div>
  </div>
)}


        </div>
            </div>

            <div style={{padding:"30px", display:"flex", alignItems:"center", gap:"20px"}}>
              <div>
                <p className='preferncelabel'>
                  Sales Person
                </p>
                <SearchDropown width={330}/>
              </div>
              <div>
                <p className='preferncelabel'>
                  # Reference
                </p>
                <div className="reference_input">
                <input
                       className='reference'
                        type="text"
                      
                      />
                      </div>
              </div>
            </div>

{/* //table */}

            <div className='eslist' style={{padding:"0px 30px"}}>
              <div >  <p className='eslistlabel'>Item Details</p></div>
              <div style={{marginLeft:"283px"}}>  <p className='eslistlabel'>Qty</p></div>
              <div  style={{marginLeft:"96px"}}>  <p className='eslistlabel'>Rate</p></div>
              <div  style={{marginLeft:"20px"}}>  <p className='eslistlabel'>Tax</p></div>
              <div  style={{marginLeft:"155px"}}>  <p className='eslistlabel'>Amount</p></div>
            </div>

            <div style={{display:"flex", alignItems:"center", marginTop:"20px", gap:"20px", padding:"0px 20px 0px 30px"}}>
             
                  <div className="inputestimate1_container">
                      <input
                       className='inputestimate1'
                        type="text"
                        placeholder="Click to Select Items"
                      />
                    </div>
                    
                  
              <div className="inputestimate2_container">
                      <input
                       className='inputestimate2'
                        type="text"
                        placeholder="1.00"
                      />
                    </div>
              
             <div className="inputestimate3_container">
                      <input
                       className='inputestimate3'
                        type="text"
                        placeholder="₹ 0.00"
                      />
                    </div>
             
                <div className="inputestimate4_container">
                      <input
                       className='inputestimate4'
                        type="text"
                        placeholder="Select"
                      />
                    </div>
             
             <div className="calculation">
                      <p style={{color:"#2B3347", fontSize:"14px", fontWeight:"500"}}> ₹ 0.00</p>
                    </div>
             
              <div style={{marginLeft:"6px"}}>
                 <img src={icon}/>
                    </div>
              
          </div>

          <hr className='dividerestimate'/>

{/* //total */}

      <div style={{display:"flex", justifyContent:"space-between", padding:"30px 50px 30px 30px"}}>
        <div>
          <p style={{
    fontSize:"14px",
    color: "#5C5AD0",
    fontWeight:"600"

          }}>Add Item</p>
          <p
          style={{
            fontSize:"14px",
            color: "#2B3347",
            fontWeight:"500",
        marginTop:"43px"
                  }}>Notes</p>
          <div className="notes_container">
                      <input
                       className='notes'
                        type="text"
                        placeholder="Thanks for your business."
                      />
          </div>
          <p 
            style={{
              fontSize:"14px",
              color: "#2B3347",
              fontWeight:"500",
          marginTop:"18px",
          marginBottom:"15px"
                    }}>Attachments</p>
          <div>
          <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
          </div>
        </div>
        <div>
          <div style={{display:"flex", gap:"129px", marginBottom:"11px"}}>
            <div>
            <p className='subtotal'>Sub Total</p>
            </div>
            <div>
            <p style={{color:"#2B3347", fontSize:"14px", fontWeight:"500"}}>₹ 0.00</p>  
            </div>
          </div>

           <div style={{display:"flex", gap:"134px", marginBottom:"11px"}}>
            <div>
            <p className='valuestotal'>Discount</p>
            </div>
            <div>
            <p style={{color:"#2B3347", fontSize:"14px", fontWeight:"500"}}>₹ 0.00</p>  
            </div>
          </div>
          
          <div style={{display:"flex", gap:"76px", marginBottom:"11px"}}>
            <div>
            <p className='valuestotal'>Shipping Charges</p>
            </div>
            <div>
            <p style={{color:"#2B3347", fontSize:"14px", fontWeight:"500"}}>₹ 0.00</p>  
            </div>
          </div>
          
          <div style={{display:"flex", gap:"164px", marginBottom:"11px"}}>
            <div>
            <p className='valuestotal'>TCS</p>
            </div>
            <div>
            <p style={{color:"#2B3347", fontSize:"14px", fontWeight:"500"}}>₹ 0.00</p>  
            </div>
          </div>
          
          <div style={{display:"flex", gap:"125px", marginBottom:"45px"}}>
            <div>
            <p className='valuestotal'>Round Off</p>
            </div>
            <div>
            <p style={{color:"#2B3347", fontSize:"14px", fontWeight:"500"}}>₹ 0.00</p>  
            </div>
          </div>
          <hr style={{marginTop:"-22px", marginBottom:"20px", border: "0.5px solid #D9DEE3"}}/>
          
          <div style={{display:"flex", gap:"154px"}}>
            <div>
            <p className='valuestotalall'>Total</p>
            </div>
            <div>
            <p style={{color:"#5C5AD0", fontSize:"14px", fontWeight:"500"}}>₹ 0.00</p>  
            </div>
          </div>         
        </div>
      </div>


        </div>




{/* //second panel */}

<div className='save_as_draft_container'>
        {isShown && (
  <div className='customerinfo'>
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <div style={{color:"#2B3347", fontSize:"16px", fontWeight:"500"}}>Customer Details</div> 
      <div><img src={customerdetilslogo} style={{transform: "rotate(90deg)"}}/></div>
    </div >
    <div style={{display:"flex", alignItems:"center", marginTop:"12px"}}>
    <div><img src={custlogo}/></div>
    <div style={{marginLeft:"16px"}}><p className='custname'>Ashish Jaria </p> <p className='cmpname'>FREDA FASHION LTD</p></div>
    </div>
    <hr style={{border:"0.5px solid #C2CAD2",marginTop: "20px"}}/>
  <div style={{marginTop:"20px"}}>
    <p style={{
    color:"#2B3347",
    fontSize: "14px",
    fontWeight: "500"
}}>Contact Details</p>
    {/* //email */}
    <div style={{display:"flex", gap:"10px", alignItems:"center", marginTop:"15px"}}>
    <img src={email}/>
    <div style={{fontSize:"14px",
    color:"#697A8D",
    fontWeight:"500"}}>Sales_information@Freda.com</div>
    </div>
{/* //phone */}
<div style={{display:"flex", gap:"10px", alignItems:"center", marginTop:"10px"}}>
    <img src={phone}/>
    <div style={{
          color: "#697A8D",
          fontSize: "14px",
          fontWeight:"500"
    }}>+91 9898925125</div>
    </div>
{/* //phone */}
<div style={{display:"flex", gap:"10px", alignItems:"center", marginTop:"10px"}}>
    <img src={phone}/>
    <div style={{
          color: "#697A8D",
          fontSize: "14px",
          fontWeight:"500"
    }}>+91 7778928885</div>
    </div>

  </div>
  <hr style={{border:"0.5px solid #C2CAD2",marginTop: "20px", marginBottom:"20px"}}/>

  <div style={{display:"flex", gap:"40px"}}>
    <div>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"2px"}}>Outstanding Amount</p>
      <p style={{fontSize:"16px", color:"#2B3347", fontWeight:"600", marginBottom:"20px"}}>₹ 1.18 lacs</p>
      <p style={{fontSize:"14px", color:"#697A8D", fontWeight:"400"}}>Attach pdf in mail</p>
    </div>
    <div>
      <p  style={{fontSize:"14px", color:"#697A8D", fontWeight:"400", marginBottom:"2px"}}>Credits</p>
      <p style={{fontSize:"16px", color:"#2B3347", fontWeight:"600", marginBottom:"20px"}}>₹ 0.21 lacs</p>
      <p> <div className="switch_toggler">
                    <Switch
                      unCheckedChildren="__"
                    //  onChange={handleBomChange}
                    //  onClick={setIsBOMModalOpen}
                    />
                  
                   
                  </div></p>
    </div>
  </div>
          
  </div>
)}
        <div className='conatiner2estimate'>
        <p>
        <button className='draft'> <img src={draft} style={{marginRight:"5px"}}/>Save as Draft</button> </p>
             <div style={{display:"flex", marginTop:"20px", gap:"20px"}}>
              <div> <button className='draftbody'>Save as Draft</button></div>
              <div> <button className='draftbody'>Save as Draft</button></div>
             </div>
  
    </div>
    
            
        </div>
        
    </div>
    </div>
  )
}

export default PurchaseOrder
