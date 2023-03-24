import { React, useState, useRef, useEffect, useMemo } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Page_heading from "../Page_Heading/Page_heading";
import "./Customers.scss";
import { Button, Empty, Modal, Popover, Skeleton, Slider, Space, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-date-range/dist/styles.css";
import { addDays } from "date-fns";
import "react-date-range/dist/theme/default.css"; // theme css file
import FilterAndSearchBar from "../FilterAndSearchBar/FilterAndSearchBar";
import { Spin } from "antd";
import config from "../Database/config";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import creditcard from "../../assets/Images/FormIcon/Credit Limit.svg";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import editdelete from "../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../assets/Images/ActionStatus/status.svg";
import alert from "../../assets/Images/Confirmation/confirm.svg";
//import AddNewCustomer, { UpdateParentCustomer}from "../Customers/AddNewCustomer"
import {ChildStateModificationFunc} from "../Customers/AddNewCustomer";
import AddNewCustomer from "../Customers/AddNewCustomer";
;

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


const Customer = (props) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchcustomer, setFetchcustomer] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setloading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [inputValue, setInputValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0)
  const [confirm, setCofirm] = useState(false);
  const [confirmupdate, setCofirmUpdate] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
  const [updateRecord, setUpdateRecord]= useState(null)
  


//for update

const handleConfirmCancelUpdate = () => {
//setUpdateRecord(record)
    setCofirmUpdate(true);
  
   // handleUpdate(updateRecord)
   // console.log(updateRecord)
    //setPopOverVisible(false)
  };
  console.log(updateRecord)

  const handleConfirmUpdate = () => {
    setCofirmUpdate(false);
    setDeleteRecord(null)
    // setPopOverVisible(false)
  };


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
   // window.scroll(0, 20);
  }, []);

 


//getstate

// useEffect(()=>
// {
//   const getState= async () =>
//   {
//     const resState = await fetch ('http ://localhost/devopsdeveloper/state/getstate/101')
//     const resst= resState.json();

