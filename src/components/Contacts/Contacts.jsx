import React,{useState,useEffect,useRef} from "react";
import "./Contacts.scss";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import dob from "../../assets/Images/FormIcon/DOB.svg";
import name from "../../assets/Images/FormIcon/Name Contact.svg";
import Phone from "../../assets/Images/FormIcon/Phone Contact.svg";
import email from "../../assets/Images/FormIcon/Email Contact.svg";
import { Button, Modal, Tooltip } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import config from "../Database/config";
import { useFormik } from "formik";
import { contactSchemas } from "../../Schemas";
import alert from "../../assets/Images/Confirmation/confirm.svg";
import ContactsData from "./Contacts-Data/ContactsData";
import SearchDropdownAddButtonContact from "../AllDropdowns/SearchDropdownAddButtonContact/SearchDropdownAddButtonContact";


var ChildStateModificationFunc;
const resetValue = {
   name: "" ,
   mobile:"",
   email:"",
   dob:"",
   position: "",
   ownership: "",
  };


  const initialFieldValues = {
    name: "",
    mobile: "",
    email: "",
    dob: "",
    position: "",
    ownership: "",
  };
function Contacts(props) {
  const [formData, setFormData] = useState(resetValue);
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal
 // const [fetchcontact, setFetchcontact] = useState([]);
  //const [fetchcontact, setFetchcontact] = useState([]);
  const [addSouce, setAddSource] = useState([]);
  const [loading, setloading] = useState(true);
  // useEffect(() => {
  //   getData();
  // }, []);
  
  ChildStateModificationFunc = (modVal)=>{
    setFormData(modVal)
}

//cofirmation modal 
const handleConfirmData = () => {
  setCofirmData(true);
};

const handleConfirmDataClose = () => {
  setCofirmData(false);
};

const handleCancel = () => {
  setCofirmData(false)
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
    initialValues: initialFieldValues,
  
    validationSchema: contactSchemas,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFormSubmit = () => {
    if (formData.id)
    {

      // props.onSubmit(setFormData);
      axios
        .put(
          `${config.baseUrl}/contact/` + formData.id + "/",
          {
        
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            dob:formData.dob,
            "is_active": true,
            "is_deleted": false,
            "position": 1
        ,
            "ownership": 1,
            "company_id": 1,
            "created_by": 1,
            "updated_by": 1
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
    }
    else{
    axios
      .post(
        `${config.baseUrl}/contact/`,
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          dob:formData.dob,
          "is_active": true,
          "is_deleted": false,
          position: formData.position,
          "ownership": 1,
          "company_id": 1,
          "created_by": 1,
          "updated_by": 1
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
  }

   //get data positon

const othersource =addSouce.map((place)=>({
  key:place.id,
  label: place.position_name,
  value: place.position_name,
}))

useEffect (()=>
{
  getSource();
}, [])

const getSource = () => {
  return fetch(`${config.baseUrl}/position/`)
    .then((response) => response.json())
    .then((data) => {
      setAddSource(data);
      console.log(data);
    });
};


console.log(addSouce)
  
  const handleDrpChange = (field, value) => {
    const selectedOption = othersource.find((option) => option.value === value);
    console.log(selectedOption) 
    setFormData({ ...formData, [field]: value,
    position:selectedOption.key });
    setFieldValue(field, value);
    setFieldTouched(field, false);
    console.log(field)
    console.log(value)
  };
  
const onChange = (e) => {
  const { value, name } = e.target;

  setFormData({ ...formData, [name]: value });
  console.log(value);
  console.log(name);
};

console.log(formData)

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

  const inputRef=useRef(null);

  const handleKeyPress = (e) =>
  {
      if(e.target.value.length >= 10)
      {
        e.preventDefault();
      }
  }

  return (
    <>
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="contact_heading">
      </div>
      
      <div className="contactform">
        <div className="contacts">
          <h1 className="box_heading1"> {formData.id ? "Update Contact" : "Add Contact"}</h1>
          <div className="contact_details">
            <div className="form-left">
            <div className="form_field">
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
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {handleChange(e); onChange(e);}}
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
              </div>
              <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Mobile No.
                </label>{" "}
              </Tooltip>
              <br />
              <div className={`${
                    errors.mobile && touched.mobile && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={Phone} className="customerimg" />
                <input
                  type="number"
                  ref={inputRef}
                  onKeyPress={handleKeyPress}
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => {handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                />
                {errors.mobile && touched.mobile && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.mobile &&  touched.mobile &&(
                    <p className="error_text">{errors.mobile}</p>
                  )}
              </div>
              <div className="form_field">
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
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {handleChange(e); onChange(e);}}
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
              </div>
              <div className="form_field">
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
              </div>

              <div className="dropdownBtn">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Position
                </label>{" "}
              </Tooltip>
              <br />
                <SearchDropdownAddButtonContact  width={331}
                  name="position" 
                  value={othersource.find(
                    (option) => option.key === formData.position && option.label
                  )?.label}
                 // value={formData.position}
                onChange={handleDrpChange}
                error={errors.position && touched.position ? true : false}
                errorMsg="Position is required"/>
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
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Ownership
                </label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={ownershipwithemail}  name="ownership"
                  onChange={handleDrpChange}
                  value={formData.ownership}
              //    error={errors.ownership && touched.ownership ? true : false}
               //   errorMsg="Ownership is required"
               />
              </div>
              

              <div className="contactbutton_bottom">
                 <button type="submit" className="contactsavebutton btn_hover_animation"  onClick={() => {handleFormSubmit()}}>
                  {formData.id ? "Update" :"Submit"}
                </button> 
                {/* <input type="submit" className="contactsavebutton"  onClick={() => {handleFormSubmit()}}/> */}
                <button 
                  type="button"
                  className="contactcancelbutton btn_hover_animation"
                  //onClick={handleclose}
                  onClick={handleConfirmData}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
       <ToastContainer/> 
     
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
              onClick={(e) => {handleCancel(e);handleclose(e)}}
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
    </>
  );
}

export default Contacts;
export {ChildStateModificationFunc}
