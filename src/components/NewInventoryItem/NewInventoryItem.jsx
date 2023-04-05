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
        <p className="dropFileText">Drop files here or click to upload</p>
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
              <span className="image_text_bold">5 Images</span>
            </span>
            <span>
              each not exceeding <span className="image_text_bold">2 MB.</span>
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
     <SearchSelect label="Item Group" width={330} />
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
           placeholder="Placeholder"
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
           placeholder="Placeholder"
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
           label="Barcode"
           icon="/images/icons/barcode.svg"
         inputType={"AlphaNumericUpperCase"}
           name="barcode"
           width={330}
           placeholder="Placeholder"
          value={formData.barcode}
       onChange={(e, newValue) => 
         setFormData(prevState => ({
           ...prevState,
           "barcode": newValue
         }))}
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
         inputType={"Numeric"}
           name="purchase"
           placeholder="Placeholder"
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
           name="sale"
           placeholder="Placeholder"
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
           name="min"
           placeholder="Placeholder"
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
           name="max"
           placeholder="Placeholder"
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
     <p>Description</p>
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
     <div className="input_containerdes focus-outline">
       <textarea   resizable={false}
         style={{
           width: "668.4px",
           height: "102.4px",
           outline: "none",
           border: "none",
           resize: "none",
         }}
         type="text"
       className="input_containerdes " 
        //placeholder="Placeholder"
         />
     </div>
   </div> 

   <div className="input_group">
     <p>Tags</p>
     <div className="tags_input_container focus-outline">
       <TagsInput />
     </div>
   </div>
 </div>
 </div>
 <div className="item_create_container">
   <p
     style={{
       fontSize: "16px",
       color: "#5C5AD0",
       fontWeight: "600",
       marginBottom: "8px",
     }}
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
       <p style={{ color: "#8E9CAA", fontSize: "14px", marginTop:"10px" }}>
       Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
       diam nonumy eirmod tempor invidunt ut labore et dolore magna
       aliquyam erat, sed diam voluptua. At vero eos et accusam et
       justo duo dolores et ea rebum.
       </p>
       {multiUom && (
         <div className="enableMultiUom">
           <div className="packing_option">
             <div className="packing_option_heading">
               <div className="package_name">Multi Uom</div>
               <div className="unit_of_measurement">Standard Uom</div>
               <div className="qty">Base Qty</div>
               <div className="pack_qty">Pack Qty</div>
             </div>
             <div
               className={`packing_setting_rows_container ${unitOfMasurementRows.length > 4 ? "container_scroll" : ""}`}
               ref={uomRef}
             >
               {unitOfMasurementRows.map((item, index) => {
                 return (
                   <div className={`packing_option_row ${unitOfMasurementRows.length-1 === index && "last-row"}`}>
                     <div className="unit_of_measurement">
                       <SearchDropdown width={155} />
                     </div>
                     <div className="package_name">
                       <input
                         type="text"
                         disabled
                         className="package_name_input"
                       />
                     </div>
                     <div className="qty">
                       <input
                         type="text"
                         disabled
                         className="qty_input"
                       />
                     </div>{" "}
                     X
                     <div className="pack_qty">
                       <input
                         type="text"
                         disabled
                         className="pack_qty_input"
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
       <p style={{ color: "#8E9CAA", fontSize: "14px", marginTop:"10px" }}>
       Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
       diam nonumy eirmod tempor invidunt ut labore et dolore magna
       aliquyam erat, sed diam voluptua. At vero eos et accusam et
       justo duo dolores et ea rebum.
       </p>
       {conversionUom && (
         <div className="enableConversionUom">
           <div className="conversion_options">
             <div className="conversion_options_heading">
               <div className="conversion_name">Conversion Name</div>
               <div className="convert_from">Convert from</div>
               <div className="convert_to">Convert to</div>
             </div>
             <div
               className={`conversion_options_row_container ${conversionOptionsRows.length > 4 ? "container_scroll" : ""}`}
               ref={conversionRef}
             >
               {conversionOptionsRows.map((item, index) => {
                 return (
                  <div>
                    <div className={`conversion_options_row ${conversionOptionsRows.length-1 === index && "last-row"}`}>
                     <div className="conversion_name">
                       {/* <input
                         type="text"
                         disabled
                         className="conversion_name_input"
                       /> */}
                       <SearchDropdown width={180} />
                     </div>
                     <div className="convert_from">
                     {/* <SearchDropdown width={155} />
                      */}
                       <input
                         type="text"
                         className="convert_from_input"
                         // value={1}
                         disabled
                       />
                        <input
                         type="text"
                         className="convert_from_input1"
                         // value={1}
                         disabled
                       />
                       
                     </div>
                     =
                     <div className="convert_to">
                       <input
                         type="text"
                         // placeholder="Qty"
                         disabled
                         className="convert_to_input"
                       />
                       <input
                         type="text"
                         // placeholder="Qty"
                         disabled
                         className="convert_to_input1"
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




















    

 
    







 

</div>

  );
};

export default NewInventoryItem;



