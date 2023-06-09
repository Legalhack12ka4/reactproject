import { React, useState, useRef, useEffect, useMemo } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./ContactsData.scss";
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
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Contacts, { ChildStateModificationFunc } from "../Contacts";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import axios from "axios";
import config from "../../Database/config";
import dob from "../../../assets/Images/FormIcon/DOB.svg";
import Swal from "sweetalert2";
import { CloseOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import CalendarComp from "../../Calendar/CalendarComp";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import { Link, Navigate } from "react-router-dom";
import DateRangePicker from "../../DateRangePicker/DateRangePicker";
import format from "date-fns/format";
import {
  ContainedButton,
  ContainedSecondaryButton,
  ToggleButton,
} from "../../Buttons/Button";
// import Cookies from 'js-cookie';
import {
  CategorySelect,
  InputGroup,
  SearchSelect,
} from "../../Dropdowns/Dropdowns";
import ContactPreview from "../ContactPreview/ContactPreview";
import CustomInput from "../../CustomInput/CustomInput";

const filterfield = {
  name: "",
  mobile: "",
  email: "",
  dob: "",
  position: "",
  status:"",
  lead_source:"",
  ownership: "",
  updated_date_time: "",
};

const countryCodes = [
  {
    label: (
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.08"
            height="12.5"
            viewBox="0 0 19.08 12.5"
          >
            <g id="india-svgrepo-com" transform="translate(0 -88.276)">
              <path
                id="Path_34773"
                data-name="Path 34773"
                d="M17.651,88.276H1.429A1.429,1.429,0,0,0,0,89.7v2.738H19.08V89.7A1.429,1.429,0,0,0,17.651,88.276Z"
                fill="#fab446"
              />
              <path
                id="Path_34774"
                data-name="Path 34774"
                d="M0,314.646a1.429,1.429,0,0,0,1.429,1.429H17.651a1.429,1.429,0,0,0,1.429-1.429v-2.738H0Z"
                transform="translate(0 -215.298)"
                fill="#73af00"
              />
              <rect
                id="Rectangle_17784"
                data-name="Rectangle 17784"
                width="19.08"
                height="4.167"
                transform="translate(0 92.443)"
                fill="#f5f5f5"
              />
              <g
                id="Group_43818"
                data-name="Group 43818"
                transform="translate(7.772 92.758)"
              >
                <path
                  id="Path_34775"
                  data-name="Path 34775"
                  d="M210.32,212.088a1.768,1.768,0,1,1,1.768-1.768A1.77,1.77,0,0,1,210.32,212.088Zm0-3.207a1.439,1.439,0,1,0,1.439,1.439A1.441,1.441,0,0,0,210.32,208.881Z"
                  transform="translate(-208.552 -208.552)"
                  fill="#41479b"
                />
                <circle
                  id="Ellipse_1316"
                  data-name="Ellipse 1316"
                  cx="0.2"
                  cy="0.2"
                  r="0.2"
                  transform="translate(1.568 1.568)"
                  fill="#41479b"
                />
                <path
                  id="Path_34776"
                  data-name="Path 34776"
                  d="M214.57,253.925l-.509.051-1.094-.051v-.06l1.094-.051.509.051Z"
                  transform="translate(-212.802 -252.126)"
                  fill="#41479b"
                />
                <path
                  id="Path_34777"
                  data-name="Path 34777"
                  d="M256,253.925l.509.051,1.094-.051v-.06l-1.094-.051-.509.051Z"
                  transform="translate(-254.232 -252.126)"
                  fill="#41479b"
                />
                <path
                  id="Path_34778"
                  data-name="Path 34778"
                  d="M253.864,214.57l-.051-.509.051-1.094h.06l.051,1.094-.051.509Z"
                  transform="translate(-252.126 -212.802)"
                  fill="#41479b"
                />
                <path
                  id="Path_34779"
                  data-name="Path 34779"
                  d="M253.864,256l-.051.509.051,1.094h.06l.051-1.094-.051-.509Z"
                  transform="translate(-252.126 -254.232)"
                  fill="#41479b"
                />
                <path
                  id="Path_34780"
                  data-name="Path 34780"
                  d="M226.134,226.176l-.4-.324-.737-.81.043-.043.81.737.324.4Z"
                  transform="translate(-224.387 -224.387)"
                  fill="#41479b"
                />
                <path
                  id="Path_34781"
                  data-name="Path 34781"
                  d="M255.43,255.472l.324.4.81.737.043-.043-.737-.81-.4-.324Z"
                  transform="translate(-253.683 -253.683)"
                  fill="#41479b"
                />
                <path
                  id="Path_34782"
                  data-name="Path 34782"
                  d="M255.43,226.134l.324-.4.81-.737.043.043-.737.81-.4.324Z"
                  transform="translate(-253.683 -224.387)"
                  fill="#41479b"
                />
                <path
                  id="Path_34783"
                  data-name="Path 34783"
                  d="M226.134,255.43l-.4.324-.737.81.043.043.81-.737.324-.4Z"
                  transform="translate(-224.387 -253.683)"
                  fill="#41479b"
                />
                <path
                  id="Path_34784"
                  data-name="Path 34784"
                  d="M217.438,255.31l-.451.242-1.031.371-.023-.056.991-.466.49-.147Z"
                  transform="translate(-215.658 -253.514)"
                  fill="#41479b"
                />
                <path
                  id="Path_34785"
                  data-name="Path 34785"
                  d="M255.714,239.455l.49-.147.991-.466-.023-.056-1.031.371-.451.242Z"
                  transform="translate(-253.934 -237.659)"
                  fill="#41479b"
                />
                <path
                  id="Path_34786"
                  data-name="Path 34786"
                  d="M239.4,217.438l-.242-.451-.371-1.031.056-.023.466.991.147.49Z"
                  transform="translate(-237.659 -215.658)"
                  fill="#41479b"
                />
                <path
                  id="Path_34787"
                  data-name="Path 34787"
                  d="M255.254,255.714l.147.49.466.991.056-.023-.371-1.031-.242-.451Z"
                  transform="translate(-253.514 -253.934)"
                  fill="#41479b"
                />
                <path
                  id="Path_34788"
                  data-name="Path 34788"
                  d="M217.415,239.455l-.49-.147-.991-.466.023-.056,1.031.371.451.242Z"
                  transform="translate(-215.658 -237.659)"
                  fill="#41479b"
                />
                <path
                  id="Path_34789"
                  data-name="Path 34789"
                  d="M255.691,255.31l.451.242,1.031.371.023-.056-.991-.466-.49-.147Z"
                  transform="translate(-253.934 -253.514)"
                  fill="#41479b"
                />
                <path
                  id="Path_34790"
                  data-name="Path 34790"
                  d="M255.254,217.415l.147-.49.466-.991.056.023-.371,1.031-.242.451Z"
                  transform="translate(-253.514 -215.658)"
                  fill="#41479b"
                />
                <path
                  id="Path_34791"
                  data-name="Path 34791"
                  d="M239.4,255.691l-.242.451-.371,1.031.056.023.466-.991.147-.49Z"
                  transform="translate(-237.659 -253.934)"
                  fill="#41479b"
                />
              </g>
              <circle
                id="Ellipse_1317"
                data-name="Ellipse 1317"
                cx="0.27"
                cy="0.27"
                r="0.27"
                transform="translate(9.269 94.256)"
                fill="#f5f5f5"
              />
              <circle
                id="Ellipse_1318"
                data-name="Ellipse 1318"
                cx="0.162"
                cy="0.162"
                r="0.162"
                transform="translate(9.378 94.364)"
                fill="#41479b"
              />
            </g>
          </svg>

          <p style={{ width: "30px" }}>+91 </p>
        </div>

        <p> (India)</p>
      </div>
    ),
    value: "India",
  },
  {
    label: (
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            id="india-svgrepo-com"
            xmlns="http://www.w3.org/2000/svg"
            width="19.08"
            height="12.5"
            viewBox="0 0 19.08 12.5"
          >
            <path
              id="Path_34773"
              data-name="Path 34773"
              d="M17.651,88.276H1.429A1.429,1.429,0,0,0,0,89.7v2.738H19.08V89.7A1.429,1.429,0,0,0,17.651,88.276Z"
              transform="translate(0 -88.276)"
            />
            <path
              id="Path_34774"
              data-name="Path 34774"
              d="M0,314.646a1.429,1.429,0,0,0,1.429,1.429H17.651a1.429,1.429,0,0,0,1.429-1.429v-2.738H0Z"
              transform="translate(0 -303.574)"
              fill="#ffce00"
            />
            <rect
              id="Rectangle_17784"
              data-name="Rectangle 17784"
              width="19.08"
              height="4.167"
              transform="translate(0 4.167)"
              fill="#d00"
            />
          </svg>

          <p style={{ width: "30px" }}>+49 </p>
        </div>

        <p> (Germany)</p>
      </div>
    ),
    value: "Russia",
  },
  {
    label: (
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            id="india-svgrepo-com"
            xmlns="http://www.w3.org/2000/svg"
            width="19.08"
            height="12.5"
            viewBox="0 0 19.08 12.5"
          >
            <path
              id="Path_34773"
              data-name="Path 34773"
              d="M17.651,88.276H1.429A1.429,1.429,0,0,0,0,89.7v2.738H19.08V89.7A1.429,1.429,0,0,0,17.651,88.276Z"
              transform="translate(0 -88.276)"
            />
            <path
              id="Path_34774"
              data-name="Path 34774"
              d="M0,314.646a1.429,1.429,0,0,0,1.429,1.429H17.651a1.429,1.429,0,0,0,1.429-1.429v-2.738H0Z"
              transform="translate(0 -303.574)"
              fill="#ffce00"
            />
            <rect
              id="Rectangle_17784"
              data-name="Rectangle 17784"
              width="19.08"
              height="4.167"
              transform="translate(0 4.167)"
              fill="#d00"
            />
          </svg>

          <p style={{ width: "30px" }}>+89 </p>
        </div>

        <p> (Sri Lanka)</p>
      </div>
    ),
    value: "Sri Lanka",
  },
  {
    label: (
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            id="india-svgrepo-com"
            xmlns="http://www.w3.org/2000/svg"
            width="19.08"
            height="12.5"
            viewBox="0 0 19.08 12.5"
          >
            <path
              id="Path_34773"
              data-name="Path 34773"
              d="M17.651,88.276H1.429A1.429,1.429,0,0,0,0,89.7v2.738H19.08V89.7A1.429,1.429,0,0,0,17.651,88.276Z"
              transform="translate(0 -88.276)"
              fill="#ae1c28"
            />
            <path
              id="Path_34774"
              data-name="Path 34774"
              d="M0,314.646a1.429,1.429,0,0,0,1.429,1.429H17.651a1.429,1.429,0,0,0,1.429-1.429v-2.738H0Z"
              transform="translate(0 -303.574)"
              fill="#21468b"
            />
            <rect
              id="Rectangle_17784"
              data-name="Rectangle 17784"
              width="19.08"
              height="4.167"
              transform="translate(0 4.167)"
              fill="#fff"
            />
          </svg>

          <p style={{ width: "30px" }}>+31 </p>
        </div>

        <p> (Germany)</p>
      </div>
    ),
    value: "Egypt",
  },
];

const ContactsData = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchcontact, setFetchcontact] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [oldData, setoldData] = useState([]);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [changePosition, setChangePosition] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [addSouce, setAddSource] = useState([]);
  const [dateRange, setDateRange] = useState([]); //for date filter
  const [startdate, setStartdate] = useState([]);
  const [enddate, setEnddate] = useState([]);
  const [activeMode, setActiveMode] = useState("table");
  const [status, setStatus] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedCode, setSelectedCode] = useState("India");
  const [updateModal, setUpdateModal] = useState(false);
  const [addlead, setAddLead] = useState([]);
  const [updateId , setUpdateId] = useState(
    {
      name: "",
      mobile: "",
      email: "",
      dob: "",
      position: "",
      ownership: "",
      status:"",
      lead:"",
      contact_image:"",
    }
  );

  console.log(selectedContactId);
  //add position filter

  const handleDrpChange = (field, value) => {
    // const selectedOption = othersource.find((option) => option.value === value);
    // console.log(selectedOption);
    setCustFilter({ ...custfilter, [field]: value });
    //  position: selectedOption.key
    // setFieldValue(field, value);
    // setFieldTouched(field, false);
    console.log(field);
    console.log(value);
  };
  console.log(custfilter);

  //daterangefunction
  const filterdaterange = (date) => {
    setDateRange(date[0].startDate);
    setStartdate(date[0].startDate);
    setEnddate(date[0].endDate);
    console.log(date);
  };
  console.log(startdate);
  console.log(enddate);
  // console.log(dateRange[0].startDate, "yyyy-MM-dd")
  //console.log(dateRange[0].startDate)

  console.log(hoveredRow);

  const hide = () => {
    setOpen(false);
    // document.getElementById("popoverhide").style.display="none";
    // document.getElementById("popoverhide").style.display="block";
    // console.log(open)
    // console.log("line55")
  };
  const popvisible = () => {
    setOpen(false);
    //document.getElementById("popoverhide").style.display="block";
    // console.log(open)
    // console.log("line55")
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleConfirmCancel = (record) => {
    setDeleteRecord(record);
    setCofirm(true);
    setPopOverVisible(false);
  };

  const handleConfirm = () => {
    setCofirm(false);
    setDeleteRecord(null);
    // setPopOverVisible(false)
  };

  const handleSubmit = () => {
    //  alert("Data", record)
    deleteUser(deleteRecord);
    getData();
    setCofirm(false);
    getData();
  };
  useEffect(() => {
    getData();
    getlead();
  }, []);
  // console.log(selectedRows)

  //get data positon

  const getlead = () => {
    return fetch(`${config.baseUrl}/leadsource/`)
      .then((response) => response.json())
      .then((data) => {
        setAddLead(data.data.items);
        console.log(data);
      });
  };

  const otherlead1 = addlead.map((place) => ({
    key: place.id,
    label: place.lead_source,
    value: place.lead_source,
  }));

  const otherlead = [
    {
      label: "Lead Source",
      options: addlead.map((place) => ({
        key: place.id,
        label: place.lead_source,
        value: place.lead_source,
      })),
    },
  ];

  const othersource1 = addSouce.map((place) => ({
    key:place.id,
    label: place.position_name,
    value: place.position_name,
  }));

  const othersource = [
    {
      label: "Position",
      options: addSouce.map((place) => ({
        key: place.id,
        label: place.position_name,
        value: place.position_name,
      })),
    },
  ];
  console.log(othersource);

   const getstatusdata =[ 
    {
      label:"Status",
      options:status
      .filter(
        (place) => place.field === "Status" && place.module === "Contact_Status"
      )
      .map((place) => ({
        key: place.id,
        label: (<div className="status-contianer">
        <div className={place.master_key === "Junk" ? "status-bullet-junk" : 
      place.master_key === "Lead" ? "status-bullet-lead" : 
      place.master_key === "Not Intersted" ? "status-bullet-not-interested" : 
      place.master_key === "Prospective" ? "status-bullet-prospective" : 
      place.master_key === "Customer" ? "status-bullet-customer" : 
      place.master_key === "Agent" ? "status-bullet-agent" : ""}></div>
      
        <p className={`${place.master_key.replace(" ", "")} sc-body-md bullet-text`}>{place.master_key}</p>
      </div>),
        value: place.master_key,
      }))
    }
   ]


  const getstatusdata1 = status
  .filter(
    (place) => place.field === "Status" && place.module === "Contact_Status"
  )
  .map((place) => ({
    key: place.id,
    label: place.master_key,
    value: place.master_key,
  }));

console.log(getstatusdata);
console.log(status);

  useEffect(() => {
    getSource();
  }, []);

  const getSource = () => {
    return fetch(`${config.baseUrl}/position/`)
      .then((response) => response.json())
      .then((data) => {
        setAddSource(data.data.items);
        console.log(data);
      });
  };

  console.log(addSouce);
  //
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) {
  //     return parts.pop().split(';').shift();
  //   }
  // }

  const StatusOptions = [
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-all"></div>
          <p className="sc-body-md">All</p>
        </div>
      ),
      value: "All",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-lead"></div>
          <p className="sc-body-md">Lead</p>
        </div>
      ),
      value: "Lead",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-not-interested"></div>
          <p className="sc-body-md">Not Interested</p>
        </div>
      ),
      value: "Not Interested",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-junk"></div>
          <p className="sc-body-md">Junk</p>
        </div>
      ),
      value: "Junk",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-prospective"></div>
          <p className="sc-body-md">Prospective</p>
        </div>
      ),
      value: "Prospective",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-customer"></div>
          <p className="sc-body-md">Customer</p>
        </div>
      ),
      value: "Customer",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-agent"></div>
          <p className="sc-body-md">Agent</p>
        </div>
      ),
      value: "Agent",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-consultant"></div>
          <p className="sc-body-md">Consultant</p>
        </div>
      ),
      value: "Consultant",
    },
    {
      label: (
        <div className="status-contianer">
          <div className="status-bullet-other-vendor"></div>
          <p className="sc-body-md">Other Vendor</p>
        </div>
      ),
      value: "Other Vendor",
    },
  ];

 

 

  useEffect(() => {
    getstatus();
  }, []);

  const getstatus = () => {
    return fetch(`${config.baseUrl}/master/`)
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.data.items);
        console.log(data);
      });
  };

  console.log(status);

  const getData = async () => {
    await axios
      .get(
        `${config.baseUrl}/contact/`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.data.items);

        setFetchcontact(
          res.data.data.items.map((row) => ({
            Key: row.id,
            Name: row.name,
            Mobile: row.mobile,
            Email: row.email,
            DOB: row.dob,
            Position: row.position,
            Contact_Image:row.contact_image,
            // Position:othersource.find(
            //   (option) => option.key === row.position && option.label
            // )?.label,
            // Position:
            //   row.position == 1
            //     ? "Owner"
            //     : row.position == 2
            //     ? "Accountant"
            //     :  row.position == 2
            //      ?"Manger"
            //      :"SalesPerson",
            Ownership: row.ownership == 1 ? "ubuntu" : "window",
            Status: row.status,
            Lead_Source:row.lead_source,
            // Status:getstatusdata.find(
            //   (option) => option.key === row.status && option.label
            // )?.label,

            //  Updated_Date_Time: row.updated_date_time
            // id: row.id
          }))
        );
        // console.log(res);
        setLoading(false);
      });
  };
  console.log(fetchcontact);

  //delete data
  const deleteUser = (record) => {
    // console.log(record);
    // console.log(record.id);
    axios.delete(`${config.baseUrl}/contact/${record.id}/`).then((response) => {
      setDeleteRecord(null);

      console.log("data delete ho raha hai");
      toast.error("Deleted Successfuly", {
        border: "1px solid red",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      getData();
    });

    //  console.log(fetchcontact)
  };

  //All dropdowns

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

  const position = [
    {
      value: "Owner",
      label: "Owner",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "Manger",
      label: "Manger",
    },
  ];

  function showCanvas() {
    var m = document.querySelector(".menu1");
    m.classList.add("smenu");
    //document.root.style.backgroundColor='rgba(0,0,0,0.4)';
    document.getElementById("gradient").classList.add("body_gradient");
  }

  //Get data in textbox on edit button
  const handleUpdate = (record) => {
    setUpdateModal(true);
    setUpdateId(record);
    console.log(record)
  };
   console.log(updateId)


  //alert(oldData)

  //get form data

  const handleNameClick = () => {
    // Code to open the other component goes here
  };
// getstatusdata
  const dataSource = fetchcontact.map((contact) => ({
    key: contact.Key,
    id: contact.Key,
    name: contact.Name,
    mobile: contact.Mobile,
    email: contact.Email,
    dob: contact.DOB,
    position: othersource1.find(
      (option) => option.key === contact.Position && option.label
    )?.label,
    companyname: "Reformiqo",
    status: getstatusdata1.find(
      (option) => option.key === contact.Status && option.label
    )?.label,
    lead_source:otherlead1.find(
      (option) => option.key === contact.Lead_Source && option.label
    )?.label,
    ownership: contact.Ownership,
    contact_image:contact.Contact_Image,
    updated_date_time: contact.Updated_Date_Time,
  }));

  console.log(dataSource);
  const columnsData = [
    {
      title: "Contact Name",
      label: "Contact Name",
      dataIndex: "name",
      key: "name",
      // disabled: true,
      resizable: true,
      fixed: "left",
      align: "left",
      // width: "max-content",
      // style: { maxWidth: "100px" },
      // width: `${width} ? "600px" : "1000px"`,
      width: 200,
      render: (text, record) => {
        let initials = "";
        if (record.name) {
          const nameArr = record.name.split(" ");
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
             {updateId?.contact_image ? (
          <img src={updateId.contact_image} alt="" />
        ) : (
          <span style={{ color: "#5C5AD0", fontWeight: 600 }}>
            {initials}
          </span>
        )}
            </div>
            <span style={{ marginLeft: 8 }}>
              <div style={{ maxWidth: "180px" }}>
                <p
                  className="contact-name-h1 sc-body-md"
                  style={{ fontSize: "", color: "#465468 !important" }}
                >
                  <Link
                    to={`contact_preview/${record.id}/related_account`}
                    style={{ color: "#5C5AD0" }}
                  >
                    {record.name}
                  </Link>
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
                    {record.position}
                  </p>
                </div>
              </div>
            </span>
          </div>
        );
      },
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
    },
    {
      title: "Email",
      label: "Email",
      dataIndex: "email",
      key: "email",
      resizable: true,
      // width: "max-content",
      width: 250,
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.position > record2.position;
      },
      render: (text, record) => {
        return (
          <div>
            <p className="contact-email sc-body-rg"> {record.email}</p>
          </div>
        );
      },
    },
    {
      title: "Phone",
      label: "Phone",
      dataIndex: "mobile",
      key: "mobile",
      resizable: true,
      // width: "max-content",
      width: 140,
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.position > record2.position;
      },
      render: (text, record) => {
        return (
          <div>
            <p className="contact-email sc-body-rg"> {record.mobile}</p>
          </div>
        );
      },
    },
    // {
    //   title: "Contact details",
    //   label: "Contact details",
    //   dataIndex: "mobile",
    //   key: "mobile",
    //   resizable: true,
    //   // width: "max-content",
    //   width: 250,
    //   align: "left",
    //   showSorterTooltip: { title: "" },
    //   sorter: (record1, record2) => {
    //     return record1.contactdetails > record2.contactdetails;
    //   },
    //   render: (text, record) => (
    //     <div>
    //       <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    //         <img src="images/icons/mail_gray_icon.svg" alt="mail" />
    //         <div style={{ maxWidth: '210px' }}>{record.email}</div>
    //       </div>
    //       <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    //         <img src="images/icons/phone_icon_gray.svg" alt="phone" />
    //         {record.mobile}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Lead Source",
    //   label: "Lead Source",
    //   dataIndex: "leadsource",
    //   key: "leadsource",
    //   resizable: true,
    //   // width: "max-content",
    //   width: 190,
    //   align: "left",
    //   showSorterTooltip: { title: "" },
    //   sorter: (record1, record2) => {
    //     return record1.leadsource > record2.leadsource;
    //   },
    //   render: (text, record) => (
    //     <div>
    //       <div style={{display: "flex", alignItems: "center", gap: "5px", width: "max-content", padding: "4px 16px", borderRadius: "19px", backgroundColor:"#ECEEF1"}}>
    //         Parth Goswami
    //       </div>
    //     </div>
    //   ),
    // },

    {
      title: "Company Name",
      label: "Company Name",
      dataIndex: "companyname",
      key: "companyname",
      resizable: true,
      // width: "max-content",
      width: 140,
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.position > record2.position;
      },
      render: (text, record) => {
        return (
          <div>
            <p className="contact-company_name sc-body-md">
              {" "}
              {record.companyname}
            </p>
          </div>
        );
      },
    },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "status",
      resizable: true,
      align: "left",
      width: 130,
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.status > record2.status;
      },
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            className={
              record.status === "Customer"
                ? "table_bullet_item"
                : record.status === "Not Intersted"
                ? "Not_bullet_item"
                : record.status === "Lead"
                ? "Lead_bullet_item"
                : record.status === "Junk"
                ? "junk_bullet_item"
                : record.status === "Prospective"
                ? "pros_bullet_item"
                : record.status === "Agent"
                ? "agent_bullet_item"
                : ""
            }
          ></div>
          <Typography.Text
            style={
              record.status === "Customer"
                ? { color: "#179E40", fontSize: "14px", fontWeight: "600" }
                : record.status === "Not Intersted"
                ? { color: "#FF1F54", fontSize: "14px", fontWeight: "600" }
                : record.status === "Lead"
                ? { color: "#00BBE5", fontSize: "14px", fontWeight: "600" }
                : record.status === "Junk"
                ? { color: "#FF561E", fontSize: "14px", fontWeight: "600" }
                : record.status === "Prospective"
                ? { color: "#5C5AD0", fontSize: "14px", fontWeight: "600" }
                : record.status === "Agent"
                ? { color: "#EFD804", fontSize: "14px", fontWeight: "600" }
                : ""
            }
          >
            {record.status}
          </Typography.Text>
        </div>
      ),
    },
    // {
    //   title: "Ownership ",
    //   label: "Ownership ",
    //   dataIndex: "ownership",
    //   key: "ownership",
    //   resizable: true,
    //   // width: "150px",
    //   // width: "max-content",
    //   width: 140,
    //   align: "left",
    //   showSorterTooltip: { title: "" },
    //   sorter: (record1, record2) => {
    //     return record1.ownership > record2.ownership;
    //   },
    //   render: (text, record) => (
    //     <div>
    //       <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
    //         <img src="images/icons/profile.png" alt="" style={{width:"30px"}} />
    //         <p>{record.ownership}</p>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Updated Date Time ",
    //   label: "Updated Date Time  ",
    //   dataIndex: "updated_date_time",
    //   key: "updated_date_time",
    //   visible:false,
    //   resizable: true,
    //   // width: "150px",
    //   // width: "max-content",
    //   width: 140,
    //   align: "left",
    //   showSorterTooltip: { title: "" },

    // },
    {
      title: "",
      label: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 40,
      // width: "max-content",
      render: (text, record) => (
        <>
          {/* <div style={{position:"relative"}}>
           <img src={editdelete} style={{cursor:"pointer", position:"absolute",top:"25px", transform:"rotate(90deg)"}} onClick={(e) => {setOpen(open); popvisible(e);}}/>
         <div style={{width:"100px", height:"100px", backgroundColor:"white", position:"absolute", top:"20px"}}>
     
                    </div>
                    </div> */}
          <Popover
            id="popoverhide"
            defaultOpen={open}
            onOpenChange={setOpen}
            getPopupContainer={(trigger) => trigger.parentElement}
            showArrow={true}
            placement="left"
            content={
              <>
                <div
                  className="delete-hover popover-menu-item"
                >
                  <img src="\images\icons\delete_record.svg" />
                  <div>
                    <button
                      className="actionlabel sc-body-md"
                      onClick={() => {
                        handleConfirmCancel(record);
                        hide();
                      }}
                      //onClick={hide}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div
                  className="edit-hover popover-menu-item"  >
                  <img src="\images\icons\edit_record.svg" />
                  <div>
                    <button
                      className="actionlabel sc-body-md"
                      onClick={() => handleUpdate(record)}
                    >
                     Edit
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
              </>
            }
            title=""
            height={100}
            trigger="click"
          >
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
              onClick={(e) => {
                setOpen(open);
                popvisible(e);
              }}
            >
              <img src={editdelete} style={{ transform: "rotate(90deg)" }} />
            </div>
          </Popover>
        </>
      ),
      resizable: true,
      align: "left",
    },
  ];
  // console.log(hoveredRow)

  const [columns, setColumns] = useState(columnsData);
  // console.log(columns)

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

  const filteredData = dataSource.filter(
    (record) => record.name.toLowerCase().includes(search.toLowerCase())
    // record.mobile.toString().includes(search.toString())
  );

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
  // console.log(filterarray);

  // console.log(custfilter);

  const handleChange = (field, value) => {
    setCustFilter({ ...custfilter, [field]: value });
    // console.log("value", value);
    // console.log("field", value);
    setVisible(true);
  };

  //clear filter

  const clearfilter = () => {
    // console.log("button click");
    // setCustFilter(filterfield);
    setCustFilter({
      name: "",
      mobile: "",
      email: "",
      dob: "",
      position: "",
      status: "",
      lead_source: "",
      ownership: "",
      updated_date_time: "",
    });
    setFilteraaray([]);
   

  };

  // useEffect(() => {
  //  setCustFilter({...custfilter, ["credit"] :currentValue})

  // }, [currentValue]);

  const onChangedob = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
    // console.log(value);
    // console.log(name);
  };
  const onChangedate = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
    console.log(value);
    console.log(name);
  };
  // const onChangedate = (e) => {
  //   const { value, name } = e.target;

  //   if (name === "updated_date_time") {
  //     setDateRange(value); // set the selected date range in the state
  //     setCustFilter({
  //       ...custfilter,
  //       [name]: value.join(" - ") // join the dates with a hyphen and store in updated_date_time field
  //     });
  //   } else {
  //     setCustFilter({
  //       ...custfilter,
  //       [name]: value
  //     });
  //   }
  // };
  console.log(custfilter);

  // useEffect(() => {
  //   console.log(startdate);
  // }, [startdate]);

  // const datafilter = (dateRange) => {
  //   const [startDate, endDate] = dateRange.map((date) => new Date(date));
  //   setStartdate(startDate);
  //   setEnddate(endDate);
  //   console.log(startDate);
  // };

  // console.log(startdate);
  // console.log(enddate);

  //   const fromDate = new Date(startdate);
  // const toDate = new Date(enddate);

  const cusomizeData = dataSource.filter(
    (record) =>
      record.position?.includes(custfilter.position)
       &&
       record.status?.includes(custfilter.status)&&
       record.lead_source?.includes(custfilter.lead_source)&&
      record.ownership.includes(custfilter.ownership) &&
      // record.dob.toString().includes(custfilter.dob.toString()) &&
      record.name.toLowerCase().includes(search.toLowerCase())
    //&&
    // && record.updated_date_time.includes(custfilter.updated_date_time)
    //For date range filter
    // (!startdate || !enddate ||
    //   (new Date(record.updated_date_time) >= startdate &&
    //   new Date(record.updated_date_time) <= enddate))
    //   new Date(record.updated_date_time) >= startdate && // filter records from fromDate
    // new Date(record.updated_date_time) <= enddate  // filter records up to toDate
    // && record.email.toLowerCase().includes(search.toLowerCase())
    // || record.dob.toString().includes(search.toString())
    // && record.mobile.toString().includes(search.toString())
    // && record.position.toLowerCase().includes(search.toLowerCase())
    // && record.ownership.toLowerCase().includes(search.toLowerCase())
  );

  console.log(cusomizeData);

  // console.log(cusomizeData);

  var strDate = custfilter.dob;
  var convertedDate = new Date(strDate)
    .toLocaleDateString("IN")
    .replaceAll("/", "-");
  // console.log(convertedDate); // 2-23-2021

  //tags

  const log = (index, key) => {
    // console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
   console.log(filterarray);

  //

  const handlecheckgetData = () => {
    alert("Data call");
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

  // selectedColumns

  const [selectedColumns, setSelectedColumns] = useState(
    tableColumns.map((col) => col.dataIndex)
  );
  const handleSelectColumn = (e) => {
    const { checked, value } = e.target;
    if (checked) setSelectedColumns([...selectedColumns, value]);
    else setSelectedColumns(selectedColumns.filter((col) => col !== value));
  };

  const handleSelect = (date) => {
    // console.log(date); // native Date object
  };

  const getDataChild = () => {
    setoldData(oldData);
  };

  // const token = localStorage.getItem("jwt")
  // let loggedIn= true
  // if(token == null)
  // {
  //   localStorage.removeItem("jwt");
  //   loggedIn = false
  // }
  // // Details={loggedIn}

  // if(loggedIn == false)
  // {
  // localStorage.removeItem("jwt");
  // return <Navigate to="/"/>
  // }

  const handleUpdateCancel = () => {
    setUpdateModal(false);
  };

  const onChangeValue = (e) => {
    const { value, name } = e.target;
    
    setUpdateId({ ...updateId, [name]: value });
  
    console.log(value);
    console.log(name);
    };
    console.log(updateId)

    const handleDrpChangePosition = (field, value) => {
    //   const selectedOption = othersource1.find((option) => option.value === value);
    //  console.log(selectedOption);
      setUpdateId({ ...updateId, [field]: value});
      console.log(field);
      console.log(value);
    };
  console.log(updateId.position)
  
    const handleDrpChangeStatus = (field, value) => {
      const selectedOption = getstatusdata1.find((option) => option.value === value);
      console.log(selectedOption);
      setUpdateId({ ...updateId, [field]: value, status: selectedOption.key });
     // setFieldValue(field, value);
      //setFieldTouched(field, false);
      console.log(field);
      console.log(value);
    };
  
    // const handleDrpChangeLead = (field, value) => {
    //   const selectedOption = otherlead.find((option) => option.value === value);
    //   console.log(selectedOption);
    //   setFormData({ ...formData, [field]: value, lead: selectedOption.key });
    //   setFieldValue(field, value);
    //   setFieldTouched(field, false);
    //   console.log(field);
    //   console.log(value);
    // };
    const positionId = othersource1.find((option) => option.label === updateId.position)?.key;
  console.log(positionId)
  console.log(othersource1)

  const handleFileUpload = (file) => {
    if (file && file.size >= 1) {
      const fileUrl = URL.createObjectURL(file);
      setUpdateId({
        ...updateId,
        contact_image: fileUrl,
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

  // const handleRemove = () => {
  //   setUpdateId({
  //     attachments: "",
  //     filename: "",
  //   });
  //   const imgPreview = document.getElementById("imgPreview");
  //   imgPreview.src = "/images/icons/add-image-icon.svg";
  // };

  const handleRemove = () => {
    setUpdateId({
      ...updateId,
      contact_image: "",
    });
    const imgPreview = document.getElementById("imgPreview");
    imgPreview.src = "/images/icons/user-avatar.jpeg";
  };


  const handleFormSubmit = (e) => {

      // Find the position ID from the positionOptions array
const positionId = othersource1.find((option) => option.label === updateId.position)?.key;
  console.log(positionId)
  // Find the status ID from the statusOptions array
  const statusId = getstatusdata1.find((option) => option.label === updateId.status)?.key;
  const leadId = otherlead1.find((option) => option.label === updateId.lead)?.key;

      axios
        .put(
          `${config.baseUrl}/contact/${updateId.id}/`,
          {
            name: updateId.name,
            mobile: updateId.mobile,
            email: updateId.email,
            dob: updateId.dob,
            position: positionId,
            status:statusId,
            lead_source: leadId,
            dob: "2000-09-09",
          //  contact_image:updateId.contact_image,
          ...(updateId.contact_image && { contact_image: updateId.contact_image }),
            notes: "good",
            type: 1,
            country_code: 1,
            company_name: 1,
            ownership: 1,
            company_id: 1,
            created_by: 1,
            updated_by: 1,
          },
          updateId
        )
        .then((response) => {
          // closeModal();
          // handleCancel();
        //  handleclose();
       //   props.onClick();
       setUpdateModal(false);
             getData();
          toast.success("Updated Successfuly", {
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

console.log(updateId)

  return (
    <div className="contacts-data fixed_heading_container">
      <Page_heading
        dataLength={cusomizeData.length}
        parent={"Business Account"}
        child={"contacts"}
      />
      {activeMode === "table" && (
        <div className="contacts-table-container">
          <div className="filter-searchbar-container">
            <FilterAndSearchBar
              selectedColumnsLength={selectedColumns.length}
              results_length={`${cusomizeData.length} Contacts`}
              // datepickerfilter={
              //   <DateRangePicker
              //   daterange={filterdaterange}
              //   name="updated_date_time"
              //   value={dateRange}
              //   onChange={onChangedate}
              // // onChange={(value) => {
              //   //   setDateRange(value);
              //   //   if (value.length === 2) {
              //   //     datafilter(value);
              //   //   }
              //   // }}
              // />}
              filterdata={[
                <div className="contact_filter_container">
                  <div className="customer_filter_filed">
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">Position</label>{" "}
                    </Tooltip>
                    <SearchDropdown
                      width={330}
                      name="position"
                      options={position}
                      value={custfilter.position}
                      onChange={handleChange}
                    />
                  </div>

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
                      options={ownership}
                      value={custfilter.ownership}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div className="customer_filter_filed">
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="contactlabel" style={{ marginTop: "5px" }}>
                    Date of Birth
                  </label>{" "}
                </Tooltip>
                <br />
                <div className="contactinput" style={{ marginTop: "5px" }}>
                  <img src={dob} className="customerimg" />
                  <Calendar
        date={new Date()}
        onChange={handleSelect}
          />

          <CalendarComp    name="dob"
                    value={custfilter.dob}
                    onChange={onChangedob}/>
                  <input
                    type="date"
                    className="inputcontact"
                    placeholder="Placeholder"
                    name="dob"
                    value={custfilter.dob}
                    onChange={onChangedob}
                  />
                </div>

                <DateRangePicker
            daterange={filterdaterange}
            name="updated_date_time"
            value={dateRange}
            onChange={onChangedate}
          />
                <DateRangePicker
                daterange={filterdaterange}
                    name="updated_date_time"
                    //   options={ownership}
                       value={custfilter.updated_date_time}
                       onChange={onChangedate}
                />
              </div> */}
                </div>,
              ]}
              change={filterarray}
              onSelectColumn={handleSelectColumn}
              customer={fetchcontact.length}
              filterLength={filterarray.length}
              columns={columns}
              setColumns={setColumns}
              addBtnName={"Contacts"}
              onData={handleData}
              filter={<Contacts />}
              statusSelect={
                <CategorySelect
                  options={getstatusdata}
                  width={155}
                  placeholder="Status"
                  showSearch={false}
                  onChange={handleDrpChange}
                  name="status"
                  value={custfilter.status}
                  // value={
                  //   getstatusdata.find(
                  //     (option) =>
                  //       option.key === custfilter.status && option.label
                  //   )?.label
                  // }
                />
              }
              positionSelect={
                <CategorySelect
                  options={othersource}
                  width={155}
                  showSearch={false}
                  onChange={handleDrpChange}
                  placeholder="Position"
                  name="position"
                  value={custfilter.position}
                />
                // <SearchSelect
                //  // value="All"
                //   text="Position"
                //   showSearch={false}
                //   options={othersource}
                //   width={132}
                //   onChange={handleDrpChange}
                //   name="position"
                //   value={othersource.find(
                //       (option) => option.key === custfilter.position && option.label
                //     )?.label }
                // />
              }
              leadSelect={
                <CategorySelect
                  options={otherlead}
                  width={170}
                  showSearch={false}
                  onChange={handleDrpChange}
                  placeholder="Lead Source"
                  name="lead_source"
                  value={custfilter.lead_source}
                />
              }
              onFilter={(e) => {
                clearfilter(e);
                setVisible(!visible);
              }}
              // activeMode={
              //   <div className="grid-table-container">
              //     <div onClick={() => setActiveMode("grid")}>
              //       <div
              //         className={`option animated  ${
              //           activeMode === "grid" ? "active fadeInLeft" : ""
              //         }`}
              //       >
              //         <img
              //           src="/images/icons/grid-non-active-icon.svg"
              //           alt="icon"
              //         />
              //       </div>
              //     </div>
              //     <div onClick={() => setActiveMode("table")}>
              //       <div
              //         className={`option animated  ${
              //           activeMode === "table" ? "active fadeInLeft" : ""
              //         }`}
              //       >
              //         <img
              //           src="/images/icons/list-active-icon.svg"
              //           alt="icon"
              //         />
              //       </div>
              //     </div>
              //   </div>
              // }
            />
          </div>
          <OffCanvasExample
            form={<Contacts handledata={getDataChild} onClick={getData} />}
          />
          <div className="tableData">
            {/* <button onClick={() => { setStartdate(null); setEnddate(null) }}>Clear</button> */}
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
                          (customerfilter.key === "position" && "Position") ||
                          (customerfilter.key === "status" && "Status")||
                          (customerfilter.key === "lead_source" && "Lead")
                          // (customerfilter.key === "ownership" && "Ownership") ||
                          // (customerfilter.key === "dob" && "Date of Birth") ||
                          // (customerfilter.key === "updated_date_time" && "Date")
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
                          {customerfilter.key == "dob"
                            ? convertedDate
                            : customerfilter.value}
                        </Tag>
                      </Tooltip>
                    )
                  );
                })}

                <button
                  type="submit"
                  className="btnfilter"
                  onClick={(e) => {
                    setFilteraaray("")
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
              onRow={(record, index) => ({
                onMouseEnter: () => setHoveredRow(index),
                onMouseLeave: () => setHoveredRow(null),
              })}
              // style={{maxHeight:"30vh"}}
              rowSelection={
                !loading && {
                  type: "checkbox",
                  columnTitle: "",
                  // columnWidth: "0px",
                  columnWidth: "40px",
                  selectedRowKeys,
                  onChange: (selectedRowKeys, selectedRows) => {
                    setSelectedRowKeys(selectedRowKeys);
                    setSelectedRows(selectedRows);
                  },
                }
              }
              dataSource={tableData}
              columns={tableColumns.filter((col) =>
                selectedColumns.includes(col.dataIndex)
              )}
              // scroll={{ y: 3000, x: 1000 }}
              scroll={{ y: "51vh"}}
              // scroll={!loading && { y: ("30px")}}
              // scroll={!loading && { x: ("30px", "800px" )}}
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
                    `Showing ${range[1]}-${range[1]} of ${total} Contacts`,
                }
              }
              rowClassName={(record) =>
                record.key % 2 === 0 ? "highlight_row" : ""
              }
              search={{
                keyword: search,
              }}
            />

            {selectedRows.length > 0 && (
              <div className="bulk_changes_container">
                <div className="selected_container sc-body-md">
                  {selectedRows.length} Contacts Selected
                  <span
                    className="caption-sb"
                    onClick={() => {
                      setSelectedRows([]);
                      setSelectedRowKeys([]);
                    }}
                  >
                    Unselect all
                  </span>
                </div>
                <div className="modify_container">
                  <div className="send_email sc-body-md ">
                    <img src="images/icons/whatsapp.svg" alt="mail" />
                    <p>Send Message</p>
                  </div>
                  <div className="send_email sc-body-md ">
                    <img src="images/icons/mail_gray_icon.svg" alt="mail" />
                    <p>Send Mail</p>
                  </div>
                  {/* <Popover
                    trigger="click"
                    content={
                      <div className="change_status_dropdown">
                        <div className="new_lead ">
                          <div></div>
                          <p>Lead</p>
                        </div>

                        <div className="customer sc-body-rg">
                          <div></div>
                          <p>Customer</p>
                        </div>

                        <div className="not_interested sc-body-rg">
                          <div></div>
                          <p>Not Intrested</p>
                        </div>

                        <div className="agent sc-body-rg">
                          <div></div>
                          <p>Agent</p>
                        </div>

                        <div className="junk sc-body-rg">
                          <div></div>
                          <p>Junk</p>
                        </div>

                        <div className="consultant sc-body-rg">
                          <div></div>
                          <p>Consultant</p>
                        </div>

                        <div className="prospective sc-body-rg">
                          <div></div>
                          <p>Prospective</p>
                        </div>

                        <div className="vendor sc-body-rg">
                          <div></div>
                          <p>Other Vendor</p>
                        </div>
                      </div>
                    }
                  > */}
                    <div
                      className="change_status sc-body-md"
                      onClick={() => setChangeStatus(!changeStatus)}
                    >
                      <img src="/images/icons/three-dot.svg" alt="" />
                      <p>More Options</p>
                    </div>
                  {/* </Popover> */}

                  {/* <Popover
                    style={{ marginBottom: "20px" }}
                    position="topLeft"
                    trigger="click"
                    showArrow={false}
                    content={
                      <div className="change_position_dropdown">
                        <p>Position</p>
                        <SearchDropdown width={330} />
                        <button className="btn_hover_animation">Submit</button>
                      </div>
                    }
                  >
                    <div
                      className="change_position sc-body-md"
                      onClick={() => setChangePosition(!changePosition)}
                    >
                      <img src="images/icons/user_avatar.svg" alt="user" />
                      <p>Tags</p>
                    </div>
                  </Popover> */}
                </div>

                <div className="delete_container">
                  <img src="images/icons/delete_red_icon.svg" alt="" />
                  <p>Delete</p>
                </div>
              </div>
            )}

            <Modal
              open={updateModal}
              width={"max-content"}
              onCancel={handleUpdateCancel}
              style={{ top: 0 }}
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
              <div className="update-contact-container">
                <div className="header">
                  <h1 className="heading-sb">Edit Contact</h1>
                  <p className="sc-body-rg mt-10 title">
                    Edit the contact details
                  </p>
                  <hr className="h-line" />

                  <p className="sc-body-md profile-title mb-10">
                    Profile Image
                  </p>
                  <div className="proflie-img-container mb-20">
                    <Upload
                      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                      onChange={(info) => {
                        const file = info.file.originFileObj;
                        handleFileUpload(file);
                        handleImagePreview(file);
                      }}
                      name="contact_image"
                      onRemove={handleRemove}
                    >
                      <div className="img-container">
                      {/* {cusomizeData.map((data, index) => {
              let initials = "";
              if (data.name) {
                const nameArr = data.name.split(" ");
                if (nameArr.length > 1) {
                  initials =
                    nameArr[0].charAt(0) +
                    nameArr[nameArr.length - 1].charAt(0);
                } else {
                  initials = nameArr[0].charAt(0);
                }
              }
           return (<div></div>) })} */}
                        {updateId?.contact_image ? (
                          <img
                            className="user-img"
                            src={updateId?.contact_image}
                            alt=""
                          />
                        ) : (
                          <img
                            className="user-img"
                            src="/images/icons/user-avatar.jpeg"
                            alt=""
                          />
                        )}
                        <div className="edit-img">
                          <img src="/images/icons/edit-white.svg" alt="" />
                        </div>
                        
                      </div>
                    </Upload>
                    <p className="sc-body-sb remove-img" onClick={handleRemove}>
                      Remove Profile Image
                    </p>
                  </div>
                  <div className="input-container">
                    <CustomInput
                      width={330}
                      icon="/images/icons/user-name-icon.svg"
                      placeholder="Enter name"
                      label="Name"
                      value={updateId?.name}
                      name="name"
                      onChange={onChangeValue}
                    />

                    <SearchSelect
                      width={331}
                      name="status"
                      label="Status"
                      value={updateId?.status}
                      options={getstatusdata1}
                      onChange={handleDrpChangePosition}
                    />

                    <InputGroup
                      width={98}
                      mainWidth={330}
                      inputWidth={232}
                      options={countryCodes}
                      label="Phone"
                      type="number"
                      drpValue={selectedCode}
                      name="mobile"
                      placeholder="Mobile No."
                      value={updateId?.mobile}
                      onChange={onChangeValue}
                    />
                    <SearchSelect
                      width={331}
                      addNew="Position"
                      name="position"
                      label="Position"
                      value={updateId?.position}
                      options={othersource1}
                      onChange={handleDrpChangePosition}
                    />

                    <CustomInput
                      width={330}
                      icon="/images/icons/Email-icon.svg"
                      placeholder="Enter email"
                      label="Email"
                      type="email"
                      inputType={"email"}
                      name="email"
                      value={updateId?.email}
                      onChange={onChangeValue}
                    />

                    <SearchSelect
                      label="Lead Source"
                      addNew="Lead"
                      width={331}
                      name="lead"
                      value={updateId?.lead_source}
                      options={otherlead1}
                      onChange={handleDrpChangePosition}
                    />

                    <CustomInput
                      width={330}
                      label="Date of Birth"
                      value={updateId?.dob}
                      name="dob"
                      onChange={onChangeValue}
                    />

                    <SearchSelect
                      label="Ownership"
                      width={330}
                      name="ownership"
                      value={updateId?.ownership}
                    />
                  </div>
                  <div className="btn-container d-flex mt-30 gap-16">
                    <ContainedButton
                      value="Update Details"
                      onClick={handleFormSubmit}
                    />
                    <ContainedSecondaryButton
                      value="Cancel"
                      onClick={handleUpdateCancel}
                    />
                  </div>
                </div>
              </div>
            </Modal>

            <Modal
              open={confirm}
              //   onOk={handleMaterialOk}
              width={"max-content"}
              onCancel={handleUpdateCancel}
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
                <p className="mt-20 heading-sb">Delete Contact</p>
                <p className="sc-body-rg mt-10">
                  Are you sure you want to delete selected contacts?
                </p>
                <div className="delete-cancel-btn d-flex gap-16 mt-30">
                  <ContainedButton
                    value="Delete"
                    onClick={handleSubmit}
                    color="danger"
                  />
                  <ContainedSecondaryButton
                    value="Cancel"
                    onClick={handleConfirm}
                  />
                </div>
                <div></div>
              </div>
            </Modal>
          </div>
        </div>
      )}

      {activeMode === "grid" && (
        <div className="contacts-grid-container">
          <FilterAndSearchBar
            selectedColumnsLength={selectedColumns.length}
            results_length={`${cusomizeData.length} Contacts`}
            filterdata={[
              <div className="contact_filter_container">
                <div className="customer_filter_filed">
                  <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label">Position</label>{" "}
                  </Tooltip>
                  <SearchDropdown
                    width={330}
                    name="position"
                    options={position}
                    value={custfilter.position}
                    onChange={handleChange}
                  />
                </div>

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
                    options={ownership}
                    value={custfilter.ownership}
                    onChange={handleChange}
                  />
                </div>

                <div className="customer_filter_filed">
                  <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label
                      className="contactlabel"
                      style={{ marginTop: "5px" }}
                    >
                      Date of Birth
                    </label>{" "}
                  </Tooltip>
                  <br />
                  <div className="contactinput" style={{ marginTop: "5px" }}>
                    <img src={dob} className="customerimg" />

                    <CalendarComp
                      name="dob"
                      value={custfilter.dob}
                      onChange={onChangedob}
                    />
                  </div>
                </div>
              </div>,
            ]}
            change={filterarray}
            onSelectColumn={handleSelectColumn}
            customer={fetchcontact.length}
            filterLength={filterarray.length}
            columns={columns}
            setColumns={setColumns}
            addBtnName={"Contacts"}
            onData={handleData}
            filter={<Contacts />}
            onFilter={(e) => {
              clearfilter(e);
              setVisible(!visible);
            }}
            activeMode={
              <div className="grid-table-container">
                <div onClick={() => setActiveMode("grid")}>
                  <div
                    className={`option animated  ${
                      activeMode === "grid" ? "active fadeInRight" : ""
                    }`}
                  >
                    <img src="/images/icons/active-grid-icon.svg" alt="" />
                  </div>
                </div>
                <div onClick={() => setActiveMode("table")}>
                  <div
                    className={`option animated  ${
                      activeMode === "table" ? "active fadeInRight" : ""
                    }`}
                  >
                    <img src="/images/icons/list-non-active-icon.svg" alt="" />
                  </div>
                </div>
              </div>
            }
            statusSelect={
              <SearchSelect
                value="All"
                showSearch={false}
                options={StatusOptions}
                width={170}
              />
            }
          />
          <OffCanvasExample
            form={<Contacts handledata={getDataChild} onClick={getData} />}
          />
          <div className="tableData">
            {filterarray.length > 0 && (
              <div className="tags" id="tags">
                <div className="appliedtag ">Filtered by </div>
                {filterarray.map((customerfilter, index) => 
                {
                  return (
                    customerfilter.value && (
                      <Tooltip
                        className="tlpclr"
                        id="tlpclr"
                        title={`${
                          (customerfilter.key === "status" && "Status") ||
                          (customerfilter.key === "lead_source" && "Lead Source") ||
                          (customerfilter.key === "position" && "Position") ||
                          (customerfilter.key === "ownership" && "Ownership") ||
                          (customerfilter.key === "dob" && "Date of Birth") ||
                          (customerfilter.key === "updated_date_time" && "Date")
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
                          {customerfilter.key == "dob"
                            ? convertedDate
                            : customerfilter.value}
                        </Tag>
                      </Tooltip>
                    )
                  );
                })}

                <button
                  type="submit"
                  className="btnfilter"
                  onClick={(e) => {
                    setFilteraaray(filterarray.filter(filter => filter.key !== 'position'));
                    setVisible(!visible);
                    clearfilter(e);
                    setCustFilter(prevFilter => ({
                      ...prevFilter,
                      position: ""
                    }));
                  }}
                >
                  Clear All
                </button>

              </div>
            )}
          </div>

          <div className="grid-data-container">
            {cusomizeData.map((data, index) => {
              let initials = "";
              if (data.name) {
                const nameArr = data.name.split(" ");
                if (nameArr.length > 1) {
                  initials =
                    nameArr[0].charAt(0) +
                    nameArr[nameArr.length - 1].charAt(0);
                } else {
                  initials = nameArr[0].charAt(0);
                }
              }
              return (
                <div className="card-container">
                  <div className="profile-container">
                    <div className="profile_name_letter">
                      <span>{initials}</span>
                    </div>
                    {/* <img src="/images/searchbar_icons/User-Avtar.svg" className="user-avtar" alt="" /> */}
                    <div className="name-option-container">
                      <h2 className="title-sb name">{data.name}</h2>
                      <p className="caption-md">Key Person</p>
                      <div className="lead-option-container">
                        <div className="lead caption-sb">Lead</div>
                        <img src={editdelete} alt="icon" />
                      </div>
                    </div>
                  </div>

                  <div className="business-details-container">
                    <div className="account">
                      <p className="caption-md">Account</p>
                      <h5 className="sc-body-md business-name">
                        Reformiqo Business Service Pvt. Ltd
                      </h5>
                    </div>

                    <div className="email">
                      <p className="caption-md">Email</p>
                      <h5 className="sc-body-md email-id">
                        parth.goswami@reformiqo.com
                      </h5>
                    </div>

                    <div className="phone">
                      <p className="caption-md">Phone</p>
                      <h5 className="sc-body-md mobile">{data.mobile}</h5>
                    </div>

                    <div className="lead">
                      <p className="caption-md">Lead Source</p>
                      <h5 className="sc-body-md lead-source">
                        Itme 2022{" "}
                        <span className="caption-md">
                          (18 Feb 2022 - 1:30 PM)
                        </span>
                      </h5>
                    </div>

                    <div className="ownership">
                      <p className="caption-md">Ownership</p>
                      <h5 className="sc-body-md ownership-name">
                        Ashish Jaria
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ContactsData;
