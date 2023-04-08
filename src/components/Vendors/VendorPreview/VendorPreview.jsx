import { React, useState, useRef } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import {
  Spin,
  Table,
  Tooltip,
  Tag,
  Skeleton,
  Popover,
  Button,
  Modal,
  Typography,
  Upload,
} from "antd";
import { useEffect } from "react";
import { useMemo } from "react";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import "./VendorPreview.scss";
import AttachmentFile from "../../AttachmentFile/AttachmentFile";
import { Link, NavLink, useParams } from "react-router-dom";
import config from "../../Database/config";
import { SearchSelect } from "../../Dropdowns/Dropdowns";
import {
  ContainedButton,
  ContainedSecondaryButton,
} from "../../Buttons/Button";
import { ContainedIconButton, GhostIconButton } from "../../Buttons/Button";
import CustomInput from "../../CustomInput/CustomInput";
import Notes from "../../Notes/Notes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { bank } from "../../../Schemas";

const filterfield = {
  name: "",
  mobile: "",
  email: "",
  company: "",
  lead: "",
  ownership: "",
};

const VendorPreview = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [checked, setChecked] = useState("contacts");
  const [visible, setVisible] = useState(false);
  const [fetchlead, setFetchlead] = useState([]);
  const [loading, setloading] = useState(true);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [contact, setContact] = useState([]);
  const [other, setOther] = useState([]);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  // const [activeTab, setActiveTab] = useState("account");
  const [activeTab, setActiveTab] = useState("account");
  const [attachmentsModal, setAttachmentsModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [getCustomer, setGetCustomer] = useState([]);
  const [status, setStatus] = useState([]);
  const [addlead, setAddLead] = useState([]);
  const [salesOrderModal, setSalesOrderModal] = useState(false);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [customerSubmit, setCustomerSubmit] = useState(false);
  const [salesType, setSalesType] = useState(false);
  const [custven, setCustVen] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [singleCusVen, setSingleCusVen] = useState([]);
  const [cusvenCurrency, setCusVenCurrency] = useState([]);
  const [cusvenPayment, setCusVenPayment] = useState([]);
  const [cusvenPincode, setCusVenPincode] = useState([]);
  const [singleAddress, setSingleAddress] = useState([]);
  const [createNoteActive, setCreateNoteActive] = useState(false);
  const [addBankModal, setAddBankModal] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [custcommission, setcustcommission]=useState([]);
  const [bankDeleteModal, setBankDeleteModal] = useState(false);
  const [addressDeleteModal, setAddressDeleteModal] = useState(false);
  const [bankData, setBankData] = useState
  (
    {
      iFSC: "",
      bank_name: "",
      account_number: "",
      re_account:"",
      branch: "",
    }
  )
  const [bankDetails, setBankDetails] = useState ([])
  const [errorMessage, setErrorMessage] = useState(false);
  const [accountPrimary, setAccountPrimary] = useState(false)
  const [assignContactModal, setAssignContactModal] = useState(false);
  const [addressDetails, setAddresssDetails]= useState([]);
  const [pincodeArea, setPincodeArea] = useState([]);
  const [pincodeWiseArea , setPincodeWiseArea] = useState([])
  const [addAddressDetails , setAddAddresssDetails] = useState({
    street1:"",
    street2:"",
    pincode:"",
    area:"",
    city:"",
    state:"",
    country:""
  })
  const [assignedDataAttach, setAssignedDataAttach] = useState([]);
  const [attachData, setAttachData] = useState({
    attatch_name: "",
    attachments: "",
  });
  const [contactData , setContactData] = useState([]);
  const [contactStatusData , setContactStatusData] = useState([]) 

  const { id } = useParams();





  console.log(bankDeleteModal)
  
  console.log(id)
  //handlecancel

  const handleCancel = () => {
    setAssignContactModal(false);
    if (isCustomerSelected && customerSubmit) {
      setSalesOrderModal(false);
    } else {
      setSalesOrderModal(false);
      //  window.history.back(-1);
    }
    setAttachmentsModal(false);
    setAddBankModal(false);
    setAddAddressModal(false);
  };

  const handleSubmit1 = () => {
    setSalesOrderModal(false);
    setCustomerSubmit(true);
  };

  //for modal delete



  useEffect(() => {
    getCustomerData();
    getstatus();
    getlead();
    getCustomerVendor();
    // getSingleCustomerVendor();
    getCusVenCurrency();
    getCusVenpayent();
    //getPincodeArea();
    getCusVenCommission();
  }, []);

  const getCustomerData = () => {
    return fetch(`${config.baseUrl}/customervendor/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGetCustomer(data);
        console.log(data);
      });
  };

  console.log(getCustomer)

  //get customervendor

  const getCustomerVendor = () => {
    return fetch(`${config.baseUrl}/customervendor/`)
      .then((response) => response.json())
      .then((data) => {
        setCustVen(data);

        console.log(data);
        console.log(data.gstin);
      });
  };

  console.log(custven);

  

  console.log(customerId);
  let SingleId = customerId.customerId;
  console.log(SingleId);

  //get customer/vendor  currency

  const getCusVenCurrency = () => {
    fetch(`${config.baseUrl}/currency/`)
      .then((response) => response.json())
      .then((data) => {
        setCusVenCurrency(data.data.items);
        // console.log(data);
      });
  };

  const getCusVenCommission = () => {
    fetch(`${config.baseUrl}/commissionterm/`)
      .then((response) => response.json())
      .then((data) => {
        setcustcommission(data.data.items);
        // console.log(data);
      });
  };
  const getCommission = custcommission.map((place) => ({
    key: place.id,
    label: place.terms,
    value: place.terms,
  }));

  let commissiondata =getCommission.find(
    (option) => option.key === getCustomer.commission_terms && option.label
  )?.label

  console.log(commissiondata)

  console.log(cusvenCurrency);

  const getCurrency = cusvenCurrency.map((place) => ({
    key: place.id,
    label: place.currency_name,
    value: place.currency_name,
  }));

  console.log(getCurrency)

  // console.log(status, getstatusdata)

  let currencydata =getCurrency.find(
    (option) => option.key === getCustomer.currency && option.label
  )?.label

  console.log(currencydata)

  //get customer/vendor  payent

  const getCusVenpayent = () => {
    fetch(`${config.baseUrl}/paymentterms/`)
      .then((response) => response.json())
      .then((data) => {
        setCusVenPayment(data.data.items);
        // console.log(data);
      });
  };

  const getPayment = cusvenPayment.map((place) => ({
    key: place.id,
    label: place.terms,
    value: place.terms,
  }));

  let paymentdata =getPayment.find(
    (option) => option.key === getCustomer.payment_terms && option.label
  )?.label

  console.log(paymentdata)
  //get customer/vendor pincode area

  // const getPincodeArea = () => {
  //   return fetch(`${config.baseUrl}/pincode/${singleAddress}`)
  //     .then((response) => response.json())

  //     .then((data) => {
  //       setCusVenPincode(data);
  //       console.log(data);
  //     });
  // };

  // console.log(cusvenPincode);

  // console.log(status, getstatusdata)

  // let paymentdata =getPayment.find(
  //   (option) => option.key === singleCusVen.payment_terms && option.label
  // )?.label

  //gt single customer vendor

  const getSingleCustomerVendor = () => {
    return fetch(`${config.baseUrl}/customervendor/${customerId.customerId}`)
      .then((response) => response.json())

      .then((data) => {
        setSingleCusVen(data);
        console.log(data);
        console.log(SingleId);
        console.log(data.Initiallitemrow[0].pincode);
      });
  };

  useEffect(() => {
    getSingleCustomerVendor();
  }, [customerId]);

  console.log(singleCusVen);

  //  let data = custven.map((place) => (
  //   setType(
  //     gettypedata.find((option) =>
  //     option.key === place.type && option.label) ?.label
  //   )
  //  ))
  //   console.log(data)
  // console.log(type);
  // let typedata =gettypedata.find(
  //   (option) => option.key && option.label
  // )?.label
  // console.log(typedata)
  // console.log(custven)
  //get status
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
    (option) => option.key === getCustomer.type && option.label
  )?.label;

  console.log(typedata);




  let typecategorydata = "k";
  // getcategorydata.find(
  //   // (option) => option.key === singleCusVen.type_category && option.label
  // )?.label

  console.log(typecategorydata);

  //status

  const getstatuscusven = status;
  // .filter((place) => place.field === "Status" && place.module === "Contact_Status")
  // .map((place) => ({
  //   key: place.id,
  //   label: place.master_key,
  //   value: place.master_key,
  // }));

  let statusdatacusven = "l";
  // getstatuscusven.find(
  //   (option) => option.key === getContact.status && option.label
  // )?.label
  // console.log(statusdatacusven)
  // //type of customer/vendor
  // console.log(status);
  // const getstatusdata = status
  // .filter((place) => place.field === "Status" && place.module === "Contact_Status" && place.master_value === "1" ? "Customer" :"Vendor")
  // .map((place) => ({
  //   key: place.id,
  //   label: place.master_key,
  //   value: place.master_key,
  // }));

  // console.log(status, getstatusdata)

  // let statusdata =getstatusdata.find(
  //   (option) => option.key === singleCusVen.type && option.label
  // )?.label

  // console.log(statusdata);

  // console.log(getContact)

  //getlead
  const getlead = () => {
    return fetch(`${config.baseUrl}/leadsource/`)
      .then((response) => response.json())
      .then((data) => {
        setAddLead(data);
        console.log(data);
      });
  };

  // const otherlead = addlead.map((place) => ({
  //   key: place.id,
  //   label: place.lead_source,
  //   value: place.lead_source,
  // }));

  // let leaddata = otherlead.find(
  //   (option) => option.key === getContact.lead_source && option.label
  // )?.label;

  // console.log(leaddata);

  console.log(window.location.pathname);
  let url=window.location.pathname;
  const parts = url.split("/");
const activePage = parts.pop();


  console.log(id);
  const handleConfirmCancel = (record) => {
    setDeleteRecord(record);
    setCofirm(true);
  };

  const handleConfirm = () => {
    setCofirm(false);
    setDeleteRecord(null);
  };

  
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

  //#region datasource and columndata

  const dataSource = [
    {
      key: "1",
      business_name: "Reformiqo Business Services Pvt Ltd ",
      gstin_no: "22AAAAA0000A1Z5",
      type: "Customer",
      category: "Retailer",
      position: "Owner",
      status: "Active",
    },
  ];

  const columnsData = [
    {
      title: "Business Name",
      label: "Business Name",
      dataIndex: "business_name",
      key: "business_name",
      resizable: true,
      fixed: "left",
      align: "left",
      width: 300,
      sorter: (record1, record2) => {
        return record1.account_type > record2.account_type;
      },
      render: (text, record) => {
        let initials = "";
        if (record.business_name) {
          const nameArr = record.business_name.split(" ");
          if (nameArr.length > 1) {
            initials =
              nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
          } else {
            initials = nameArr[0].charAt(0);
          }
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                minWidth: 36,
                height: 36,
                backgroundColor: "#5C5AD133",
                border: "1px solid #C2CAD2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#5C5AD0", fontWeight: 600 }}>
                {initials}
              </span>
            </div>
            <span style={{ marginLeft: 8 }}>
              <div>
                <p className=" sc-body-md" style={{ color: "#5C5AD1" }}>
                  {record.business_name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#A1ACB8",
                  }}
                >
                  {/* <img src="images/icons/user_avatar.svg" alt="user" />  */}
                  <p
                    className="contact-key-personname caption-rg"
                    style={{ fontSize: "", color: "#465468 !important" }}
                  >
                    {" "}
                    {record.gstin_no}
                  </p>
                </div>
              </div>
            </span>
          </div>
        );
      },
    },
    {
      title: "Type",
      label: "Type",
      dataIndex: "type",
      key: "type",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.mobile_no > record2.mobile_no;
      },
    },
    {
      title: "Category",
      label: "Category",
      dataIndex: "category",
      key: "category",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.mobile_no > record2.mobile_no;
      },
    },
    {
      title: "Position",
      label: "Position",
      dataIndex: "position",
      key: "position",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
    },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "status",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div className="table_bullet_item"></div>
          <Typography.Text
            style={
              record.status
                ? { color: "#179E40", fontSize: "14px", fontWeight: "600" }
                : ""
            }
          >
            {record.status}
          </Typography.Text>
        </div>
      ),
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
      render: (text, record) => (
        <>
          <Popover
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
                      onClick={() => handleConfirmCancel(record)}
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
                      //  onClick={() => handleUpdate(record)}
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "11px" }}
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
            <img src={editdelete} style={{ cursor: "pointer" }} />
          </Popover>
        </>
      ),
      resizable: true,
      align: "left",
    },
  ];

  const [columns, setColumns] = useState(columnsData);

  //#endregion

//#region search and filter data

  const componentRef = useRef();

  function displaySerachbar() {
    document
      .getElementById("searchbar_container")
      .classList.toggle("container_display");
  }

  // Table Search

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
  //Filter field

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

  //Filter field

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
  }, [custfilter]);
  console.log(filterarray);

  console.log(custfilter);

  const handleChange1 = (field, value) => {
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

  const onChangeCredit = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
  };

  const cusomizeData = dataSource.filter(
    (record) =>
      record.business_name.includes(custfilter.lead) &&
      record.business_name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(cusomizeData);

  //tags
  console.log(cusomizeData);

  //tags
  console.log(filterarray.length);
  const log = (index, key) => {
    console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
  console.log(filterarray.length);

  //#endregion

  //#region tableData and Table Coumns skeleton

  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex)
  );
  const handleSelectColumn = (e) => {
    const { checked, value } = e.target;
    if (checked) setSelectedColumns([...selectedColumns, value]);
    else setSelectedColumns(selectedColumns.filter((col) => col !== value));
  };

  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : cusomizeData),
    [loading, cusomizeData]
  );
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            sorter: false,
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
        : columns,
    [loading, columns]
  );
//#endregion

  let initials = "";
  if (getCustomer.name) {
    const nameArr = getCustomer.name.split(" ");
    if (nameArr.length > 1) {
      initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
    } else {
      initials = nameArr[0].charAt(0);
    }
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const createNoteFalse = () => {
    setCreateNoteActive(false);
  };

  const handleDeleteCancel = () => {
    setBankDeleteModal(false);
  };

  const handleDeleteAddCancel = () => {
    setAddressDeleteModal(false);
  };
//#region formate date for created by
const timestamp = getCustomer.updated_date_time;
const date = new Date(timestamp);

// Format the date into "dd, mmm yyyy hh:mm AM/PM" format
const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()} ${formatTime(date)}`;

// Function to format time in "hh:mm AM/PM" format
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${amPm}`;
}

console.log(formattedDate); // Output: "31, March 2023 09:23 AM"

//#endregion


//#region CRUD BANK

const onhandleChangeBank = (e) => {
  const { value, name } = e.target;
  
  setBankData({ ...bankData, [name]: value });
  setErrorMessage(false);
  console.log(value);
  console.log(name);
  };
  console.log(bankData)

useEffect(() => {
  getData(bankData.iFSC);

}, [bankData.iFSC]);

  const getData = (iFSC) => {
   
    axios.get(
        `https://ifsc.razorpay.com/${iFSC}`
    )
      .then((response) => {
        console.log(response)
       
        return response;
      })
      .then((data) => {
      console.log(data)
        setBankData(prevFormData => ({
          ...prevFormData,
          bank_name :data.data.BANK,
          branch:data.data.BRANCH,
        }));
        console.log("data", data);
        console.log(data)
      }).catch((error) => {
        if(error.response.status === 404)
     
        {
          setBankData(prevFormData => ({
            ...prevFormData,
          bank_name:  "" ,
           branch:"",
          }));
        }
        console.log(error.response.status)
      })
  };

  console.log(bankData)


  useEffect(() => {
    getBank();
  }, []);
  
  const getBank = () => {
    return fetch(`${config.baseUrl}/bank/?company_id=1&customer_ref=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "success"){
          setBankDetails(data.data.items);
          }
          else{
            setBankDetails([]);
          }
        console.log(data);
      });
  };

  const getbankCustomerdata = bankDetails
  .map((place) => ({
    key: place.id,
    label: place.customer_ref,
    value: place.customer_ref,
  }));
 
   console.log(getbankCustomerdata)

   let bankId = getbankCustomerdata.find(
    (option) => option.key  && option.label
  )?.label;

  console.log(bankId);
console.log(id)
  
  console.log(bankDetails);

if(bankId == id)
{
  console.log("Done")
}
else
{
  console.log("Not Done")
}


  const handleFormSubmit = () => {
    if (bankData.account_number !== bankData.re_account) {
      setErrorMessage(true);
    }
    else
    {
  axios
  .post(
    `${config.baseUrl}/bank/`,
    {

      "beneficiary_name": "Vimlesh",
      "bank_name": bankData.bank_name,
      "account_number": bankData.account_number,
      "iFSC": bankData.iFSC,
      ...(bankData.bank_image && { bank_image: bankData.bank_image}),
      ...(bankData.branch && { branch: bankData.branch}),
      "customer_ref": id,
      "company_id": 1,
      "created_by": 1,
      "updated_by": 1
    },
    bankData
  )
  .then((response) => {
    // getData();
    setAddBankModal(false);
   
    getBank();
     setBankData ({
      iFSC: "",
      bank_name: "",
      account_number: "",
      re_account:"",
      branch: "",
    })

    toast.success("Bank added Successfuly", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  });
}
}

const handleBankDelete = (record) => 
{
  setDeleteRecord(record)
  setBankDeleteModal(true)
}
console.log(deleteRecord)
const handleSubmitBank = () =>
{
  deleteBank(deleteRecord);
  setBankDeleteModal(false);
}

const deleteBank = (record) =>
{
  axios.delete(`${config.baseUrl}/bank/${record.id}/`).then((response) => {
    setBankDeleteModal(false);
     getBank();
    toast.error("Bank Deleted Successfuly", {
      border: "1px solid red",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  });
}

//#endregion

//#region add and get  address CRUD

useEffect(() => {
  getAddress();
  getPincodeData();
}, []);

const getAddress = () => {
  return fetch(`${config.baseUrl}/address/?company_id=1&customer_ref=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "success"){
      setAddresssDetails(data.data.items);
    }
    else{
      setAddresssDetails([]);
    }
      console.log(data);
    });
};
console.log(addressDetails);

