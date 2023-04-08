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
import { SearchSelect } from "../Dropdowns/Dropdowns";
import CustomInput from "../CustomInput/CustomInput";
import { ContainedButton, ContainedSecondaryButton } from "../Buttons/Button";
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
  const [currencydrp, setCurrencydrp] = useState([]);
  const [payment, setPayment] = useState([]);
  const [street, setStreet] = useState([]);
  const [creditBox, setCreditBox] = useState(false);
  const [creditAmount, setCreditAmount] = useState('');
  const [formattedCreditAmount, setFormattedCreditAmount] = useState('');
  const [allCustomer, setAllCustomer] = useState([]);
  const [gstinError, setGstinError] =useState(false);
  const [status, setStatus] = useState([])
  const[updateId, setUpdateId]=useState({
    gsttreat: "",
    gstin: "",
    businessname: "",
    category: "",
    pancard: "",
    currency: "",
    payment: "",
    credit: "",
    email: "",
    pincode: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    pos: "",
    contact: "",
    ownership: "",
    area:"",
    type:"",
    commission:"",
    country:"",
    customertype:"",
  })
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
      setCofirmUpdate(false)
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
      console.log(res)
      setFetchcustomer(
        res.data.data.items.map((row) => ({
            Key:row.id,
            id:row.Key,
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
              Tan_no: row.tan_no ? row.tan_no : "--",
          Currency: row.currency ? row.currency : "--",
          Payment_Terms: row.payment_terms ? row.payment_terms : "--" ,
          Credit_Limit: row.credit_limit ? row.credit_limit : "--",
          Email: row.email ? row.email : "--",
          Pincode: row.Initiallitemrow[0].pincode,
          // Street1: row.street1,
          // Street2: row.street2,
          Country: "India" ,
          Contact:
            row.contact == 1
              ? "Vimlesh"
              : row.contact == 2
              ? "ABC"
              : row.contact == 3
              ? "jhhghj"
              : "Ranveer",
          Ownsership: row.ownership == 1 ? "ubuntu" : "window",
          Type:row.type,
          // id: row.id
        }))
      );
      console.log(res);
    });
  };
 console.log(fetchcustomer)


  //update data

const handleUpdate = (record) => {

  handleConfirmCancelUpdate();
  // console.log(oldData)
  // console.log(oldData.id);
  console.log(record)
  setUpdateId(record);

  
  // ChildStateModificationFunc(oldData)
};

console.log(updateId)


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
  // const payment = [
  //   {
  //     value: "Net 5",
  //     label: "Net 5",
  //   },
  //   {
  //     value: "Net 10",
  //     label: "Net 10",
  //   },
  // ];
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

  //getcurrency
  useEffect(() => 
{
getDataCuurrency();
getDataPaymentTerms();
getAddress();
},[])

  const getDataCuurrency = () => {
    fetch(`${config.baseUrl}/currency/`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencydrp(data.data.items);
        // console.log(data);
      });
  };
  const getDataPaymentTerms = () => {
    return fetch(`${config.baseUrl}/paymentterms/`)
      .then((response) => response.json())
      .then((data) => {
        setPayment(data.data.items);
        // console.log(data);
      });
  };

  const getAddress = async () => {
    await axios.get(`${config.baseUrl}/address/`).then((res) => {
      setloading(false);
      console.log(res)
      setStreet(
        res.data.data.items.map((row) => ({
            Key:row.id,
            id:row.Key,
            Customer_Ref:row.customer_ref,
            Street1:
            row.street1,
            Street2:row.street2,
    })))
  })
  };
console.log(street)

  const addressdata = street.map((add) => ({
    key:add.id,
    label: add.street1,
    value: add.street1,
  }));
console.log(addressdata)
  const currencydata = currencydrp.map((curr) => ({
    key:curr.id,
    label: curr.currency_name + " - " + curr.symbol,
    value: curr.id,
  }));

  const paymentterms = payment.map((pay) => ({
    key:pay.id,
    label: pay.terms,
    value: pay.terms,
  }));


//#region to know customer vendor
useEffect (() => 
{
  getstatus();
},[])

const getstatus = () => {
  return fetch(`${config.baseUrl}/master/`)
    .then((response) => response.json())
    .then((data) => {
      setStatus(data.data.items);
      console.log(data);
    });
};
console.log(status)
//type category of cuatomer/vendor

