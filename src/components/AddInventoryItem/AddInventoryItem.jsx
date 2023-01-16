import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Page_heading from "../Page_Heading/Page_heading";

import { Switch } from "antd";
import { Modal, Button, Tooltip } from "antd";

import "./AddInventoryItem.scss";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import { useCallback } from "react";

const AddInventoryItem = () => {
  const scannerRef = useRef(null);
  const [image, setImage] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files.length > 5) {
      alert("You can only upload 5 images");
      return;
    }
    setImage(e.target.files);
    setCurrentIndex(0);
    const files = e.target.files;

    const names = [];

    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }

    setFileNames(names);
  };
  const handleDelete = () => {
    const index = fileNames.indexOf(image[currentIndex].name);
    fileNames.splice(index, 1);
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage(newImages);
    setFileNames(fileNames);
    setCurrentIndex(0);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + image.length) % image.length);
  };
  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % image.length);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleScannerCancel = () => {
    setIsScannerModalOpen(false);
    scannerRef.current.stop();
  };
  const handleScannerSubmit = (data) => {
    setIsScannerModalOpen(false);
    setIsModalOpen(false);
    scannerRef.getVideoTracks()[0].stop();
    document.getElementById("barcode_input").value = data;
    setData(data);
  };

  const showScannerModal = () => {
    setIsScannerModalOpen(true);
  };
  const showGenerateModal = () => {
    setIsGenerateModalOpen(true);
  };

  const handleGenerateCancel = () => {
    setIsGenerateModalOpen(false);
  };

  const [result, setResult] = useState("No result");
  const [data, setData] = React.useState("Scan a barcode");

  // console.log(data)

  useEffect(() => {
    hiddenFileInput.current.ondragover = () => {
      hiddenFileInput.current.className = "hover";
      return false;
    };
    hiddenFileInput.current.ondrop = (e) => {
      e.preventDefault();
      hiddenFileInput.current.className = "hidden";
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("image_droped").className = "visible";
        document.getElementById("image_droped").src = event.target.result;
      };
      reader.readAsDataURL(file);
    };
  }, []);

  let dots = [];
  for (let i = 0; i < image.length; i++) {
    dots.push(i);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % image.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, image.length]);

  return (
    <div className="add-inventory">
      <Page_heading parent={"Items or Service"} child={"Add Inventory Item"} />

      <div className="main_container">
        <div className="inventory_form">
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
                        value={data}
                      />
                    </div>
                    <img
                      src="/images/icons/barcodeBtn.svg"
                      alt=""
                      onClick={showModal}
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
                <div className="switch_container_main">
                  <div className="switch_toggler">
                    <Switch
                      unCheckedChildren="__"
                      onClick={setIsBOMModalOpen}
                    />
                    <h3>Enable Manufacturing</h3>
                  </div>
                  <div className="switch_toggler">
                    <Switch unCheckedChildren="__" />
                    <h3>Enable Variant</h3>
                  </div>
                </div>
                <div className="input_group">
                  <p>Description</p>
                  <div className="input_container">
                    {/* <img src="/images/sidebar_icons/bxs-cube.svg" alt="" /> */}
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

        <div
          className={`${
            image.length === 0 ? "img_uploader_main" : "img_uploader_main_pre"
          }`}
        >
          <div
            className="upload_image_container"
            onClick={image.length === 0 ? handleClick : ""}
          >
            <p className="item_image_heading"> Item Image</p>
            <div
              className={`${
                image.length === 0 ? "img_uploader" : "imguploader_pre"
              }`}
            >
              <div className="image_prev">
                {image.length > 0 && (
                  <button onClick={handleDelete} className="close_image">
                    <img src="/images/icons/image_close_icon.svg" alt="" />
                  </button>
                )}
                {image[currentIndex] instanceof File && (
                  <>
                    <div className="img_prev_container">
                      <img
                        className="image"
                        src={URL.createObjectURL(image[currentIndex])}
                        alt="image"
                      />
                    </div>
                    {image.length > 0 && (
                      <div className="image_pagination">
                        <div className="dots_container">
                          {dots.map((dot, index) => {
                            return (
                              <span
                                key={index}
                                className={
                                  index === currentIndex
                                    ? "dotActive"
                                    : "dotNotActive"
                                }
                                onClick={() => {
                                  setCurrentIndex(index);
                                }}
                              ></span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <p className="image_name">
                      {image[currentIndex].name.length > 20
                        ? image[currentIndex].name.substring(0, 14) +
                          "..." +
                          image[currentIndex].name.substring(
                            image[currentIndex].name.length - 5
                          )
                        : image[currentIndex].name}
                    </p>

                    <hr className="image_line" />
                  </>
                )}
                <input
                  type="file"
                  name="image"
                  id="file-input"
                  multiple
                  max={5}
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <h3 onClick={handleClick}>
                {image.length === 0
                  ? "Drop files here or click to upload"
                  : "+ Add Images"}
              </h3>

              {image.length === 0 && (
                <p className="image_desc">
                  <span>
                    You Can add up to{" "}
                    <span className="image_text_bold">5 Images</span>
                  </span>
                  <span>
                    each not exceeding{" "}
                    <span className="image_text_bold">2 MB.</span>
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modals */}

      {/* barcode scanner modal */}
      <Modal
        title="Barcode Method"
        open={isModalOpen}
        onOk={handleOk}
        width={540}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={[
          <Button
            key="submit"
            style={{
              width: "138px",
              height: "38px",
              color: "#5C5AD0",
              borderColor: "#5C5AD0",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginRight: "10px",
            }}
            onClick={showScannerModal}
          >
            <img src="/images/icons/barcode_icon_blue.svg" alt="icon" /> Scan
            Barcode
          </Button>,
          <Button
            key="cancel"
            style={{
              width: "158px",
              height: "38px",
              fontSize: "12px",
              color: "#5C5AD0",
              borderColor: "#5C5AD0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            onClick={showGenerateModal}
          >
            <img
              src="/images/icons/setting.svg"
              alt="icon"
              style={{ width: "25px" }}
            />{" "}
            Generate Barcode
          </Button>,
        ]}
        closeIcon={
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
        }
      >
        <div className="barcode_scanner">
          <hr />
          <p>Choose the Barcode Method from the below options.</p>
        </div>
      </Modal>
      <Modal
        title="Scan Barcode"
        open={isScannerModalOpen}
        onOk={handleOk}
        width={657}
        onCancel={handleScannerCancel}
        style={{ top: 20 }}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleScannerSubmit}
            style={{
              width: "80px",
              height: "38px",
              backgroundColor: "#5C5AD0",
              fontSize: "12px",
            }}
          >
            Submit
          </Button>,
          <Button
            key="cancel"
            onClick={handleScannerCancel}
            style={{
              width: "80px",
              height: "38px",
              fontSize: "12px",
              color: "#8E9CAA",
              borderColor: "#8E9CAA",
            }}
          >
            Cancel
          </Button>,
        ]}
        closeIcon={
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
        }
      >
        <div className="barcode_scanner">
          <hr />
          <p>
            Place Barcode inside the frame to scan. Please keep your device
            steady when scanning to ensure accurate results.
          </p>

          <div className="scaner_container">
            <div className="scanner">
              {/* <BarcodeScannerComponent
                      ref={webcamRef}
                      width={180}
                      height={180}
                      onUpdate={(err, result)=>{
                        if(result) setData(result.text);
                        // else setData("not found")

                      }}
                    /> */}
            </div>

            <div className="barcode_prev">
              <h4>Barcode Preview</h4>
              <div className="barcode_text">{data}</div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Scan Barcode"
        open={isGenerateModalOpen}
        onOk={handleOk}
        width={540}
        onCancel={handleGenerateCancel}
        style={{ top: 20 }}
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              width: "80px",
              height: "38px",
              backgroundColor: "#5C5AD0",
              fontSize: "12px",
            }}
          >
            Submit
          </Button>,
          <Button
            key="cancel"
            onClick={handleGenerateCancel}
            style={{
              width: "80px",
              height: "38px",
              fontSize: "12px",
              color: "#8E9CAA",
              borderColor: "#8E9CAA",
            }}
          >
            Cancel
          </Button>,
        ]}
        closeIcon={
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
        }
      >
        <div className="barcode_scanner">
          <hr />

          <div className="scaner_container">
            <div className="barcode_prev">
              <h4>Barcode Preview</h4>
              <div className="barcode_text">MB-99999999999 </div>
            </div>
          </div>
          <div className="barcodePatternContainer">
            <p className="genBarcodePTag">Configure Your Barcode Pattern</p>
            <p className="genBarcodePTagDesc">
              Select the attributes with which you want to generate the Barcode.
            </p>
            <div className="fieldInputConatiner">
              <div>
                <p className="inputFieldName">Field Name</p>
                <div className="inputFeild"></div>
              </div>
              <div>
                <p className="inputFieldName">Field Name</p>
                <div className="inputFeild"></div>
              </div>
              <div>
                <p className="inputFieldName"></p>
                <div className="addFeild">+ Add Fields</div>
              </div>
              {/* <div className="addField">+ Add Fields</div> */}
            </div>
          </div>
        </div>
      </Modal>

      {/* Bill of material modal  */}

      <Modal
        title="Bill of Material"
        open={isBOMModalOpen}
        onOk={handleOk}
        width={1110}
        onCancel={handleGenerateCancel}
        style={{ top: 20 }}
        footer=""
        closeIcon={
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
        }
      >
        <div className="BomContainer">

          <hr className="line" />

          <p className="item_name">Item Name : <span>Creta</span></p>

          <div className="firstRowofselector">
            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Resource Group
                </label>{" "}
              </Tooltip>
              <SearchDropdown width={331} />
            </div>

            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Production Batch Size
                </label>{" "}
              </Tooltip>
              <div className="bom_input">
                <input type="text" className="inputcontact" />
              </div>
            </div>

            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Hours
                </label>{" "}
              </Tooltip>
              <div className="bom_input">
                <input type="text" className="inputcontact" />
              </div>
            </div>
          </div>

          <hr className="line"/>

          <div className="secondRowofSelector">
            
          <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Type
                </label>{" "}
              </Tooltip>
              <SearchDropdown width={155} />
            </div>

            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Description
                </label>{" "}
              </Tooltip>
              <SearchDropdown width={230} />
            </div>

            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Qty
                </label>{" "}
              </Tooltip>
              <div className="bom_input">
                <input type="text" className="inputcontact" />
              </div>
            </div>
            
            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Cost
                </label>{" "}
              </Tooltip>
              <div className="bom_input">
                <input type="text" className="inputcontact" />
              </div>
            </div>

            <div className="bom_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Value
                </label>{" "}
              </Tooltip>
              <div className="bom_input">
                <input type="text" className="inputcontact" />
              </div>
            </div>

            <div className="bom_form_submit">

                <input type="submit" value={"Add"} />

            </div>


          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddInventoryItem;
