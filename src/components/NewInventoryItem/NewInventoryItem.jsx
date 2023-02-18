import React, {useState} from 'react'
import './NewInventoryItem.scss'

import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import SearchDropdown from '../AllDropdowns/SearchDropdown/SearchDropdown'



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

  return (
    <div className="new_inventory_item_main">
        <div className="new_inventory_item_container">
        <div className="header">
            <h1>Create Item</h1>
            <p>Without an Item group you can't create an Item.</p>
        </div>

        <div className="item_form_container" style={{overflow:"scroll"}}>
            
            <div className="input_box_container">

            <div className="input_group">
                  <p>Item Group</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>HSN Code</p>
                  <div className="input_container">
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div>

                <div className="input_group">
                  <p>Name</p>
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
                  <p>Foreign Name</p>
                  <div className="input_container">
                    <img src="/images/icons/cube.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div>

                <div className="input_group">
                  <p>Unit of Measurement</p>
                  <div className="input_container" style={{backgroundColor: "#eceef1"}}>
                    <input type="text"  style={{backgroundColor: "#eceef1"}} />
                  </div>
                </div>

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
            </div>
        </div>
        <div className="button">
            <button className="submit_button btn_hover_animation" >Submit</button>
            <button className="cancel_button btn_hover_animation">Cancel</button>
        </div>
        </div>

        
    </div>
    
  )
}

export default NewInventoryItem


{/* <div className="new_inventory_item_form_container">
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

    </div> */}