import React from 'react'
import Page_heading from '../../../Page_Heading/Page_heading'
import "../New Estimate/NewEstimate.scss";
import logo from "../../../../assets/Images/NewEstimate/Logo.svg";
import r from "../../../../assets/Images/NewEstimate/R.svg";
import setting from "../../../../assets/Images/NewEstimate/setting.svg";
import { Button, Collapse, message, Upload } from 'antd';
import icon from "../../../../assets/Images/Confirmation/editdelete.svg"
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function NewEstimate() {

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
  
  return (
    <div className="newestimate">
    {/* <Page_heading parent={"List of Modules"} subchild={(<Link exact to= "/module">{"Module"}</Link>)} child={"Payment Terms"} /> */}
    <Page_heading parent={"Sales"}  child={"New Estimate"} />
    <div className="newestimate-container">
        <div className='container1estimate'>
          <div className='estimateheader'>
            <div style={{padding:"30px 0px 0px 30px"}}>
              <img src={logo} className="logo1"/><img src={r} className="logo2"/><p className='brandr'>R</p>
            <p className='addressdetails'>308, 3rd Floor, "B" Wing, International
              <br/>Commerce Center, Near Kadiwala School
              <br/> Ring Road, Surat ,Gujarat -395002
            </p>
            </div>
            <div  style={{padding:"30px 0px 0px 30px"}}>
              <div style={{display: "flex", alignItems: "center",gap: "20px"}}>
              <p className='estimatelabel'>Estimate #  </p>
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
{/* //collapse */}
          <div className='bill'>
        <p className='billabel'>Bill to</p>
        <div>
        <Collapse key={10} ghost>
   <Panel header="This is panel header 1" key="10">
      <p>{text}</p>
    </Panel>
   
  </Collapse>
 
        </div>
            </div>

{/* //table */}

            <div className='eslist'>
              <div style={{marginLeft:"30px"}}>  <p className='eslistlabel'>Item Details</p></div>
              <div style={{marginLeft:"283px"}}>  <p className='eslistlabel'>Qty</p></div>
              <div  style={{marginLeft:"94px"}}>  <p className='eslistlabel'>Rate</p></div>
              <div  style={{marginLeft:"20px"}}>  <p className='eslistlabel'>Tax</p></div>
              <div  style={{marginLeft:"168px"}}>  <p className='eslistlabel'>Amount</p></div>
            </div>

            <div style={{display:"flex", alignItems:"center", marginTop:"20px"}}>
             
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
             
              <div style={{marginLeft:"26px"}}>
                 <img src={icon}/>
                    </div>
              
          </div>

          <hr className='dividerestimate'/>

{/* //total */}

      <div style={{display:"flex", gap:"89px"}}>
        <div style={{padding:"20px 30px"}}>
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
        <div style={{padding:"20px"}}>
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

        <div>
        <Panel header="" key="10">
      <p>{text}</p>
        </Panel>
        <div className='conatiner2estimate'>
          
            
  
  
    </div>
    
            {/* <button>Save as Draft</button> */}
        </div>
    </div>
    </div>
  )
}

export default NewEstimate
