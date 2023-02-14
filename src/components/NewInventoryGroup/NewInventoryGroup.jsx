import React, {useState, useRef, useEffect} from 'react'
import './NewInventoryGroup.scss'


import SearchDropdown from '../AllDropdowns/SearchDropdown/SearchDropdown'
import { Button, Modal, Switch, Popover } from 'antd'
import Page_heading from '../Page_Heading/Page_heading'
import SelectAllDropdown from "../AllDropdowns/SelectAllDropdown/SelectAllDropdown";
import alert from "../../assets/Images/Confirmation/confirm.svg";
import TagsInput from "../TagsInput/TagsInput";






const NewInventoryGroup = () => {


  const scannerRef = useRef(null);
  const containerRef = useRef(null);
  const resetRef= useRef()
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [isBOMVariantOpen, setIsBOMVariantOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setCofirm] = useState(false);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [data, setData] = React.useState("Scan a barcode");
  const [withResource, setWithResource] = useState(true);
  const [bomRows, setBomRows] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
    { id: 3, name: "row3", value: "" },
    { id: 4, name: "row4", value: "" },
  ]);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [qty, setQty] = useState(Array(bomRows.length).fill(0));
  const [value, setValue] = useState(Array(bomRows.length).fill(0));
  const [totalSum, setTotalSum] = useState(0);
  const [cost, setCost] = useState(Array(bomRows.length).fill(0));
  const inputRef = useRef(Array(bomRows.length).fill(null));
  const [isCostBlurredIndex, setIsCostBlurredIndex] = useState(
    Array(bomRows.length).fill(false)
  );
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
  const [focus, setFocus] = useState([]);
  const [isFocusedIndex, setIsFocusedIndex] = useState(
    Array(bomRows.length).fill(false)
  );
  const [showFormattedValue, setShowFormattedValue] = useState([]);
  const [formattedCost, setFormattedCost] = useState(
    Array(bomRows.length).fill("")
  );
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
  const [isPcsShown, setIsPcsShown] = useState(
    Array(bomRows.length).fill(false)
  );
  const [bomEnable, setBomEnable] = useState(false);
  const [confirmv, setCofirmv] = useState(false);
  const [variantEnable, setVariantEnable] = useState(false);
  const [colors, setColors] = useState(true);
  const [sizes, setSizes] = useState(true);
  const [serial, setSerial] = useState(true);
  const [isSerialModalOpen, setIsSerialModalOpen] = useState(false);
  const [serialValueTo, setSerialValueTo] = useState(0);
  const [serialValue, setSerialValue] = useState("");
  const [otherInputValue, setOtherInputValue] = useState("");



















  const handleOk = () => {
    setIsModalOpen(false);
    setIsBOMVariantOpen(false);
    setIsBOMModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setCofirm(true);
    setPopOverVisible(false)
  };

  const handleScannerSubmit = (data) => {
    setIsScannerModalOpen(false);
    setIsModalOpen(false);
    scannerRef.getVideoTracks()[0].stop();
    document.getElementById("barcode_input").value = data;
    setData(data);
  };

  const popVisible = () =>
{
  setPopOverVisible(false)
  
}

const handlePopOver = (index) => {
  setPopOverVisible(index);

};

const editBtnClick = (index) => {
   setPopOverVisible(index);
 };

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

const handleInputClick = (index) => {
  setIsCostBlurredIndex((prevIsCostBlurredIndex) => {
    const newIsCostBlurredIndex = [...prevIsCostBlurredIndex];
    newIsCostBlurredIndex[index] = false;
    return newIsCostBlurredIndex;
  });
};
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

const handleBomChange = (checked) => {
  // console.log(`switch bom ${checked}`);
  setBomEnable(checked);
};

const handleMaterialOk = () => {
  setIsMaterialModalOpen(false);
};

const handleConfirm = () => {
  setCofirm(false);
  // setPopOverVisible(false)
};

const handleCancel = () => {
  setIsModalOpen(false);
  setIsBOMVariantOpen(false);
  setIsBOMModalOpen(false);
  setCofirm(false);
  setCofirmv(false);
};
const handleConfirmv = () => {
  setCofirmv(false);
};
const handleVarientChange = (checked) => {
  // console.log(`switch varient ${checked}`);
  setVariantEnable(checked);
};

const handleConfirmCancelv = () => {
  setCofirmv(true);
};

const SerialModal = () => {
  setIsSerialModalOpen(true);
};

