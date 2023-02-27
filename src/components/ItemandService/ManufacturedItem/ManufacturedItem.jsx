import React, { useState, useRef, useEffect } from "react";
// import "./NewInventoryItem.scss";
import "./ManufacturedItem.scss"

import { Upload, Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../../Page_Heading/Page_heading";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ManufacturedItem = () => {
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
  const [resourcePlaningRows, setResourcePlaningRows ] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
    { id: 3, name: "row3", value: "" },
    { id: 4, name: "row4", value: "" },
  ]);
  const resourceRef = useRef(null);
  useEffect(() => {
    if (resourceRef.current) {
        resourceRef.current.scrollTop = resourceRef.current.scrollHeight;
    }
  }, [resourcePlaningRows]);

  const handleAddRow = () => {
    setResourcePlaningRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" },
    ]);
    resourceRef.current.scrollTop = resourceRef.current.scrollHeight;
  };

  const uomRef = React.useRef(null);
  const conversionRef = React.useRef(null);

  const handleClose = () => {
    window.history.back(-1);
   // setFormData(resetValue);
  };
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

  const handleMultiUomChange = (checked) => {
    setMultiUom(checked);
  };

  const handleConversionUomChange = (checked) => {
    setConversionUom(checked);
  };

//   const handleAddRow = () => {
//     setUnitOfMasurementRows((prevRows) => [
//       ...prevRows,
//       { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
//       { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" },
//     ]);
//     uomRef.current.scrollTop = uomRef.current.scrollHeight;
//   };

  const handleAddConversionRow = () => {
    setConversionOptionsRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" },
    ]);
    conversionRef.current.scrollTop = conversionRef.current.scrollHeight;
  };

  return (
    <div className="new_inventory_item_main">
         <Page_heading parent={"Item & Service"} child={"Add Inventory Item"} />
      <div className="new_inventory_item_container">
        <div className="header">
          <h1>Create Item</h1>
          <p>Without an Item group you can't create an Item.</p>
        </div>

        <div className="item_form_container" style={{ overflow: "scroll" }}>
          <div className="input_box_container">
            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>Item Group</p>
              <SearchDropdown width={330} />
            </div>

           

            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>Name</p>
              <div className="input_container focus-outline">
                <img src="/images/icons/cube.svg" alt="" />
                <input type="text" placeholder="placeholder" />
              </div>
            </div>

          

            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>HSN Code</p>
              <div className="input_container focus-outline">
                <img src="/images/icons/HSNSearch.svg" alt="" />
                <input type="text" placeholder="placeholder" />
              </div>
            </div>

       
            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>Barcode</p>
              <div className="input_container focus-outline">
                <img src="/images/icons/barcode.svg" alt="" />
                <div className="barcode_scanner">
                  <input
                    type="text"
                    placeholder="placeholder"
                    id="barcode_input"
                    // value={data}
                  />
                </div>
                <img
                  src="/images/icons/barcodeBtn.svg"
                  alt=""
                  //   onClick={showModal}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}>
              <div className="input_group">
                <p>Purchase Price</p>
                <div
                  className="input_container1 focus-outline"
                  style={{ width: "150px !important" } }
                >
                  <input type="text" />
                </div>
              </div>
              <div className="input_group">
                <p>Sale Price</p>
                <div
                  className="input_container1 focus-outline"
                  style={{ width: "150px !important" }}
                >
                  <input type="text" />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <div className="input_group">
                <p>Minimum Stock</p>
                <div
                  className="input_container1 focus-outline"
                  style={{ width: "150px !important" }}
                >
                  <input type="text" />
                </div>
              </div>
              <div className="input_group">
                <p>Maximum Stock</p>
                <div
                  className="input_container1 focus-outline"
                  style={{ width: "150px !important" }}
                >
                  <input type="text" />
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
                multiple={true}
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
              style={{ marginTop: "15px", marginBottom: "18px" }}
            >
              <p>Description</p>
              
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
              <div className="input_container focus-outline">
                <input type="text" placeholder="Placeholder" />
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
            <p
              style={{ fontSize: "14px", color: "#8E9CAA", fontWeight: "400" }}
            >
              Lorem ipsum dolor, sit amet consectetur{" "}
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "18px",
                marginTop: "38px",
              }}
            >
              <div className="input_group">
                <p>Unit of Measurement</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
              <div className="input_group">
                <p>Manage by</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}>
              <div className="input_group">
                <p>Tax Preference</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
              <div className="input_group">
                <p>Tax Rates</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}>
              <div className="input_group">
                <p>Item Group Type</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
              <div className="input_group">
                <p>Inventory Account</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}>
              <div className="input_group">
                <p>Sales Account</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
              <div className="input_group">
                <p>Cost Account</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <div className="input_group">
                <p>Variance Account</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
              <div className="input_group">
                <p>WIP Account</p>
                <div
                  className="input_container1"
                  style={{
                    width: "150px !important",
                    backgroundColor: "#ECEEF1",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    style={{ backgroundColor: "#ECEEF1" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr
            style={{
              position: "absolute",
              left: "20px",
              bottom: 0,
              width: "690px",
              border: ".5px solid #ECEEF1",
            }}
          />
        </div>

            <div className="resource_planing_rows_container">
                <div className="headers">
                    <p className='assined-resource-group'>Assigned Resource Group</p>
                    <p className='type'>Type</p>
                    <p className='components'>Components</p>
                    <p className='options'>Options</p>
                    <p className='qty'>Qty</p>
                </div>

                <div className="resource_planing_rows_container" ref={resourceRef}>
                    {resourcePlaningRows.map((item, index) => {
                        return (
                            <div className="resource_planing_row" key={index}>
                                <div className="Assigned_Resource_Group_input">
                                    <input type="text" disabled />
                                </div>
                                <div className="resource_planing_row_type">
                                    <SearchDropdown width={181} />
                                </div>
                                <div className="resource_planing_row_type">
                                    <SearchDropdown width={293} />
                                </div>
                                <div className="resource_planing_row_option">
                                    <input type="text"  />
                                </div>
                                <div className="resource_planing_row_qty">
                                    <input type="text" placeholder="00" className='focus-outline' />
                                </div>
                                <div className="delete-row">
                                    <img src="/images/icons/delete.svg" alt="delete" />
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className="add-row-btn"><p onClick={handleAddRow}>+ Add</p></div>    
            </div>

        <div className="button">
          <button className="submit_button btn_hover_animation">Submit</button>
          <button className="cancel_button btn_hover_animation"  onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ManufacturedItem;


