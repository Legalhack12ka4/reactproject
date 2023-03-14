import { render } from "@testing-library/react";
import { Popover, Select, Table } from "antd";
import React, { useState, useEffect } from "react";
import editdelete from "../../assets/Images/Confirmation/editdelete.svg";
import Page_heading from "../Page_Heading/Page_heading";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import deletelogo from "../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../assets/Images/ActionStatus/status.svg";

import "./UnitOfMeasurement.scss";
import { useRef } from "react";
import config from "../Database/config";
import axios from "axios";
import { Navigate } from "react-router-dom";

const UnitOfMasurement = () => {
  const [uom, setUom] = useState([]);
  const [activeTab, setActiveTab] = useState("unit_of_masurement");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [unitOfMasurementRows, setUnitOfMasurementRows] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
  ]);

  const [conversionOptionsRows, setConversionOptionsRows] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
  ]);

  const conversionRef = useRef(null);
  const uomRef = useRef(null);

  const popvisible = () => {
    setOpen(false);
    //document.getElementById("popoverhide").style.display="block";
    // console.log(open)
    // console.log("line55")
  };

  const showPopover = (index) => {
    setVisible(index);
    console.log(index);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (conversionRef.current) {
      conversionRef.current.scrollTop = conversionRef.current.scrollHeight;
    }
  }, [conversionOptionsRows]);
  useEffect(() => {
    if (uomRef.current) {
      uomRef.current.scrollTop = uomRef.current.scrollHeight;
    }
  }, [unitOfMasurementRows]);

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

  useEffect (()=>
  {
    getUom();
  }, [])

  const getUom = async () => {
 
    await axios.get(`${config.baseUrl}/uom/`

    ).then((res) => {
      
      setUom(
        res.data.map((row) => ({
          Key: row.id,
          Unit_Name: row.unit_name,
          Qty: row.qty,
          Uqc: row.uqc,
          // id: row.id
        }))
      );
      // console.log(res);
     // setloading(false);
    });
  };


  const UnitOfMasurementData =  uom.map((customer) => ({
    key: customer.Key,
    id: customer.Key,
    unit_name:customer.Unit_Name,
    qty: customer.Qty,
    uqc:customer.Uqc,
  }))

  // [
  //   { unitName: "1 Psc", qty: 1, uqc: "PCS (pieces)" },
  //   { unitName: "1 Meter", qty: 1, uqc: "MTR (meter)" },
  //   { unitName: "1 Liter", qty: 1, uqc: "LTR (liter)" },
  //   { unitName: "1 Kg", qty: 1, uqc: "KGS (kilograms)" },
  //   { unitName: "1 Gm", qty: 1, uqc: "GMS (grams)" },
  //   { unitName: "1 Box", qty: 1, uqc: "BOX (box)" },
  //   { unitName: "1 Bottle", qty: 1, uqc: "BTL (bottles)" },
  //   { unitName: "1 Drum", qty: 1, uqc: "DRM (drums)" },
  // ];

  const handleDeleteRow = (id) => {
    setUnitOfMasurementRows((prevRows) => prevRows.filter((row) => row.id !== id));
  }

  const handleDeleteConversionRow = (id) => {
    setConversionOptionsRows((prevRows) => prevRows.filter((row) => row.id !== id));
  }
  const token = localStorage.getItem("jwt")
  let loggedIn= true
  if(token == null)
  {
    localStorage.removeItem("jwt");
    loggedIn = false
  }
 // Details={loggedIn}

