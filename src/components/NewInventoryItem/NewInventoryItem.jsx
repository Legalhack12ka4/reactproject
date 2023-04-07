import React, { useState } from "react";
import "./NewInventoryItem.scss";

import { Upload, Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import TagsInput from "../TagsInput/TagsInput";
import CustomInput from "../CustomInput/CustomInput";
import { SearchSelect } from "../Dropdowns/Dropdowns";
import { ContainedButton, ContainedSecondaryButton } from "../Buttons/Button";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const resetValue = {
  name: "" ,
  hsn_code:"",
  barcode:"",
  purchase:"",
  sale: "",
  min: "",
  max:"",
  tags:""
 };

const NewInventoryItem = () => {
  const [formData, setFormData] = useState(resetValue)
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [multiUom, setMultiUom] = useState(false);
  const [conversionUom, setConversionUom] = useState(false);
  const [unitOfMasurementRows, setUnitOfMasurementRows] = useState([
    { id: 1, name: "row1", value: "" },
  ]);
  const [unitOfMasurementRows2, setUnitOfMeasurementRows2] = useState([
    { id: 1, name: "row1", value: "" },
  ]);

  const [conversionOptionsRows, setConversionOptionsRows] = useState([
    { id: 1, name: "row1", value: "" },
  ]);
  const [skuOpen, setSkuOpen] = useState(false);

  const uomRef = React.useRef(null);
  const conversionRef = React.useRef(null);

  // img uploader

  const handleImgCancel = () => setPreviewOpen(false);
  const handleImgPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleImgChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <div className="uploader_img">
      {fileList.length === 0 ? (
        <div>
        <img src="/images/icons/add-image-icon.svg" alt="" />
        <p className="dropFileText">Drop files here or click to upload</p>
        </div>
      ) : (
        <PlusOutlined style={{ color: "#566A76" }} />
      )}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {fileList.length === 0 ? (
          <p className="image_desc">
            <span>
              You Can add up to{" "}
              <span className="image_text_bold">6 Images</span>
            </span>
            <span>
              each not exceeding <span className="image_text_bold">1 MB.</span>
            </span>
          </p>
        ) : (
          <p className="only_upload_text">Upload</p>
        )}
      </div>
    </div>
  );

  const handleClose = () => {
    window.history.back(-1);
   // setFormData(resetValue);
  };
  const handleMultiUomChange = (checked) => {
    setMultiUom(checked);
  };

  const handleConversionUomChange = (checked) => {
    setConversionUom(checked);
  };

  const handleAddRow = () => {
    setUnitOfMasurementRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" },
    ]);
    uomRef.current.scrollTop = uomRef.current.scrollHeight;
  };

  const handleAddConversionRow = () => {
    setConversionOptionsRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" },
    ]);
    conversionRef.current.scrollTop = conversionRef.current.scrollHeight;
  };

  const handleDeleteMultiUomRow = (id) => {
    setUnitOfMasurementRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleDeleteConversionUomRow = (id) => {
    setConversionOptionsRows((prevRows) =>
      prevRows.filter((row) => row.id !== id)
    );
  };

  const handleSkuClose = () => {
    setSkuOpen(false);
  };
  return (
    <div className="new_inventory_item_main">
    <Page_heading parent={"Item & Service"} child={"New Item"} main={"New Raw Material & Traded Item"} subchild={"Raw Material & Traded Item"} />

    {/* <div className="new_inventory_group_container"> */}


<div className="new_inventory_item_container ">
{/* <div className="header">
 <h1>Create Item</h1>
 <p>Without an Item group you can't create an Item.</p>
</div> */}

<div className="item_form_container">
<div style={{display:"flex", gap:"20px"}} className="left-container">
 <div className="input_box_container">
   <div className="input_group" style={{ marginBottom: "20px" }}>
     <SearchSelect label="Item Group" placeholder="Item Group" width={330} icon="/images/icons/group-icon.svg" />
   </div>

  

   <div className="input_group" style={{ marginBottom: "20px" }}>
     <div className="input-container ">
       <CustomInput
       label="Name"
       width={330}
       icon="/images/icons/cube.svg"
           type="text"
         inputType={"AlphaNumericUpperCase"}
           name="name"
           placeholder="Name"
          value={formData.name}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "name": newValue
         }))}
         //onBlur={handleBlur}
     />
       {/* <input type="text" placeholder="placeholder" /> */}
     </div>
   </div>

 

   <div className="input_group" style={{ marginBottom: "20px" }}>
     <div className="input-container">
       <CustomInput
           type="text"
         inputType={"Numeric"}
           name="hsn_code"
           label="HSN Code"
           placeholder="61051010"
           icon="/images/icons/HSNSearch.svg"
           width={330}
          value={formData.hsn_code}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "hsn_code": newValue
         }))}
         //onBlur={handleBlur}
     />
       {/* <input type="text" placeholder="placeholder" /> */}
     </div>
   </div>


   <div className="input_group" style={{ marginBottom: "20px" }}>
     <div className="input-container">
       <div className="barcode-scanner">
       <CustomInput
           type="text"
           label="SKU"
           icon="/images/icons/barcode.svg"
         inputType={"AlphaNumericUpperCase"}
           name="barcode"
           width={330}
           placeholder="GR-IT-0009"
          value={formData.barcode}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "barcode": newValue
         }))}
         rightBtn={
          <div className="d-flex align-center justify-center sku-right-btn" onClick={()=>setSkuOpen(true)} ><img src="/images/icons/setting-blue.svg" alt="icon" /></div>
         }
         //onBlur={handleBlur}
     />
         {/* <input
           type="text"
           placeholder="placeholder"
           id="barcode_input"
           // value={data}
         /> */}
       </div>
       {/* <img
         src="/images/icons/barcodeBtn.svg"
         alt=""
         //   onClick={showModal}
         style={{ cursor: "pointer" }}
       /> */}
     </div>
   </div>

   <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
     <div className="input_group">
       <div
         className="input-container1 "
         style={{ width: "150px !important" } }
       >
         <CustomInput
           type="text"
           label="Purchase Price"
           width={155}
           icon="/images/icons/Rupee.svg"
         inputType={"Numeric"}
           name="purchase"
           placeholder="Indicative Price"
          value={formData.purchase}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "purchase": newValue
         }))}
         //onBlur={handleBlur}
     />
         {/* <input type="text" /> */}
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1 "
         style={{ width: "150px !important" }}
       >
         <CustomInput
         label="Sale Price"
          width={155}
           type="text"
         inputType={"Numeric"}
         icon="/images/icons/Rupee.svg"
           name="sale"
           placeholder="Indicative Price"
          value={formData.sale}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "sale": newValue
         }))}
         //onBlur={handleBlur}
     />
         {/* <input type="text" /> */}
       </div>
     </div>
   </div>

   <div style={{ display: "flex", gap: "20px" }}>
     <div className="input_group">
       <div
         className="input-container1"
         style={{ width: "150px !important" }}
       >
         <CustomInput
           type="text"
           label="Minimum Stock"
            width={155}
         inputType={"Numeric"}
         icon="/images/icons/stock-icon.svg"
           name="min"
           placeholder="1 Pcs"
          value={formData.min}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "min": newValue
         }))}
         //onBlur={handleBlur}
     />
         {/* <input type="text" /> */}
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1 "
       >
         <CustomInput
           type="text"
           label="Maximum Stock"
            width={155}
         inputType={"Numeric"}
         icon="/images/icons/stock-icon.svg"
           name="max"
           placeholder="1 Pcs"
          value={formData.max}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "max": newValue
         }))}
         //onBlur={handleBlur}
     />
         {/* <input type="text" /> */}
       </div>
     </div>
   </div>

 </div>

 <div className="image_uploader_container">
   <div
     className={`${
       fileList.length === 0
         ? "img_uploader_main_length_0"
         : "img_uploader_main"
     }`}
   >
     <p className="item_image_heading"> Item Image</p>
     <Upload
       accept="image/*"
       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
       listType="picture-card"
       fileList={fileList}
       onPreview={handleImgPreview}
       onChange={handleImgChange}
       // multiple={true}
       className={`${fileList.length === 0 ? "length_0" : ""}`}
       maxCount={6}
     >
       {fileList.length >= 6 ? null : uploadButton}
     </Upload>
     <Modal
       open={previewOpen}
       title={previewTitle}
       footer={null}
       onCancel={handleImgCancel}
     >
       <img
         alt="example"
         style={{
           width: "100%",
         }}
         src={previewImage}
       />
     </Modal>
   </div>

   <div
     className="input_group"
     style={{ marginTop: "20px", marginBottom: "20px" }}
   >
     {/* <div
         className={`${
           errors.description && touched.description && "inputError"
         } description  focus-outline`}
         style={{
           display: "flex",
           alignItems: "center",
           width: "318.4px",
           height: "68.4px",
           outline: "none",
           resize: "none",
           overflow:"hidden"
         }}
       >
         <textarea
           resizable={false}
           // className="description"
           style={{
             width: "668.4px",
             height: "68.4px",
             outline: "none",
             border: "none",
             resize: "none",
           }}
           type="text"
           placeholder="Something about account"
           name="description"
           value={formData.description}
           // onChange={(e) => {
           //   handleChange(e);
           //   onChange(e);
           //}}
         />
       </div>*/}
     <div className="input-containerdes">
      <CustomInput textArea width={330} height={110} label="Description" placeholder="About Item" />
     </div>
   </div> 

   <div className="input_group">
     <p>Tags</p>
     <div className="tags_input_container focus-outline">
       <TagsInput placeholder="Name" />
     </div>
   </div>
 </div>
 </div>
 <div className="item_create_container">
   <p
     style={{
       fontSize: "16px",
       fontWeight: "600",
       marginBottom: "20px",
     }}
     className="item_group_details"
   >
     Item Group details
   </p>
   {/* <div
     style={{
       display: "flex",
       gap: "20px",
       marginBottom: "18px",
       marginTop: "20px",
     }}
   > */}
   <div className="item_details_container">
     <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Unit of Measurement"
           type="text"
           disabled
         />
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Manage by"
           type="text"
           disabled
         />
       </div>
     </div>
   {/* </div> */}

   {/* <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}> */}
   <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Tax Preferences"
           type="text"
           disabled
         />
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Tax Rates"
           type="text"
           disabled
         />
       </div>
     </div>
   {/* </div> */}

   {/* <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}> */}
   <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Item Group Type"
           type="text"
           disabled
         />
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Inventory Account"
           type="text"
           disabled
         />
       </div>
     </div>
   {/* </div> */}

   {/* <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}> */}
   <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Sales Account"
           type="text"
           disabled
         />
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Cost Account"
           type="text"
           disabled
         />
       </div>
     </div>
   {/* </div> */}

   {/* <div style={{ display: "flex", gap: "20px" }}> */}
   <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="Variance Account"
           type="text"
           disabled
         />
       </div>
     </div>
     <div className="input_group">
       <div
         className="input-container1"
         style={{
           width: "150px !important",
         }}
       >
         <CustomInput
         width={155}
         label="WIP Account"
           type="text"
           disabled
         />
       </div>
     </div>
     </div>
   {/* </div> */}
   
 </div>

 {/* <hr
   style={{
     position: "absolute",
     left: "20px",
     bottom: 0,
     width: "1080px",
     border: ".5px solid #ECEEF1",
   }}
 /> */}
