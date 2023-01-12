import React,{useState,useEffect} from "react";
import "./Contacts.scss";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import dob from "../../assets/Images/FormIcon/DOB.svg";
import name from "../../assets/Images/FormIcon/Name Contact.svg";
import Phone from "../../assets/Images/FormIcon/Phone Contact.svg";
import email from "../../assets/Images/FormIcon/Email Contact.svg";
import { Tooltip } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import config from "../Database/config";

const resetValue = {
   name: "" ,
   mobile:"",
   email:"",
   dob:""
  };
function Contacts() {
  const [formData, setFormData] = useState(resetValue);
 // const [fetchcontact, setFetchcontact] = useState([]);
  //const [fetchcontact, setFetchcontact] = useState([]);
  const [loading, setloading] = useState(true);
  // useEffect(() => {
  //   getData();
  // }, []);

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
  }



  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   await axios.get(`${config.baseUrl}/contact/`).then(
  //     res => {
  //       setloading(false);
  //       setFetchcontact(
  //       res
  //          // id: row.id
  //         )
      
  //       console.log(res);
  //     }
      
  //   );
  // };

  const handleFormSubmit = () => {

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
          "position": 1,
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
        // getData();
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

  const contacts = [
    {
      value: "1",
      label: "Value 1",
    },
    {
      value: "2",
      label: "Value 2",
    },
    {
      value: "3",
      label: "Value3",
    },
  ];
  return (
    <>
      <div className="contact_heading">
      </div>
      <div className="contactform">
        <div className="contacts">
          <h1 className="box_heading1">New Contact</h1>
          <div className="contact_details">
            <div className="form-left">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Name
                </label>{" "}
              </Tooltip>
              <br />
              <div className="contactinput" style={{ marginTop: "5px" }}>
                <img src={name} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Mobile No.
                </label>{" "}
              </Tooltip>
              <br />
              <div className="contactinput" style={{ marginTop: "5px" }}>
                <img src={Phone} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="mobile"
                  value={formData.mobile}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Email
                </label>{" "}
              </Tooltip>
              <br />
              <div className="contactinput" style={{ marginTop: "5px" }}>
                <img src={email} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="email"
                  value={formData.email}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Date of Birth
                </label>{" "}
              </Tooltip>
              <br />
              <div className="contactinput" style={{ marginTop: "5px" }}>
                <img src={dob} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="dob"
                  value={formData.dob}
                  onChange={onChange}
                />
              </div>

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Position
                </label>{" "}
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={contacts}
                name="position"
                  value={formData.position}
                  onChange={onChange} />

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Ownership
                </label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={ownershipwithemail}  name="ownership"
                  value={formData.ownership}
                  onChange={onChange}/>
              

              <div className="contactbutton_bottom">
                <button type="button" className="contactsavebutton"  onClick={() => handleFormSubmit()}>
                  Submit
                </button>
                <button 
                  type="button"
                  className="contactcancelbutton"
                  onClick={handleclose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
