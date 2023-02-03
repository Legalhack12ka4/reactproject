import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Page_heading from "../Page_Heading/Page_heading";

import { Switch } from "antd";
import { Modal, Button, Tooltip, Popover } from "antd";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import alert from "../../assets/Images/Confirmation/confirm.svg";
import "./AddInventoryItem.scss";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import SelectAllDropdown from "../AllDropdowns/SelectAllDropdown/SelectAllDropdown";
import TagsInput from "../TagsInput/TagsInput";
import { createRef } from "react";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddInventoryItem = (props, {onClick}) => {
  const scannerRef = useRef(null);
  const [image, setImage] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [isBOMVariantOpen, setIsBOMVariantOpen] = useState(false);
  // const [superVariantRows, setSuperVariantRows] = useState([{id:1, name:"row1",value: ""},{id:2, name:"row2",value: ""},{id:3, name:"row3",value: ""}]);
  // ,{id:4, name:"row4",type: "typebox"}
  const [withResource, setWithResource] = useState(true);
  const [bomRows, setBomRows] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
    { id: 3, name: "row3", value: "" },
    { id: 4, name: "row4", value: "" },
  ]);

  // const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [isSerialModalOpen, setIsSerialModalOpen] = useState(false);
  const [bomEnable, setBomEnable] = useState(false);
  const [variantEnable, setVariantEnable] = useState(false);
  const [confirm, setCofirm] = useState(false);
  const [colors, setColors] = useState(true);
  const [sizes, setSizes] = useState(true);
  const [serial, setSerial] = useState(true);
  const [serialValue, setSerialValue] = useState("");
  const [serialValueTo, setSerialValueTo] = useState(0);
  const [otherInputValue, setOtherInputValue] = useState("");
  const containerRef = useRef(null);
  // const hiddenFileInput = React.useRef(null);

  // bom value state
  const [cost, setCost] = useState(Array(bomRows.length).fill(0));
  const [qty, setQty] = useState(Array(bomRows.length).fill(0));
  const [value, setValue] = useState(Array(bomRows.length).fill(0));
  const [formattedCost, setFormattedCost] = useState(
    Array(bomRows.length).fill("")
  );
  const [isFocusedIndex, setIsFocusedIndex] = useState(
    Array(bomRows.length).fill(false)
  );
  const [isCostBlurredIndex, setIsCostBlurredIndex] = useState(
    Array(bomRows.length).fill(false)
  );
  const [showFormattedValue, setShowFormattedValue] = useState([]);
  const [isPcsShown, setIsPcsShown] = useState(
    Array(bomRows.length).fill(false)
  );
  const inputRef = useRef(Array(bomRows.length).fill(null));
  const [focus, setFocus] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  // image Uploader

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  //popover

  const [popOverVisible, setPopOverVisible] = useState(false);
  //Body assigned handlepopover
const resetRef= useRef()

const handleReset = () =>
{
  console.log("hello")
  resetRef.current.handleReset();
}

  const handlePopOver = (index) => {
    setPopOverVisible(index);
    console.log("hello");
  };

  //
