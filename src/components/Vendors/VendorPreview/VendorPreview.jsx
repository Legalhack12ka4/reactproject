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


  const { id } = useParams();





  console.log(bankDeleteModal)
  
  console.log(id)
  //handlecancel

  const handleCancel = () => {
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

  const handleSubmit = () => {
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
    getPincodeArea();
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

  const getPincodeArea = () => {
    return fetch(`${config.baseUrl}/pincode/${singleAddress}`)
      .then((response) => response.json())

      .then((data) => {
        setCusVenPincode(data);
        console.log(data);
      });
  };

  console.log(cusvenPincode);

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
        setStatus(data);
        console.log(data);
      });
  };
  console.log(id)
  //type category of cuatomer/vendor

  // const getcategorydata = status
  // .filter((place) => place.field === "c_type" || "v_type" && place.module === "Customer" || "Vendor" )
  // .map((place) => ({
  //   key: place.id,
  //   label: place.master_key,
  //   value: place.master_key,
  // }));
  console.log(status);
  // console.log(getcategorydata)

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
  return (
    <div className="vendor-preview-main">
      <Page_heading
        parent={"Business Account"}
        child={getCustomer.business_name ? getCustomer.business_name : ""}
        subchild={
          <Link exact to="/customers">
            {"Customer"}
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
        <div className="card-container">
          <NavLink to={`/customers/customer_vendor_preview/${id}/account_overview`}>
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
          <NavLink to={`/customers/customer_vendor_preview/${id}/contacts`}>
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
          <NavLink to={`/customers/customer_vendor_preview/${id}/agent`}>
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


          <NavLink to={`/customers/customer_vendor_preview/${id}/transporter`}>
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


          <NavLink to={`/customers/customer_vendor_preview/${id}/bank`}>
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

          <NavLink to={`/customers/customer_vendor_preview/${id}/analytics`}>
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


          <NavLink to={`/customers/customer_vendor_preview/${id}/address`}>
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


          <NavLink to={`/customers/customer_vendor_preview/${id}/notes`}>
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


          <NavLink to={`/customers/customer_vendor_preview/${id}/attachments`}>
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
        

        <div className="table-container">
          {activePage === "bank" && (
            <div className="bank-details-container">
              {
                <div className="table-header">
                  <h1 className="title-sb">
                    Banks <span className="account-count">(4)</span>{" "}
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

              <div className="bank-account-details">
                <div className="left">
                  <img
                    src="/images/icons/Bank-logo.svg"
                    alt="logo"
                    className="bank-logo"
                  />
                  <div className="account-number">
                    <p className="subtitle-sb bank-name">Bank Of Baroda</p>
                    <p className="sc-body-rg account-title">
                      A/C No. <span className="sc-body-md">: 00112345678</span>
                    </p>
                    <p className="sc-body-rg ifsc-title">
                      IFSC: <span className="sc-body-md">BARB0CALICU</span>
                    </p>
                  </div>
                  <div className="primary-tag caption-sb">Primary</div>
                </div>
                <div className="right">
                  <div className="edit-remove-btn" onClick={()=> setAddBankModal(true)}>
                    <img src="/images/icons/edit-n-300.svg" alt="edit" />
                    <p className="caption-sb">Edit</p>
                  </div>
                  <div className="edit-remove-btn" onClick={()=> setBankDeleteModal(true)}>
                    <img src="/images/icons/delete-n-300.svg" alt="delete" />
                    <p className="caption-sb">Remove</p>
                  </div>
                </div>
              </div>

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
                <div className="sales-order-modal-container">
                  <div className="select-customer-container">
                    <h1 className="heading-sb">Add Bank</h1>
                    <p className="sc-body-rg title">
                      Fill the below details and add your bank.
                    </p>
                    <hr className="h-line" />

                    <div className="d-flex f-diraction-col gap-20">
                      <SearchSelect
                        width={330}
                        placeholder="Bank"
                        label="Bank"
                        icon="/images/icons/bank-icon.svg"
                      />
                      <CustomInput
                        width={330}
                        label="Account No."
                        placeholder="Account No."
                      />
                      <CustomInput
                        width={330}
                        label="Re-enter Account No."
                        placeholder="Re-enter Account No."
                      />
                      <CustomInput
                        width={330}
                        label="IFSC"
                        placeholder="IFSC"
                      />
                      <div className="d-flex gap-16 mt-10">
                        <ContainedButton value="Add Bank" />
                        <ContainedSecondaryButton
                          value="Cancel"
                          onClick={handleCancel}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
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
                    <p className="date-time sc-body-md">12 March, 10:00 AM</p>
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
                    <p className="sc-body-sb value">{getCustomer.gstin}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Customer Type</p>
                    <p className="sc-body-sb value">Wholesaler</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Currency</p>
                    <p className="sc-body-sb value">{currencydata}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Commission Terms</p>
                    <p className="sc-body-sb value">{commissiondata}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Payment Terms</p>
                    <p className="sc-body-sb value">{paymentdata}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">TAN No.</p>
                    <p className="sc-body-sb value">{getCustomer.tan_no}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Credit limit</p>
                    <p className="sc-body-sb value">₹ {getCustomer.credit_limit}</p>
                  </div>

                  <div className="d-line">
                    <p className="sc-body-rg title">Email</p>
                    <p className="sc-body-sb value">{getCustomer.email}</p>
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
                        onClick={() => setSalesOrderModal(true)}
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
                          onChange={handleChange}
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
              </div>
            </div>
          )}

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
                          onChange={handleChange}
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
                          onChange={handleChange}
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

          {activePage === "address" && (
            <div className="address-container">
              {
                <div className="table-header mb-20">
                  <h1 className="title-sb">
                    Address <span className="account-count">(2)</span>
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

                <div className="address-container-card">
                  <p className="subtitle-sb address-heading">Address 1</p>
                  <p className="address sc-body-rg mt-10">
                    G-2, Ground Floor, International Business Center, <br />{" "}
                    Near Rahul Raj Mall Piplod <br /> Surat <br /> Gujarat -
                    395007 <br /> India
                  </p>

                  <div className="edit-delete-btn">
                    <div className="edit-remove-btn" onClick={()=>setAddAddressModal(true)}>
                      <img src="/images/icons/edit-n-300.svg" alt="edit" />
                      <p className="caption-sb">Edit</p>
                    </div>
                    <div className="edit-remove-btn" onClick={()=> setAddressDeleteModal(true)}>
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

                <div className="address-container-card">
                  <p className="subtitle-sb address-heading">Address 2</p>
                  <p className="address sc-body-rg mt-10">
                    G-2, Ground Floor, International Business Center, <br />{" "}
                    Near Rahul Raj Mall Piplod <br /> Surat <br /> Gujarat -
                    395007 <br /> India
                  </p>

                  <div className="edit-delete-btn">
                    <div className="edit-remove-btn">
                      <img src="/images/icons/edit-n-300.svg" alt="edit" />
                      <p className="caption-sb">Edit</p>
                    </div>
                    <div className="edit-remove-btn">
                      <img src="/images/icons/delete-n-300.svg" alt="delete" />
                      <p className="caption-sb">Remove</p>
                    </div>
                  </div>

                  <div className="tag-container">
                    <div className="tag caption-sb">Shipping</div>
                  </div>
                </div>
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
                    <h1 className="heading-sb">Add Shipping Address</h1>
                    <p className="sc-body-rg title">
                    Add Shipping address
                    </p>
                    <hr className="h-line" />

                    <div className="d-flex gap-20" style={{maxWidth:"680px", flexWrap:"wrap"}}>
                      <CustomInput
                        width={330}
                        label="Street 1"
                        icon="/images/icons/location-icon.svg"
                      />
                      <CustomInput
                        width={330}
                        label="City"
                        disabled
                      />
                      <CustomInput
                        width={330}
                        label="Street 2"
                        icon="/images/icons/location-icon.svg"
                      />
                      <CustomInput
                        width={330}
                        label="State"
                        disabled
                      />
                      <CustomInput
                        width={330}
                        label="Area"
                        icon="/images/icons/Pincode_Area.svg"
                      />
                      <CustomInput
                        width={330}
                        label="Country"
                        disabled
                      />
                      <CustomInput
                        width={330}
                        label="Pincode"
                        icon="/images/icons/Pincode_Area.svg"
                        placeholder="395007"
                      />
                    </div>
                    <div className="d-flex gap-16 mt-30">
                        <ContainedButton value="Save" />
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
                    <span className="account-count"> (4)</span>
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

              <AttachmentFile />
            </div>
          )}
          {activePage === "notes" && (
            <div>
              {
                <div className="table-header mb-20">
                  <h1 className="title-sb">
                  Notes
                    <span className="account-count"> (4)</span>
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
              createNoteFalse={createNoteFalse}
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
                    onClick={handleSubmit}
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
                    onClick={handleSubmit}
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
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    fileList={fileList}
                    onChange={onChange}
                  >
                    <div
                      style={{
                        padding: "45px 58px",
                        border: "1.5px dashed #CBD5E0",
                        borderRadius: "6px",
                        width: "214px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src="/images/icons/add-image-icon.svg"
                        alt="icon"
                        className="mb-10"
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
                    </div>
                  </Upload>
                  <CustomInput
                    width={330}
                    label="Attachment Name"
                    placeholder="Name"
                  />
                  <div className="btn-container d-flex mt-30 gap-16">
                    <ContainedButton value="Upload" />
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
    </div>
  );
};

export default VendorPreview;
