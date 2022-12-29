import React, { useState } from "react";
import Page_heading from "../Page_Heading/Page_heading";

import { Switch } from "antd";
import { Modal,Button } from "antd";

import "./AddInventoryItem.scss";

const AddInventoryItem = () => {
  const [image, setImage] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                      style={{ width: "200px" }}
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
                    <input type="text" placeholder="placeholder" />
                  </div>
                  <img
                    src="/images/icons/barcodeBtn.svg"
                    alt=""
                    onClick={showModal}
                  />
                </div>
              </div>
              <Modal
                title="Scan Barcode"
                open={isModalOpen}
                onOk={handleOk}
                width={657}
                onCancel={handleCancel}
                footer={[
                  <Button key="submit" type="primary"  style={{width:"80px" ,height:"38px", backgroundColor:"#5C5AD0", fontSize:"12px"}}>
                    Submit
                  </Button>,
                  <Button key="cancel" onClick={handleCancel} style={{width:"80px" ,height:"38px",fontSize:"12px", color:"#8E9CAA", borderColor: '#8E9CAA',
                  }}>
                    Cancel
                  </Button>,
                ]}
                closeIcon={<svg xmlns="http://www.w3.org/2000/svg" width="13.51" height="13" viewBox="0 0 13.51 13">
                <path id="Path_34362" data-name="Path 34362" d="M15.386,13.167l-4.593-4.42,4.593-4.42a1.183,1.183,0,0,0,0-1.723,1.3,1.3,0,0,0-1.79,0L9,7.025,4.41,2.605a1.3,1.3,0,0,0-1.79,0,1.183,1.183,0,0,0,0,1.723l4.593,4.42L2.62,13.167a1.183,1.183,0,0,0,0,1.723,1.3,1.3,0,0,0,1.79,0L9,10.47,13.6,14.89a1.3,1.3,0,0,0,1.79,0A1.189,1.189,0,0,0,15.386,13.167Z" transform="translate(-2.248 -2.248)" fill="#697a8d"/>
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
                      <img src="/images/icons/barcode_scanner.svg" alt="" />
                    </div>

                    <div className="barcode_prev">
                      <h4>Barcode Preview</h4>
                      <div className="barcode_text">MB-99999999999 </div>
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
              <Switch unCheckedChildren="__" defaultChecked />
              <h3>Enable Menufecturing</h3>
            </div>
            <div className="switch_toggler">
              <Switch unCheckedChildren="__" defaultChecked />
              <h3>Enable Variant</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventoryItem;