</div>
{/* <hr  style={{margin:"auto", width:"96.4%", border:".5px solid #ECEEF1"}}/> */}

<div style={{ padding: "20px 20px 20px 20px" }} className="uom-container">

 {/* <p
   style={{
     color: "#566A7F",
     fontSize: "16px",
     fontWeight: "600",
     marginBottom: "11px",
   }}
 >
   Multi Uom
 </p> */}
 <div style={{ display: "flex", gap: "30px" }}>
 <div style={{ display: "flex", gap: "16px",marginBottom:"30px" }}>
     <Switch
       unCheckedChildren="__"
       onChange={handleMultiUomChange}
       // onClick={setIsBOMVariantOpen}
     />

     <div>
       <p style={{ color: "#101729", fontSize: "16px",fontWeight:"600"  }}>
         Enable Multi Uom
       </p>
       <p className="sc-body-rg mt-10">
       Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
       diam nonumy eirmod tempor invidunt ut labore et dolore magna
       aliquyam erat, sed diam voluptua. At vero eos et accusam et
       justo duo dolores et ea rebum.
       </p>
       {multiUom && (
         <div className="enableMultiUom">
           <div className="packing_option">
             <div className="packing_option_heading">
               <div className="package_name caption-md">Multi Uom</div>
               <div className="unit_of_measurement caption-md">Standard Uom</div>
               <div className="qty caption-md">Base Qty</div>
               <div className="pack_qty caption-md">Pack Qty</div>
             </div>
             <div
               className={`packing_setting_rows_container ${unitOfMasurementRows.length > 4 ? "container_scroll" : ""}`}
               ref={uomRef}
             >
               {unitOfMasurementRows.map((item, index) => {
                 return (
                   <div className={`packing_option_row ${unitOfMasurementRows.length-1 === index && "last-row"}`}>
                     <div className="unit_of_measurement" style={{padding:"10px 20px"}}>
                       <SearchDropdown width={155} />
                     </div>
                     <div className="package_name">
                       <CustomInput
                          width={155}
                          disabled
                       />
                     </div>
                     <div className="qty">
                       <CustomInput
                       width={50}
                         disabled
                       />
                     </div>{" "}
                     X
                     <div className="pack_qty">
                     <CustomInput
                       width={50}
                         disabled
                       />
                     </div>
                     <div className="edit_delete" onClick={() => handleDeleteMultiUomRow(item.id)}>
                       <img
                         src="/images/icons/delete.svg"
                         alt="delete"
                       />
                     </div>
                   </div>
                 );
               })}
             </div>
             <div className="add_btn" >
               <p onClick={handleAddRow}>+ Add</p>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
   

  
 </div>

 {/* <hr style={{ margin: "20px 0px", border: "0.5px solid #ECEEF1" }} /> */}

 <div style={{ display: "flex", gap: "16px", }}>
     <Switch
       unCheckedChildren="__"
       onChange={handleConversionUomChange}
       // onClick={setIsBOMVariantOpen}
     />

     <div style={{overflow:"scroll"}}>
       <p style={{ color: "#101729", fontSize: "16px", fontWeight:"600" }}>
         Enable Conversion Uom
       </p>
       <p className="sc-body-rg mt-10">
       Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
       diam nonumy eirmod tempor invidunt ut labore et dolore magna
       aliquyam erat, sed diam voluptua. At vero eos et accusam et
       justo duo dolores et ea rebum.
       </p>
       {conversionUom && (
         <div className="enableConversionUom">
           <div className="conversion_options">
             <div className="conversion_options_heading">
               <div className="conversion_name caption-md">Conversion Name</div>
               <div className="convert_from caption-md">Convert from</div>
               <div className="convert_to caption-md">Convert to</div>
             </div>
             <div
               className={`conversion_options_row_container ${conversionOptionsRows.length > 4 ? "container_scroll" : ""}`}
               ref={conversionRef}
             >
               {conversionOptionsRows.map((item, index) => {
                 return (
                  <div>
                    <div className={`conversion_options_row ${conversionOptionsRows.length-1 === index && "last-row"}`}>
                     <div className="conversion_name" style={{padding:"10px 20px"}}>
                       {/* <input
                         type="text"
                         disabled
                         className="conversion_name_input"
                       /> */}
                       <SearchSelect width={180} />
                     </div>
                     <div className="convert_from">
                     {/* <SearchDropdown width={155} />
                      */}
                       <CustomInput
                       width={50}
                         disabled
                       />
                        <CustomInput
                       width={155}
                         disabled
                       />
                       
                     </div>
                     =
                     <div className="convert_to">
                     <CustomInput
                       width={50}
                         disabled
                       />
                      <CustomInput
                       width={155}
                         disabled
                       />
                     </div>
                     <div className="edit_delete" onClick={() => handleDeleteConversionUomRow(item.id)} >
                       <img src="/images/icons/delete.svg" alt="" />
                     </div>
                   </div>
                  </div>
                  
                 );
               })}
             </div>
             <div className="add_btn" >
               <p onClick={handleAddConversionRow}>+ Add</p>
             </div>
           </div>
         </div>
       )}
       <div className="form-submit-btn d-flex gap-16 mt-30">
       <ContainedButton value="Create Item" />
       <ContainedSecondaryButton value="Cencel" onClick={handleClose} />
       </div>
     </div>
   </div>
 <div style={{ display: "flex", gap: "30px" }}>
   <div>
     <p
       style={{
         color: "#8E9CAA",
         fontSize: "14px",
         maxWidth: "702px",
       }}
     >
       
     </p>
   </div>


   <div></div>
 </div>
 
</div>

{/* <hr style={{border:"2px solid #F3F6F9"}} /> */}

{/* <div className="button">
 <button className="submit_button btn_hover_animation">Create Item</button>
 <button className="cancel_button btn_hover_animation" onClick={handleClose}>Cancel</button>
</div> */}

</div>




<Modal
              open={skuOpen}
              width={"max-content"}
              onCancel={handleSkuClose}
              style={{ top: 0 }}
              className={"deleteconfirm"}
              footer={false}
              closeIcon={
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13.51"
                    height="13"
                    viewBox="0 0 13.51 13"
                  >
                    <path
                      id="Path_34362"
                      data-name="Path 34362"
                      d="M15.386,13.167l-4.593-4.42,4.593-4.42a1.183,1.183,0,0,0,0-1.723,1.3,1.3,0,0,0-1.79,0L9,7.025,4.41,2.605a1.3,1.3,0,0,0-1.79,0,1.183,1.183,0,0,0,0,1.723l4.593,4.42L2.62,13.167a1.183,1.183,0,0,0,0,1.723,1.3,1.3,0,0,0,1.79,0L9,10.47,13.6,14.89a1.3,1.3,0,0,0,1.79,0A1.189,1.189,0,0,0,15.386,13.167Z"
                      transform="translate(-2.248 -2.248)"
                      fill="#697a8d"
                    />
                  </svg>
                </div>
              }
            >
              <div className="update-contact-container">
                <div className="header">
                  <h1 className="heading-sb">SKU Method</h1>
                  <p className="sc-body-rg mt-10 title">
                  Choose the SKU method from the below options
                  </p>
                  <hr className="h-line" />

                  <div className="barcode-sku-container">
                    <div className="sku-btn">
                      <div className="img-container"><img src="/images/icons/barcode.svg" alt="icon" /></div>
                      <p className="subtitle-sb">Scan Barcode</p>
                      <p className="caption-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className="sku-btn">
                      <div className="img-container"><img src="/images/icons/barcode-icon.svg" alt="icon" /></div>
                      <p className="subtitle-sb">Generate SKU</p>
                      <p className="caption-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>

                  
                </div>
              </div>
            </Modal>















    

 
    







 

</div>

  );
};

export default NewInventoryItem;



