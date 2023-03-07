import React, { useState, useRef, useEffect } from "react";
import "./ManufacturedGroup.scss";

import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import { Button, Modal, Switch, Popover } from "antd";
import Page_heading from "../../Page_Heading/Page_heading";
import SelectAllDropdown from "../../AllDropdowns/SelectAllDropdown/SelectAllDropdown";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import TagsInput from "../../TagsInput/TagsInput";
import config from "../../Database/config";
import CustomInput from "../../CustomInput/CustomInput";

const resetValue = {
  Initiallitemrow: [
    {
      resources: "",
      production_batch: "",
      production_hours: "",
      type_of_bom: "",
      bom_category: "",
    },
  ],
  Initiallitemrow1: [],
  group_name: "",
  item_group:"",
  qty:"",
  type: "",
  uom: "",
  managed_by: "",
  tax_preferences: "",
  cost_account: "",
  manufacturing_account: "",
  tax_rates: "",
  selling_account: "",
  inventory_account: "",
};

const ManufacturedGroup = () => {
  const [formData, setFormData] = useState(resetValue);
  const [taxrate, setTaxRate] = useState([]);
  const [reportingl4, setReportingl4] = useState([]); //to get l4 from chartofaccount api
  const [unitofm, setUnitOfM] = useState([]); //to get uom data
  const [itemtype, setItemType] = useState([]); //to get itemtype from master)
  const [resourcesmc, setResourcemc] = useState([]); //for resources
  const [itemmaterial, setItemMaterial] = useState([]); //item data
  const scannerRef = useRef(null);
  const containerRef = useRef(null);
  const resetRef = useRef();
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
  const [resourcePlaningRows, setResourcePlaningRows] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
    { id: 3, name: "row3", value: "" },
    { id: 4, name: "row4", value: "" },
  ]);
  const resourceRef = useRef(null);
  useEffect(() => {
    if (resourceRef.current) {
      resourceRef.current.scrollTop = resourceRef.current.scrollHeight;
    }
  }, [resourcePlaningRows]);

  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [qty, setQty] = useState(Array(bomRows.length).fill(0));
  const [value, setValue] = useState(Array(bomRows.length).fill(0));
  const [totalSum, setTotalSum] = useState(0);
  const [cost, setCost] = useState(Array(bomRows.length).fill(0));
  const inputRef = useRef(Array(bomRows.length).fill(null));
  const [isCostBlurredIndex, setIsCostBlurredIndex] = useState(
    Array(bomRows.length).fill(false)
  );
  const [resourcePlaningEnable, setResourcePlaningEnable] = useState(false);
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

  //modalclose
  // const onCancel = () => {
  //   if (Object.values(formData).every((val) => val === "")) {
  //     setIsBOMModalOpen(false);
  //   } else {
  //     handleConfirmCancel();
  //   }
  // };
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

  ////Dropdown Chartofaccount accuntnam
  console.log("abc");

  const handleClose = () => {
    window.history.back(-1);
    // setFormData(resetValue);
  };

  useEffect(() => {
    getaccountname();
    getunitmeasure();
    getTypesoftype();
    gettax();
    getresourcesdata();
    getitembom();
  }, []);

  const getaccountname = () => {
    return fetch(`${config.baseUrl}/chartofaccount/`)
      .then((response) => response.json())
      .then((data) => {
        setReportingl4(data);
        // console.log(data);
      });
  };
  const reportingl4name = reportingl4.map((rep) => ({
    key: rep.id,
    label: rep.account_name,
    value: rep.account_name,
  }));

  const gettax = () => {
    return fetch(`${config.baseUrl}/taxes/`)
      .then((response) => response.json())
      .then((data) => {
        setTaxRate(data);
        // console.log(data);
      });
  };
  const taxratedata = taxrate.map((rep) => ({
    key: rep.id,
    label: rep.tax_group,
    value: rep.tax_group,
  }));

  //rates
  const getunitmeasure = () => {
    return fetch(`${config.baseUrl}/uom/`)
      .then((response) => response.json())
      .then((data) => {
        setUnitOfM(data);
        // console.log(data);
      });
  };
  const unitofdata = unitofm.map((rep) => ({
    key: rep.id,
    label: rep.symbol,
    value: rep.symbol,
  }));

  //asssigned resources

  const getresourcesdata = () => {
    return fetch(`${config.baseUrl}/resource/`)
      .then((response) => response.json())
      .then((data) => {
        setResourcemc(data);
        console.log(data);
      });
  };
  const resourcesd = resourcesmc.map((rep) => ({
    key: rep.id,
    label: rep.name,
    value: rep.name,
  }));

  //item resources

  const getitembom = () => {
    return fetch(`${config.baseUrl}/item/`)
      .then((response) => response.json())
      .then((data) => {
        setItemMaterial(data);
        console.log(data);
      });
  };
  const itembomdata = itemmaterial.map((rep) => ({
    key: rep.id,
    label: rep.name,
    value: rep.name,
  }));

  //Dropdown get type
  const getTypesoftype = () => {
    return fetch(`${config.baseUrl}/master/`)
      .then((response) => response.json())
      .then((data) => {
        setItemType(data);
        console.log(data);
      });
  };

  const gettypeitem = itemtype
    .filter((place) => place.field === "Type" && place.module === "ItemGroup")
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));

  const getmanageby = itemtype
    .filter(
      (place) => place.field === "ManagedBy" && place.module === "ItemGroup"
    )
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));
  const getpreference = itemtype
    .filter(
      (place) => place.field === "TaxPreference" && place.module === "ItemGroup"
    )
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));

  const getbomtype = itemtype
    .filter((place) => place.field === "Type" && place.module === "BOM")
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));

  //onchange
  const handleDrpChange = (field, value) => {
    const selectedType = gettypeitem.find((option) => option.value === value);
    const selectedMange = getmanageby.find((option) => option.value === value);
    const selectedUom = unitofdata.find((option) => option.value === value);
    const selectedpreference = getpreference.find(
      (option) => option.value === value
    );
    const selectedaccount = reportingl4name.find(
      (option) => option.value === value
    );
    const selectedrate = taxratedata.find((option) => option.value === value);
    setFormData((prevState) => {
      let newState = { ...prevState };

      newState[field] = value;

      if (selectedType) {
        newState.type = selectedType.key;
      }

      if (selectedUom) {
        newState.uom = selectedUom.key;
      }

      if (selectedMange) {
        newState.managed_by = selectedMange.key;
      }
      if (selectedpreference) {
        newState.tax_preferences = selectedpreference.key;
      }
      if (selectedaccount) {
        newState.cost_account = selectedaccount.key;
      }
      if (selectedaccount) {
        newState.manufacturing_account = selectedaccount.key;
      }
      if (selectedrate) {
        newState.tax_rates = selectedrate.key;
      }
      if (selectedaccount) {
        newState.selling_account = selectedaccount.key;
      }
      if (selectedaccount) {
        newState.inventory_account = selectedaccount.key;
      }

      return newState;
    });
  };

  //bom

  const handleDrpBOMChange = (field, value) => {
    console.log("Selected value:", value);

    const selectedOption =
      field === "resources"
        ? resourcesd.find((option) => option.value === value)
        : getbomtype.find((option) => option.value === value);

    console.log("Selected option:", selectedOption);

    setFormData((prevState) => {
      let newState = { ...prevState };

      newState.Initiallitemrow = [
        {
          ...newState.Initiallitemrow[0],
          [field]: selectedOption ? selectedOption.key : "",
        },
      ];

      console.log("New state:", newState);

      return newState;
    });
  };
  console.log(formData);
  const onChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(value);
    console.log(name);
  };

  console.log(formData);

  //bomchange
  const onBOMChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      Initiallitemrow: [{ ...formData.Initiallitemrow[0], [name]: value }],
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsBOMVariantOpen(false);
    setIsBOMModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setCofirm(true);
    setPopOverVisible(false);
  };

  const handleScannerSubmit = (data) => {
    setIsScannerModalOpen(false);
    setIsModalOpen(false);
    scannerRef.getVideoTracks()[0].stop();
    document.getElementById("barcode_input").value = data;
    setData(data);
  };

  const popVisible = () => {
    setPopOverVisible(false);
  };

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

  const handleResourceChange = (checked) => {
    setResourcePlaningEnable(checked);
  };

  const handleAddRow = () => {
    setResourcePlaningRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: `row${prevRows.length + 1}`, value: "" },
      { id: prevRows.length + 2, name: `row${prevRows.length + 2}`, value: "" },
    ]);
    resourceRef.current.scrollTop = resourceRef.current.scrollHeight;
  };

  const handleDeleteRow = (id) => {
    setResourcePlaningRows((prevRows) =>
      prevRows.filter((row) => row.id !== id)
    );
  };

  return (
    <div className="new_inventory_group_main5">
      <Page_heading
        parent={"Item & Service"}
        child={"Manufactured Items"}
        main={"Manufactured Items Group"}
      />

      <div className="new_inventory_group_container5">
        <div
          className="group_form_container1"
          style={{
            overflow: "scroll",
            display: "flex",
            padding: "20px 0px 0px 20px",
          }}
        >
          <div className="top_input_container">
            <div className="input_group">
              <p>Group Name</p>
              <div className="input_container focus-outline">
                <img src="/images/icons/HSNSearch.svg" alt="" />
                <CustomInput
                    type="text"
                  inputType={"AlphaNumericUpperCase"}
                    name="group_name"
                    placeholder="Placeholder"
                   value={formData.group_name}
                onChange={(e, newValue) => 
                  setFormData(prevState => ({
                    ...prevState,
                    "group_name": newValue
                  }))}
                  //onBlur={handleBlur}
              />
                {/* <input
                  type="text"
                  placeholder="placeholder"
                  name="group_name"
                  value={formData.group_name}
                  onChange={onChange}
                /> */}
              </div>
            </div>

            {/* <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            > */}
            <div className="input_group">
              <p>Unit of Measurement</p>
              <SearchDropdown
                width={155}
                options={unitofdata}
                name="uom"
                labelKey="label"
                value={
                  unitofdata.find(
                    (option) => option.key === formData.uom && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>

            <div className="input_group">
              <p>Manage by</p>
              <SearchDropdown
                width={155}
                options={getmanageby}
                name="managed_by"
                labelKey="label"
                value={
                  getmanageby.find(
                    (option) =>
                      option.key === formData.managed_by && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            {/* </div> */}

            {/* <div style={{ display: "flex", gap: "20px" }}> */}
            <div className="input_group">
              <p>Tax Preference</p>
              <SearchDropdown
                width={155}
                options={getpreference}
                name="tax_preferences"
                labelKey="label"
                value={
                  getpreference.find(
                    (option) =>
                      option.key === formData.tax_preferences && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            <div className="input_group">
              <p>Tax Rates</p>
              <SearchDropdown
                width={155}
                options={taxratedata}
                name="tax_rates"
                labelKey="label"
                // value={formData.tax_rates}
                value={
                  taxratedata.find(
                    (option) =>
                      option.key === formData.tax_rates && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            {/* </div> */}

            {/* <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            > */}
            <div className="input_group">
              <p>Item Group Type</p>
              <div
                className="input_container1"
                style={{ backgroundColor: "#ECEEF1" }}
              >
                <input
                  type="text"
                  placeholder="placeholder"
                  style={{ backgroundColor: "#ECEEF1", color: "#4359714D" }}
                  disabled
                  name="group_name"
                  value="Inventory Item"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="input_group">
              <p>Inventory Account</p>
              <SearchDropdown
                width={155}
                options={reportingl4name}
                name="inventory_account"
                labelKey="label"
                value={
                  reportingl4name.find(
                    (option) =>
                      option.key === formData.inventory_account && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            {/* </div> */}

            {/* <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}> */}
            <div className="input_group">
              <p>Sales Account</p>
              <SearchDropdown
                width={155}
                options={reportingl4name}
                name="selling_account"
                labelKey="label"
                value={
                  reportingl4name.find(
                    (option) =>
                      option.key === formData.selling_account && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            <div className="input_group">
              <p>Cost Account</p>
              <SearchDropdown
                width={155}
                options={reportingl4name}
                name="cost_account"
                labelKey="label"
                value={
                  reportingl4name.find(
                    (option) =>
                      option.key === formData.cost_account && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            {/* </div> */}

            {/* <div style={{ display: "flex", gap: "20px" }}> */}
            <div className="input_group">
              <p>Variance Account</p>
              <SearchDropdown
                width={155}
                options={reportingl4name}
                name="selling_account"
                labelKey="label"
                value={
                  reportingl4name.find(
                    (option) =>
                      option.key === formData.selling_account && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            <div className="input_group">
              <p>WIP Account</p>
              <SearchDropdown
                width={155}
                options={reportingl4name}
                name="cost_account"
                labelKey="label"
                value={
                  reportingl4name.find(
                    (option) =>
                      option.key === formData.cost_account && option.label
                  )?.label
                }
                onChange={handleDrpChange}
              />
            </div>
            {/* </div> */}
          </div>
          <hr className="manufactured_hr" />
          <div className="parent-bom">
            <h2>Parent BOM</h2>
            <p className="parent-bom-title">
              A Parent Bill of Materials (BOM) is a structured list of
              components, parts, and sub-assemblies that are required to
              manufacture or assemble a finished product. The Parent BOM is
              typically broken down into lower-level BOMs which detail the
              components and sub-assemblies required for specific parts of the
              finished product. These lower-level BOMs may also be known as
              Child BOMs
            </p>

            <div className="enable_resource_planing_container ">
              <div className="enable_resource_switch">
                <Switch
                  unCheckedChildren="__"
                  onChange={handleResourceChange}
                  // onClick={setIsResourceModalOpen}
                />
                <p>Enable Resource Planning</p>
              </div>

              {
                <div className="resource_planing_rows_container main_resource_container">
                  <div className="headers">
                    <p className="assined-resource-group">
                      Assigned Resource Group
                    </p>
                    <p className="type">Group Type</p>
                    <p className="components">Item Group</p>
                    <p className="qty">Qty</p>
                  </div>

                  <div
                    className="resource_planing_rows_container"
                    ref={resourceRef}
                  >
                    {resourcePlaningRows.map((item, index) => {
                      return (
                        <div className="resource_planing_row" key={index}>
                          <div className="Assigned_Resource_Group_input_drp">
                            {/* <input type="text" disabled={!resourcePlaningEnable && true} className={resourcePlaningEnable && "Assigned_Resource_Group_input_enable"} /> */}
                            {resourcePlaningEnable ? (
                              <SearchDropdown
                                width={180}
                                isDisabled={!resourcePlaningEnable}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "179px",
                                  height: "37px",
                                  border: ".5px solid #ECEEF1",
                                  borderRadius: "5px",
                                  backgroundColor: "#ECEEF1",
                                }}
                              ></div>
                            )}
                          </div>
                          <div className="resource_planing_row_type">
                            <SearchDropdown width={149} />
                          </div>
                          {/* <div className="resource_planing_row_type">
                        <SearchDropdown width={198} />
                      </div> */}
                          <div className="resource_planing_row_type_input ">
                            <input type="text" className="focus-outline" />
                          </div>
                          <div className="resource_planing_row_option">
                            <input type="text" className="focus-outline" />
                          </div>
                          <div
                            className="delete-row"
                            onClick={() => handleDeleteRow(item.id)}
                          >
                            <img src="/images/icons/delete.svg" alt="delete" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="add-row-btn" style={{padding:"5px 20px 0px 20px"}}>
                    <p onClick={handleAddRow}>+ Add</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        {/* <hr style={{border: "3px solid #F3F6F9"}}/> */}

        <div className="button">
          <button className="submit_button btn_hover_animation">
            Create Group
          </button>
          <button
            className="cancel_button btn_hover_animation"
            onClick={handleClose}
          >
            Cancel
          </button>
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
                                    //  value="05 Pcs"
                                    style={{ padding: "0px 10px" }}
                                    name="production_batch"
                                    value={
                                      formData.Initiallitemrow[0]
                                        .production_batch
                                    }
                                    onChange={onBOMChange}
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
                                  onClick={() => {
                                    setPopOverVisible(false);
                                  }}
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
                                  onClick={() => resetRef.current.getAlert()}
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
                            options={resourcesd}
                            ref={resetRef}
                            popVisible={popVisible}
                            //onChange={(e) => { handleDrpBOMChange(e);handlePopOver(index);}}
                            onChange={handleDrpBOMChange}
                            editBtnClick={() => editBtnClick(index)}
                            width={250}
                            editBtn={true}
                            name="resources"
                            value={
                              resourcesd.find(
                                (option) =>
                                  option.key ===
                                    formData.Initiallitemrow[0].resources &&
                                  option.label
                              )?.label
                            }
                            // value={formData.Initiallitemrow[0].resources}
                          />
                        </Popover>
                      </li>
                    )}
                    <li className="type">
                      <SearchDropdown
                        width={138}
                        options={getbomtype}
                        name="type_of_bom"
                        value={
                          getbomtype.find(
                            (option) =>
                              option.key ===
                                formData.Initiallitemrow[0].type_of_bom &&
                              option.label
                          )?.label
                        }
                        onChange={handleDrpBOMChange}
                      />
                    </li>
                    <li className="material">
                      <SearchDropdown width={250} options={itembomdata} />
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
              <div className="delete_btn" onClick={resetOther}>
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
  );
};

export default ManufacturedGroup;