const resetOther = () => {
  document.getElementById("otherInput").value = "";
  setOtherInputValue("");

};








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



    

  return (
    <div className="new_inventory_group_main">
        <Page_heading parent={"Item or Service"} child={"Add Inventory Item"} />

        <div className="new_inventory_group_container">

        <div className="header">
            <h1>Create Group</h1>
            <p>Without an Item group you can't create an Item.</p>
        </div>

        <div className="group_form_container">

            <div className="top_input_container">

            <div className="input_group">
                  <p>Group Name</p>
                  <div className="input_container">
                    <img src="/images/icons/HSNSearch.svg" alt="" />
                    <input type="text" placeholder="placeholder" />
                  </div>
                </div>

            <div className="input_group">
                  <p>Type</p>
                  <SearchDropdown width={194} />
                </div>


                <div className="input_group">
                  <p>Unit of Measurement</p>
                  <SearchDropdown width={209} />
                </div>

                <div className="input_group">
                  <p>Manage by</p>
                  <SearchDropdown width={237} />
                </div>

            </div>

            <div className="bom_switch_container">

                <div className="bom_switch">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="52.123" height="53" viewBox="0 0 52.123 53">
                    <g id="Settings" opacity="0.35">
                        <path id="Path_26" data-name="Path 26" d="M7.256,41.412l5.324,9.169a2.669,2.669,0,0,0,3.636.967l3.716-2.136a21.515,21.515,0,0,0,5.044,2.947v4.235a2.656,2.656,0,0,0,2.662,2.65H38.286a2.656,2.656,0,0,0,2.662-2.65V52.359a21.568,21.568,0,0,0,5.044-2.947l3.716,2.136a2.678,2.678,0,0,0,3.636-.967l5.324-9.169a2.654,2.654,0,0,0-.972-3.62l-3.652-2.1A20.27,20.27,0,0,0,54.04,29.8l3.652-2.1a2.649,2.649,0,0,0,.972-3.62L53.34,14.907a2.668,2.668,0,0,0-3.636-.967l-3.716,2.136a21.408,21.408,0,0,0-5.042-2.947V8.894a2.656,2.656,0,0,0-2.662-2.65H27.636a2.656,2.656,0,0,0-2.662,2.65v4.235a21.568,21.568,0,0,0-5.044,2.947l-3.713-2.136a2.666,2.666,0,0,0-3.636.967L7.256,24.076a2.654,2.654,0,0,0,.972,3.62l3.652,2.1a20.269,20.269,0,0,0,0,5.894l-3.652,2.1A2.649,2.649,0,0,0,7.256,41.412Zm25.7-19.268a10.6,10.6,0,1,1-10.648,10.6A10.635,10.635,0,0,1,32.96,22.144Z" transform="translate(-6.9 -6.244)" fill="#c2cad2"/>
                    </g>
                </svg>
                <div className="switch_toggler">
                    <p>Set a Parent BOM for items that will add to this group item.</p>
                    <div style={{display: "flex", gap: "10px"}}>
                    <Switch
                      unCheckedChildren="__"
                      onChange={handleBomChange}
                      onClick={setIsBOMModalOpen}
                    />
                    <p>Parent BOM</p>
                    </div>
                   
                  </div>

                </div>

                <div className="variant_switch">

                <svg id="bxs-collection" xmlns="http://www.w3.org/2000/svg" width="47.7" height="53" viewBox="0 0 47.7 53">
                    <path id="Path_34430" data-name="Path 34430" d="M44.65,22.7H7.55A5.305,5.305,0,0,0,2.25,28V49.2a5.305,5.305,0,0,0,5.3,5.3h37.1a5.305,5.305,0,0,0,5.3-5.3V28A5.305,5.305,0,0,0,44.65,22.7ZM7.55,12.1h37.1v5.3H7.55Zm5.3-10.6h26.5V6.8H12.85Z" transform="translate(-2.25 -1.5)" fill="#c2cad2" opacity="0.35"/>
                </svg>

                <div className="switch_toggler">
                    <p>Add variants for this group item.</p>
                    <div style={{display: "flex", gap: "10px"}}>
                    <Switch
                      unCheckedChildren="__"
                      onChange={handleVarientChange}
                      onClick={setIsBOMVariantOpen}
                    />
                    <p>Enable Variant</p>
                    </div>
                   
                  </div>

                </div>

            </div>

            <div className="bottom_input_container">

            <div className="input_group">
                  <p>Tax Preference</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Cost Account</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Manufacturing Account</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Tax Rates</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Sales Account</p>
                  <SearchDropdown width={330} />
                </div>

                <div className="input_group">
                  <p>Inventory Account</p>
                  <SearchDropdown width={330} />
                </div>

            </div>
            
            
        </div>
        <div className="button">
            <button className="submit_button btn_hover_animation">Submit</button>
            <button className="cancel_button btn_hover_animation">Cancel</button>
        </div>
        </div>

      {/* Bill of material modal  */}

      <Modal
        title="Bill of Material"
        open={isBOMModalOpen}
        onOk={handleOk}
        width={"max-content"}
        onCancel={handleConfirmCancel}
        style={{ top: 20 }}
        // footer=""
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleScannerSubmit}
            className="btn_hover_animation"
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
            className="btn_hover_animation"
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
                          placement={"bottomLeft"}
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
                                  // key="submit"
                                  type="primary"
                                  className="btn_hover_animation"
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
                                  className="btn_hover_animation"
                                  onClick={()=>resetRef.current.getAlert()}
                                  style={{
                                    width: "80px",
                                    height: "38px",
                                    fontSize: "12px",
                                    color: "#8E9CAA",
                                    borderColor: "#8E9CAA",
                                    zIndex: "1000",
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
                      <SelectAllDropdown option={selectOption} />
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
                    <li className="value disableInput">
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
        onCancel={handleConfirmCancelv}
        style={{ top: 20 }}
        // footer=""
        footer={[
          <Button
            key="submit"
            type="primary"
            className="btn_hover_animation"
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
            onClick={handleConfirmCancelv}
            className="btn_hover_animation"
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
                  id="otherInput"
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
              <div
                  className="delete_btn"
                  onClick={resetOther}
                >
                  <img src="/images/icons/delete.svg" alt="" />
                </div>
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
              className="btn_hover_animation"
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
              className="btn_hover_animation"
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

      <Modal
        open={confirmv}
        onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirmv}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirmv}
              className="btn_hover_animation"
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
              className="btn_hover_animation"
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
    
  )
}

export default NewInventoryGroup
