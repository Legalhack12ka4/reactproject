import React, { useState } from "react";
import "./NewInventoryItem.scss";

import { Upload, Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const NewInventoryItem = () => {
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

  return (
    <div className="new_inventory_item_main">
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

            {/* <div className="input_group">
                  <p>Manage By</p>
                  <div className="input_container"  style={{backgroundColor: "#eceef1"}}>
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" disabled style={{backgroundColor: "#eceef1"}}/>
                  </div>
                </div> */}

            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>Name</p>
              <div className="input_container">
                <img src="/images/icons/cube.svg" alt="" />
                <input type="text" placeholder="placeholder" />
              </div>
            </div>

            {/* <div className="input_group">
                  <p>Tax Preference</p>
                  <div className="input_container"  style={{backgroundColor: "#eceef1"}}>
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" disabled style={{backgroundColor: "#eceef1"}} />
                  </div>
                </div> */}
            {/* <div className="input_group">
                  <p>Foreign Name</p>
                  <div className="input_container">
                    <img src="/images/icons/cube.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div> */}
            {/* <div className="input_group">
                  <p>Tax Rates</p>
                  <div className="input_container"  style={{backgroundColor: "#eceef1"}}>
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" disabled style={{backgroundColor: "#eceef1"}} />
                  </div>
                </div> */}

            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>HSN Code</p>
              <div className="input_container">
                <img src="/images/icons/HSNSearch.svg" alt="" />
                <input type="text" placeholder="placeholder" />
              </div>
            </div>

            {/* <div className="input_group">
                  <p>Cost Account</p>
                  <div className="input_container"  style={{backgroundColor: "#eceef1"}}>
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" disabled style={{backgroundColor: "#eceef1"}}/>
                  </div>
                </div> */}
            <div className="input_group" style={{ marginBottom: "18px" }}>
              <p>Barcode</p>
              <div className="input_container">
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
                  className="input_container1"
                  style={{ width: "150px !important" }}
                >
                  <input type="text" />
                </div>
              </div>
              <div className="input_group">
                <p>Sale Price</p>
                <div
                  className="input_container1"
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
                  className="input_container1"
                  style={{ width: "150px !important" }}
                >
                  <input type="text" />
                </div>
              </div>
              <div className="input_group">
                <p>Maximum Stock</p>
                <div
                  className="input_container1"
                  style={{ width: "150px !important" }}
                >
                  <input type="text" />
                </div>
              </div>
            </div>
            {/* 
                <div className="input_group">
                  <p>Sales Account</p>
                  <div className="input_container"  style={{backgroundColor: "#eceef1"}}>
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" disabled style={{backgroundColor: "#eceef1"}} />
                  </div>
                </div> */}

            {/* <div className="input_group">
                  <p>Unit of Measurement</p>
                  <div className="input_container" style={{backgroundColor: "#eceef1"}}>
                    <input type="text" disabled style={{backgroundColor: "#eceef1"}} />
                  </div>
                </div> */}

            {/* <div className="input_group">
                  <p>Inventory Account</p>
                  <div className="input_container"  style={{backgroundColor: "#eceef1"}}>
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" disabled style={{backgroundColor: "#eceef1"}}/>
                  </div>
                </div> */}

            {/* 
                <div className="input_group">
                  <p>Description</p>
                  <div className="input_container">
                    <input type="textarea" placeholder="Placeholder" />
                  </div>
                </div>

                <div className="input_group">
                  <p>Tags</p>
                  <div className="input_container">
                    <input type="textarea" placeholder="Placeholder" />
                  </div>
                </div> */}
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
              <div className="input_containerdes">
                <input type="textarea" placeholder="Placeholder" />
              </div>
            </div>

            <div className="input_group">
              <p>Tags</p>
              <div className="input_container">
                <input type="textarea" placeholder="Placeholder" />
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

        <div style={{ padding: "0px 20px 20px 20px" }}>
          <p
            style={{
              color: "#566A7F",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "11px",
            }}
          >
            Multi Uom
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <div>
              <p
                style={{
                  color: "#8E9CAA",
                  fontSize: "14px",
                  maxWidth: "702px",
                }}
                className={`${multiUom && "widthSmall"}`}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <Switch
                unCheckedChildren="__"
                onChange={handleMultiUomChange}
                // onClick={setIsBOMVariantOpen}
              />

              <div>
                <p style={{ color: "#566A7F", fontSize: "16px" }}>
                  Enable Multi Uom
                </p>
                <p style={{ color: "#8E9CAA", fontSize: "14px" }}>
                  Select or Add Uom as per your need
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
                        className="packing_setting_rows_container"
                        ref={uomRef}
                      >
                        {unitOfMasurementRows.map((item, index) => {
                          return (
                            <div className="packing_option_row">
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
                              <div className="edit_delete">
                                <img
                                  src="/images/icons/delete.svg"
                                  alt="delete"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="add_btn" onClick={handleAddRow}>
                        + Add
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <hr style={{ margin: "20px 0px", border: "0.5px solid #ECEEF1" }} />

          <p
            style={{
              color: "#566A7F",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "11px",
            }}
          >
            Conversion Uom
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <div>
              <p
                className={`${conversionUom && "widthSmall"}`}
                style={{
                  color: "#8E9CAA",
                  fontSize: "14px",
                  maxWidth: "702px",
                }}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <Switch
                unCheckedChildren="__"
                onChange={handleConversionUomChange}
                // onClick={setIsBOMVariantOpen}
              />

              <div>
                <p style={{ color: "#566A7F", fontSize: "16px" }}>
                  Enable Conversion Uom
                </p>
                <p style={{ color: "#8E9CAA", fontSize: "14px" }}>
                  Select or Add Uom as per your need
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
                        className="conversion_options_row_container"
                        ref={conversionRef}
                      >
                        {conversionOptionsRows.map((item, index) => {
                          return (
                            <div className="conversion_options_row">
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
                              <div className="edit_delete">
                                <img src="/images/icons/delete.svg" alt="" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="add_btn" onClick={handleAddConversionRow}>
                        + Add
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div></div>
          </div>
        </div>

        <div className="button">
          <button className="submit_button btn_hover_animation">Submit</button>
          <button className="cancel_button btn_hover_animation">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewInventoryItem;

{
  /* <div className="new_inventory_item_form_container">
        <div className="header">
            <h1>Create Item</h1>
            <p>Without an Item group you can't create an Item.</p>
        </div>
        <div className="form">
        <div className="inventory_form_container">
            <div>
              <div className="add_inventory_item_form">
                <div className="input_group">
                  <p>Name</p>
                  <div className="input_container">
                    <img src="/images/icons/cube.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div>

                <div className="input_group">
                  <p>HSN Code</p>
                  <div className="input_container">
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div>

                <div className="input_group">
                  <p>Foreign Name</p>
                  <div className="input_container">
                    <img src="/images/icons/cube.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div>

                <div className="input_group">
                  <p>Barcode</p>
                  <div className="input_container">
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

                <div className="input_group">
                  <p>Tags</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Unit of Measurement</p>
                  <SearchDropdown width={330} />
                </div>
               
                <div className="input_group">
                  <p>Description</p>
                  <div className="input_container">
                    <input type="text" placeholder="Placeholder" />
                  </div>
                </div>
              </div>

              <hr className="form_hr" />

              <div className="add_inventory_item_form">
                <div className="input_group">
                  <p>Selling Account</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Tax Preferences</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Cost Account</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Tax Rates</p>
                  <SearchDropdown width={330} />
                </div>
              </div>

              <div className="btn_container">
                <button className="submit_btn">Submit</button>
                <button className="cancel_btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>

    </div> */
}