if(loggedIn == false)
{
  localStorage.removeItem("jwt");
  return <Navigate to="/"/>
}

  return (
    <div className="unit_of_masurement">
      <Page_heading parent={"Other Page"} child={"Unit of Measurement"} />

      <div className="navigation_container">
        <div
          className={`${activeTab === "unit_of_masurement" && "active"}`}
          onClick={() => setActiveTab("unit_of_masurement")}
        >
          Unit of Measurement
        </div>
        <div
          className={`${activeTab === "packing_setting" && "active"}`}
          onClick={() => setActiveTab("packing_setting")}
        >
          Packing options
        </div>
        <div
          className={`${activeTab === "conversion_setting" && "active"}`}
          onClick={() => setActiveTab("conversion_setting")}
        >
          Conversion options
        </div>
      </div>

      {/* unit of Measurement table  */}

      {activeTab === "unit_of_masurement" && (
        <div className="table_container">
          <div className="table_input_form">
            <div className="UOM_input_field">
              <p>Unit Name</p>
              <input
                type="text"
                className="UOM_input focus-outline"
                style={{ width: "204px" }}
              />
            </div>
            <div className="UOM_input_field">
              <p>Qty</p>
              <input
                type="text"
                className="UOM_input"
                disabled
                value={1}
                style={{
                  width: "88px",
                  textAlign: "right",
                  paddingRight: "10px",
                  backgroundColor: "#ECEEF1",
                }}
              />
            </div>
            <div className="UOM_input_field">
              <p>UQC</p>
              <div>
                <SearchDropdown width={220} />
              </div>
            </div>

            <div className="add_btn">Add</div>
          </div>

          <div className="table_header">
            <div className="unit_name">Unit Name</div>
            <div className="qty">Qty</div>
            <div className="uqc">UQC</div>
          </div>

          <div className="table_data">
            {UnitOfMasurementData.map((item, index) => {
              return (
                <div
                  className={`${
                    UnitOfMasurementData.length - 1 === index && "last_row"
                  } table_row`}
                >
                  <div className="unit_name">{item.unitName}</div>
                  <div className="qty">{item.qty}</div>
                  <div className="uqc">{item.uqc}</div>
                  <Popover
                    id="popoverhide"
                    defaultOpen={open}
                    placement="bottomRight"
                    onOpenChange={setOpen}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    showArrow={false}
                    content={
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "11px",
                            marginBottom: "10px",
                          }}
                        >
                          <img src={deletelogo} />
                          <div>
                            <button
                              className="actionlabel"
                              //  onClick={() => { handleConfirmCancel(record); hide(); }}
                              //onClick={hide}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "11px",
                            marginBottom: "10px",
                          }}
                        >
                          <img src={editlogo} />
                          <div>
                            <button
                              className="actionlabel"
                              // onClick={() => handleUpdate(record)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "11px",
                          }}
                        >
                          <img src={statuslogo} />
                          <div>
                            <button
                              className="actionlabel"
                              style={{ minWidth: "max-content" }}
                              // onClick={() => handleUpdate(record)}
                            >
                              Set as Activate
                            </button>
                          </div>
                        </div>
                      </>
                    }
                    title=""
                    height={100}
                    trigger="click"
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        width: "20px",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={editdelete}
                        onClick={(e) => {
                          setOpen(open);
                          popvisible(e);
                        }}
                      />
                    </div>
                  </Popover>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* packing option  */}
      {activeTab === "packing_setting" && (
        <div className="packing_option">
          <div className="packing_option_heading">
            <div className="package_name">Package Name</div>
            <div className="unit_of_measurement">Standard Uom</div>
            <div className="qty">Base Qty</div>
            <div className="pack_qty">Pack Qty</div>
          </div>
          <div className="packing_setting_rows_container" ref={uomRef}>
            {unitOfMasurementRows.map((item, index) => {
              return (
                <div className="packing_option_row">
                  <div className="package_name">
                    <input type="text" className="package_name_input focus-outline" />
                  </div>
                  <div className="unit_of_measurement">
                    <SearchDropdown width={155} />
                  </div>
                  <div className="qty">
                    <input
                      type="text"
                      placeholder="1"
                      disabled
                      className="qty_input"
                    />
                  </div>{" "}
                  X
                  <div className="pack_qty">
                    <input
                      type="text"
                      placeholder="1"
                      className="pack_qty_input focus-outline"
                    />
                  </div>
                  <div className="edit_delete" onClick={() => handleDeleteRow(item.id)}>
                    <img src="images/icons/delete.svg" alt="" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add_btn" onClick={handleAddRow}>
            + Add
          </div>
        </div>
      )}

      {/* Conversion options */}

      {activeTab === "conversion_setting" && (
        <div className="conversion_options">
          <div className="conversion_options_heading">
            <div className="conversion_name">Conversion Name</div>
            <div className="convert_from">Convert from</div>
            <div className="convert_to">Convert to</div>
          </div>
          <div className="conversion_options_row_container" ref={conversionRef}>
            {conversionOptionsRows.map((item, index) => {
              return (
                <div className="conversion_options_row">
                  <div className="conversion_name">
                    <input
                      type="text"
                      disabled
                      className="conversion_name_input"
                    />
                  </div>
                  <div className="convert_from">
                    <input
                      type="text"
                      className="convert_from_input"
                      value={1}
                      disabled
                    />
                    <SearchDropdown width={155} />
                  </div>
                  =
                  <div className="convert_to">
                    <input
                      type="text"
                      placeholder="Qty"
                      className="convert_to_input focus-outline"
                    />
                    <SearchDropdown width={155} />
                  </div>
                  <div className="edit_delete" onClick={() => handleDeleteConversionRow(item.id)} >
                    <img src="images/icons/delete.svg" alt="" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add_btn" onClick={handleAddConversionRow}>
            + Add
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitOfMasurement;