const getcategorydata = status
.filter((place) => place.field === "type" && place.module === "cus_ven" )
.map((place) => ({
  key: place.id,
  label: place.master_key,
  value: place.master_key,
}));

 console.log(getcategorydata)

 let typedata = getcategorydata.find(
  (option) => option.key === fetchcustomer.type && option.label
)?.label;

console.log(fetchcustomer)
console.log(typedata);
//#endregion

 

  const dataSource = fetchcustomer.map((customer) => ({
     key:customer.Key,
      id:customer.Key,
      registration_type: customer.Registration_Type,
    gstin: customer.Gstin,
    business_name: customer.Business_Name,
    type_category: customer.Type_Category,
    tan_no: customer.Tan_no,
    currency:currencydata.find(
                    (option) =>
                      option.key === customer.Currency && option.label
                  )?.label,
    payment_terms:paymentterms.find(
      (option) =>
        option.key === customer.Payment_Terms && option.label
    )?.label ,
    credit_limit: customer.Credit_Limit,
    email: customer.Email,
    pincode: customer.Pincode,
    street1: street.map((street1)=> customer.Key === street1.Customer_Ref && street1.Street1),
    street2: street.map((street1)=>  customer.Key === street1.Customer_Ref && street1.Street2),
    country: customer.Country,
    contact: customer.Contact,
    ownership: customer.Ownsership,
    type: getcategorydata.find(
      (option) => option.key === customer.Type && option.label
    )?.label
  }));
 console.log(dataSource);

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
      render: (text, record) => {
        return (
          <Link
          to={`customer_vendor_preview/${record.id}/account_overview`}
          style={{ color: "#5C5AD0", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation(); // Stop propagation to prevent sorter from triggering
          }}
        >
          {record.business_name}
        </Link>
        )},
      sorter: (record1, record2) => {
        return record1.business_name > record2.business_name;
      },
      showSorterTooltip:{ title: '' },
      
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
      title: "Country",
      label: "Country",
      dataIndex: "country",
      key: "country",
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
                 <div className="delete-hover popover-menu-item" >  
                 <img src="\images\icons\delete_record.svg" />
                 <div>
                 <button 
                 className="actionlabel"
                 onClick={() => handleConfirmCancel(record)}          
                 >
                Delete
                 </button>
                 </div>
                 </div>
                 <div className="edit-hover popover-menu-item" >
                 <img src="\images\icons\edit_record.svg" />
                  <div>
          
             <button
                    className="actionlabel"
                     onClick={()=> handleUpdate(record)}
                 >
                  {/* <a href="customers/addcustomer">  Update</a> */}
                 Edit
                 </button>

                 </div>
                 </div>
                 </div>
                 
        } title="" height={100} trigger="click">
           <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
                height: "100%",
                justifyContent:"center",
                marginLeft:"-10px"
              }}
            
            >
      <img src={editdelete} style={{ transform: "rotate(90deg)", cursor:"pointer" }} />
      </div>
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
  console.log(record)
  //  record.business_name.toLowerCase().includes(search.toLowerCase())
  );


  const cusomizeData = dataSource.filter(
    (record) =>
    record.type === 'Customers' &&
      // record.gst_treatment
        
      //   .includes(custfilter.gsttreat) &&
      // record.type_category
        
      //   .includes(custfilter.category) &&
      // record.contact.includes(custfilter.contact) &&
      // record.currency
        
      //   .includes(custfilter.currency) &&
      // record.payment_terms
        
      
      //   .includes(custfilter.payment) &&
      // record.place_of_supply
        
      //   .includes(custfilter.pos) &&
      // record.street1.includes(custfilter.street1) &&
      // record.street2.includes(custfilter.street2) &&
      // record.ownership
        
      //   .includes(custfilter.ownership) &&
      // record.credit_limit.toString().includes(custfilter.credit.toString())
      //&&
       record.business_name.toLowerCase().includes(search.toLowerCase())
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

   const onChange = (e) => {
    const { value, name } = e.target;
    setCreditAmount(e.target.value);
    setUpdateId({ ...updateId, [name]: value });
    setGstinError(false);
    console.log(value);
    console.log(name);
    
  };

   const getCustomerVendor = () =>
   {
     fetch(`${config.baseUrl}/customervendor/`)
     .then((response) => response.json())
     .then((data) => {
       setAllCustomer(data.data.items);
        console.log(data);
     });
   }

   const handleFormSubmit = () => {
  
    const data = allCustomer.find((customer) => customer.gstin ===  updateId.gstin);
console.log(data)
if(data)
{
  setGstinError(true)
}
else
{
    axios
      .put(
        `${config.baseUrl}/customervendor/${updateId.id}/`,
        {


        "Initiallitemrow": [
          {
             "street1": updateId.street1,
             "street2": updateId.street2,
              "country": updateId.country,
              "category": updateId.category,
              // "type": 10,
              "pincode":updateId.area,
              "company_id": 1,
              "created_by": 1,
              "updated_by": 1
          }
      ],
      "gstin": updateId.gstin,
      "business_name": updateId.business_name,
      //"email":formData.email,
      ...(updateId.email && { email: updateId.email }),
      // ...(formData.pancard && { pancard: formData.pancard }),
      // "pancard": "GTHUY6677T",
      ...(updateId.pancard && { pancard: updateId.pancard }),
      "tds": true,
      "tcs": false,
      //...(formData.pancard && { tan_no: formData.pancard }),
      ...(updateId.pancard && { tan_no: updateId.pancard }),
    //  "tan_no":formData.pancard,
    ...(updateId.credit && {credit_limit:updateId.credit}),
    //  "credit_limit":formData.credit,
      "type": updateId.customertype,
      "type_category": updateId.type,
      "registration_type": updateId.registration_type,
      ...(updateId.payment && {payment_terms:updateId.payment}),
     // "payment_terms": formData.payment,
      "currency": updateId.currency,
      "ownership": 1,
      ...(updateId.commission && { commission_terms: updateId.commission }),
  //    "commission_terms":  formData.commission ? formData.commission : "",
      "tds_tcs_master": 2,
      "contact": 1,
      "status": 1,
      "company_id": 1,
      "created_by": 1,
      "updated_by": 1
        },
        updateId
      )
      .then((response) => {
        getData();

        toast.success("Added Successfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        // handleClose();
      });
    }
    //console.log(initialFieldValues);
  };

  return (
    <>
      <div className="customers fixed_heading_container">
        <Page_heading
          parent={"Business Account"}
          child={"Customers"}
          
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
              scroll={{ y: "51vh" }}
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
             footer={false}
             style={{ top: 20 }}
             className={"deleteconfirm"}
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
         <div className="update-customer-container">
                <div className="header">
                  <h1 className="heading-sb">Edit Account</h1>
                  <p className="sc-body-rg mt-10 title">Edit the account details</p>
                  <hr className="h-line" />
              
                  <div className="update-form-container">
                    <div className="logo-container">
                      <p className="sc-body-md label">Account Logo</p>
                      <div className="logo">
                        <img src="/images/icons/autoMode_logo.svg" alt="" />
                      </div>
                      <p className="sc-body-sb upload-link">Click to replace <span className="sc-body-rg">or drag and drop</span></p>
                      <p className="caption-md">SVG, PNG, JPG or GIF (max. 800 x 400px )</p>
                      <p className="sc-body-sb remove-logo">Remove Logo</p>
                    </div>
                  {/* <AddNewCustomer/> */}
                  <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form_first_container">

              <div className="form_field field1" style={{ gridRowStart: 1, gridColumnStart: 1}}>
              <SearchSelect
            label="GST Treatment" 
            width={330}
         //   options={gsttreatment} 
          //  onChange={handleDrpChange}
            name="gsttreat"
            value={updateId?.registration_type}
             //       error={errors.gsttreat && touched.gsttreat ? true : false}
               //     errorMsg="GST Treatment is required"
            />
                
              </div>

              <div className="form_field field2" style={{ gridRowStart: 2, gridColumnStart: 1}}>
              <CustomInput 
                width={330}
                label="GSTIN"
                icon="/images/icons/Gst-no.svg"
                type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                  inputType={"AlphabeticalNumber"}
                  name="gstin"
                //  onFocus={handleFocus}
                    placeholder="22AAAAA1234A1AA"
                    maxLength={15}
                 value={updateId?.gstin}
                //onChange={(e, newValue) => {handleChange(e); onChange(e);
                  // handleGstno(e);
                  // setFormData(prevState => ({
                  //   ...prevState,
                  //   "gstin": newValue
                  // }))}}
                  // onBlur={handleBlur}
                  // error={errors.gstin && touched.gstin || gstinError ? true : false}
                  // errorMsg={errors.gstin || "Gstin already exits"}

            />
              </div>

              <div className="form_field field3" style={{ gridRowStart: 3, gridColumnStart: 1}}>
              <CustomInput 
              type="text"
              label="Business Name"
              icon="/images/icons/Business.svg"
              style={{ border: "none", outline: "none", width: "82%" }}
             inputType={"CamelAlphabetical"}
               name="businessname"
               width={330}
           // onFocus={handleFocus}
               placeholder="Name"
              value={updateId?.business_name}
          //  onChange={(e, newValue) => {handleChange(e); onChange(e); 
          //    setFormData(prevState => ({
          //      ...prevState,
          //      "businessname": newValue
          //    }))}}
          //    onBlur={handleBlur}
          //     error={!formData.businessname && errors.businessname && touched.businessname ? true : false}
          //     errorMsg={!formData.businessname && errors.businessname}
            />
              </div>

              <div className="form_field field4" style={{ gridRowStart: 4, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <SearchSelect
                 width={155}
                 label="Customer Type"
              // options={getcustomertypedata}
            //   options={custtype}
                 value={
                updateId?.type
                }
                // value={ custtype.find(
                //       (option) =>
                //         option.key === formData.type && option.label
                //     )?.label
                // }
                // onChange={handleDrpChangeCustomer}
                //  onChange={handleDrpChangeCustomertype}
                //  name="type"
                //  error={errors.type && touched.type ? true : false}
                //  errorMsg="Customer Type is required"
              />
              <SearchSelect 
                width={155}
                label="Currency"
              //  options={currencydata}
                // value={
                //   currencydata.find(
                //     (option) =>
                //       option.key === formData.currency && option.label
                //   )?.label
                // }
                value={updateId?.currency}
              //  onChange={handleDrpChangeCurrency}
              //  name="currency"
              //   error={errors.currency && touched.currency ? true : false}
              //   errorMsg="Currency is required"
              />
                </div>
              </div>

              <div className="form_field field5" style={{ gridRowStart: 5, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <SearchSelect
                 width={155}
                 label="Commission Terms"
               //  options={commissiondata}
                 value={updateId?.commission_terms}
                //  value={
                //   commissiondata.find(
                //     (option) =>
                //       option.key === formData.commission && option.label
                //   )?.label
                // }
                //  onChange={handleDrpChangeCommission}
                 name="commission"
                //  error={errors.commission && touched.commission ? true : false}
                //  errorMsg="Commission is required"
              />
             <SearchSelect 
                width={155}
                label="Payment Terms"
            //    options={paymentterms}
                value={updateId?.payment_terms}
                // value={
                //   paymentterms.find(
                //     (option) =>
                //       option.key === formData.payment && option.label
                //   )?.label
                // }
                // onChange={handleDrpChangePayment}
                name="payment"
                // error={errors.payment && touched.payment ? true : false}
                // errorMsg="Payment Terms is required"
              />
                </div>
              </div>

              <div className="form_field field6" style={{ gridRowStart: 6, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
           {/* {updateId?.gsttreat == 1 ?  */}
            <CustomInput
                type="text"
                label="TAN No."
                width={155}
                icon="/images/icons/Pancard.svg"
                maxLength={10}
               // onFocus={handleFocus}
                style={{ border: "none", outline: "none", width: "82%" }}
               inputType={"AlphabeticalNumber"}
                 name="pancard"
                 placeholder="ABCDE1234D"
                value={updateId?.pancard}
            //  onChange={(e, newValue) => {handleChange(e); onChange(e); 
            //    setFormData(prevState => ({
            //      ...prevState,
            //      "pancard": newValue
            //    }))}}
            //    onBlur={handleBlur}
                // error={errors.pancard && touched.pancard ? true : false}
                // errorMsg={errors.pancard}
            /> 
            {/* : updateId?.gsttreat == 2 ? 
              <CustomInput
                type="text"
                label="PAN No."
                width={155}
                icon="/images/icons/Pancard.svg"
                maxLength={10}
               // onFocus={handleFocus}
                style={{ border: "none", outline: "none", width: "82%" }}
               inputType={"AlphabeticalNumber"}
                 name="pancard"
                 placeholder="ABCDE1234D"
                value={updateId?.pancard}
            //  onChange={(e, newValue) => {handleChange(e); onChange(e); 
            //    setFormData(prevState => ({
            //      ...prevState,
            //      "pancard": newValue
            //    }))}}
            //    onBlur={handleBlur}
                // error={errors.pancard && touched.pancard ? true : false}
                // errorMsg={errors.pancard}
            />:
            <CustomInput
            type="text"
            label="TAN No."
            width={155}
            icon="/images/icons/Pancard.svg"
            maxLength={10}
          //  onFocus={handleFocus}
            style={{ border: "none", outline: "none", width: "82%" }}
           inputType={"AlphabeticalNumber"}
             name="pancard"
             placeholder="ABCDE1234D"
            value={updateId?.pancard}
        //  onChange={(e, newValue) => {handleChange(e); onChange(e); 
        //    setFormData(prevState => ({
        //      ...prevState,
        //      "pancard": newValue
        //    }))}}
        //    onBlur={handleBlur}
            // error={errors.pancard && touched.pancard ? true : false}
            // errorMsg={errors.pancard}
        /> */}
              
               <div  className="credit-input-container">
              <CustomInput 
                className={`${creditBox && "creditAmtBoxBlur"}`}
                type="number"
                style={{ border: "none", outline: "none", width: "82%" }}
                // placeholder="Placeholder"
                name="credit"
                icon="/images/icons/Rupee.svg"
                width={155}
                label="Credit Limit"
                placeholder="0.00"
                value={updateId?.credit_limit}
                // onChange={(e)=>{handleChange(e); onChange(e);}}
                // onBlur={(e)=>{handleBlur(e); handleCreditBlur(e);}}
                // onFocus={ handleCreditFocus}
                // error={errors.credit && touched.credit ? true : false}
                // errorMsg={errors.credit}
                /> 
                {creditBox && creditAmount>0 && (
                    <div className="creditAmt">
                      <p> {formattedCreditAmount}</p>
                    </div>
                  )}
              </div>

                </div>
              </div>

              <div className="form_field field7" style={{ gridRowStart: 7, gridColumnStart: 1}}>
              <SearchSelect
                 width={330}
                label="Ownership"
                //  options={ownershipwithemail}
                //  value={values.ownership}
                //  onChange={handleDrpChange}
                 name="ownership"
                 //error={errors.ownership && touched.ownership ? true : false}
                 //errorMsg="Ownership is required"
                  />
              </div>
              
              <div className="form_field field8" style={{ gridRowStart: 1, gridColumnStart: 2}}>
              <CustomInput 
              //  type="email"
                style={{ border: "none", outline: "none", width: "82%" }}
               inputType={"email"}
                 name="email"
                 icon="/images/icons/Email.svg"
                 width={330}
                // onFocus={handleFocus}
                  label="Email"
                 placeholder="example@reformiqo.com"
                value={updateId?.email}
              //  onChange={(e, newValue) => {handleChange(e); onChange(e); 
              //  setFormData(prevState => ({
              //    ...prevState,
              //    "email": newValue
              //  }))}}
              //  onBlur={handleBlur}
              // error={errors.email && touched.email ? true : false}
              // errorMsg={errors.email}
                />
              
              </div>

              <div className="form_field field9" style={{ gridRowStart: 2, gridColumnStart: 2}}>
              <CustomInput 
              type="number"
              //ref={inputRef}
            //onKeyPress={handleKeyPress}
               style={{ border: "none", outline: "none", width: "82%" }}
               placeholder="395007"
               name="pincode"
             value={updateId?.pincode}
              // onChange={(e)=>{handleChange(e); onChange(e);handlePincode(e);}}
              //  onChange={(e)=>{handleChange(e); onChange(e);}}
              //  onBlur={(e)=>{handleBlur(e);}}
               autoComplete="off"
                width={330}
                // onFocus={handleFocus}
                icon="/images/icons/Pincode_Area.svg"
                label="Pincode"
                // error={!formData.pincode && errors.pincode && touched.pincode ? true : false}
                // errorMsg={!formData.pincode && errors.pincode}
            />
             
              </div>

              <div className="form_field field10" style={{ gridRowStart: 3, gridColumnStart: 2}}>
              <SearchSelect 
              width={330}
              placeholder="Area"
              name="area"
              value={updateId?.area}
              // options={getPincodeAreaData}
              // value={
              //   getPincodeAreaData.find(
              //     (option) =>
              //       option.key === formData.area && option.label
              //   )?.label
              // }
              // onChange={handleDrpChangePincode}
              label="Area"
              // error={!formData.area && errors.area && touched.area ? true : false}
              // errorMsg={!formData.area && errors.area}
              />
              {/* <CustomInput 
                type="text"
                style={{ border: "none", outline: "none", width: "82%" }}
                placeholder="Placeholder"
                name="area"
                value={formData.area}
                onChange={(e)=>{handleChange(e); onChange(e);}}
                onBlur={handleBlur}
                width={330}
                onFocus={handleFocus}
                icon="/images/icons/Pincode_Area.svg"
                label="Area"
                error={!formData.area && errors.area && touched.area ? true : false}
                errorMsg={!formData.area && errors.area}
              /> */}
              
              </div>

              <div className="form_field field11" style={{ gridRowStart:4 , gridColumnStart: 2}}>
              <CustomInput
                type="text"
                style={{ border: "none", outline: "none", width: "82%" }}
              //  placeholder="Placeholder"
                name="street1"
                icon="/images/icons/location-icon.svg"
                value={updateId?.street1}
                // onChange={(e)=>{handleChange(e); onChange(e);}}
                // onBlur={handleBlur}
                width={330}
              //  onFocus={handleFocus}
                label="Street 1"
                // error={!formData.street1 && errors.street1 && touched.street1 ? true : false}
                // errorMsg={!formData.street1 && errors.street1}
              />
              
              
              </div>

              <div className="form_field field12" style={{ gridRowStart: 5, gridColumnStart: 2}}>
              <CustomInput 
                type="text"
                style={{ border: "none", outline: "none", width: "82%" }}
              //  placeholder="Placeholder"
                name="street2"
             value={updateId?.street2}
                // onChange={(e)=>{handleChange(e); onChange(e);}}
                // onBlur={handleBlur}
                width={330}
            //    onFocus={handleFocus}
                label="Street 2"
                // error={!formData.street2 && errors.street2 && touched.street2 ? true : false}
                // errorMsg={!formData.street2 && errors.street2}
                icon="/images/icons/location-icon.svg"
              />
              
              
              </div>

              <div className="form_field field13" style={{ gridRowStart: 6, gridColumnStart: 2}}>
              <CustomInput 
              type="text"
              style={{ border: "none", outline: "none", width: "82%" }}
              name="city"
              value={updateId?.city}
           //   onChange={onChange}
              disabled={true}
              width={330}
              label="City"
              // error={errors.city && touched.city ? true : false}
              // errorMsg={errors.city}
            />
              
              </div>

              <div className="form_field field14" style={{ gridRowStart: 7, gridColumnStart: 2}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput 
               type="text"
               style={{ border: "none", outline: "none", width: "82%" }}
               name="state"
               value={updateId?.state}
             //  onChange={onChange}
               disabled={true}
                width={155}
                label="State"
                // error={errors.state && touched.state ? true : false}
                // errorMsg={errors.state}
            />
              <CustomInput 
               type="text"
               style={{ border: "none", outline: "none", width: "82%" }}
               name="state"
             value={updateId?.country}
               disabled={true}
                width={155}
                label="Country"
                // error={errors.state && touched.state ? true : false}
                // errorMsg={errors.state}
            />
              
                </div>
              </div> 

            </div>
            <div className="customerbutton_bottom">
                  <ContainedButton  value="Update" onClick={handleFormSubmit} />
                  <ContainedSecondaryButton value="Cancel"  />
                </div>
          </form>
                  </div>
                </div>
              </div>
          </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
