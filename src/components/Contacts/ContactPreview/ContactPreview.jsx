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
  DatePicker,
  Calendar,
} from "antd";
import { useEffect } from "react";
import { useMemo } from "react";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import "./ContactPreview.scss";
import AttachmentFile from "../../AttachmentFile/AttachmentFile";
import { Link, useParams } from "react-router-dom";
import config from "../../Database/config";
import { SearchSelect, InputGroup } from "../../Dropdowns/Dropdowns";
import {
  ContainedButton,
  ContainedSecondaryButton,
} from "../../Buttons/Button";
import { ContainedIconButton, GhostIconButton } from "../../Buttons/Button";
import CustomInput from "../../CustomInput/CustomInput";
import Notes from "../../Notes/Notes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const filterfield = {
  name: "",
  mobile: "",
  email: "",
  company: "",
  lead: "",
  ownership: "",
};

const resetValue = {
  contact_id: "",
  customer_vendor_id: "",
};

const resetnoteValue = {
  title: "",
  description: "",
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

const ContactPreview = () => {
  const [noteData, setNoteData] = useState(resetnoteValue);
  const [formData, setFormData] = useState(resetValue);
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
  const [activeTab, setActiveTab] = useState("related_account");
  const [attachmentsModal, setAttachmentsModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [getContact, setGetContact] = useState([]);
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
  const [assignedData, setAssignedData] = useState([]);
  const [addSouce, setAddSource] = useState([]);
  const [assignedCustomer, setAssignedCustomer] = useState([]);
  const [CalendarVisible, setCalendarVisible] = useState(false);
  const [updateModal, setUpdateModal] = useState(false)
  const [selectedCode, setSelectedCode] = useState("India");
  const [attachData, setAttachData] = useState({
    attatch_name: "",
    attachments: "",
  });

  const [dob, setDob] = useState(false)
  console.log(dob)
  //handlecancel

  const { id } = useParams();
  console.log(id);

  const handleCancel = () => {
    if (isCustomerSelected && customerSubmit) {
      setSalesOrderModal(false);
    } else {
      setSalesOrderModal(false);
      //  window.history.back(-1);
    }
    setAttachmentsModal(false);
  };

  const handleSubmit = () => {
    setSalesOrderModal(false);
    setCustomerSubmit(true);
  };

  //get customervendor assign data in table
  let assignedId = getContact.id;
  useEffect(() => {
    getAssigedData();
  }, [assignedId]);

  const getAssigedData = () => {
    return fetch(
      `${config.baseUrl}/customervendorlinkedin/?company_id=1&contact_id=${assignedId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const customerVendorIds = data.data.items.map(
          (item) => item.customer_vendor_id
        );
        setAssignedData(customerVendorIds);
        console.log(customerVendorIds);
        console.log(data);
      });
  };

  console.log(assignedId);
  console.log(assignedData);

  console.log(getContact);
  console.log(getContact.business_name);


  // update modal 


const handleUpdateCancel = () =>{
  setUpdateModal(false)
}

  //data display in table

  // const getAssigedDataCustomer = () => {
  //   assignedData.forEach((id) => {
  //     fetch(`${config.baseUrl}/customervendor/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setAssignedCustomer(prevState => [...prevState, data]);
  //         console.log(data);
  //       });
  //   });
  // };
  useEffect(() => {
    assignedData.forEach((ids) => {
      getAssigedDataCustomer(ids);
    });
  }, [assignedData]);

  const getAssigedDataCustomer = (id) => {
    // const ids = assignedData.join(',');
    // console.log(ids)
    fetch(`${config.baseUrl}/customervendor/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignedCustomer((prevState) => [...prevState, data]);
        console.log(data);
      });
  };

  console.log(assignedCustomer);

  //for modal delete

  useEffect(() => {
    getContactData();
    getstatus();
    getlead();
    getCustomerVendor();
    // getSingleCustomerVendor();
    getCusVenCurrency();
    getCusVenpayent();
    getPincodeArea();
    getSource();
  }, []);

  const getContactData = () => {
    return fetch(`${config.baseUrl}/contact/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGetContact(data);
        console.log(data);
      });
  };

  console.log(getContact);

  //get customervendor

  const getCustomerVendor = () => {
    return fetch(`${config.baseUrl}/customervendor/`)
      .then((response) => response.json())
      .then((data) => {
        setCustVen(data.data.items);

        console.log(data);
        console.log(data.gstin);
      });
  };

  console.log(custven);

  const customerDataSelectOptions = custven.map((place) => ({
    key: place.id,
    label: (
      <div className="sales-order-customer-data-container">
        <p className="business-name">{place.business_name}</p>

        <p className="caption-md contact-title mb-8">
          GSTIN : <span className="caption-md">{place.gstin}</span>
        </p>
        <div className="d-flex justify-between mb-0">
          <p className="caption-md gstin-title">
            Type : <span className="caption-md">{place.type}</span>
          </p>
          <p className="caption-md city-title">
            Category : <span className="caption-md">{place.type_category}</span>
          </p>
        </div>
      </div>
    ),
    value: place.business_name,
  }));

  const gettypedata = status
    .filter((place) => place.field === "type" && place.module === "cus_ven")
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));

  console.log(gettypedata);

  //onchange

  //

  const handleDrpChangeStatus = (field, value) => {
    const selectedOption = customerDataSelectOptions.find(
      (option) => option.value === value
    );
    console.log(selectedOption);
    setCustomerId({
      ...customerId,
      [field]: value,
      customerId: selectedOption.key,
    });
    //  setFormData({...formData,[field]:value , business_name:customerId.customerId })
    setIsCustomerSelected(true);
    console.log(field);
    console.log(value);
  };

  useEffect(() => {
    setFormData({ ...formData, customer_vendor_id: customerId.customerId });
  }, [customerId]);
  console.log(formData);
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

  const getCurrency = cusvenCurrency.map((place) => ({
    key: place.id,
    label: place.currency_name,
    value: place.currency_name,
  }));

  // console.log(status, getstatusdata)

  let currencydata = getCurrency.find(
    (option) => option.key === singleCusVen.currency && option.label
  )?.label;

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

  let paymentdata = getPayment.find(
    (option) => option.key === singleCusVen.payment_terms && option.label
  )?.label;

  //get position

  const getSource = () => {
    return fetch(`${config.baseUrl}/position/`)
      .then((response) => response.json())
      .then((data) => {
        setAddSource(data.data.items);
        console.log(data);
      });
  };
  console.log(addSouce);

  const othersource = addSouce.map((place) => ({
    key: place.id,
    label: place.position_name,
    value: place.position_name,
  }));

  console.log(othersource);

  let position = othersource.find(
    (option) => option.key === getContact.position && option.label
  )?.label;

  console.log(position);
  console.log(getContact.position);

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
  //type category of cuatomer/vendor

  const getcategorydata = status
    .filter(
      (place) =>
        place.field === "c_type" ||
        ("v_type" && place.module === "Customer") ||
        "Vendor"
    )
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));
  console.log(status);
  console.log(getcategorydata);

  let typecategorydata = getcategorydata.find(
    (option) => option.key === singleCusVen.type_category && option.label
  )?.label;

  console.log(typecategorydata);

  //status

  const getstatuscusven = status
    .filter(
      (place) => place.field === "Status" && place.module === "Contact_Status"
    )
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));

  let statusdatacusven = getstatuscusven.find(
    (option) => option.key === getContact.status && option.label
  )?.label;
  console.log(statusdatacusven);
  //type of customer/vendor
  console.log(status);
  const getstatusdata = status
    .filter((place) =>
      place.field === "Status" &&
      place.module === "Contact_Status" &&
      place.master_value === "1"
        ? "Customer"
        : "Vendor"
    )
    .map((place) => ({
      key: place.id,
      label: place.master_key,
      value: place.master_key,
    }));

  console.log(status, getstatusdata);

  let statusdata = getstatusdata.find(
    (option) => option.key === singleCusVen.type && option.label
  )?.label;

  console.log(statusdata);

  console.log(getContact);

  //getlead
  const getlead = () => {
    return fetch(`${config.baseUrl}/leadsource/`)
      .then((response) => response.json())
      .then((data) => {
        setAddLead(data.data.items);
        console.log(data);
      });
  };

  const otherlead = addlead.map((place) => ({
    key: place.id,
    label: place.lead_source,
    value: place.lead_source,
  }));

  let leaddata = otherlead.find(
    (option) => option.key === getContact.lead_source && option.label
  )?.label;

  console.log(leaddata);

  console.log(id);
  const handleConfirmCancel = (record) => {
    setDeleteRecord(record);
    setCofirm(true);
  };

  const handleConfirm = () => {
    setCofirm(false);
    setDeleteRecord(null);
  };

  //assign contact to customer/ vendor

  const handleFormSubmit = (e) => {
    // e.preventDefault();
    axios
      .post(
        `${config.baseUrl}/customervendorlinkedin/?company_id=1`,
        {
          contact_id: id,
          customer_vendor_id: formData.customer_vendor_id,
          company_id: 1,
          created_by: 1,
          updated_by: 1,

          // business_name:formData.business_name,
          // name: getContact.name,
          // mobile: getContact.mobile,
          // email: getContact.email,
          // //   dob:formData.dob,
          // dob: "2000-09-09",
          // contact_image: "https://unsplash.com/photos/ioyEITUD2G8",
          // notes: "good",
          // is_active: true,
          // is_deleted: false,
          //  position: getContact.position,
          // //position: 1,
          // company_name: 1,
          // status: getContact.status,
          // lead_source: getContact.lead,
          // ownership: 1,
          // company_id: 1,
          // created_by: 1,
          // updated_by: 1,
        },
        formData
      )
      .then((response) => {
        getAssigedData();
        setSalesOrderModal(false);
        getAssigedData();
        setFormData(resetValue);
        getAssigedData();
        // getData();
        // handleclose();
        // props.onClick();

        toast.success("Assigned Successfuly", {
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

  let business = assignedData.business_name;
  console.log(business);

  const dataSource = assignedCustomer.map((customers) => ({
    key: customers.Key,
    id: customers.id,
    business_name: customers.business_name,
    gstin: customers.gstin,
    type: getstatusdata.find(
      (option) => option.key === customers.type && option.label
    )?.label,
    category: getcategorydata.find(
      (option) => option.key === customers.type_category && option.label
    )?.label,
    position: othersource.find(
      (option) => option.key === getContact.position && option.label
    )?.label,
    status: "Active",
  }));

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
                    {record.gstin}
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
            showArrow={true}
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
            placement="left"
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

  // const filteredData = dataSource.filter((record) =>
  //   record.business_name.toLowerCase().includes(search.toLowerCase())
  // );
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
    (record) => console.log(record)
    //  record.business_name.includes(custfilter.lead)
    //  && record.business_name.toLowerCase().includes(search.toLowerCase())
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

  //table

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

  let initials = "";
  if (getContact.name) {
    const nameArr = getContact.name.split(" ");
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

  //notes data input

  //onchange

  const onChangeNote = (e) => {
    const { value, name } = e.target;

    setNoteData({ ...noteData, [name]: value });
    console.log(value);
    console.log(name);
  };

  const handleFormSubmitNotes = (value) => {
    console.log(value);
    // e.preventDefault();
    axios
      .post(
        `${config.baseUrl}/contactnotes/`,
        {
          title: value.title,
          discription: value.description,
          contact_id: id,
          company_id: 1,
          created_by: 1,
          updated_by: 1,
        },
        value
      )
      .then((response) => {
        // getAssigedData();
        // setSalesOrderModal(false);
        // getAssigedData();
        // setFormData(resetValue)
        // getAssigedData();
        // getData();
        // handleclose();
        // props.onClick();

        toast.success("Notes Added Successfuly", {
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

  //attachment data fill

  const onChangeAttachment = (e) => {
    const { value, name } = e.target;

    setAttachData({ ...attachData, [name]: value });
    console.log(value);
    console.log(name);
  };
  console.log(attachData);

  // const handleFileUpload = (file) => {
  //   if (file && file.size >=2048) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setAttachData({
  //         ...attachData,
  //         attachments: reader.result,
  //       });
  //     };
  //   } else {
  //     console.log("Invalid file size or type");
  //   }
  // };

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

  // const handleFileUpload = (file) => {
  //   if (file && file.size <= 1048576) {

  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setAttachData({
  //         ...attachData,
  //         attachments: reader.result,
  //         filename: file.name,
  //       });
  //     };
  //   } else {
  //     console.log("Invalid file size or type");
  //   }
  // };

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
        `${config.baseUrl}/contactattatchment/`,
        {
          attatch_name: attachData.attatch_name,
          attachments: attachData.attachments,
          contact_id: id,
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

  console.log(attachData);

  const [assignedDataAttach, setAssignedDataAttach] = useState([]);

  let assignedIds = getContact.id;
  console.log(assignedIds);
  useEffect(() => {
    getAttachAssigedData();
  }, [assignedId]);

  const getAttachAssigedData = () => {
    return fetch(
      `${config.baseUrl}/contactattatchment/?company_id=1&contact_id=${assignedIds}`
    )
      .then((response) => response.json())
      .then((data) => {
        //  const customerVendorIds = data.data.items.map(item => item.contact_id);
        setAssignedDataAttach(data.data.items);
        // console.log(customerVendorIds)
        console.log(data);
      });
  };

  // console.log(props.getAttachAssigedData)

  console.log(assignedDataAttach);

  // const showPreview = (e) => {
  //   if (e.target && e.target.files) {
  //     const attachments = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setAttachData({
  //         ...attachData,
  //         attachments: reader.result
  //       });
  //     };
  //     reader.readAsDataURL(attachments);
  //   } else {
  //     setAttachData({
  //       ...attachData,
  //       attachments: ""
  //     });
  //   }
  // };

  return (
    <div className="contact-preview-main">
      <Page_heading
        parent={"Business Account"}
        child={"Contact Details"}
        subchild={
          <Link exact to="/contacts">
            {"Contacts"}
          </Link>
        }
        addEditBtn={
         
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
                onClick={()=>setUpdateModal(true)}
              />
            </div>
         
        }
      />

      <div className="card-table-container">
        <div className="card-container">
          <div
            className="mb-10"
            style={{
              minWidth: 76.4,
              minHeight: 76.4,
              backgroundColor: "#5C5AD133",
              border: "1px solid #C2CAD2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: "#5C5AD0", fontWeight: 600, fontSize: "22px" }}
            >
              {initials}
            </span>
          </div>
          {/* <img className="contact-avatar" src="/images/icons/avatar.png" alt="avatar" /> */}
          <p className="subtitle-sb mb-10">{getContact.name}</p>
          <div className="contact-type caption-sb mb-20">
            {statusdatacusven}
          </div>
          <div className="contact-btn-container">
            <div className="btn-box">
              <div className="btn-icon">
                <img src="/images/icons/Email-icon.svg" alt="email" />
              </div>
              <p className="caption-md">Email</p>
            </div>
            <div className="btn-box">
              <div className="btn-icon">
                <img src="/images/icons/phone-gray.svg" alt="phone" />
              </div>
              <p className="caption-md">Phone</p>
            </div>
            <div className="btn-box">
              <div className="btn-icon more-icon">
                <img src="/images/icons/three-dot.svg" alt="more" />
              </div>
              <p className="caption-md">More</p>
            </div>
          </div>
          <hr className="h-line" />

          <div className="contact-details-container">
            <div className="phone">
              <p className="phone-label sc-body-rg mb-4">Phone</p>
              <p className="sc-body-md clr-n-400">+91 {getContact.mobile}</p>
            </div>

            <div className="email">
              <p className="email-label sc-body-rg mb-4">Email</p>
              <p className="sc-body-md clr-n-400"> {getContact.email}</p>
            </div>

            <div className="dob">
              <p className="dob-label sc-body-rg mb-4">Date of Birth</p>
              {!CalendarVisible ? <p className="sc-body-md  clr-p-100 dob-add-btn" style={{cursor:"pointer"}} onClick={()=> {setCalendarVisible(true)}}>{`${dob ? dob :"Add"}`} {dob && <img style={{cursor:"pointer"}} src="/images/icons/edit_blue_icon.svg" alt="" />}</p>:
              <div className="calendar-contaienr">
                <DatePicker selected={dob} onChange={(date) => setDob(date)} placeholder="Select Date"/>
                <div className="save-btn" onClick={()=> {setCalendarVisible(false)}}></div>
                <div className="cancel-btn" onClick={()=> {setCalendarVisible(false)}}></div>
              </div> }
            </div>

            <div className="ownership">
              <p className="ownership-label sc-body-rg mb-4">Ownership</p>
              <p className="sc-body-md clr-n-400">Ashish Jaria</p>
            </div>

            <div className="lead-source">
              <p className="lead-source-label sc-body-rg mb-4">Lead Source</p>
              <p className="sc-body-md clr-n-400">{leaddata}</p>
            </div>

            <div className="created-by">
              <p className="created-by-label sc-body-rg mb-4">Created By</p>
              <p className="sc-body-md mb-2 clr-n-400">Kushal Nahata</p>
              <p className="caption-md">{getContact.updated_date_time}</p>
            </div>
          </div>
        </div>

        <div className="table-container">
          <div className="tab-btn-container">
            <div
              className={`tab-btn sc-body-md ${
                activeTab === "related_account" && "active"
              }`}
              onClick={() => setActiveTab("related_account")}
            >
              Related Accounts
            </div>
            <div
              className={`tab-btn sc-body-md ${
                activeTab === "analytics" && "active"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </div>
            <div
              className={`tab-btn sc-body-md ${
                activeTab === "notes" && "active"
              }`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </div>
            <div
              className={`tab-btn sc-body-md ${
                activeTab === "attachments" && "active"
              }`}
              onClick={() => setActiveTab("attachments")}
            >
              Attachments
            </div>
            <div
              className={`tab-btn sc-body-md ${
                activeTab === "timeline" && "active"
              }`}
              onClick={() => setActiveTab("timeline")}
            >
              Timeline
            </div>
          </div>

          {
            <div className="table-header">
              <h1 className="title-sb">
                {activeTab === "related_account"
                  ? "Related Accounts"
                  : activeTab === "analytics"
                  ? "Analytics"
                  : activeTab === "notes"
                  ? "Notes"
                  : activeTab === "attachments"
                  ? "Attachment"
                  : activeTab === "timeline" && "Timeline"}{" "}
                <span className="account-count">
                  {activeTab === "attachments"
                    ? `(${assignedDataAttach.length})`
                    : activeTab === "related_account"
                    ? `(${assignedCustomer.length})`
                    : ""}
                </span>
              </h1>
              {/* <p className='sc-body-sb assign-account-btn' onClick={()=> setSalesOrderModal(true)}>{activeTab === "related_account" ? "+ Assign Account":activeTab === "notes" ? "+ Add Notes": activeTab === "attachments" ? <span className="d-flex align-center gap-4" onClick={()=>{setAttachmentsModal(true)}}><img src="/images/icons/attachment-icon-prmry.svg" alt="" /> New Attachments</span> :""}</p> */}
              {activeTab === "related_account" ? (
                <p
                  className="sc-body-sb assign-account-btn"
                  onClick={() => setSalesOrderModal(true)}
                >
                  + Assign Account
                </p>
              ) : activeTab === "notes" ? (
                <p
                  className="sc-body-sb assign-account-btn"
                  onClick={() => setCreateNoteActive(true)}
                >
                  + Add Notes
                </p>
              ) : activeTab === "attachments" ? (
                <p
                  className="sc-body-sb assign-account-btn d-flex align-center"
                  onClick={() => {
                    setAttachmentsModal(true);
                  }}
                >
                  <img src="/images/icons/attachment-icon-prmry.svg" alt="" />{" "}
                  New Attachments
                </p>
              ) : (
                ""
              )}
            </div>
          }

          {activeTab === "related_account" && (
            <div className="contact-preview-table-container">
              <div className="filter-searchbar-container">
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
                 // addBtnName={"Sales Order"}
                  onData={handleData}
                 // path={"add_sales"}
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
                  scroll={{ x: "200px" }}
                  dataSource={dataSource}
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
                  open={salesOrderModal}
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
                  {/* {!salesType ? 
          <div className="sales-order-modal-container">
          <div className="sales-type-container">
            <h1 className="heading-sb">Sales Order Type</h1>
            <p className="sc-body-rg mt-10 title">
            Which type of sales Order do you want to Create.
            </p>
            <hr className="h-line" />

            <div className="sales-type-select-container">
              <div className="sales-type-btn" onClick={()=> setSalesType("Items")}>
                <div className="btn-icon-container"><img src="/images/icons/item-icon.svg" alt="item" /></div>
                <p className="subtitle-sb">Items</p>
              </div>
              <div className="sales-type-btn" onClick={()=> setSalesType("Services")}>
                <div className="btn-icon-container"><img src="/images/icons/service-icon.svg" alt="services" /></div>
                <p className="subtitle-sb">Services</p>
              </div>
              <div className="sales-type-btn" onClick={()=> setSalesType("Job Work")}>
                <div className="btn-icon-container"><img src="/images/icons/jobwork-icon.svg" alt="jobwork" /></div>
                <p className="subtitle-sb">Job Work</p>
              </div>
              <div className="sales-type-btn" onClick={()=> setSalesType("Fixed Assets")}>
                <div className="btn-icon-container"><img src="/images/icons/fixedassets-icon.svg" alt="fixedassets" /></div>
                <p className="subtitle-sb">Fixed Assets</p>
              </div>
            </div>
          {activeTab === "notes" && <Notes />}

            </div>
        </div>: */}
                  <div className="sales-order-modal-container">
                    <div className="select-customer-container">
                      <h1 className="heading-sb">Customer Account</h1>
                      <p className="sc-body-rg title">
                        Choose customer account by considering the details
                      </p>
                      <hr className="h-line" />

                      <SearchSelect
                        width={381}
                        height={400}
                        label="Customer Account"
                        placeholder="Customer Account"
                        icon="/images/icons/customer-contact-icon.svg"
                        options={customerDataSelectOptions}
                        onChange={handleDrpChangeStatus}
                        name="business_name"
                        //  value={formData.business_name}
                        value={formData.customer_vendor_id}
                        //  value={
                        //   customerDataSelectOptions.find(
                        //     (option) =>
                        //       option.key === formData.business_name && option.label
                        //   )?.label
                        // }
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
                              {singleCusVen.registration_type}
                            </p>
                          </div>
                          <div className="gstin d-flex">
                            <p className="sc-body-rg title">GSTIN</p>
                            <p className="sc-body-sb">{singleCusVen.gstin}</p>
                          </div>
                          <div className="email d-flex">
                            <p className="sc-body-rg title">Email</p>
                            <p className="sc-body-sb">{singleCusVen.email}</p>
                          </div>
                          <div className="pancard d-flex">
                            <p className="sc-body-rg title">TAN No.</p>
                            <p className="sc-body-sb">{singleCusVen.tan_no}</p>
                          </div>
                          <div className="type d-flex">
                            <p className="sc-body-rg title">Type</p>
                            <p className="sc-body-sb">{statusdata}</p>
                          </div>
                          <div className="category d-flex">
                            <p className="sc-body-rg title">Category</p>
                            <p className="sc-body-sb">{typecategorydata}</p>
                          </div>
                          <div className="currency d-flex">
                            <p className="sc-body-rg title">Currency</p>
                            <p className="sc-body-sb">{currencydata}</p>
                          </div>
                          <div className="payment-terms d-flex">
                            <p className="sc-body-rg title">Payment Terms</p>
                            <p className="sc-body-sb">{paymentdata}</p>
                          </div>
                          <div className="credit-limit d-flex">
                            <p className="sc-body-rg title">Credit Limit</p>
                            <p className="sc-body-sb">
                              {singleCusVen.credit_limit}
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
          {activeTab === "attachments" && (
            <AttachmentFile
              attachData={getContact}
              getData={assignedDataAttach}
            />
          )}
          {activeTab === "notes" && (
            <Notes
              createNoteActive={createNoteActive}
              notesData={getContact}
              createNoteFalse={createNoteFalse}
              onSubmit={handleFormSubmitNotes}
            />
          )}
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
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                    onChange={(info) => {
                      const file = info.file.originFileObj;
                      handleFileUpload(file);
                      handleImagePreview(file);
                    }}
                    onRemove={handleRemove}
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
                        cursor:"pointer"
                      }}
                    >
                      {attachData.attachments && <div style={{width:"100%",}}>
                          <img src={attachData.attachments} alt="logo" style={{width:"100%"}} />
                        </div>}
                      { !attachData.attachments && <> <img
                          src="/images/icons/add-image-icon.svg"
                          alt="icon"
                          id="imgPreview"
                          className="mb-10"
                          height="100"
                          width="200"
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
                    </div>
                  </Upload>
                  <div className="mt-20">
                  <CustomInput
                    width={330}
                    label="Attachment Name"
                    placeholder="Name"
                    onChange={onChangeAttachment}
                    name="attatch_name"
                    value={attachData.attatch_name}
                  />
                  </div>
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
      <Modal
        open={updateModal}
        width={"max-content"}
        onCancel={handleUpdateCancel}
        style={{top:0, }}
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
                  <p className="sc-body-rg mt-10 title">Edit the contact details</p>
                  <hr className="h-line" />
                 
                 <p className="sc-body-md profile-title mb-10">Profile Image</p>
                 <div className="proflie-img-container mb-20">
                  <div className="img-container">
                    <img className="user-img" src="/images/icons/user-avatar.jpeg" alt="" />
                    <div className="edit-img"><img src="/images/icons/edit-white.svg" alt="" /></div>
                  </div>
                  <p className="sc-body-sb remove-img">Remove Profile Image</p>
                 </div>
                 <div className="input-container">
                 <CustomInput
                  width={330}
                  icon="/images/icons/user-name-icon.svg"
                  placeholder="Enter name"
                  label="Name"
                />

                  <SearchSelect
                  width={331}
                  name="status"
                  label="Status"
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
                />   
                <SearchSelect
                    width={331}
                    addNew="Position"
                    name="position"
                    label="Position"
                  /> 

                <CustomInput
                  width={330}
                  icon="/images/icons/Email-icon.svg"
                  placeholder="Enter email"
                  label="Email"
                  type="email"
                  inputType={"email"}
                  name="email"
                />

                <SearchSelect
                    label="Lead Source"
                    addNew="Lead"
                    width={331}
                    name="lead"
                  />

                  <CustomInput width={330} label="Date of Birth"/>

                  <SearchSelect
                    label="Ownership"
                    width={330}
                    name="ownership"
                  />





                 </div>
                  <div className="btn-container d-flex mt-30 gap-16">
                    <ContainedButton
                      value="Update Details"
                    />
                    <ContainedSecondaryButton
                      value="Cancel" onClick={handleUpdateCancel}
                    />
                  </div>
                </div>
              </div>
          </Modal>
      <ToastContainer />
    </div>
  );
};

export default ContactPreview;
