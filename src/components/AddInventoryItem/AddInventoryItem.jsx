import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Page_heading from "../Page_Heading/Page_heading";

import { Switch } from "antd";
import { Modal, Button } from "antd";


import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./AddInventoryItem.scss";

const AddInventoryItem = () => {
  const scannerRef = useRef(null);
  const [image, setImage] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

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
    setData(data)
  };

  const webcamRef = useRef(null);

  const stop = () => {
    let stream = webcamRef.current.video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    webcamRef.current.video.srcObject = null;
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
  const [data,setData]=React.useState("Scan a barcode")

  
    console.log(data)
  return (
    <div className="add-inventory">
      <Page_heading parent={"Items or Service"} child={"Add Inventory Item"} />
      <div className="inventory_form">
        <div className="inventory_form_container">
          <div className="upload_image_container">
            <p> Item Image</p>
            <div className="img_uploader">
              <div className="image_prev">
                {image[currentIndex] instanceof File && (
                  <>
                    <img
                      src={URL.createObjectURL(image[currentIndex])}
                      alt="image"
                      style={{ width: "200px", height: "140px" }}
                    />

                    <p>
                      {image[currentIndex].name.length > 20
                        ? image[currentIndex].name.substring(0, 14) +
                          "..." +
                          image[currentIndex].name.substring(
                            image[currentIndex].name.length - 5
                          )
                        : image[currentIndex].name}
                    </p>
                  </>
                )}
                <input
                  type="file"
                  name="image"
                  multiple
                  max={5}
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <h3 onClick={handleClick}>+ Add Image</h3>

              {image.length === 0 && (
                <p>
                  <span>You Can add</span> <span>up to 5 Images</span>{" "}
                  <span>each not exceeding 2 MB.</span>
                </p>
              )}
            </div>
            <div className="image_pagination">
              <button disabled={currentIndex === 0} onClick={handlePrevClick}>
                <img
                  src="/images/icons/right-arrow-icon.svg"
                  alt="arrow"
                  style={{ transform: "rotate(180deg)", cursor: "pointer" }}
                />
              </button>
              <h5>Image {currentIndex + 1}</h5>
              <button
                disabled={currentIndex === image.length - 1}
                onClick={handleNextClick}
              >
                <img
                  src="/images/icons/right-arrow-icon.svg"
                  alt="arrow"
                  style={{ cursor: "pointer" }}
                />
              </button>
            </div>
          </div>
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
                    <input type="text" placeholder="placeholder" id="barcode_input" value={data} />
                  </div>
                  <img
                    src="/images/icons/barcodeBtn.svg"
                    alt=""
                    onClick={showModal}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

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
                    <img src="/images/icons/barcode_icon_blue.svg" alt="icon" />{" "}
                    Scan Barcode
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
                    Place Barcode inside the frame to scan. Please keep your
                    device steady when scanning to ensure accurate results.
                  </p>

                  <div className="scaner_container">
                    <div className="scanner">
                        <BarcodeScannerComponent
                      ref={webcamRef}
                      width={180}
                      height={180}
                      onUpdate={(err, result)=>{
                        if(result) setData(result.text);
                        // else setData("not found")

                      }}
                    />
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
                    <p className="genBarcodePTag">
                      Configure Your Barcode Pattern
                    </p>
                    <p className="genBarcodePTagDesc">
                      Select the attributes with which you want to generate the
                      Barcode.
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

              <div className="input_group">
                <p>Tags</p>
                <div className="input_container">
                  {/* <img src="/images/sidebar_icons/bxs-cube.svg" alt="" />
                    <input type="text" placeholder="placeholder" /> */}
                </div>
              </div>

              <div className="input_group">
                <p>Unit of Measurement</p>
                <div className="input_container">
                  {/* <img src="/images/sidebar_icons/bxs-cube.svg" alt="" />
                    <input type="text" placeholder="placeholder" /> */}
                </div>
              </div>
            </div>
            <div className="switch_toggler">
              <Switch unCheckedChildren="__"  />
              <h3>Enable Manufacturing</h3>
            </div>
            <div className="switch_toggler">
              <Switch unCheckedChildren="__"  />
              <h3>Enable Variant</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventoryItem;