const getPincodeData = () => {
  return fetch(`${config.baseUrl}/pincode/?company_id=1&customer_ref=${id}`)
    .then((response) => response.json())
    .then((data) => {
      setPincodeWiseArea(data.data.items)
      console.log(data);
    });
};
console.log(pincodeWiseArea);

const onAddressDataChange = (e) => {
  const { value, name } = e.target;  
  setAddAddresssDetails({ ...addAddressDetails, [name]: value });
  console.log(value);
  console.log(name);
};
console.log(addAddressDetails)

useEffect(() => {
  getPincodeArea(addAddressDetails.pincode);

}, [addAddressDetails.pincode]);

const getPincodeArea = (pincode) =>
{
  axios.get(
    `https://erp.automode.ai/backend/pincode?pincode=${pincode}`
)  .then((response) => {
  return response;
})
.then((data) => {
  setAddAddresssDetails(prevFormData => ({
    ...prevFormData,
 country:data.data.data[0].country,
 city:data.data.data[0].district,
  state:data.data.data[0].state_name,
  }));

setPincodeArea(data.data.data)
console.log(data)
console.log(data.data.data.country)
console.log(data.data.data[0].country)
});
};
console.log(pincodeArea)

const getPincodeAreaData = pincodeArea.map((pin) => ({
  key:pin.id,
   label: pin.office_name,
   value: pin.office_name,
 }));

 console.log(getPincodeAreaData)


 const handleDrpChangePincode = (field, value) => {
  const selectedOption = getPincodeAreaData.find((option) => option.value === value);
  console.log(selectedOption);
  setAddAddresssDetails({ ...addAddressDetails, [field]: value, area: selectedOption.key });
  console.log(field);
  console.log(value);
};


