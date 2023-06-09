import React, { useState, useEffect, useRef } from "react";
import "./Contacts.scss";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import dob from "../../assets/Images/FormIcon/DOB.svg";
import name from "../../assets/Images/FormIcon/Name Contact.svg";
import Phone from "../../assets/Images/FormIcon/Phone Contact.svg";
import email from "../../assets/Images/FormIcon/Email Contact.svg";
import { Button, Modal, Popconfirm, Popover, Tooltip } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../Database/config";
import { useFormik } from "formik";
import { contactSchemas } from "../../Schemas";
import alert from "../../assets/Images/Confirmation/confirm.svg";
import ContactsData from "./Contacts-Data/ContactsData";
import SearchDropdownAddButtonContact from "../AllDropdowns/SearchDropdownAddButtonContact/SearchDropdownAddButtonContact";
import CustomInput from "../CustomInput/CustomInput";
import { InputGroup, SearchSelect } from "../Dropdowns/Dropdowns";
import { ContainedButton, ContainedSecondaryButton } from "../Buttons/Button";

var ChildStateModificationFunc;
const resetValue = {
  name: "",
  mobile: "",
  email: "",
  dob: "",
  position: "",
  ownership: "",
  status:"",
  lead:"",
  contact_image:"",
};

const initialFieldValues = {
  name: "",
  mobile: "",
  email: "",
  dob: "",
  position: "",
  ownership: "",
  status:"",
  lead:"",
};

const resetValuePosition = 
{
  position_name:""
}

const resetValueLead = 
{
  lead_source:""
}
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