//   }
//   getState();
// })

  //object to array
 // customervendor
  const getData = async () => {
    await axios.get(`${config.baseUrl}/customervendor/`).then((res) => {
      setloading(false);
      setFetchcustomer(
        res.data.map((row) => ({
            Key:row.id,
            Registration_Type:
            row.registration_type == 1
              ? "Registerd Business"
              : row.registration_type == 2
              ? "Consumer"
              : row.registration_type == 3
              ? "Consumer"
              : row.registration_type == 4
              ? "Consumer"
              : row.registration_type == 5
              ? "Consumer"
              : row.registration_type == 6
              ? "Consumer" : "",
              Gstin: row.gstin,
          Business_Name: row.business_name,
          Type_Category:
            row.type_category == 7
              ? "Retailer"
              : row.type_category == 8
              ? "Wholesaler"
              : "Manufacturer",
              Tan_no: row.tan_no,
          Currency: row.currency == 1 ? "INR" : "USD",
          Payment_Terms: row.payment_terms == 1 ? "Net 5" : "Net 10",
          Credit_Limit: row.credit_limit,
          Email: row.email,
          Pincode: "392012",
          Street1: "Bharuch",
          Street2: "Gujarat",
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
  // console.log(fetchcustomer)


  //update data

const handleUpdate = (oldData) => {

  handleConfirmCancelUpdate();
  console.log(oldData)
  console.log(oldData.id);
  
  ChildStateModificationFunc(oldData)
};


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

  console.log(fetchcustomer);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const menuRef = useRef(null);

  const dataSource = fetchcustomer.map((customer) => ({
     key:customer.Key,
      id:customer.Key,
      registration_type: customer.Registration_Type,
    gstin: customer.Gstin,
    business_name: customer.Business_Name,
    type_category: customer.Type_Category,
    tan_no: customer.Tan_no,
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
      dataIndex: "gstin",
      key: "gstin",
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
      dataIndex: "registration_type",
      key: "registration_type",
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
      dataIndex: "tan_no",
      key: "tan_no",
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
      fixed: "right",
      align: "center",
      width: 40,
      // fixed:"right",
      render: (text, record) =>  (

      
        <Popover   getPopupContainer={(trigger) => trigger.parentElement} showArrow={true}
        placement="left" content={
                 <div>
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
                 <div style={{display:"flex", alignItems:"center", gap:"11px"}}>
               <img src={editlogo} />
                  <div>
          
             <button
                    className="actionlabel"
                     onClick={()=> handleUpdate(record)}
                 >
                  {/* <a href="customers/addcustomer">  Update</a> */}
                 Update
                 </button>

                 </div>
                 </div>
                 {/* <div style={{display:"flex", alignItems:"center", gap:"11px"}}>
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
                 </div> */}
                 </div>
                 
        } title="" height={100} trigger="click">
      <img src={editdelete} style={{cursor:"pointer"}} />
        </Popover>
       
          ),
      resizable: true,
      align: "left",
    },
  ];

  const [columns, setColumns] = useState(columnsData);

 

  // redirect to another page on click of row

  const navigate = useNavigate();

  const handleRowClick = (record) => {
    const link = record.link; // assume that the link is stored in a "link" field of the data for the row
    navigate(link);
  };

  // search table functionality

  const componentRef = useRef();

  //Filter


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



   // search table functionality

   const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");
  // console.log(search)

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.business_name.toLowerCase().includes(search.toLowerCase())
  );




 
  const cusomizeData = dataSource.filter(
    (record) =>
      // record.gst_treatment
        
      //   .includes(custfilter.gsttreat) &&
      record.type_category
        
        .includes(custfilter.category) &&
      record.contact.includes(custfilter.contact) &&
      record.currency
        
        .includes(custfilter.currency) &&
      record.payment_terms
        
      
      //   .includes(custfilter.payment) &&
      // record.place_of_supply
        
      //   .includes(custfilter.pos) &&
      // record.street1.includes(custfilter.street1) &&
      // record.street2.includes(custfilter.street2) &&
      // record.ownership
        
      //   .includes(custfilter.ownership) &&
      // record.credit_limit.toString().includes(custfilter.credit.toString())
      && record.business_name.toLowerCase().includes(search.toLowerCase())
      // && record.email.toLowerCase().includes(search.toLowerCase())
      // && record.pincode.toString().includes(search.toString())
      // && record.contact.toLowerCase().includes(search.toLowerCase())
      // && record.gst_treatment.toLowerCase().includes(search.toLowerCase())
      // && record.type_category.toLowerCase().includes(search.toLowerCase())
      // && record.currency.toLowerCase().includes(search.toLowerCase())
      // && record.payment_terms.toLowerCase().includes(search.toLowerCase())
      // && record.place_of_supply.toLowerCase().includes(search.toLowerCase())
      // && record.street1.toLowerCase().includes(search.toLowerCase())
      // && record.street2.toLowerCase().includes(search.toLowerCase())
      // && record.ownership.toLowerCase().includes(search.toLowerCase())
      // && record.credit_limit.toString().includes(search.toString())
      // && record.pan_card.toLowerCase().includes(search.toLowerCase())
      // && record.gst_no.toString().includes(search.toString())


    

   

    //console.log(record.gst_treatment, custfilter.gsttreat)
  );

  console.log(cusomizeData);

  //tags

  const log = (index,key) => {
             console.log(key)
            setFilteraaray(filterarray.filter((item, i) => i.key !== index.key ) );
            setCustFilter({ ...custfilter, [key]:"" });
  };
  console.log(filterarray.length)


  // const handleTwoFunction =() =>
  // {
  //     cusomizeData();
  //     filteredData();
  // }


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

//    const token = localStorage.getItem("jwt")
//    let loggedIn= true
//    if(token == null)
//    {
//      localStorage.removeItem("jwt");
//      loggedIn = false
//    }
//   // Details={loggedIn}
 
//  if(loggedIn == false)
//  {
//    localStorage.removeItem("jwt");
//    return <Navigate to="/"/>
 
//  }
  return (
    <>
      <div className="customers fixed_heading_container">
        <Page_heading
          parent={"Business Account"}
          child={window.location.pathname.slice(1)}
        />

        {/* <DateRangePickerComp /> */}

        <div className="customer-table-container">
        <div className="filter-searchbar-container">
          <FilterAndSearchBar
           selectedColumnsLength={selectedColumns.length}
           getPopupContainer={(trigger) => trigger.parentElement} 
            filterdata=
            {[
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
                    <label className="label">
                      Default Place of Supply
                    </label>{" "}
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
                  <br />
               ₹
                  {custfilter.credit}
                  <br />
                  {/* <Slider defaultValue={30}   name="credit" value={custfilter.credit} onChange={onChangeCredit}/> */}
                  <Slider defaultValue={0} disabled={false} max={3000} onChange={(value)=> {
        setCurrentValue(value)
      }}/>
   
                  {/* <input
                  //className="credtrange"
                    type="range"
                    min={0}
                    max={3000}
                    defaultValue={0}
                    style={{ border: "none !important", outline: "none !important", width: "100%", borderColor:"red !important" }}
                    placeholder="Placeholder"
                    name="credit"
                    value={custfilter.credit}
                    onChange={onChangeCredit}
                    //   onBlur={handleBlur}
                  /> */}
                </div>
              </div>
            ]}
            change={filterarray}
            customer={fetchcustomer.length}
            filterLength={filterarray.length}
            columns={columnsData}
            onSelectColumn={handleSelectColumn}
            setColumns={setColumns}
            addBtnName={"Customer"}
            path={"addcustomer"}
            onData={handleData}
            onFilter={(e) => {
              clearfilter(e);
              setVisible(!visible);
            }}
            
          />
          </div>

          <div className="tableData">
            {/* <Resizable> */}
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
{/* {loading ? <Skeleton active /> : */}
            <Table
              ref={componentRef}
              onRow={(record) => {
                return {
                  onClick: () => handleRowClick(record),
                };
              }}

              rowSelection={!loading && {
                type: "checkbox",
                columnTitle: "",
                columnWidth: "40px",
                selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRowKeys(selectedRowKeys);
                  setSelectedRows(selectedRows);
                },
              }}
              // loading={{
              //   indicator: (
              //     <div>
              //     <Spin/>
              //     </div>
              //   ),
              //   spinning: loading,
              // }}
            
              dataSource={tableData}
            columns={tableColumns.filter(col => selectedColumns.includes(col.dataIndex))}

             
              // columns={columns.map((column) => {
              //   return {
              //     ...column,
              //     render: function renderPlaceholder() {
              //       return (
                  
              //         <Skeleton
              //           key={column.key}
              //           title
              //           active={true}
              //           paragraph={false}
              //           //className={className}
              //         />
              //       );
              //     },
              //   };
              // })}
              // scroll={{ y: 800, x: 1000 }}
              // scroll={!loading && { x: ("30px", "800px" )}}
              scroll={{ y: 200 }}
             style={{ maxWidth: 2200, width: "100%" }}
              pagination={!loading && {
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                },
                total: cusomizeData.length,
                showTotal: (total, range) => `Showing ${range[1]}-${range[1]} of ${total} Customers`
              }}

              rowClassName={
                (record) =>
                  record.key % 2 === 0 ? "highlight_row table-row" : "table-row"
              }
              search={{
                keyword: search,
              }}
            />
            {/* } */}
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
                Delete Customer
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
        open={confirmupdate}
     //   onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirm}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirmUpdate}
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
         <AddNewCustomer/>
        {/* <div className="confirmCoontainer">
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
                Delete Customer
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
        </div> */}
      </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