const popVisible = () =>
{
  setPopOverVisible(false)
  console.log("hoja bhai...........")
  
}


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

  // const handleClick = (event) => {
  //   hiddenFileInput.current.click();
  // };

  // const handleChange = (e) => {
  //   if (e.target.files.length > 5) {
  //     alert("You can only upload 5 images");
  //     return;
  //   }
  //   setImage(e.target.files);
  //   setCurrentIndex(0);
  //   const files = e.target.files;

  //   const names = [];

  //   for (let i = 0; i < files.length; i++) {
  //     names.push(files[i].name);
  //   }

  //   setFileNames(names);
  // };
  // const handleDelete = () => {
  //   const index = fileNames.indexOf(image[currentIndex].name);
  //   fileNames.splice(index, 1);
  //   const newImages = [...image];
  //   newImages.splice(index, 1);
  //   setImage(newImages);
  //   setFileNames(fileNames);
  //   setCurrentIndex(0);
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   } else if (currentIndex === 0) {
  //     setCurrentIndex(0);
  //   } else {
  //     setCurrentIndex(0);
  //   }
  // };

  // const handlePrevClick = () => {
  //   setCurrentIndex((currentIndex - 1 + image.length) % image.length);
  // };
  // const handleNextClick = () => {
  //   setCurrentIndex((currentIndex + 1) % image.length);
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSerialOk = () => {
    setIsSerialModalOpen(false);
  };
  const handleSerialCancel = () => {
    setIsSerialModalOpen(false);
  };
  const handleSerialSubmit = () => {
    setIsSerialModalOpen(false);
    setSerialValue(document.getElementById("serial_value").value);
    setSerialValueTo(document.getElementById("serial_value_to").value);
  };
  const handleMaterialOk = () => {
    setIsMaterialModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsBOMVariantOpen(false);
    setIsBOMModalOpen(false);
  };

  const handleMaterialCancel = () => {
    setIsMaterialModalOpen(false);
  };
  const handleConfirmCancel = () => {
    //setIsModalOpen(false);
    // setIsBOMVariantOpen(false);
    // setIsBOMModalOpen(false);
    setCofirm(true);
  };
  const handleConfirm = () => {
    //setIsModalOpen(false);
    // setIsBOMVariantOpen(false);
    // setIsBOMModalOpen(false);
    setCofirm(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsBOMVariantOpen(false);
    setIsBOMModalOpen(false);
    setCofirm(false);
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
    console.log("scanner modal open");
  };
  const showGenerateModal = () => {
    setIsGenerateModalOpen(true);
  };

  const handleGenerateCancel = () => {
    setIsGenerateModalOpen(false);
  };

  //   const deleteBomRow = (id) => {
  //     setBomRows(bomRows.filter(row => row.id !== id));
  //     setCost(cost.filter((_, index) => bomRows[index].id !== id));
  //     setQty(qty.filter((_, index) => bomRows[index].id !== id));
  //     setValue(value.filter((_, index) => bomRows[index].id !== id));
  //     setTotalSum(totalSum - value[id]);
  //     // console.log(id)
  // }
  const deleteBomRow = (id) => {
    setBomRows(bomRows.filter((row) => row.id !== id));
    setCost((prevCost) =>
      prevCost.filter((item, index) => bomRows[index].id !== id)
    );
    setValue((prevValue) =>
      prevValue.filter((item, index) => bomRows[index].id !== id)
    );
    setQty((prevQty) => prevQty.filter((_, index) => bomRows[index].id !== id));
    setIsPcsShown((prevIsPcsShown) =>
      prevIsPcsShown.filter((_, index) => bomRows[index].id !== id)
    );
    setTotalSum(totalSum - value[id]);
    setShowFormattedValue((prevValue) =>
      prevValue.filter((item, index) => bomRows[index].id !== id)
    );
  };
  // const deleteBomRow = (id) => {
  //   setBomRows(bomRows.filter(row => row.id !== id));
  //   setCost(prevCost => prevCost.filter((item, index) => bomRows[index].id !== id));
  //   setValue(prevValue => prevValue.filter((item, index) => bomRows[index].id !== id));
  //   setShowFormattedValue(prevValue => prevValue.filter((item, index) => bomRows[index].id !== id));
  // }
  const handleBomAddRow = () => {
    const newRows = [...bomRows, { id: Date.now() }, { id: Date.now() + 1 }];
    setBomRows(newRows);
    setCost((prevCost) => [...prevCost, 0, 0]);
    setQty((prevQty) => [...prevQty, 0, 0]);
    setValue((prevValue) => [...prevValue, 0, 0]);

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [bomRows]);

  // const handleVarientAddRow = () => {
  //   let index = superVariantRows.length -1;
  //   const newRows = [...superVariantRows];
  //   newRows.splice(index, 0, {id: superVariantRows.length + 1, name: `row${superVariantRows.length+1}`, type: "dropdown"});
  //   setSuperVariantRows(newRows);
  // }
  // const deleteVariantsRow = (id) => {
  //   setSuperVariantRows(superVariantRows.filter(row => row.id !== id));
  //   // console.log(id)
  // }
  const handleBomChange = (checked) => {
    // console.log(`switch bom ${checked}`);
    setBomEnable(checked);
  };

  const handleVarientChange = (checked) => {
    // console.log(`switch varient ${checked}`);
    setVariantEnable(checked);
  };

  const [result, setResult] = useState("No result");
  const [data, setData] = React.useState("Scan a barcode");

  // console.log(data)

  //options select

  const bodymaterial = [
    {
      value: "Body Welding Machine",
      label: (
        <div onClick={() => setIsMaterialModalOpen(false)}>
          Body Welding Machine
        </div>
      ),
    },
    {
      value: "Body Cutter Polish Machine",
      label: (
        <div onClick={() => setIsMaterialModalOpen(false)}>
          Body Cutter Polish Machine
        </div>
      ),
    },
    {
      value: "Body Panels Assemble Machine",
      label: (
        <div onClick={() => setIsMaterialModalOpen(false)}>
          Body Panels Assemble Machine
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   hiddenFileInput.current.ondragover = () => {
  //     hiddenFileInput.current.className = "hover";
  //     return false;
  //   };
  //   hiddenFileInput.current.ondrop = (e) => {
  //     e.preventDefault();
  //     hiddenFileInput.current.className = "hidden";
  //     const file = e.dataTransfer.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       document.getElementById("image_droped").className = "visible";
  //       document.getElementById("image_droped").src = event.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   };
  // }, []);

  // let dots = [];
  // for (let i = 0; i < image.length; i++) {
  //   dots.push(i);
  // }

  const selectOption = [
    {
      value: "Value 1",
      label: "Value 1",
    },
    {
      value: "Value 2",
      label: "Value 2",
    },
    {
      value: "Value 3",
      label: "Value 3",
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((currentIndex + 1) % image.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [currentIndex, image.length]);

  const calculateValue = (cost, qty, index) => {
    setValue((prevValue) => {
      const newValue = [...prevValue];
      newValue[index] = cost[index] * qty[index];
      return newValue;
    });
  };
  useEffect(() => {
    setTotalSum(value.reduce((acc, curr) => acc + curr, 0));
  }, [value]);

  const handleCostBlur = (e, index) => {
    const value = e.target.value;
    const formattedValue = formatAmount(value);
    setFormattedCost((prevCost) => {
      const newCost = [...prevCost];
      newCost[index] = formattedValue;
      return newCost;
    });
    setIsCostBlurredIndex((prevIsCostBlurredIndex) => {
      const newIsCostBlurredIndex = [...prevIsCostBlurredIndex];
      newIsCostBlurredIndex[index] = true;
      return newIsCostBlurredIndex;
    });

    setShowFormattedValue((prevValue) => {
      const newValue = [...prevValue];
      newValue[index] = true;
      return newValue;
    });
  };

  const editBtnClick = (index) => {
   // setIsMaterialModalOpen(true);
    setPopOverVisible(index);
    alert("hello")
  };

  const handleFocus = (index) => {
    setFocus((prevFocus) => {
      const newFocus = [...prevFocus];
      newFocus[index] = true;
      return newFocus;
    });
    setIsFocusedIndex((prevIsFocusedIndex) => {
      const newIsFocusedIndex = [...prevIsFocusedIndex];
      newIsFocusedIndex[index] = true;
      return newIsFocusedIndex;
    });
    setShowFormattedValue((prevValue) => {
      const newValue = [...prevValue];
      newValue[index] = false;
      return newValue;
    });
  };

  const formatTotalAmount = (amount) => {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + " Cr";
    } else if (value >= 10000) {
      return (value / 100000).toFixed(2) + " Lacs";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + " K";
    } else {
      return value;
    }
  };
  const formattedAmount = formatTotalAmount(totalSum);

  // console.log(formattedAmount)
  console.log(totalSum);

  const handleInputClick = (index) => {
    setIsCostBlurredIndex((prevIsCostBlurredIndex) => {
      const newIsCostBlurredIndex = [...prevIsCostBlurredIndex];
      newIsCostBlurredIndex[index] = false;
      return newIsCostBlurredIndex;
    });
  };

  // serail modal
  const SerialModal = () => {
    setIsSerialModalOpen(true);
  };

  // popOver

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const formatAmount = (value) => {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + " Cr";
    } else if (value >= 10000) {
      return (value / 100000).toFixed(2) + " Lacs";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + " K";
    } else {
      return value;
    }
  };

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
                      onChange={handleBomChange}
                      onClick={setIsBOMModalOpen}
                    />
                    <h3>Enable Manufacturing</h3>
                    {bomEnable && (
                      <div className="editBtn" onClick={setIsBOMModalOpen}>
                        <img src="/images/icons/edit.svg" />
                        <span>Edit</span>
                      </div>
                    )}
                  </div>
                  <div className="switch_toggler">
                    <Switch
                      unCheckedChildren="__"
                      onChange={handleVarientChange}
                      onClick={setIsBOMVariantOpen}
                    />
                    <h3>Enable Variant</h3>
                    {variantEnable && (
                      <div className="editBtn" onClick={setIsBOMVariantOpen}>
                        <img src="/images/icons/edit.svg" />
                        <span>Edit</span>
                      </div>
                    )}
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

                {bomEnable && (
                  <div className="input_group">
                    <p>Menufacturing Account</p>
                    <SearchDropdown width={330} />
                  </div>
                )}
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
            fileList.length === 0
              ? "img_uploader_main_length_0"
              : "img_uploader_main"
          }`}
        >
          <p className="item_image_heading"> Item Image</p>
          <Upload
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
        {/* <div
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
        </div> */}
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
        width={"max-content"}
        onCancel={handleCancel}
        style={{ top: 20 }}
        // footer=""
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
            onClick={handleConfirmCancel}
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
        <div className="BomContainer">
          <hr className="line" />

          <p className="planing_method">
            Choose the planing method according to the item
          </p>

          <div className="resource_planing_method_btn_container">
            <div
              className={`btn with_resource_planing ${
                withResource && "activeBtn"
              }`}
              onClick={() => setWithResource(true)}
            >
              <div className={`btn_text`}>
                {withResource && (
                  <img src="/images/icons/right_blue.svg" alt="" />
                )}
                <p>With Resource Planing</p>
              </div>
            </div>

            <div
              className={`btn without_resource_planing ${
                !withResource && "activeBtn"
              }`}
              onClick={() => setWithResource(false)}
            >
              <div className="btn_text">
                {!withResource && (
                  <img src="/images/icons/right_blue.svg" alt="" />
                )}
                <p>Without Resource Planing</p>
              </div>
            </div>
          </div>

          <div className="field_container">
            <div className="container_header">Creta</div>
            <ul className="field_box_heading">
              {withResource && (
                <li className="assigned_resource">Assigned Resource</li>
              )}
              <li className="type">Type</li>
              <li className="material">Material</li>
              <li className="options">Options</li>
              <li className="qty">Qty</li>
              <li className="cost">Cost</li>
              <li className="value">Value</li>
            </ul>

            <div className="rows_container" ref={containerRef}>
              {bomRows.map((item, index) => {
                return (
                  <ul className="field_box_rows" key={item.id}>
                    {withResource && (
                      <li className="assigned_resource">
                        <Popover
                          showArrow={false}
                          placement={"bottomRight"}
                          
                          getPopupContainer={(trigger) => trigger.parentElement}
                          content={
                            <div className="materialCoontainer">
                              <div className="productionresources">
                                <div>
                                  <p className="productionlabel">
                                    Producton Batch Size
                                  </p>
                                  <input
                                    className="productioninput"
                                    type="text"
                                    value="05 Pcs"
                                    style={{ padding: "0px 10px" }}
                                  />
                                </div>
                                <div>
                                  <p className="productionlabel">
                                    Producton Hours
                                  </p>
                                  <input
                                    className="productioninput"
                                    type="text"
                                    value="03:00 Hours"
                                    style={{ padding: "0px 10px" }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  marginTop: "20px",
                                }}
                              >
                                <Button
                                  key="submit"
                                  type="primary"
                                  onClick={() => {setPopOverVisible(false)}}
                                  style={{
                                    width: "80px",
                                    height: "38px",
                                    backgroundColor: "#5C5AD0",
                                    fontSize: "12px",
                                  }}
                                >
                                  Submit
                                </Button>

                                <Button
                                  key="cancel"
                                  onClick={()=>resetRef.current.getAlert()}
                                  style={{
                                    width: "80px",
                                    height: "38px",
                                    fontSize: "12px",
                                    color: "#8E9CAA",
                                    borderColor: "#8E9CAA",
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          }
                          title={""}
                          visible={popOverVisible === index}
                        >
                          <SearchDropdown
                            options={bodymaterial}
                            ref={resetRef}
                            popVisible={popVisible}
                            onChange={() => handlePopOver(index)}
                            editBtnClick={()=>editBtnClick(index)}
                            width={250}
                            editBtn={true}
                          />
                        </Popover>
                      </li>
                    )}
                    <li className="type">
                      <SearchDropdown width={138} />
                    </li>
                    <li className="material">
                      <SearchDropdown width={250} />
                    </li>
                    <li className="options">
                      {/* <div className="input_container"> */}
                      <SelectAllDropdown option={selectOption} />
                      {/* </div> */}
                    </li>
                    <li className="qty">
                      <div className="input_container">
                        <input
                          type="number"
                          onwheel="return false;"
                          className={qty[index] > 0 ? "has-value" : ""}
                          onChange={(e) =>
                            setQty((prevQty) => {
                              const newQty = [...prevQty];
                              newQty[index] = e.target.value;
                              calculateValue(cost, newQty, index);
                              return newQty;
                            })
                          }
                        />
                        {qty[index] > 0 ? (
                          <div className="qty_text">Pcs</div>
                        ) : null}
                      </div>
                    </li>
                    <li className="cost">
                      <div className="input_container">
                        <input
                          type="number"
                          ref={inputRef}
                          className={
                            isCostBlurredIndex[index]
                              ? "cost-input-blurred"
                              : ""
                          }
                          onFocus={() => handleFocus(index)}
                          onClick={() => handleInputClick(index)}
                          onBlur={(e) => handleCostBlur(e, index)}
                          onChange={(e) =>
                            setCost((prevCost) => {
                              const newCost = [...prevCost];
                              newCost[index] = e.target.value;
                              calculateValue(newCost, qty, index);
                              return newCost;
                            })
                          }
                        />
                        {/* <div className="formatted-value">{formattedCost[index]}</div> */}
                        <div
                          className={`formatted-value ${
                            !showFormattedValue[index]
                              ? "formatted-value-blured"
                              : ""
                          }`}
                        >
                          {formattedCost[index]}
                        </div>
                      </div>
                    </li>
                    <li className="value">
                      <div className="input_container">
                        <input
                          type="text"
                          value={
                            value[index] >= 10000000
                              ? (value[index] / 10000000).toFixed(2) + " Cr"
                              : value[index] >= 10000
                              ? (value[index] / 100000).toFixed(2) + " Lacs"
                              : value[index] >= 1000
                              ? (value[index] / 1000).toFixed(2) + " K"
                              : value[index] > 0
                              ? value[index]
                              : ""
                          }
                          readOnly
                        />
                        {/* if (value >= 10000000) {
                            return (value / 10000000).toFixed(2) + " Cr";
                          } else if (value >= 10000) {
                            return (value / 100000).toFixed(2) + " Lacs";
                          } else if (value >= 1000) {
                            return (value / 1000).toFixed(2) + " K";
                          } else {
                            return value;
                          } */}
                      </div>
                    </li>
                    <div
                      className="delete_btn"
                      onClick={() => deleteBomRow(item.id)}
                    >
                      <img src="/images/icons/delete.svg" alt="" />
                    </div>
                  </ul>
                );
              })}
            </div>

            <div className="footer_container">
              <div className="add_field" onClick={handleBomAddRow}>
                + Add
              </div>
              <div className="total_value">
                Total Value :{" "}
                <span>
                  {" "}
                  ₹{" "}
                  {totalSum >= 10000000
                    ? (totalSum / 10000000).toFixed(2) + " Cr"
                    : totalSum >= 10000
                    ? (totalSum / 100000).toFixed(2) + " Lacs"
                    : totalSum >= 1000
                    ? (totalSum / 1000).toFixed(2) + " K"
                    : totalSum > 0
                    ? totalSum
                    : "0.00"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Variant of material modal  */}

      <Modal
        title="Item Variants"
        open={isBOMVariantOpen}
        onOk={handleOk}
        width={"max-content"}
        onCancel={handleCancel}
        style={{ top: 20 }}
        // footer=""
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
            onClick={handleCancel}
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
        <div className="BomContainer">
          <hr className="line" />

          <p className="planing_method">
            Add New Attribute by clicking on Add Button.
          </p>

          <div className="field_container">
            <div className="container_header">Variants of Creta</div>
            <ul className="field_box_heading">
              <li className="attributes">Attributes</li>
              <li className="value1">Value</li>
            </ul>

            {colors && (
              <ul className="field_box_rows">
                <li className="type others">
                  <input type="text" value={"Colors"} readOnly />
                </li>
                <li className="value1">
                  <div
                    className="input_container"
                    style={{ width: "545px !important" }}
                  >
                    <TagsInput />
                  </div>
                </li>
                <div
                  className="delete_btn"
                  onClick={() => {
                    setColors(false);
                  }}
                >
                  <img src="/images/icons/delete.svg" alt="" />
                </div>
              </ul>
            )}

            {sizes && (
              <ul className="field_box_rows">
                <li className="type others">
                  <input type="text" value={"Sizes"} readOnly />
                </li>
                <li className="value1">
                  <div
                    className="input_container"
                    style={{ width: "545px !important" }}
                  >
                    <TagsInput />
                  </div>
                </li>
                <div
                  className="delete_btn"
                  onClick={() => {
                    setSizes(false);
                  }}
                >
                  <img src="/images/icons/delete.svg" alt="" />
                </div>
              </ul>
            )}

            {serial && (
              <ul className="field_box_rows">
                <li className="type others">
                  <input type="text" value={"Serial No."} readOnly />
                </li>
                <li className="value1">
                  <div
                    className="input_container"
                    onClick={SerialModal}
                    style={{ width: "545px !important" }}
                  >
                    {/* <TagsInput /> */}
                    <p style={{ padding: "0px 10px", color: "#5c5ad0" }}>
                      {serialValueTo > 0 && serialValueTo}{" "}
                      {serialValue > 0 && serialValueTo > 0 && " - "}{" "}
                      {serialValue}
                    </p>
                  </div>
                </li>
                <div
                  className="delete_btn"
                  onClick={() => {
                    setSerial(false);
                  }}
                >
                  <img src="/images/icons/delete.svg" alt="" />
                </div>
              </ul>
            )}
            <ul className="field_box_rows" key={4}>
              <li className="type others">
                <input
                  type="text"
                  placeholder="Others"
                  onChange={(event) => setOtherInputValue(event.target.value)}
                />
              </li>
              <li className="value1">
                <div
                  className="input_container"
                  style={{ width: "545px !important" }}
                >
                  {/* <input type="text"  /> */}
                  {otherInputValue && <TagsInput />}
                </div>
              </li>
            </ul>

            {!colors || !sizes || !serial ? (
              <div className="add_footer_container">
                {!colors && (
                  <div
                    className="add_field"
                    onClick={() => {
                      setColors(true);
                    }}
                  >
                    Add Colors
                  </div>
                )}
                {!sizes && (
                  <div
                    className="add_field"
                    onClick={() => {
                      setSizes(true);
                    }}
                  >
                    Add Size
                  </div>
                )}
                {!serial && (
                  <div
                    className="add_field"
                    onClick={() => {
                      setSerial(true);
                    }}
                  >
                    Add Serial No.
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </Modal>

      {/* Materail assigned modal */}

      <Modal
        open={isMaterialModalOpen}
        onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleMaterialCancel}
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
        ]}
        closable={false}
      >
        <div className="materialCoontainer">
          <div className="productionresources">
            <div>
              <p className="productionlabel">Producton Batch Size</p>
              <input
                className="productioninput"
                type="text"
                value="05 Pcs"
                style={{ padding: "0px 10px" }}
              />
            </div>
            <div>
              <p className="productionlabel">Producton Hours</p>
              <input
                className="productioninput"
                type="text"
                value="03:00 Hours"
                style={{ padding: "0px 10px" }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* serial number modal  */}
      <Modal
        open={isSerialModalOpen}
        onOk={handleSerialOk}
        width={"max-content"}
        onCancel={handleSerialCancel}
        style={{ top: 200 }}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSerialSubmit}
            style={{
              width: "80px",
              height: "38px",
              backgroundColor: "#5C5AD0",
              fontSize: "12px",
            }}
          >
            Submit
          </Button>,
        ]}
        closable={false}
      >
        <div className="materialCoontainer">
          <div className="productionresources">
            <div>
              <p className="productionlabel">From</p>
              <input
                className="productioninput"
                type="text"
                id="serial_value_to"
                style={{ padding: "0px 10px" }}
              />
            </div>
            <div>
              <p className="productionlabel">To</p>
              <input
                className="productioninput"
                type="text"
                id="serial_value"
                style={{ padding: "0px 10px" }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirmation */}

      <Modal
        open={confirm}
        onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirm}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirm}
              style={{
                width: "86px",
                height: "38px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#8E9CAA",
                borderColor: "#C2CAD2",
              }}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={handleCancel}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#DA2F58",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Submit
            </Button>
          </div>,
        ]}
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
        <div className="confirmCoontainer">
          <div className="confirmresources">
            <div className="imgsetting">
              <div className="imgbackground">
                <img src={alert} style={{ width: "38px", height: "38px" }} />
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: "22px",
                  color: "#2B3347",
                  fontWeight: "500",
                  padding: "21px 0px 0px 0px",
                }}
              >
                Delete Product
              </p>
            </div>
          </div>
          <div>
            <p className="confirmationtext">
              Are you sure you want to close this window? <br /> All the value
              which you filled in the fields will be deleted.
              <br /> This action cannot recover the value.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddInventoryItem;
