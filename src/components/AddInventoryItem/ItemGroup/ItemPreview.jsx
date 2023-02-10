import React, { useState } from 'react'
import Page_heading from '../../Page_Heading/Page_heading';
import "../ItemGroup/ItemPreview.scss";
import edit from "../../../assets/Images/ItemPreview/Edit.svg"
import shirt1 from "../../../assets/Images/ItemPreview/Shirt1.svg"
import shirt2 from "../../../assets/Images/ItemPreview/Shirt2.svg"
import shirt3 from "../../../assets/Images/ItemPreview/Shirt3.svg"
import shirt4 from "../../../assets/Images/ItemPreview/Shirt4.svg"
import shirt5 from "../../../assets/Images/ItemPreview/Shirt5.svg"
import dob from "../../../assets/Images/FormIcon/DOB.svg";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Space, Tag, Upload } from 'antd';

function ItemPreview() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const log = (e) => {
    console.log(e);
  };
  
  return (
    <div className="itempreview">
      <Page_heading parent={"Item or Service"} child={"Inventory Items"} />
      <div className="previewcontainer">
        <div className="previewheader">
          {/* //first */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="activeheader"></div>
            <div className="nameheader">
              <p>Grick Chexed</p>
              <p1 style={{ color: "#697A8D", fontSize: "14px" }}>GR-0000001</p1>
            </div>
          </div>
          {/* //second */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="dateheader">
              <div className="previewinput">
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
            <div className="editheader">
              <img src={edit} style={{ marginRight: "5px" }} />
              <div>
                <p>Edit Group</p>
              </div>
            </div>
          </div>
        </div>

        {/* //body_gradient */}
        <div className="previewbody">
          <div className="item-page-navbar">
            <div className="item-navbar">
              <div className="active">Item Overview</div>
              <div>Estimates(5)</div>
              <div>Sales Orders(10)</div>
              <div>Invoice(27)</div>
              <div>Production Orders(2)</div>
              <div>Customers(20)</div>
              <div>History</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" , overflow:"scroll"}}>
            <div>
              <p
                style={{
                  padding: "28px 9px 18px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Basic Information
              </p>
              <div
                style={{
                  display: "flex",
                  width: "320px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="itemlabeldes">Foreign Name</p>
                  <p className="itemlabeldes">Barcode</p>
                  <p className="itemlabeldes">HSN Code</p>
                  <p className="itemlabeldes">Unit of Measurement</p>
                  <p className="itemlabeldes">Tax Prefence</p>
                </div>
                <div>
                  <p className="itemlabeldes">Gray Chexed Shirt</p>
                  <p className="itemlabeldes">GR-0000001</p>
                  <p className="itemlabeldes">61051010</p>
                  <p className="itemlabeldes">Pcs</p>
                  <p className="itemlabeldes">GST 18(18%)</p>
                </div>
              </div>
              <p  style={{
                  padding: "17px 0px 20px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}>Item Description</p>
             <p  className='itemlabeldes'style={{width: "320px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              mollitia voluptates ex nesciunt repellendus debitis repellat,
              deleniti sed vel ducimus quod nulla illum ullam aperiam
              reprehenderit, commodi praesentium maiores autem!</p>
            </div>
            <div className='borderitem'></div>
            <div>
              <p  style={{
                  padding: "17px 0px 20px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}>Manufacturing Information</p>
              <div style={{display: "flex",
                  width: "338px",
                  justifyContent: "space-between"}}>
                <div >
                  <p className='itemlabeldes'>Manufacturing Price</p>
                  <p className='itemlabeldes'>Manufacturing Account</p>
                  </div>
                <div>
                <p className='itemlabeldes'>₹ 500.00</p>
                <p className='itemlabeldes'>Cost of Manufacturing</p>
                </div>
              </div>
              <p  style={{
                  padding: "17px 0px 20px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}>Purchase Information</p>
              <div  style={{display: "flex",
                  width: "338px",
                  justifyContent: "space-between"}}>
                <div >
                  <p className='itemlabeldes'>Cost Price</p>
                  <p className='itemlabeldes'>Cost  Account</p>
                  </div>
                <div style={{marginRight:"26px"}}>
                <p className='itemlabeldes'>₹ 520.00</p>
                <p className='itemlabeldes'>Cost of Golds Sold</p>
                </div>
              </div>
              <p style={{
                  padding: "17px 0px 20px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}>Sales Information</p>
              <div  style={{display: "flex",
                  width: "338px",
                  justifyContent: "space-between"}}>
                <div >
                  <p className='itemlabeldes'>Selling Price</p>
                  <p className='itemlabeldes'>Sales Account</p>
                  </div>
                <div  style={{marginRight:"88px"}}>
                <p className='itemlabeldes'>₹ 800.00</p>
                <p className='itemlabeldes'>Sales</p>
                </div>
              </div>
            </div>
            <div className='borderitem'></div>
            <div>
            <p  style={{
                  padding: "17px 0px 20px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}>Item Images</p>
                <div style={{display:"flex", gap:"20px"}}>
                  <img src={shirt1}/>
                  <img src={shirt2}/>
                  <img src={shirt3}/>
                </div>
                <div style={{display:"flex", gap:"20px", marginTop:"20px"}}>
                  <img src={shirt4}/>
                  <img src={shirt5}/>
                  <Upload
                  style={{width:"80px", height:"80px"}}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
       // beforeUpload={beforeUpload}
       // onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '80px' }} /> : uploadButton}
      </Upload>
                </div>
                <p  style={{
                  padding: "17px 0px 20px",
                  color: "#2B3347",
                  fontSize: "16px",
                  fontWeight: "600",
                }}>Tags</p>
                <div>
                <Space size={[0, 8]} wrap>
                <Tag closable onClose={log} className="tag1">
                  Shirt
                </Tag>
                <Tag closable onClose={log} className="tag1">
                  Chexed Shirt
                </Tag>
                <Tag closable onClose={log} className="tag1">
                  Gray Shirt
                </Tag>
  
  </Space>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPreview
