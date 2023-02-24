import { render } from "@testing-library/react";
import { Popover, Select, Table } from "antd";
import React, { useState } from "react";
import editdelete from "../../assets/Images/Confirmation/editdelete.svg";
import Page_heading from "../Page_Heading/Page_heading";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";

import "./UnitOfMeasurement.scss";

const UnitOfMasurement = () => {
  const [activeTab, setActiveTab] = useState("unit_of_masurement");
  const [visible, setVisible] = useState(false);
  const [unitOfMasurementRows, setUnitOfMasurementRows ] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
    { id: 3, name: "row3", value: "" },
    { id: 4, name: "row4", value: "" },
  ]);

  const [conversionOptionsRows, setConversionOptionsRows ] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
  ]);

  const showPopover = (index) => {
    setVisible(index);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const handleAddRow = () => {
    setUnitOfMasurementRows(prevRows => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" }
    ]);
  }
  const handleAddConversionRow = () => {
    setConversionOptionsRows(prevRows => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" }
    ]);
  }

  const UnitOfMasurementData = [
    { unitName: "1 Psc", qty: 1, uqc: "PCS (pieces)" },
    { unitName: "1 Meter", qty: 1, uqc: "MTR (meter)" },
    { unitName: "1 Liter", qty: 1, uqc: "LTR (liter)" },
    { unitName: "1 Kg", qty: 1, uqc: "KGS (kilograms)" },
    { unitName: "1 Gm", qty: 1, uqc: "GMS (grams)" },
    { unitName: "1 Box", qty: 1, uqc: "BOX (box)" },
    { unitName: "1 Bottle", qty: 1, uqc: "BTL (bottles)" },
    { unitName: "1 Drum", qty: 1, uqc: "DRM (drums)" },
  ];
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
                className="UOM_input"
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
                    content={( <div className="popover_content">
                    <div>Edit</div>
                    <div >Delete</div>
                  </div>)}
                    open={index === visible}
                    trigger="click"
                    onOpenChange={(visible) => setVisible(visible)}
                  >
                    <div className="edit_delete"><img src={editdelete} alt="" onClick={()=>showPopover(index)} /></div>
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
            <div className="unit_of_measurement" >Unit of Measurement</div>
            <div className="qty">Qty</div>
            <div className="package_name">Package Name</div>
          </div>
          <div className="packing_setting_rows_container">
          {unitOfMasurementRows.map((item, index) => {
            return (
              <div className="packing_option_row">
                <div className="unit_of_measurement">
                  <SearchDropdown width={155} />
                </div>
                <div className="qty">
                  <input type="text" placeholder="1" className="qty_input" />
                </div>
                <div className="package_name">
                  <input type="text" disabled  className="package_name_input" />
                </div>
                <div className="edit_delete">
                  <img src="images/icons/delete.svg" alt="" />
                </div>
              </div>
            )
            })
          }
          </div>
            <div className="add_btn" onClick={handleAddRow}>+ Add</div>

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
          <div className="conversion_options_row_container">
            {conversionOptionsRows.map((item, index) => {
              return (
                <div className="conversion_options_row">
                  <div className="conversion_name">
                    <input type="text" disabled className="conversion_name_input" />
                  </div>
                  <div className="convert_from">
                    <input type="text" className="convert_from_input" value={1} disabled />
                    <SearchDropdown width={155} />
                  </div>
                  =
                  <div className="convert_to">
                    <input type="text" placeholder="Qty"  className="convert_to_input" />
                    <SearchDropdown width={155} />
                  </div>
                  <div className="edit_delete">
                    <img src="images/icons/delete.svg" alt="" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add_btn" onClick={handleAddConversionRow}>+ Add</div>
        </div>
      )}
    </div>
  );
};

export default UnitOfMasurement;