function Contacts(props) {
  const [formData, setFormData] = useState(resetValue);
  const [addNewPopover, setAddNewPopover]= useState(false);
  const [addLeadPopover, setAddLeadPopover]= useState(false);
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal
  // const [fetchcontact, setFetchcontact] = useState([]);
  //const [fetchcontact, setFetchcontact] = useState([]);
  const [addSouce, setAddSource] = useState([]);
  const [addlead, setAddLead] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedCode, setSelectedCode] = useState("India");
  const [showPopover, setShowPopover] = useState(false);
  const [formDataPosition, setFormDataPosition] = useState(resetValuePosition);
  const [formDataLead, setFormDataLead] = useState(resetValueLead);
  

  ChildStateModificationFunc = (modVal) => {
    setFormData(modVal);
  };


  //cofirmation modal
  const handleConfirmData = () => {
    setCofirmData(true);
    
  };

  const onCancel = () => {
    if (Object.values(formData).every((val) => val === "")) {
      setCofirmData(false);
      handleclose();
    } else {
      setCofirmData(true);
    }
    resetForm()
  };

  const handleConfirmDataClose = () => {
    setCofirmData(false);
  };

  const handleCancel = () => {
    setCofirmData(false);
    //setCofirm(false)
    //setIsModalOpen(false);
    //   setFormData(resetValue);
  };
  // const getData = async () => {
  //   await axios.get("http://127.0.0.1:8000/contact/").then(
  //     res => {
  //       setloading(false);
  //       setFetchcontact(
  //         res.data.map(row => ({
  //           Name: row.name,
  //           Mobile: row.mobile,
  //           Email: row.email,
  //           DOB: row.dob,
  //           Position:row.position,
  //           Ownership:row.ownership
  //          // id: row.id
  //         }))
  //       );
  //       console.log(res);
  //     }

  //   );
  // };
  function handleclose() {
    var m = document.querySelector(".menu1 ");
    m.classList.remove("smenu");
    document.getElementById("gradient").classList.remove("body_gradient");
    setFormData(resetValue);
  }

  // validation

  const  {
    errors,
    values,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm
  } = useFormik({
    initialValues: initialFieldValues,

    validationSchema: contactSchemas,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFormSubmit = (e) => {
    // e.preventDefault();
    if (formData.id) {
      // props.onSubmit(setFormData);
      axios
        .put(
          `${config.baseUrl}/contact/` + formData.id + "/",
          {
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            dob: formData.dob,
            position: formData.position,
            status: formData.status,
            lead_source: formData.lead,
            dob: "2000-09-09",
           // contact_image: "https://unsplash.com/photos/ioyEITUD2G8",
            notes: "good",
            type: 1,
            country_code: 1,
            company_name: 1,
            ownership: 1,
            company_id: 1,
            created_by: 1,
            updated_by: 1,
          },
          formData
        )
        .then((response) => {
          // closeModal();
          // handleCancel();
          handleclose();
          props.onClick();
          //       getData();
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
    } else {
      axios
        .post(
          `${config.baseUrl}/contact/`,
          {
          
        
           
          
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
         
            //   dob:formData.dob,
            // dob: "2000-09-09",
            ...(formData.dob && { dob: formData.dob }),
           // contact_image:"",
       //    contact_image: "https://unsplash.com/photos/ioyEITUD2G8",
          ...(formData.contact_image && { contact_image: formData.contact_image }),
            notes: "good",
            is_active: true,
            is_deleted: false,
             position: formData.position,
            //position: 1,
            type: 1,
            country_code: 1,
            company_name: 1,
            status: formData.status,
            lead_source: formData.lead,
            ownership: 1,
            company_id: 1,
            created_by: 1,
            updated_by: 1,
          },
          formData
        )
        .then((response) => {
          // getData();
          handleclose();
          props.onClick();

          toast.success("Added Successfuly", {
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
  };
//master data status

 const getstatusdata = statusData
.filter((place) => place.field === "Status" && place.module === "Contact_Status")
.map((place) => ({
  key: place.id,
  label: place.master_key,
  value: place.master_key,
}));


useEffect(() => {
  getstatus();
}, []);

const getstatus = () => {
  return fetch(`${config.baseUrl}/master/`)
    .then((response) => response.json())
    .then((data) => {
      setStatusData(data.data.items);
      console.log(data);
    });
};

console.log(statusData);


//add position

const onChangeValue = (e) => {
  const { value, name } = e.target;
  
  setFormDataPosition({ ...formDataPosition, [name]: value });

  console.log(value);
  console.log(name);
  };
  console.log(formDataPosition)

const handleFormSubmitPosition = () => {

  axios
    .post(
      `${config.baseUrl}/position/`,
      {
        position_name: formDataPosition.position_name,
        "company_id": 1,
        "created_by": 1,
        "updated_by": 1
      },
      formData
    )

    .then((response) => {
      getSource();
   setFormDataPosition(resetValuePosition)
   setAddNewPopover(false);
     // props.onClick();
   //   handleclose();

       toast.success("Added Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    
    //  document.getElementById("inputsource").value=""
    });
   // document.getElementById("inputsource").value=""
}



//get lead data

const otherlead = addlead.map((place) => ({
  key: place.id,
  label: place.lead_source,
  value: place.lead_source,
}));

useEffect(() => {
  getlead();
}, []);

const getlead = () => {
  return fetch(`${config.baseUrl}/leadsource/`)
    .then((response) => response.json())
    .then((data) => {
      setAddLead(data.data.items);
      console.log(data);
    });
};

console.log(addlead);

const onChangeValueLead = (e) => {
  const { value, name } = e.target;
  
  setFormDataLead({ ...setFormDataLead, [name]: value });

  console.log(value);
  console.log(name);
  };
  console.log(formDataLead)

const handleFormSubmitLead = () => {
  axios
    .post(
      `${config.baseUrl}/leadsource/`,
      {
        lead_source: formDataLead.lead_source,
        "company_id": 1,
        "created_by": 1,
        "updated_by": 1
      },
      formData
    )

    .then((response) => {
      getlead();
   setFormDataLead(resetValueLead)
   setAddLeadPopover(false);
     // props.onClick();
   //   handleclose();

       toast.success("Added Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    
    //  document.getElementById("inputsource").value=""
    });
   // document.getElementById("inputsource").value=""
}

  // get data positon

  const handleEdit =(id) =>
  {
    alert(id)
  }

  const othersource = addSouce.map((place) => ({
    key: place.id,
   // label: <div style={{justifyContent:"space-between", display:"flex"}}> <p>{place.position_name}</p> <img src="\images\icons\edit_blue_icon.svg" /> </div>,
   label:place.position_name, 
   value: place.position_name,
    
  }));

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

  const handleDrpChange = (field, value) => {
    const selectedOption = othersource.find((option) => option.value === value);
    console.log(selectedOption);
    setFormData({ ...formData, [field]: value, position: selectedOption.key });
    setFieldValue(field, value);
    setFieldTouched(field, false);
    console.log(field);
    console.log(value);
  };


  const handleDrpChangeStatus = (field, value) => {
    const selectedOption = getstatusdata.find((option) => option.value === value);
    console.log(selectedOption);
    setFormData({ ...formData, [field]: value, status: selectedOption.key });
    setFieldValue(field, value);
    setFieldTouched(field, false);
    console.log(field);
    console.log(value);
  };

  const handleDrpChangeLead = (field, value) => {
    const selectedOption = otherlead.find((option) => option.value === value);
    console.log(selectedOption);
    setFormData({ ...formData, [field]: value, lead: selectedOption.key });
    setFieldValue(field, value);
    setFieldTouched(field, false);
    console.log(field);
    console.log(value);
  };


  const onChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(value);
    console.log(name);
  };

  console.log(formData);

  const ownershipwithemail = [
    {
      value: "Parth1",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },

    {
      value: "Parth2",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "Parth3",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "Parth4",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "Parth5",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
  ];

  // const position = [
  //   {
  //     value: 1,
  //     label: "Owner",
  //   },
  //   {
  //     value: 2,
  //     label: "Accountant",
  //   },
  //   {
  //     value: 3,
  //     label: "Manger",
  //   },
  //   {
  //     value: 4,
  //     label: "SalesPerson",
  //   },

  // ];

  //input validation

  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.target.value.length >= 10) {
      e.preventDefault();
    }
  };

const handlepopover= () =>
{
  setAddNewPopover(true)

}


const handleleadpopover= () =>
{
  setAddLeadPopover(true)

}
  return (
    <>
     <span className='close' onClick={(e)=>{onCancel()}} >&times;</span>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="contact_heading"></div>

        <div className="contactform">
          <div className="contacts">
            <h1 className="box_heading1 heading-sb">
              {" "}
              {formData.id ? "Update Contact" : "New Contact"}
            </h1>
            <div className="contact_details">
              <div className="form-left">
                <CustomInput
                  width={330}
                  icon="/images/icons/user-name-icon.svg"
                  placeholder="Enter name"
                  label="Name"
                  inputType={"CamelAlphabetical"}
                  value={formData.name}
                onChange={(e, newValue) => {handleChange(e); onChange(e); 
                  setFormData(prevState => ({
                    ...prevState,
                    "name": newValue
                  }))}}
                  onBlur={handleBlur}
                  name="name"
                  error={errors.name && touched.name ? true : false}
                  errorMsg={errors.name}
                />
                {/* <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Name
                </label>{" "}
              </Tooltip>
              <br />
              <div  className={`${
                    errors.name && touched.name && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={name} className="customerimg" />
                <CustomInput
                  inputType={"CamelAlphabetical"}
                    name="name"
                    placeholder="Placeholder"
                   value={formData.name}
                onChange={(e, newValue) => {handleChange(e); onChange(e); 
                  setFormData(prevState => ({
                    ...prevState,
                    "name": newValue
                  }))}}
                  onBlur={handleBlur}
              />
                {errors.name && touched.name && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.name &&  touched.name &&(
                    <p className="error_text">{errors.name}</p>
                  )}
              </div> */}
                {/* <div className="form_field">
  <Tooltip title="prompt text" color="#5C5AD0">
    {" "}
    <label className="contactlabel" style={{ marginTop: "5px" }}>
      Mobile No.
    </label>{" "}
  </Tooltip>
  <br /> */}
                {/* <InputGroup width={98}  options={countryCodes} label="Mobile No" /> */}
                {/* <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
  <div className="countryCodeDropdown focus-outline">
      <select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
        {countryCodes.map((country) => (
          <option key={country.code} value={country.code}>
            {country.code} ({country.value})
          </option>
        ))}
      </select>
    </div>
  <div className={`${errors.mobile && touched.mobile && "inputError"} contactinput`} style={{ marginTop: "5px", maxWidth:"277px", minWidth:"277px" }}>
    <img src={Phone} className="customerimg" />
    <input
   
      type="number"
      ref={inputRef}
      className="inputcontact"
      placeholder="Placeholder"
      name="mobile"
      value={formData.mobile}
      onChange={(e) => {handleChange(e); onChange(e);}}
      onBlur={handleBlur}
    />
    {errors.mobile && touched.mobile && (
      <div className="error_icon">
        <img src="/images/icons/exclamation_icon.svg" alt="error" />
      </div>
    )}
  </div>
  </div> */}
                {/* {errors.mobile &&  touched.mobile &&(
    <p className="error_text">{errors.mobile}</p>
  )}
</div> */}
                {/* <CustomInput 
                width={98}
                options={countryCodes}
                label="Mobile No"
                type="email"
                inputType={"email"}
                name="email"
                  placeholder="Placeholder"
                  value={formData.email}
                  onChange={(e) => {handleChange(e); onChange(e);}}
                onBlur={handleBlur}/> */}
                <InputGroup
                  width={98}
                  mainWidth={330}
                  inputWidth={232}
                  options={countryCodes}
                  label="Phone"
                  type="number"
                  // inputType={"email"}
                  drpValue={selectedCode}
                  name="mobile"
                    placeholder="Mobile No."
                    value={formData.mobile}
                    onChange={(e) => {handleChange(e); onChange(e);}}
                  onBlur={handleBlur}
                  error={errors.mobile && touched.mobile ? true : false}
                  errorMsg="Number is required"
                />

                {/* <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Email
                </label>{" "}
              </Tooltip>
              <br />
              <div className={`${
                    errors.email && touched.email && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={email} className="customerimg" />
                <CustomInput
                 type="email"
                  inputType={"email"}
                  name="email"
                    placeholder="Placeholder"
                    value={formData.email}
                onChange={(e, newValue) => {handleChange(e); onChange(e); 
                  setFormData(prevState => ({
                    ...prevState,
                    "email": newValue
                  }))}}
                  onBlur={handleBlur}
              />
                
                {errors.email && touched.email && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.email &&  touched.email &&(
                    <p className="error_text">{errors.email}</p> 
                  )}
              </div> */}
                <CustomInput
                  width={330}
                  icon="/images/icons/Email-icon.svg"
                  placeholder="Enter email"
                  label="Email"
                  type="email"
                  inputType={"email"}
                  name="email"
                    value={formData.email}
                onChange={(e, newValue) => {handleChange(e); onChange(e); 
                  setFormData(prevState => ({
                    ...prevState,
                    "email": newValue
                  }))}}
                  onBlur={handleBlur}
                  error={errors.email && touched.email ? true : false}
                  errorMsg={errors.email}
                />
                {/* <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Date of Birth
                </label>{" "}
              </Tooltip>
              <br />
              <div className={`${
                    errors.dob && touched.dob && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={dob} className="customerimg" />
                <input
                  type="date"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="dob"
                    value={formData.dob}
                    onChange={(e) => {handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                />
                {errors.dob && touched.dob && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.dob &&  touched.dob &&(
                    <p className="error_text">{errors.dob}</p>
                  )}
              </div> */}

                <div className="">
              {/* <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Status
                </label>{" "}
              </Tooltip>
              <br /> */}
              <SearchSelect
                  width={331}
                  name="status"
                  label="Status"
                  options={getstatusdata}
                  value={!formData.id ?
                    getstatusdata.find(
                      (option) =>
                        option.key === formData.status && option.label
                    )?.label : formData.status
                  }
                 onChange={handleDrpChangeStatus}
                  error={errors.status && touched.status ? true : false}
                  errorMsg="Status is required"
                />
                </div>
                
                
                {/* <SearchDropdown width={331} options={position}
                name="position"
             //   onChange={(e) => {handleChange(e); handleDrpChange(e);}}
                onChange={handleDrpChange}
                value={formData.position}
                error={errors.position && touched.position ? true : false}
                errorMsg="Position is required"
                  /> */}
                {/* </div> */}

                <div className="dropdownBtn">
                  {/* <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Position
                </label>{" "}
              </Tooltip>
              <br /> */}
                <Popover 
               id="popoverhide"  open={addNewPopover}
            getPopupContainer={(trigger) => trigger.parentElement} showArrow={true}
            placement="topLeft"
          //  content={props.addNewContent}
          content={                            
            <>
            <div>
           <p className="title_name subtitle-sb">Position</p>
           <p className="content_name sc-body-rg">Formal designation that represents a particular level of authority. </p>
           <CustomInput label="Add Position"  width={290}
            onChange={onChangeValue}
            name="position_name"
            value={formDataPosition.position_name}
            inputType={"CamelAlphabetical"}
            onBlur={handleBlur}
           />
           <div className="positon_button">
             <ContainedButton value="Submit" onClick={handleFormSubmitPosition}/>
             <ContainedSecondaryButton value="Cancel"  onClick={() => setAddNewPopover(false)} />
           </div>
            </div>
              </>
       }       
      title="" height={100} trigger="click">
                  <SearchSelect
                    width={331}
                    addNew="Position"
                    onClick={handlepopover}
                    name="position"
                    label="Position"
                    options={othersource}
                    value={!formData.id ? 
                      othersource.find(
                        (option) =>
                          option.key === formData.position && option.label
                      )?.label :formData.position
                    }
                    // value={formData.position}
                    onChange={handleDrpChange}
                    error={errors.position && touched.position ? true : false}
                    errorMsg="Position is required"
                  />
                </Popover>

                  {/* <SearchDropdown width={331} options={position}
                name="position"
             //   onChange={(e) => {handleChange(e); handleDrpChange(e);}}
                onChange={handleDrpChange}
                value={formData.position}
                error={errors.position && touched.position ? true : false}
                errorMsg="Position is required"
                  /> */}
                </div>

                <div className="dropdownBtn">
                  {/* <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Lead Source
                </label>{" "}
              </Tooltip>
              <br /> */}

          <Popover 
               id="popoverhide"  open={addLeadPopover}
            getPopupContainer={(trigger) => trigger.parentElement} showArrow={true}
            placement="topLeft"
          //  content={props.addNewContent}
          content={                            
            <>
             <div>
                     <p className="title_name subtitle-sb">Lead</p>
                     <p className="content_name sc-body-rg">Formal designation that represents a particular level of authority. </p>
                     <CustomInput label="Add Lead"  width={290}
                       onChange={onChangeValueLead}
                       name="lead_source"
                       value={formDataLead.lead_source}
                       inputType={"CamelAlphabetical"}
                       onBlur={handleBlur}
                       />
                     <div className="positon_button">
                     <ContainedButton value="Submit" onClick={handleFormSubmitLead}/>
                      <ContainedSecondaryButton value="Cancel" onClick={() => setAddLeadPopover(false)}/>
                     </div>
                      </div>
              </>
       }
           
      title="" height={100} trigger="click">
                  <SearchSelect
                    label="Lead Source"
                    addNew="Lead"
                    width={331}
                    onClick={handleleadpopover}
                    name="lead"
                   options={otherlead}
                    onChange={handleDrpChangeLead}
                    // value={
                    //   othersource.find(
                    //     (option) =>
                    //       option.key === formData.position && option.label
                    //   )?.label
                    // }
                    value={!formData.id ? otherlead.find(
                      (option) =>
                        option.key === formData.lead && option.label
                    )?.label : formData.lead}
                    error={errors.lead && touched.lead ? true : false}
                    errorMsg="Lead Source is required"
                  />

                  </Popover>
                </div>

                <div className="dropdownBtn">
                  {/* <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Ownership
                </label>{" "}
              </Tooltip>
              <br /> */}
                  <SearchSelect
                    label="Ownership"
                    width={330}
                    options={ownershipwithemail}
                    name="ownership"
                    onChange={handleDrpChange}
                    value={formData.ownership}
                    //    error={errors.ownership && touched.ownership ? true : false}
                    //   errorMsg="Ownership is required"
                  />
                </div>

                <div className="contactbutton_bottom">
                  {/* <button
                    type="submit"
                    className="contactsavebutton btn_hover_animation"
                    onClick={() => {
                      handleFormSubmit();
                    }}
                  >
                    {formData.id ? "Update" : "Submit"}
                  </button> */}

                  <ContainedButton type="submit" value={formData.id ? "Update" : "Submit"} onClick={() => {handleFormSubmit()}} />
                  {/* <input type="submit" className="contactsavebutton"  onClick={() => {handleFormSubmit()}}/> */}
                  <ContainedSecondaryButton value="Cancel" onClick={(e)=>{onCancel()}} />
                  {/* <button
                    // type="button"
                    className="contactcancelbutton btn_hover_animation"
                    //onClick={handleclose}
                    onClick={handleConfirmData}
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>


      {/* Confirmation */}

      <Modal
        open={confirmData}
        // onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirmDataClose}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirmDataClose}
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
              onClick={(e) => {
                handleCancel(e); handleclose(e);
              }}
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
                Warning
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
      <ToastContainer />
    </>
  );
}

export default Contacts;
export { ChildStateModificationFunc };
