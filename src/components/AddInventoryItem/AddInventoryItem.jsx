import React from "react";
import Page_heading from "../Page_Heading/Page_heading";

import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import "./AddInventoryItem.scss";

const AddInventoryItem = () => {
  const [image, setImage] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    if(e.target.files.length > 5){
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

//   const onChange = (checked: boolean) => {
//     console.log(`switch to ${checked}`);
//   };

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
                  multiple max={5}
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <h3 onClick={handleClick}>+ Add Image</h3>

              {image.length===0 && (
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
              <h5>Image {currentIndex+1}</h5>
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
                    <div className="barcode_scanner"><input type="text" placeholder="placeholder" /></div>
                    <img src="/images/icons/barcodeBtn.svg" alt=""/>
                </div>
            </div>

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
          <Switch  unCheckedChildren="__" defaultChecked />
          <h3>Enable Menufecturing</h3>
          </div>
          <div className="switch_toggler">
          <Switch  unCheckedChildren="__" defaultChecked />
          <h3>Enable Variant</h3>
          </div>
        </div>
       
        </div>
        
      </div>
    </div>
  );
};

export default AddInventoryItem;
