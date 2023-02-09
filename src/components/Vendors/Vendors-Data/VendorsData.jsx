import { React, useState, useRef, useEffect, useMemo } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./VendorsData.scss";
import { Spin, Table, Tooltip, Tag, Slider,Skeleton,Popover, Button, Modal } from "antd";
import axios from "axios";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import creditcard from "../../../assets/Images/FormIcon/Credit Limit.svg";
import config from "../../Database/config";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
//import { ChildStateModificationFunc } from "../Vendors";
import { ChildStateModificationFunc } from "../Vendors";

const filterfield = {
  gsttreat: "",
  gstin: "",
  businessname: "",
  category: "",
  pancard: "",
  currency: "",
  payment: "",
  credit: 0,
  email: "",
  pincode: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  pos: "",
  contact: "",
  ownership: "",
};

const VendorsData = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchvendor, setFetchvendor] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setloading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [currentValue, setCurrentValue] = useState(0)
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)

  //for modal delete

  
  const handleConfirmCancel = (record) => {
    setDeleteRecord(record)
      setCofirm(true);
      //setPopOverVisible(false)
    };
  
    const handleConfirm = () => {
      setCofirm(false);
      setDeleteRecord(null)
      // setPopOverVisible(false)
    };
  
    const handleSubmit = () =>
    {
    //  alert("Data", record)
      deleteUser(deleteRecord);
      getData();
      setCofirm(false);
      getData();
    }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${config.baseUrl}/customervendor/`).then((res) => {
      setloading(false);
      setFetchvendor(
        res.data.map((row) => ({
          Key: row.id,
          Gst_Treatment:
            row.gst_treatment == 1
              ? "Registerd Business"
              : row.gst_treatment == 2
              ? "Consumer"
              : "",
          Gst_No: row.gst_no,
          Business_Name: row.business_name,
          Type_Category:
            row.type_category == 7
              ? "Retailer"
              : row.type_category == 8
              ? "Wholesaler"
              : "Manufacturer",
          Pan_Card: row.pan_card,
          Currency: row.currency == 1 ? "INR" : "USD",
          Payment_Terms: row.payment_terms == 1 ? "Net 5" : "Net 10",
          Credit_Limit: row.credit_limit,
          Email: row.email,
          Pincode: row.pincode,
          Street1: row.street1,
          Street2: row.street2,
          Place_Of_Supply: row.place_of_supply == 1 ? "India" : "America",
          Contact:
            row.contact == 1
              ? "Vimlesh"
              : row.contact == 2
              ? "ABC"
              : row.contact == 3
              ? "jhhghj"
              : "Ranveer",
          Ownsership: row.ownership == 1 ? "ubuntu" : "window",
          // id: row.id
        }))
      );
      console.log(res);
    });
  };
  console.log(fetchvendor);

  const dataSource = fetchvendor.map((customer) => ({
    key: customer.Key,
    id: customer.Key,
    gst_treatment: customer.Gst_Treatment,
    gst_no: customer.Gst_No,
    business_name: customer.Business_Name,
    type_category: customer.Type_Category,
    pan_card: customer.Pan_Card,
    currency: customer.Currency,
    payment_terms: customer.Payment_Terms,
    credit_limit: customer.Credit_Limit,
    email: customer.Email,
    pincode: customer.Pincode,
    street1: customer.Street1,
    street2: customer.Street2,
    place_of_supply: customer.Place_Of_Supply,
    contact: customer.Contact,
    ownership: customer.Ownsership,
  }));

  //delete data
const deleteUser = (record)=>
{
  console.log(record);
  console.log(record.id);
  axios
  .delete(
    `${config.baseUrl}/customervendor/${record.id}/`);
       getData();
      // console.log(currency)
}



  //Get data in textbox on edit button
  const handleUpdate = (oldData) => {
    console.log(oldData);
    console.log(oldData.id);
  //  showCanvas();
      ChildStateModificationFunc(oldData)
      console.log(oldData)
  };
//console.log(oldData);

  const columnsData = [
    {
      title: "Business Name",
      label: "Business Name",
      dataIndex: "business_name",
      key: "business_name",
      resizable: true,
      width: 260,
      fixed: "left",
      align: "left",
      //ellipsis:true,
      sorter: (record1, record2) => {
        return record1.business_name > record2.business_name;
      },
      showSorterTooltip:{ title: '' }
    },
  //  {

  //     // filters:[
  //     //   {text:'Expense 1', value:'Expense 1'},
  //     //   {text:'Expense 2', value:'Expense 2'}
  //     // ],
  //     // // filterMultiple:false,
  //     // onFilter:(value,record)=>
  //     // {
  //     //   return record.gst_treatment === value
  //     // }
  //     // onFilter: (value, record) => {
  //     //   return record.business_name.includes(value)
  //     // }
  //   },
    {
      title: "GST No",
      label: "GST No",
      dataIndex: "gst_no",
      key: "gst_no",
      resizable: true,
      width: 190,
      align: "left",
     // ellipsis:true,
      resizable:true,
      sorter: (record1, record2) => {
        return record1.gst_no > record2.gst_no;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "GST Treatment",
      label: "GST Treatment",
      dataIndex: "gst_treatment",
      key: "gst_treatment",
      resizable: true,
     // fixed: "left",
      align: "left",
     width: 160,
     ellipsis:true,
      sorter: (record1, record2) => {
        return record1.gst_treatment > record2.gst_treatment;
      },
      showSorterTooltip:{ title: '' }
      
    },
    {
      title: "Type Category",
      label: "Type Category",
      dataIndex: "type_category",
      key: "type_category",
      resizable: true,
      width: 150,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.type_category > record2.type_category;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Currency",
      label: "Currency",
      dataIndex: "currency",
      key: "currency",
      resizable: true,
      width: 120,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.currency > record2.currency;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Payment Terms",
      label: "Payment Terms",
      dataIndex: "payment_terms",
      key: "payment_terms",
      resizable: true,
      width: 150,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.payment_terms > record2.payment_terms;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "PanCard",
      label: "PanCard",
      dataIndex: "pan_card",
      key: "pan_card",
      resizable: true,
      width: 130,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.pan_card > record2.pan_card;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Credit Limit",
      label: "Credit Limit",
      dataIndex: "credit_limit",
      key: "credit_limit",
      resizable: true,
      width: 135,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.credit_limit > record2.credit_limit;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Email",
      label: "Email",
      dataIndex: "email",
      key: "email",
      resizable: true,
      width: 160,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "PinCode",
      label: "PinCode",
      dataIndex: "pincode",
      key: "pincode",
      resizable: true,
      width: 110,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.pinCode > record2.pinCode;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Street1",
      label: "Street1",
      dataIndex: "street1",
      key: "street1",
      resizable: true,
      width: 110,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.street1 > record2.street1;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Street2",
      label: "Street2",
      dataIndex: "street2",
      key: "street2",
      resizable: true,
      width: 100,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.street2 > record2.street2;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Place Of Supply",
      label: "Place Of Supply",
      dataIndex: "place_of_supply",
      key: "place_of_supply",
      resizable: true,
      width: 160,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.place_of_supply > record2.place_of_supply;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Contact",
      label: "Contact",
      dataIndex: "contact",
      key: "contact",
      resizable: true,
      width: 110,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.contact > record2.contact;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "Ownership",
      label: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      resizable: true,
      width: 120,
      align: "left",
      ellipsis:true,
      sorter: (record1, record2) => {
        return record1.ownership > record2.ownership;
      },
      showSorterTooltip:{ title: '' }
    },
    {
      title: "",
      label: "Action",
      dataIndex: "action",
      key: "action",
      width: 60,
      // fixed:"right",
      render: (text, record) => (
        <>
      <Popover      getPopupContainer={(trigger) => trigger.parentElement} showArrow={false} content={
                 <>
           
                 <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>  
                 <img src={deletelogo} />
                 <div>
                 <button 
                 className="actionlabel"
                 onClick={() => handleConfirmCancel(record)}
                 >
                Delete
                 </button>
                 </div>
                 </div>
                 <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>
                  <img src={editlogo} />
                  <div>
                 <button
      
                    className="actionlabel"
                     onClick={() => handleUpdate(record)}
                 >
                Update
                 </button>
                 </div>
                 </div>
                 <div style={{display:"flex", alignItems:"center", gap:"11px"}}>
                  <img src={statuslogo} />
                  <div>
                 <button
                  className="actionlabel"
                  style={{minWidth: "max-content"}}
                    // onClick={() => handleUpdate(record)}
                 >
                  Set as Activate
                 </button>
                 </div>
                 </div>
                 </>
        } title="" height={100} trigger="click">
        <img src={editdelete} style={{cursor:"pointer"}} />
        </Popover>
        </>
     
      

          ),
      resizable: true,
      align: "left",
    },
  ];

  const [columns, setColumns] = useState(columnsData);

  const componentRef = useRef();

  function displaySerachbar() {
    document
      .getElementById("searchbar_container")
      .classList.toggle("container_display");
  }

  // Dropdowns options

  const gsttraetment = [
    {
      value: "Registerd Business",
      label: "Registerd Business",
    },
    {
      value: "Value 2",
      label: "Registered Business",
    },
    {
      value: "Value 3",
      label: "Registered Business",
    },
  ];
  const typeCategory = [
    {
      value: "Wholesaler",
      label: "Wholesaler",
    },
    {
      value: "Retailer",
      label: "Retailer",
    },
    {
      value: "Manufacturer",
      label: "Manufacturer",
    },
  ];
  const contact = [
    {
      value: "Vimlesh",
      label: "Vimlesh",
    },
    {
      value: "ABC",
      label: "ABC",
    },
    {
      value: "jhhghj",
      label: "jhhghj",
    },
    {
      value: "Ranveer",
      label: "Ranveer",
    },
  ];
  const currency = [
    {
      value: "INR",
      label: "INR",
    },
    {
      value: "USD",
      label: "USD",
    },
  ];
  const payment = [
    {
      value: "Net 5",
      label: "Net 5",
    },
    {
      value: "Net 10",
      label: "Net 10",
    },
  ];
  const pos = [
    {
      value: "India",
      label: "India",
    },
    {
      value: "America",
      label: "America",
    },
  ];
  const city = [
    {
      value: "Surat",
      label: "Surat",
    },
    {
      value: "Bharuch",
      label: "Bharuch",
    },
  ];
  const state = [
    {
      value: "Gujart",
      label: "Gujart",
    },
    {
      value: "America",
      label: "America",
    },
  ];
  const ownership = [
    {
      value: "ubuntu",
      label: "ubuntu",
    },
    {
      value: "window",
      label: "window",
    },
  ];

  // search table functionality

  const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.business_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setFilteraaray(
      Object.entries(custfilter)
        .map(([key, value]) => {
          if (value) {
            return { key, value };
          }
        })
        .filter((item) => item)
    );
    //console.log(filterarray);
  }, [custfilter]);
  console.log(filterarray);

  console.log(custfilter);

  const handleChange = (field, value) => {
    setCustFilter({ ...custfilter, [field]: value });
    console.log("value", value);
    console.log("field", value);
    setVisible(true);
  };

  //clear filter

  const clearfilter = () => {
    console.log("button click");
    setCustFilter(filterfield);
  };
  useEffect(() => {
    setCustFilter({...custfilter, ["credit"] :currentValue})
  
   }, [currentValue]);
 
 
   const onChangeCredit = (e) => {
     const { value, name } = e.target;
     setCustFilter({ ...custfilter, [name]: value });
   };

  const cusomizeData = dataSource.filter(
    (record) =>
      record.gst_treatment.includes(custfilter.gsttreat) &&
      record.type_category.includes(custfilter.category) &&
      record.contact.includes(custfilter.contact) &&
      record.currency.includes(custfilter.currency) &&
      record.payment_terms.includes(custfilter.payment) &&
      record.place_of_supply.includes(custfilter.pos) &&
      record.street1.includes(custfilter.street1) &&
      record.street2.includes(custfilter.street2) &&
      record.ownership.includes(custfilter.ownership) &&
      record.credit_limit.toString().includes(custfilter.credit.toString())
      && record.business_name.toLowerCase().includes(search.toLowerCase())
      // || record.email.toLowerCase().includes(search.toLowerCase())
      // || record.pincode.toString().includes(search.toString())
      // || record.contact.toLowerCase().includes(search.toLowerCase())
      // || record.gst_treatment.toLowerCase().includes(search.toLowerCase())
      // || record.type_category.toLowerCase().includes(search.toLowerCase())
      // || record.currency.toLowerCase().includes(search.toLowerCase())
      // || record.payment_terms.toLowerCase().includes(search.toLowerCase())
      // || record.place_of_supply.toLowerCase().includes(search.toLowerCase())
      // || record.street1.toLowerCase().includes(search.toLowerCase())
      // || record.street2.toLowerCase().includes(search.toLowerCase())
      // || record.ownership.toLowerCase().includes(search.toLowerCase())
      // || record.credit_limit.toString().includes(search.toString())
      // || record.pan_card.toLowerCase().includes(search.toLowerCase())
      // || record.gst_no.toLowerCase().includes(search.toLowerCase())
  );

  console.log(cusomizeData);

  //tags

  const log = (index, key) => {
    console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
  console.log(filterarray.length);



    // skeleton 

    const tableData = useMemo(
      () => (loading ? Array(10).fill({}) : cusomizeData),
      [loading, cusomizeData]
    ); 
    const tableColumns = useMemo(
      () =>
        (loading
          ? columns.map((column) => ({
            ...column,sorter: false,
            render: function renderPlaceholder() {
                    return (
                  
                      <Skeleton
                        key={column.key}
                        title
                        active={true}
                        paragraph={false}
                      />
                    );
                  },
              // cell: <Skeleton />,
            }))
          : columns),
      [loading, columns]
    );

    // selectedColumns 

  const [selectedColumns, setSelectedColumns] = useState(tableColumns.map(col => col.dataIndex));
  const handleSelectColumn = (e) => {
    const { checked, value } = e.target;
    if(checked) setSelectedColumns([...selectedColumns, value]);
    else setSelectedColumns(selectedColumns.filter(col => col !== value));
  }

  return (
    <div className="Vendors-data">
      <Page_heading parent={"Business Account"} child={"Vendors"} />

      <div className="Vendors-table-container">
        <FilterAndSearchBar
          filterdata={[
            <div className="customer_filter_container">
              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 1, gridColumnStart: 1 }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">GST Treatment</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="gsttreat"
                  options={gsttraetment}
                  value={custfilter.gsttreat}
                  onChange={handleChange}
                />
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 2, gridColumnStart: 1 }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Type Category</label>{" "}
                </Tooltip>
                <SearchDropdown
                  options={typeCategory}
                  width={330}
                  name="category"
                  value={custfilter.category}
                  onChange={handleChange}
                />
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 3, gridColumnStart: 1 }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label" style={{ marginTop: "5px" }}>
                        Currency
                      </label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      options={currency}
                      width={155}
                      onChange={handleChange}
                      name="currency"
                      value={custfilter.currency}
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">Payment Terms</label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      options={payment}
                      width={155}
                      onChange={handleChange}
                      name="payment"
                      value={custfilter.payment}
                    />
                  </div>
                </div>
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 4, gridColumnStart: 1 }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Default Place of Supply</label>{" "}
                </Tooltip>
                <SearchDropdown
                  options={pos}
                  width={330}
                  name="pos"
                  onChange={handleChange}
                  value={custfilter.pos}
                />
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 1, gridColumnStart: 2 }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label" style={{ marginTop: "5px" }}>
                        City
                      </label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                      options={city}
                      name="street1"
                      onChange={handleChange}
                      value={custfilter.street1}
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">State</label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      options={state}
                      width={155}
                      onChange={handleChange}
                      name="street2"
                      value={custfilter.street2}
                    />
                  </div>
                </div>
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 2, gridColumnStart: 2 }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Contact</label>{" "}
                </Tooltip>
                <SearchDropdown
                  options={contact}
                  width={330}
                  name="contact"
                  value={custfilter.contact}
                  onChange={handleChange}
                />
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 3, gridColumnStart: 2 }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Ownership</label>{" "}
                </Tooltip>
                <SearchDropdown
                  options={ownership}
                  width={330}
                  name="ownership"
                  onChange={handleChange}
                  value={custfilter.ownership}
                />
              </div>

              <div
                className="customer_filter_filed"
                style={{ gridRowStart: 4, gridColumnStart: 2 }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Credit Limit
                  </label>
                </Tooltip>
                <br />₹{custfilter.credit}
                <br />
                <Slider  defaultValue={0} disabled={false} max={3000} onChange={(value)=> {
        setCurrentValue(value)
      }}/>
                {/* <input
                  className="credtrange"
                  type="range"
                  min={0}
                  max={3000}
                  defaultValue={0}
                  style={{ border: "none", outline: "none", width: "100%" }}
                  placeholder="Placeholder"
                  name="credit"
                  value={custfilter.credit}
                  onChange={onChangeCredit}
                  //   onBlur={handleBlur}
                /> */}
              </div>
            </div>,
          ]}
          change={filterarray}
          customer={fetchvendor.length}
          filterLength={filterarray.length}
          columns={columnsData}
          onSelectColumn={handleSelectColumn}
          setColumns={setColumns}
          addBtnName={"Vendors"}
          path={"add_Vendors"}
          onData={handleData}
          onFilter={(e) => {
            clearfilter(e);
            setVisible(!visible);
          }}
        />

        
<div className="tableData">
       {filterarray.length > 0 && (
              <div className="tags" id="tags">
                <div className="appliedtag ">Applied Filters :</div>
                {filterarray.map((customerfilter, index) => {
                  return (
                    customerfilter.value && (
                      <Tooltip
                      className="tlpclr"
                      id="tlpclr"
                        title={`${customerfilter.key === "gsttreat"  && "Gst Treatment" ||
                        customerfilter.key === "category"  && "Type Category" ||
                        customerfilter.key === "currency"  && "Currency" ||
                        customerfilter.key === "payment"  && "Payment Terms" ||
                        customerfilter.key === "pos"  && "Default place of supply" ||
                        customerfilter.key == "street1"  && "City" ||
                        customerfilter.key == "street2"  && "State" ||
                        customerfilter.key === "contact"  && "Contact" ||
                        customerfilter.key === "ownership"  && "Ownership" ||
                        customerfilter.key === "credit"  && "Credit Limit"  } : ${customerfilter.value}`} 
                        color="#EBECF0"
                        
                      >
                        <Tag
                          key={customerfilter.key}
                          className="tag1"
                          closable
                          onClose={(e) => {
                            log(index, customerfilter.key);
                          }}
                        >
                          {customerfilter.value}                        </Tag>
                      </Tooltip>
                    )
                  );
                })}

                <button
                  type="submit"
                  className="btnfilter"
                  onClick={(e) => {
                    setVisible(!visible);
                    clearfilter(e);
                  }}
                >
                  Clear All
                </button>
              </div>
            )}
        <Table
          ref={componentRef}
          rowSelection={!loading && {
            type: "checkbox",
            columnTitle: "",
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            },
          }}
          // loading={{
          //   indicator: (
          //     <div>
          //       <Spin />
          //     </div>
          //   ),
          //   spinning: loading,
          // }}
          dataSource={tableData}
            columns={tableColumns.filter(col => selectedColumns.includes(col.dataIndex))}
          // scroll={{ y: 800, x: 720 }}
          //    style={{ width: "100%" }}
          scroll={!loading && { x: "800px" }}
          style={{ maxWidth: 2200, width: "100%" }}
          pagination={!loading && {
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            total: cusomizeData.length,
            showTotal: (total, range) => `Showing ${range[1]}-${range[1]} of ${total} Vendors`
          }}

          rowClassName={(record) =>
            record.key % 2 === 0 ? "highlight_row" : ""
          }
          search={{
            keyword: search,
          }}
        />

<Modal
        open={confirm}
     //   onOk={handleMaterialOk}
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
              onClick={handleSubmit}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#DA2F58",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Delete
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
                Delete Vendor
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
      </div>
    </div>
  );
};

export default VendorsData;