const handleAddAddress = () =>
{
  axios.post(
    `${config.baseUrl}/address/`,
    {
      "street1":addAddressDetails.street1,
      "street2":addAddressDetails.street2,
      "customer_ref": id,
      "category": 18,
      "type": 11,
      "pincode": addAddressDetails.area,
      "company_id": 1,
      "created_by": 1,
      "updated_by": 1
    },
    addAddressDetails
  )   .then((response) => {
   getAddress();
   setAddAddressModal(false);
   setAddAddresssDetails(
    {
      street1:"",
      street2:"",
      pincode:"",
      area:"",
      city:"",
      state:"",
      country:""
    }
   )
    toast.success("Address Added Successfuly", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  });
}


const handleAddressDelete = (record) => 
{
  setDeleteRecord(record)
  setAddressDeleteModal(true)
}
console.log(deleteRecord)
const handleSubmitAddress = () =>
{
  deleteAddress(deleteRecord);
  setAddressDeleteModal(false);
}

const deleteAddress = (record) =>
{
  axios.delete(`${config.baseUrl}/address/${record.id}/`).then((response) => {
    setAddressDeleteModal(false);
     getAddress();
    toast.error("Address Deleted Successfuly", {
      border: "1px solid red",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  });
}


const handleUpdate = (oldData) => {
  console.log(oldData);
  console.log(oldData.id);
  setAddAddresssDetails(oldData);
    setAddAddressModal(true);
};

//#endregion

//#region Attachment

useEffect(() => {
  getAttachAssigedData();
}, []);

const getAttachAssigedData = () => {
  return fetch(
    `${config.baseUrl}/customervendorattatchment/?company_id=1&customer_id=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      //  const customerVendorIds = data.data.items.map(item => item.contact_id);
      setAssignedDataAttach(data.data.items);
    });
};
console.log(assignedDataAttach)

const onChangeAttachment = (e) => {
  const { value, name } = e.target;

  setAttachData({ ...attachData, [name]: value });
  console.log(value);
  console.log(name);
};
console.log(attachData);



const handleFileUpload = (file) => {
  if (file && file.size >= 1) {
    const fileUrl = URL.createObjectURL(file);
    setAttachData({
      ...attachData,
      attachments: fileUrl,
      filename: file.name,
    });
  } else {
    console.log("Invalid file size or type");
  }
};

const handleImagePreview = (file) => {
  if (file && file.type.indexOf("image") === 0) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgPreview = document.getElementById("imgPreview");
      imgPreview.src = reader.result;
    };
  }
};

const handleRemove = () => {
  setAttachData({
    attachments: "",
    filename: "",
  });
  const imgPreview = document.getElementById("imgPreview");
  imgPreview.src = "/images/icons/add-image-icon.svg";
};

const handleFormSubmitAttachment = (value) => {
  console.log(value);
  // e.preventDefault();
  axios
    .post(
      `${config.baseUrl}/customervendorattatchment/`,
      {
        attatch_name: attachData.attatch_name,
        attachments: attachData.attachments,
        customer_id: id,
        company_id: 1,
        created_by: 1,
        updated_by: 1,
      },
      value
    )
    .then((response) => {
      getAttachAssigedData();
      handleCancel();
      getAttachAssigedData();
      setAttachData({ attatch_name: "", attachments: "" });
      getAttachAssigedData();
      toast.success("Attachment Added Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    });
};
//#endregion

//#region validation

const {
  errors,
  values,
  handleBlur,
  touched,
  handleChange,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
} = useFormik({
  initialValues: bankData,

  validationSchema: bank,
  onSubmit: (values) => {
    console.log(values);
  },
});

//#endregion

//#region  Notes Data

const handleNotesOpen = () => 
{
  setCreateNoteActive(true);

}
const [notesData, setNotesData] = useState([]);


useEffect(() => {
  getNoteAssigedData();
}, [id]);

const getNoteAssigedData = () => {
  return fetch(`${config.baseUrl}/customervendornotes/?company_id=1&contact_id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.status === "success"){
        setNotesData(data.data.items);
      }
      else{
        setNotesData([]);
    }
    });
};

const handleCreateNote = (value) => {
  console.log(value)
  axios
      .post(
        `${config.baseUrl}/customervendornotes/`,
        {
          title: value.title,
          discription: value.description,
          contact_id: id,
          customer_id: 1,
          company_id:1,
          created_by: 1,
          updated_by: 1,  
        },
        value
      )
      .then((response) => {
        getNoteAssigedData();
        setCreateNoteActive(false);
        toast.success("Note Added Successfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
}

const handleDeleteNote = (id) => {
  axios.delete(`${config.baseUrl}/contactnotes/${id}/`).then((response) => {
    setDeleteRecord(null);
    toast.error("Note Deleted Successfuly", {
      border: "1px solid red",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    getNoteAssigedData();
  });
}

const handleUpdateNote = (value) => {
  console.log(value)
  axios.put(
    `${config.baseUrl}/contactnotes/` + value.id + "/",
    {
      "title": value.title,
      "discription":value.description,
      "contact_id": id,
      "company_id": 1,
      "created_by": 1,
      "updated_by": 1
    },
    value
  ).then((response) => 
  {
      
      getNoteAssigedData();
      // setUpdateNoteActive(false);
      // setIsEditing(false);/
    
      toast.success("Note Updated Successfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      
  })
}

//#endregion



//#region  assign contact Modal
useEffect(() => {
  getConatctStatus();
}, []);

const getConatctStatus = () => {
  return fetch(`${config.baseUrl}/master/`)
    .then((response) => response.json())
    .then((data) => {
      setContactStatusData(data.data.items);
      console.log(data);
    });
};

console.log(contactStatusData);

const getstatusdata = contactStatusData
.filter((place) => place.field === "Status" && place.module === "Contact_Status")
.map((place) => ({
  key: place.id,
  label: place.master_key,
  value: place.master_key,
}));



const contactDataSelectOptions = contactData.map((contact) => ({
   key: contact.id,
  label: (
    <div className="d-flex align-center gap-16">
      <div className="modal-name-char">VK</div>
    <div className="contact-data-container">
      <p className="business-name mb-0">{contact.name}</p>

      <p className="caption-md contact-title mb-">
        <span className="caption-md">{getstatusdata.find(
      (option) =>
        option.key === contact.status && option.label
    )?.label}</span>
      </p>
      <div className="d-flex justify-between mb-0">
        <p className="caption-md gstin-title">
         <span className="caption-md">{contact.email}</span>
        </p>
      </div>
    </div>
    </div>
  ),
   value: contact.name,
}));

useEffect (() => 
{
  getContatList();
},[])

const getContatList = () => {
  return fetch(`${config.baseUrl}/contact/`)
    .then((response) => response.json())
    .then((data) => {
      setContactData(data.data.items);
    });
};
console.log(contactData);

//#endregion
 
//#region

const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const shadowTop = card.parentElement.querySelector('.shadow-top');
    const shadowBottom = card.parentElement.querySelector('.shadow-bottom');

    function handleScroll() {
      shadowTop.style.opacity = card.scrollTop > 0 ? 1 : 0;
      shadowBottom.style.opacity =
        card.scrollHeight - card.scrollTop - card.clientHeight > 0 ? 1 : 0;
    }

    card.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check for shadows

    return () => {
      card.removeEventListener('scroll', handleScroll);
    };
  }, []);

//#endregion

return (
    <div className="vendor-preview-main">
      <Page_heading
        parent={"Business Account"}
        child={getCustomer.business_name ? getCustomer.business_name : typedata === "Customers" ? "Customers" : "Vendor"}
        subchild={
          <Link exact to="/business_account/customers">
            {"Customers"}
          </Link>
        }
        addEditBtn={
          activePage === "account_overview" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ) : activePage === "notes" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ) : activePage === "bank" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ) : activePage === "attachments" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ) : activePage === "address" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ) : activePage === "agent" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ):activePage === "transporter" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ):activePage === "contacts" ? (
            <div className="d-flex align-center gap-10">
              <div
                className="d-flex gap-8 align-center"
                style={{
                  borderRight: "1px solid #CBD5E0",
                  height: "30px",
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
              >
                <img src="/images/icons/delete-prmry-icon.svg" alt="" />{" "}
                <p className="sc-body-sb" style={{ color: "#5C5AD0" }}>
                  Delete
                </p>
              </div>
              <ContainedIconButton
                value={"Edit"}
                icon="/images/icons/edit-white-icon.svg"
              />
            </div>
          ):""
        }
      />

      <div className="card-table-container">
      <div className="card-content" >
        <div className="shadow-top"></div>
        <div className="shadow-bottom"></div>
        <div className="card-container" ref={cardRef}>
          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/account_overview`}>
          <div
            className={`card-btn ${activeTab === "account" && "active-btn"}`}
            onClick={() => setActiveTab("account")}
          >
            <div className="btn-title">
              <img src="/images/icons/!-icon.svg" alt="account" />
              <p className="subtitle-sb">Account Overview</p>
            </div>
            <p className="sc-body-rg">Overview of Account</p>
          </div>
          </NavLink>
          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/contacts`}>
          <div
            className={`card-btn ${activeTab === "contacts" && "active-btn"}`}
            onClick={() => setActiveTab("contacts")}
          >
            <div className="btn-title">
              <img src="/images/icons/contact-avtar-round.svg" alt="contact" />
              <p className="subtitle-sb">Contacts</p>
            </div>
            <p className="sc-body-rg">Assigned with Account</p>
          </div>
          </NavLink>
      {typedata === "Customers" &&
      <>
    
          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/agent`}>
          <div
            className={`card-btn ${activeTab === "agent" && "active-btn"}`}
            onClick={() => setActiveTab("agent")}
          >
            <div className="btn-title">
              <img src="/images/icons/contact-avtar-round.svg" alt="agent" />
              <p className="subtitle-sb">Agent Contacts</p>
            </div>
            <p className="sc-body-rg">Agent details</p>
          </div>
          </NavLink>


          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/transporter`}>
          <div
            className={`card-btn ${activeTab === "transporter" && "active-btn"}`}
            onClick={() => setActiveTab("transporter")}
          >
            <div className="btn-title">
              <img src="/images/icons/contact-avtar-round.svg" alt="tranporter" />
              <p className="subtitle-sb">Transporter Account</p>
            </div>
            <p className="sc-body-rg">Transporter Details</p>
          </div>
          </NavLink>
          </>
      }

          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/bank`}>
          <div
            className={`card-btn ${activeTab === "bank" && "active-btn"}`}
            onClick={() => setActiveTab("bank")}
          >
            <div className="btn-title">
              <img src="/images/icons/bank-icon.svg" alt="bank" />
              <p className="subtitle-sb">Banks</p>
            </div>
            <p className="sc-body-rg">Bank Details</p>
          </div>
          </NavLink>

          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/analytics`}>
          <div
            className={`card-btn ${activeTab === "analytics" && "active-btn"}`}
            onClick={() => setActiveTab("analytics")}
          >
            <div className="btn-title">
              <img src="/images/icons/analytics-icon.svg" alt="analytics" />
              <p className="subtitle-sb">Analystics</p>
            </div>
            <p className="sc-body-rg">Overview of Account</p>
          </div>
          </NavLink>


          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/address`}>
          <div
            className={`card-btn ${activeTab === "address" && "active-btn"}`}
            onClick={() => setActiveTab("address")}
          >
            <div className="btn-title">
              <img src="/images/icons/Address.svg" alt="address" />
              <p className="subtitle-sb">Addresses</p>
            </div>
            <p className="sc-body-rg">Billing & Shipping Address</p>
          </div>
          </NavLink>


          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/notes`}>
          <div
            className={`card-btn ${activeTab === "notes" && "active-btn"}`}
            onClick={() => setActiveTab("notes")}
          >
            <div className="btn-title">
              <img src="/images/icons/notes-icon.svg" alt="notes" />
              <p className="subtitle-sb">Notes</p>
            </div>
            <p className="sc-body-rg">Manage Informations</p>
          </div>
          </NavLink>


          <NavLink to={`/business_account/${typedata === "Customers"? "customers" : "vendors"}/customer_vendor_preview/${id}/attachments`}>
          <div
            className={`card-btn ${
              activeTab === "attachments" && "active-btn"
            }`}
            onClick={() => setActiveTab("attachments")}
          >
            <div className="btn-title">
              <img src="/images/icons/attachment-icon.svg" alt="attachment" />
              <p className="subtitle-sb">Attachments</p>
            </div>
            <p className="sc-body-rg">Manage Documents</p>
          </div>
          </NavLink>
        </div>
        </div>
        

        <div className="table-container">
          {activePage === "bank" && (
            <div style={{height:"72vh"}}>
            <div className="bank-details-container">
              {
                <div className="table-header">
                  <h1 className="title-sb">
                    Banks <span className="account-count">({bankDetails.length})</span>{" "}
                  </h1>

                  <p
                    className="sc-body-sb assign-account-btn"
                    onClick={() => {
                      setAddBankModal(true);
                    }}
                  >
                    + Add Bank
                  </p>
                </div>
              }
  
            {bankDetails.map((bank) => 
      
            
              // bankId == id  &&
           
              <div className="bank-account-details">
                <div className="left">
                  <img
                    src="/images/icons/Bank-logo.svg"
                    alt="logo"
                    className="bank-logo"
                  />
                  <div className="account-number">
                    <p className="subtitle-sb bank-name">{bank.bank_name}</p>
                    <p className="sc-body-rg account-title">
                      A/C No. <span className="sc-body-md">:{bank.account_number}</span>
                    </p>
                    <p className="sc-body-rg ifsc-title">
                      IFSC: <span className="sc-body-md">{bank.iFSC}</span>
                    </p>
                  </div>
                  {accountPrimary && <div className="primary-tag caption-sb">Primary</div>}
                </div>
                <div className="right">
                <div className="edit-remove-btn" onClick={()=> setAccountPrimary(true)}>
                    {/* <img src="/images/icons/edit-n-300.svg" alt="edit" /> */}
                    <p className="caption-sb">Set Primary</p>
                  </div>
                  <div className="edit-remove-btn" onClick={()=> setAddBankModal(true)}>
                    <img src="/images/icons/edit-n-300.svg" alt="edit" />
                    <p className="caption-sb">Edit</p>
                  </div>
                  <div className="edit-remove-btn" onClick={() => handleBankDelete(bank)}>
                    <img src="/images/icons/delete-n-300.svg" alt="delete" />
                    <p className="caption-sb">Remove</p>
                  </div>
                </div>
              </div>)
            }
               
                      <Modal
                open={addBankModal}
                width={"max-content"}
                onCancel={handleCancel}
                style={{ top: 0, height: "auto" }}
                className={"sales-order-modal"}
                footer={false}
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
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="sales-order-modal-container">
                
                  <div className="select-customer-container">
                    <h1 className="heading-sb">Add Bank</h1>
                    <p className="sc-body-rg title">
                      Fill the below details and add your bank.
                    </p>
                    <hr className="h-line" />

                    <div className="d-flex f-diraction-col gap-20">
                    <CustomInput
                        width={330}
                        label="IFSC"
                        placeholder="IFSC"
                        name="iFSC"
                        value={bankData.iFSC}
                        onChange={onhandleChangeBank}
                      />

                      <SearchSelect
                        width={330}
                        placeholder="Bank"
                        label="Bank"
                        icon="/images/icons/bank-icon.svg"
                        name="bank_name"
                        value={bankData.bank_name}
                        onChange={onhandleChangeBank}
                      />
                      <CustomInput
                        width={330}
                        label="Account No."
                        placeholder="Account No."
                        name="account_number"
                        value={bankData.account_number}
                       // onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => {onhandleChangeBank(e) ; handleChange(e)}}
                        error={errors.account_number && touched.account_number ? true : false}
                         errorMsg={errors.account_number}
                      />
                      <CustomInput
                        width={330}
                        label="Re-enter Account No."
                        placeholder="Re-enter Account No."
                        name="re_account"
                        value={bankData.re_account}
                        onBlur={handleBlur}
                        onChange={(e) => {onhandleChangeBank(e) ; handleChange(e)}}
                        error={errors.re_account && touched.re_account || errorMessage ? true : false}
                        errorMsg={errors.re_account || "Account is not same"}
                        //{errorMessage && <p className="error-message">{errorMessage}</p>}
                      />
                      <CustomInput
                        width={330}
                        label="Branch"
                        placeholder="Branch Name"
                        name="branch"
                        value={bankData.branch}
                        onChange={onhandleChangeBank}
                      />
                      <div className="d-flex gap-16 mt-10">
                        <ContainedButton value="Add Bank" type="submit"
                        onClick={handleFormSubmit}
                        />
                        <ContainedSecondaryButton
                          value="Cancel"
                          onClick={handleCancel}
                        />
                      </div>
                    </div>
                  </div>
                
                </div>
                </form>
              </Modal>
            </div>
            </div>
          )}

          {activePage === "account_overview" && (
            <div className="account-overview-container">
              <div className="business-name-container">
                <div className="left">
                  <img src="/images/icons/reformiqo-logo.svg" alt="" />
                </div>
                <div className="right">
                  <div className="date-container">
                    <img
                      src="/images/icons/calendar-svg-n400.svg"
                      alt="calendar"
                      className="calendar-icon"
                    />
                    <p className="date-time sc-body-md">{formattedDate}</p>
                  </div>
                  <p className="sc-body-md created-by">
                    Created by Ashish Jaria
                  </p>
                </div>
              </div>

              <div className="account-details">
                <p className="subtitle-sb heading">Account Details</p>
                <div className="account-details-container">
                  <div className="d-line">
                    <p className="sc-body-rg title">GST Treatment</p>
                    <p className="sc-body-sb value">Registered</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">GSTIN</p>
                    <p className="sc-body-sb value">{getCustomer.gstin ? getCustomer.gstin : "--"}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Customer Type</p>
                    <p className="sc-body-sb value">Wholesaler</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Currency</p>
                    <p className="sc-body-sb value">{currencydata ? currencydata : "--"}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Commission Terms</p>
                    <p className="sc-body-sb value">{commissiondata ? commissiondata :"--"}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Payment Terms</p>
                    <p className="sc-body-sb value">{paymentdata ? paymentdata :"--"}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">TAN No.</p>
                    <p className="sc-body-sb value">{getCustomer.tan_no ? getCustomer.tan_no :"--"}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Credit limit</p>
                    <p className="sc-body-sb value"> {getCustomer.credit_limit ? `₹ ${getCustomer.credit_limit}` : "--" }</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Email</p>
                    <p className="sc-body-sb value">{getCustomer.email ? getCustomer.email :"--"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "contacts" && (
            <div className="contact-preview-table-container">
              <div className="filter-searchbar-container">
                {activePage !== `${"account_overview" || "bank"}` && (
                  <div className="table-header">
                    <h1 className="title-sb">
                      {activePage === "contacts"
                        ? "Contacts"
                        : activePage === "analytics"
                        ? "Analytics"
                        : activePage === "notes"
                        ? "Notes"
                        : activePage === "attachments"
                        ? "Attachment"
                        : activePage === "timeline" && "Timeline"}{" "}
                      {activePage === "contacts" && (
                        <span className="account-count">(4)</span>
                      )}{" "}
                    </h1>
                    
                    {activePage === "contacts" ? (
                      <p
                        className="sc-body-sb assign-account-btn"
                        onClick={() => setAssignContactModal(true)}
                      >
                        + Assign Contact
                      </p>
                    ) : activePage === "notes" ? (
                      <p
                        className="sc-body-sb assign-account-btn"
                        onClick={() => setCreateNoteActive(true)}
                      >
                        + Add Notes
                      </p>
                    ) : activePage === "attachments" ? (
                      <p
                        className="sc-body-sb assign-account-btn d-flex align-center"
                        onClick={() => {
                          setAttachmentsModal(true);
                        }}
                      >
                        <img
                          src="/images/icons/attachment-icon-prmry.svg"
                          alt=""
                        />{" "}
                        New Attachments
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                <FilterAndSearchBar
                  getPopupContainer={(trigger) => trigger.parentElement}
                  filterdata={[
                    <div className="contact_filter_container">
                      <div
                        className="customer_filter_filed"
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                      >
                        <Tooltip title="prompt text" color="#5C5AD0">
                          {" "}
                          <label className="label">Ownership</label>{" "}
                        </Tooltip>
                        <SearchDropdown
                          width={330}
                          name="ownership"
                          value={custfilter.ownership}
                          options={ownership}
                          onChange={handleChange1}
                        />
                      </div>
                    </div>,
                  ]}
                  change={filterarray}
                  onSelectColumn={handleSelectColumn}
                  customer={fetchlead.length}
                  filterLength={filterarray.length}
                  columns={columns}
                  setColumns={setColumns}
                  // addBtnName={"Edit"}
                  onData={handleData}
                  path={"add_sales"}
                  //   filter={<Leads />}
                  onFilter={(e) => {
                    clearfilter(e);
                    setVisible(!visible);
                  }}
                  // activeMode={
                  //   <div className="filter-and-searchbar-delete-btn">
                  //     <img
                  //       src="/images/icons/delete-prmry-icon.svg"
                  //       alt="delete"
                  //     />
                  //     <p className="sc-body-sb delete-text">Delete</p>
                  //   </div>
                  // }
                />
              </div>
              <div className="tableData">
                {filterarray.length > 0 && (
                  <div className="tags" id="tags">
                    <div className="appliedtag ">Filtered by </div>
                    {filterarray.map((customerfilter, index) => {
                      return (
                        customerfilter.value && (
                          <Tooltip
                            className="tlpclr"
                            id="tlpclr"
                            title={`${
                              (customerfilter.key === "lead" && "Lead") ||
                              (customerfilter.key === "ownership" &&
                                "Ownership")
                            } : ${customerfilter.value}`}
                            color="#EBECF0"
                          >
                            <Tag
                              key={customerfilter.key}
                              className="tag1"
                              closable
                              closeIcon={
                                <img
                                  src="images/icons/tag_close_icon.svg"
                                  style={{ marginLeft: "4px" }}
                                />
                              }
                              onClose={(e) => {
                                log(index, customerfilter.key);
                              }}
                            >
                              {customerfilter.value}
                            </Tag>
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
                  rowSelection={{
                    type: "checkbox",
                    columnTitle: "",
                    selectedRowKeys,
                    columnWidth: "40px",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRowKeys(selectedRowKeys);
                      setSelectedRows(selectedRows);
                    },
                  }}
                  scroll={{ x: "800px" }}
                  dataSource={filteredData}
                  columns={columns}
                  pagination={
                    !loading && {
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                      total: cusomizeData.length,
                      showTotal: (total, range) =>
                        `Showing ${range[1]}-${range[1]} of ${total} Leads`,
                    }
                  }
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
                        // onClick={handleSubmit}
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
                          <img
                            src={alert}
                            style={{ width: "38px", height: "38px" }}
                          />
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
                          Delete Lead
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="confirmationtext">
                        Are you sure you want to close this window? <br /> All
                        the value which you filled in the fields will be
                        deleted.
                        <br /> This action cannot recover the value.
                      </p>
                    </div>
                  </div>
                </Modal>

                <Modal
                  open={assignContactModal}
                  //   onOk={handleMaterialOk}
                  width={"max-content"}
                  onCancel={handleCancel}
                  style={{ top: 0, height: "auto" }}
                  className={"sales-order-modal"}
                  footer={false}
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
                
                  <div className="sales-order-modal-container">
                    <div className="select-customer-container">
                      <h1 className="heading-sb">Contact Account</h1>
                      <p className="sc-body-rg title">
                        Choose contact account by considering the details
                      </p>
                      <hr className="h-line" />

                      <SearchSelect
                        width={381}
                        height={400}
                        label="Contact Account"
                        placeholder="Contact Account"
                        icon="/images/icons/customer-contact-icon.svg"
                        options={contactDataSelectOptions}
                        // onChange={handleDrpChangeStatus}
                        name="business_name"
                        //  value={formData.business_name}
                      //  value={formData.customer_vendor_id}
                        //  value={
                        //   customerDataSelectOptions.find(
                        //     (option) =>
                        //       option.key === formData.business_name && option.label
                        //   )?.label
                        // }
                        inputProps={{ "data-testid": "select-input" }}
                      />
                    </div>
                    {isCustomerSelected && (
                      <div>
                        <div className="customer-account-details-container">
                          <div className="customer-details">
                            <img
                              className="company-icon"
                              src="/images/icons/logo-customer.svg"
                              alt=""
                            />
                            <div className="company-name-container">
                              <div className="company-name">
                                <h3 className="subtitle-sb">
                                  {singleCusVen.business_name}
                                </h3>
                                <img
                                  src="/images/icons/redirect-icon.svg"
                                  alt="icon"
                                />
                              </div>
                              <p className="customer-address sc-body-rg">
                                G-2, Ground Floor, InternationalBusiness Center,
                                Near Rahul Raj Mall Piplod, Surat Gujarat -
                                395007, Gujarat, India
                              </p>
                              <p></p>
                            </div>
                          </div>
                        </div>

                        <div className="outstanding-unused-container">
                          <div className="outstansing-container">
                            <p className="sc-body-rg title">
                              Outstanding Amount
                            </p>
                            <p className="subtitle-sb amount">₹ 60,200.00</p>
                          </div>
                          <div className="unused-container">
                            <p className="sc-body-rg title">Unused Credits</p>
                            <p className="subtitle-sb amount">₹ 0.00</p>
                          </div>
                        </div>

                        <div className="customer-details-container">
                          <hr className="h-line" />
                          <div className="gst-treatment d-flex">
                            <p className="sc-body-rg title">GST Treatment</p>
                            <p className="sc-body-sb">
                              {singleCusVen.registration_type === 1 ? "Registered Business" : "Registered Business" }
                            </p>
                          </div>
                          <div className="gstin d-flex">
                            <p className="sc-body-rg title">GSTIN</p>
                            <p className="sc-body-sb">{singleCusVen.gstin}</p>
                          </div>
                          <div className="email d-flex">
                            <p className="sc-body-rg title">Email</p>
                            <p className="sc-body-sb">{singleCusVen.email ? singleCusVen.email : "--"}</p>
                          </div>
                          <div className="pancard d-flex">
                            <p className="sc-body-rg title">TAN No.</p>
                            <p className="sc-body-sb">{singleCusVen.tan_no ? singleCusVen.tan_no : "--"}</p>
                          </div>
                          <div className="type d-flex">
                            <p className="sc-body-rg title">Type</p>
                            <p className="sc-body-sb">{}</p>
                          </div>
                          <div className="category d-flex">
                            <p className="sc-body-rg title">Category</p>
                            <p className="sc-body-sb">{typecategorydata}</p>
                          </div>
                          <div className="currency d-flex">
                            <p className="sc-body-rg title">Currency</p>
                            <p className="sc-body-sb">{currencydata ? currencydata : "--"}</p>
                          </div>
                          <div className="payment-terms d-flex">
                            <p className="sc-body-rg title">Payment Terms</p>
                            <p className="sc-body-sb">{paymentdata ?paymentdata :"--"}</p>
                          </div>
                          <div className="credit-limit d-flex">
                            <p className="sc-body-rg title">Credit Limit</p>
                            <p className="sc-body-sb">
                              {singleCusVen.credit_limit ? singleCusVen.credit_limit:"--"}
                            </p>
                          </div>
                        </div>

                        <div className="buttons-container">
                          <ContainedButton
                            type="submit"
                            value="Assign"
                            onClick={handleFormSubmit}
                          />
                          <ContainedSecondaryButton
                            value="Cancel"
                            onClick={handleCancel}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* } */}
                </Modal>
              </div>
            </div>
          )}
    {typedata === "Customers" &&
    <>
          {activePage === "agent" && (
            <div className="contact-preview-table-container">
              <div className="filter-searchbar-container">
                {activePage === "agent" && (
                  <div className="table-header">
                    <h1 className="title-sb">
                    Agent Contacts
                  
                        <span className="account-count"> (4)</span>
                    </h1>
                   

                      <p
                        className="sc-body-sb assign-account-btn"
                        onClick={() => setSalesOrderModal(true)}
                      >
                        + Assign Contact
                      </p>
                  </div>
                )}
                <FilterAndSearchBar
                  getPopupContainer={(trigger) => trigger.parentElement}
                  filterdata={[
                    <div className="contact_filter_container">
                      <div
                        className="customer_filter_filed"
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                      >
                        <Tooltip title="prompt text" color="#5C5AD0">
                          {" "}
                          <label className="label">Ownership</label>{" "}
                        </Tooltip>
                        <SearchDropdown
                          width={330}
                          name="ownership"
                          value={custfilter.ownership}
                          options={ownership}
                          onChange={handleChange1}
                        />
                      </div>
                    </div>,
                  ]}
                  change={filterarray}
                  onSelectColumn={handleSelectColumn}
                  customer={fetchlead.length}
                  filterLength={filterarray.length}
                  columns={columns}
                  setColumns={setColumns}
                  onData={handleData}
                  path={"add_sales"}
                  //   filter={<Leads />}
                  onFilter={(e) => {
                    clearfilter(e);
                    setVisible(!visible);
                  }}
                />
              </div>
              <div className="tableData">
                {filterarray.length > 0 && (
                  <div className="tags" id="tags">
                    <div className="appliedtag ">Filtered by </div>
                    {filterarray.map((customerfilter, index) => {
                      return (
                        customerfilter.value && (
                          <Tooltip
                            className="tlpclr"
                            id="tlpclr"
                            title={`${
                              (customerfilter.key === "lead" && "Lead") ||
                              (customerfilter.key === "ownership" &&
                                "Ownership")
                            } : ${customerfilter.value}`}
                            color="#EBECF0"
                          >
                            <Tag
                              key={customerfilter.key}
                              className="tag1"
                              closable
                              closeIcon={
                                <img
                                  src="images/icons/tag_close_icon.svg"
                                  style={{ marginLeft: "4px" }}
                                />
                              }
                              onClose={(e) => {
                                log(index, customerfilter.key);
                              }}
                            >
                              {customerfilter.value}
                            </Tag>
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
                  rowSelection={{
                    type: "checkbox",
                    columnTitle: "",
                    selectedRowKeys,
                    columnWidth: "40px",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRowKeys(selectedRowKeys);
                      setSelectedRows(selectedRows);
                    },
                  }}
                  scroll={{ x: "800px" }}
                  dataSource={filteredData}
                  columns={columns}
                  pagination={
                    !loading && {
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                      total: cusomizeData.length,
                      showTotal: (total, range) =>
                        `Showing ${range[1]}-${range[1]} of ${total} Leads`,
                    }
                  }
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
                        // onClick={handleSubmit}
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
                          <img
                            src={alert}
                            style={{ width: "38px", height: "38px" }}
                          />
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
                          Delete Lead
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="confirmationtext">
                        Are you sure you want to close this window? <br /> All
                        the value which you filled in the fields will be
                        deleted.
                        <br /> This action cannot recover the value.
                      </p>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          )}

          {activePage === "transporter" && (
            <div className="contact-preview-table-container">
              <div className="filter-searchbar-container">
                {activePage === "transporter" && (
                  <div className="table-header">
                    <h1 className="title-sb">
                    Transporter Account
                  
                        <span className="account-count"> (4)</span>
                    </h1>
                   

                      <p
                        className="sc-body-sb assign-account-btn"
                        onClick={() => setSalesOrderModal(true)}
                      >
                        + Assign Account
                      </p>
                  </div>
                )}
                <FilterAndSearchBar
                  getPopupContainer={(trigger) => trigger.parentElement}
                  filterdata={[
                    <div className="contact_filter_container">
                      <div
                        className="customer_filter_filed"
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                      >
                        <Tooltip title="prompt text" color="#5C5AD0">
                          {" "}
                          <label className="label">Ownership</label>{" "}
                        </Tooltip>
                        <SearchDropdown
                          width={330}
                          name="ownership"
                          value={custfilter.ownership}
                          options={ownership}
                          onChange={handleChange1}
                        />
                      </div>
                    </div>,
                  ]}
                  change={filterarray}
                  onSelectColumn={handleSelectColumn}
                  customer={fetchlead.length}
                  filterLength={filterarray.length}
                  columns={columns}
                  setColumns={setColumns}
                  onData={handleData}
                  path={"add_sales"}
                  //   filter={<Leads />}
                  onFilter={(e) => {
                    clearfilter(e);
                    setVisible(!visible);
                  }}
                />
              </div>
              <div className="tableData">
                {filterarray.length > 0 && (
                  <div className="tags" id="tags">
                    <div className="appliedtag ">Filtered by </div>
                    {filterarray.map((customerfilter, index) => {
                      return (
                        customerfilter.value && (
                          <Tooltip
                            className="tlpclr"
                            id="tlpclr"
                            title={`${
                              (customerfilter.key === "lead" && "Lead") ||
                              (customerfilter.key === "ownership" &&
                                "Ownership")
                            } : ${customerfilter.value}`}
                            color="#EBECF0"
                          >
                            <Tag
                              key={customerfilter.key}
                              className="tag1"
                              closable
                              closeIcon={
                                <img
                                  src="images/icons/tag_close_icon.svg"
                                  style={{ marginLeft: "4px" }}
                                />
                              }
                              onClose={(e) => {
                                log(index, customerfilter.key);
                              }}
                            >
                              {customerfilter.value}
                            </Tag>
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
                  rowSelection={{
                    type: "checkbox",
                    columnTitle: "",
                    selectedRowKeys,
                    columnWidth: "40px",
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRowKeys(selectedRowKeys);
                      setSelectedRows(selectedRows);
                    },
                  }}
                  scroll={{ x: "800px" }}
                  dataSource={filteredData}
                  columns={columns}
                  pagination={
                    !loading && {
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                      total: cusomizeData.length,
                      showTotal: (total, range) =>
                        `Showing ${range[1]}-${range[1]} of ${total} Leads`,
                    }
                  }
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
                        // onClick={handleSubmit}
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
                          <img
                            src={alert}
                            style={{ width: "38px", height: "38px" }}
                          />
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
                          Delete Lead
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="confirmationtext">
                        Are you sure you want to close this window? <br /> All
                        the value which you filled in the fields will be
                        deleted.
                        <br /> This action cannot recover the value.
                      </p>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          )}
          </>
          }

          {activePage === "address" && (
            <div className="address-container">
              {
                <div className="table-header mb-20">
                  <h1 className="title-sb">
                    Address <span className="account-count">({addressDetails.length})</span>
                  </h1>
                </div>
              }

              <div className="address-container-card-main">
                <div className="add-new-address-btn" onClick={()=>setAddAddressModal(true)}>
                  <div className="add-icon">
                    <img src="/images/icons/add-img-icon.svg" alt="add" />
                  </div>
                  <p className="subtitle-md title">Add new address</p>
                </div>
                {addressDetails.map((address, index) =>

                <>
                
                <div className="address-container-card">
                  <p className="subtitle-sb address-heading">Address {index+1}</p>
                  <p className="address sc-body-rg mt-10">
                   {address.street1} {" "}
                   {address.street2}, <br /> {pincodeWiseArea.map((city) => address.pincode === city.id && city.district)} <br /> 
                   {pincodeWiseArea.map((city) => address.pincode === city.id && city.state_name)} -
                   {pincodeWiseArea.map((city) => address.pincode === city.id && city.pincode)}<br /> 
                   {pincodeWiseArea.map((city) => address.pincode === city.id && city.country)}
                  </p>

                  <div className="edit-delete-btn">
                    <div className="edit-remove-btn" onClick={() => handleUpdate(address)}>
                      <img src="/images/icons/edit-n-300.svg" alt="edit" />
                      <p className="caption-sb">Edit</p>
                    </div>
                    <div className="edit-remove-btn" onClick={()=> handleAddressDelete(address)}>
                      <img src="/images/icons/delete-n-300.svg" alt="delete" />
                      <p className="caption-sb">Remove</p>
                    </div>
                  </div>

                  <div className="tag-container">
                    <div className="tag caption-sb">Billing</div>
                    <div className="tag caption-sb">Shipping</div>
                    <div className="tag caption-sb">Primary</div>
                  </div>
                </div>
                </>
                 )}

             
              </div>
              <Modal
                open={addAddressModal}
                width={"max-content"}
                onCancel={handleCancel}
                style={{ top: 0, height: "auto" }}
                className={"sales-order-modal"}
                footer={false}
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
                <div className="sales-order-modal-container">
                  <div className="select-customer-container">
                    <h1 className="heading-sb">{addressDetails.id ? "Update Shipping Address" : "Add Shipping Address"}</h1>
                    <p className="sc-body-rg title">
                   {addressDetails.id?  "Update Shipping Address" : "Add Shipping address"}
                    </p>
                    <hr className="h-line" />

                    <div className="d-flex gap-20" style={{maxWidth:"680px", flexWrap:"wrap"}}>
                      <CustomInput
                        width={330}
                        label="Street 1"
                        icon="/images/icons/location-icon.svg"
                        name="street1"
                        value={addAddressDetails.street1}
                        onChange={onAddressDataChange}
                      />
                      <CustomInput
                        width={330}
                        label="City"
                        disabled
                        name="city"
                        value={addAddressDetails.city}
                      />
                      <CustomInput
                        width={330}
                        label="Street 2"
                        icon="/images/icons/location-icon.svg"
                        name="street2"
                        value={addAddressDetails.street2}
                        onChange={onAddressDataChange}
                      />
                      <CustomInput
                        width={330}
                        label="State"
                        disabled
                        name="state"
                        value={addAddressDetails.state}
                      />
                        <CustomInput
                        width={330}
                        label="Pincode"
                        icon="/images/icons/Pincode_Area.svg"
                        placeholder="395007"
                        name="pincode"
                        value={addAddressDetails.pincode}
                        onChange={onAddressDataChange}
                      />
                      <CustomInput
                        width={330}
                        label="Country"
                        disabled
                        name="country"
                        value={addAddressDetails.country}
                      />
                    
                        <SearchSelect 
                          width={330}
                          placeholder="Area"
                          name="area"
                          options={getPincodeAreaData}
                          value={
                            getPincodeAreaData.find(
                              (option) =>
                                option.key === addAddressDetails.area && option.label
                            )?.label
                          }
                         onChange={handleDrpChangePincode}
                          label="Area"
                          // error={!formData.area && errors.area && touched.area ? true : false}
                          // errorMsg={!formData.area && errors.area}
                          />
                    </div>
                    <div className="d-flex gap-16 mt-30">
                        <ContainedButton value={addressDetails.id ? "Update" : "Save"} onClick={handleAddAddress} />
                        <ContainedSecondaryButton
                          value="Cancel"
                          onClick={handleCancel}
                        />
                      </div>
                  </div>
                </div>
              </Modal>
            </div>
          )}

          {activePage === "attachments" && (
            <div>
              {
                <div className="table-header mb-20">
                  <h1 className="title-sb">
                  Attachment
                    <span className="account-count"> ({assignedDataAttach.length})</span>
                  </h1>
                  <p
                    className="sc-body-sb assign-account-btn d-flex align-center"
                    onClick={() => {
                      setAttachmentsModal(true);
                    }}
                  >
                    <img src="/images/icons/attachment-icon-prmry.svg" alt="" />{" "}
                    New Attachments
                  </p>
                </div>
              }

              <AttachmentFile getData={assignedDataAttach}/>
            </div>
          )}
          {activePage === "notes" && (
            <div>
              {
                <div className="table-header mb-20">
                  <h1 className="title-sb">
                  Notes
                    <span className="account-count">({notesData.length})</span>
                  </h1>
                  <p
                    className="sc-body-sb assign-account-btn d-flex align-center"
                    onClick={() => {
                      setCreateNoteActive(true);
                    }}
                  >
                    + Add Note
                  </p>
                </div>
              }
            <Notes
              createNoteActive={createNoteActive}
              openNotes={handleNotesOpen}
              createNoteFalse={createNoteFalse}
              notesData={notesData}
              noteBy={getCustomer.name}
              handleCreate={handleCreateNote}
              handleDelete={handleDeleteNote}
              handleUpdate={handleUpdateNote}
            />
            </div>
          )}

            <Modal
              open={addressDeleteModal}
              //   onOk={handleMaterialOk}
              width={"max-content"}
              onCancel={handleDeleteAddCancel}
              style={{ top: 20 }}
              className={"deleteconfirm"}
              footer={false}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <img
                  src="\images\icons\confirmation-alert-delete.svg"
                  style={{ width: "46px", height: "46px" }}
                />
                <p className="mt-20 heading-sb">Delete Address</p>
                <p className="sc-body-rg mt-10">
                  Are you sure you want to delete selected Address?
                </p>
                <div className="delete-cancel-btn d-flex gap-16 mt-30">
                  <ContainedButton
                    value="Delete"
                    onClick={handleSubmitAddress}
                    color="danger"
                  />
                  <ContainedSecondaryButton
                    value="Cancel"
                    onClick={handleDeleteAddCancel}
                  />
                </div>
                <div></div>
              </div>
            </Modal>

            <Modal
              open={bankDeleteModal}
              //   onOk={handleMaterialOk}
              width={"max-content"}
              onCancel={handleDeleteCancel}
              style={{ top: 20 }}
              className={"deleteconfirm"}
              footer={false}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <img
                  src="\images\icons\confirmation-alert-delete.svg"
                  style={{ width: "46px", height: "46px" }}
                />
                <p className="mt-20 heading-sb">Delete Bank</p>
                <p className="sc-body-rg mt-10">
                  Are you sure you want to delete selected Bank?
                </p>
                <div className="delete-cancel-btn d-flex gap-16 mt-30">
                  <ContainedButton
                    value="Delete"
                    onClick={handleSubmitBank}
                    color="danger"
                  />
                  <ContainedSecondaryButton
                    value="Cancel"
                    onClick={handleDeleteCancel}
                  />
                </div>
                <div></div>
              </div>
            </Modal>

          <Modal
            open={attachmentsModal}
            //   onOk={handleMaterialOk}
            width={"max-content"}
            onCancel={handleCancel}
            style={{ top: 0, height: "auto" }}
            className={"sales-order-modal"}
            footer={false}
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
            {
              <div className="sales-order-modal-container">
                <div className="sales-type-container">
                  <h1 className="heading-sb">New Attachment</h1>
                  <p className="sc-body-rg mt-10 title">Attach Document</p>
                  <hr className="h-line" />
                  {attachData.attachments &&<div
                      style={{
                        border: "1.5px dashed #CBD5E0",
                        borderRadius: "6px",
                        width: "328px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                        height:"202px",
                        justifyContent:"center",
                        // overflow:"hidden",
                        position:"relative"
                      }}
                    >
                      <div style={{position:"absolute", top:"-10px", background:"#00000080", color:"#fff",cursor:"pointer", width:"24px", height:"24px", borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",right:"-10px"}} onClick={handleRemove}>X</div>
                      {attachData.attachments && <div style={{width:"100%",height:"100%"}}>
                          <img src={attachData.attachments} alt="logo" style={{width:"100%",height:"100%", objectFit:"cover"}} />
                        </div>}
                        </div>}
                  <Upload
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                    showUploadList={false}
                    onChange={(info) => {
                      const file = info.file.originFileObj;
                      handleFileUpload(file);
                      handleImagePreview(file);
                    }}
                    onRemove={handleRemove}
                  >
                    {!attachData.attachments &&<div
                      style={{
                        border: "1.5px dashed #CBD5E0",
                        borderRadius: "6px",
                        width: "328px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                        cursor:"pointer",
                        height:"202px",
                        justifyContent:"center",
                        overflow:"hidden",
                      }}
                    >
                      { !attachData.attachments && <> <img
                          src="/images/icons/add-image-icon.svg"
                          alt="icon"
                          id="imgPreview"
                          className="mb-10"
                          style={{width:"44px",height:"44px"}}
                        />
                      
                          <p className="mb-10 sc-body-sb">
                            Drop files here or click to upload
                          </p>
                        <p className="caption-md" style={{ maxWidth: "160px" }}>
                          You Can add up to{" "}
                          <span
                            className="caption-sb"
                            style={{ color: "#465468" }}
                          >
                            6 Images
                          </span>{" "}
                          each not exceeding{" "}
                          <span
                            className="caption-sb"
                            style={{ color: "#465468" }}
                          >
                            1 MB.
                          </span>
                        </p>
                        </>}
                    </div>}
                  </Upload>
                 <CustomInput
                    width={330}
                    label="Attachment Name"
                    placeholder="Name"
                    onChange={onChangeAttachment}
                    name="attatch_name"
                    value={attachData.attatch_name}
                  />
                  <div className="btn-container d-flex mt-30 gap-16">
                  <ContainedButton
                      value="Upload"
                      onClick={handleFormSubmitAttachment}
                    />
                    <ContainedSecondaryButton
                      value="Cancel"
                      onClick={handleCancel}
                    />
                  </div>
                </div>
              </div>
            }
          </Modal>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default VendorPreview;
