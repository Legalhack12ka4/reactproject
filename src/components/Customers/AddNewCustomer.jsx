import React, { useEffect, useState } from "react";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./AddNewCustomer.scss";
import logo from "./images/Email.svg";

const initialFieldValues = {
  lgnm: "",
  gstin: "",
};

function AddNewCustomer(props) {
  const [values, setValues] = useState(initialFieldValues);
  const [customer, setCustomer] = useState([]);
  const [gst, setGst] = useState(false);
  console.log(values);
  let gstinparams = values.gstin;

  const getData = () => {
    fetch(
      `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstinparams}`,
      {
        headers: {
          Authorization: "Bearer 0ab31ef7392227173c6e8d34195e86d5eb0da1e9",
          client_id: "JarZChUcsytSBbnkpt",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
        console.log("data", data.lgnm);
      });
  };

  useEffect(() => {
    getData();
    console.log("Getting Data");
    console.log(values.gstin);
  }, [gst]);

  const onBlur = (e) => {
    //alert(e.target.value)
    setGst(!gst);
    console.log(gst);
  };

  const onChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(value);
    console.log(name);
  };

  const typeCategory = [
    {
      value: "1",
      label: "Wholesalar",
    },
    {
      value: "2",
      label: "Retailer",
    },
    {
      value: "3",
      label: "Manufacturing",
    },
  ];
  const gsttreatment = [
    {
      value: "1",
      label: (
          <div>
            <p>Registered Business - Regular</p>
            <p>Business that is registered under GST</p>
          </div>
      ),
    },
    {
      value: "2",
      label:  (
        <div>
          <p>Registered Business - Composition</p>
          <p style={{fontSize:"12px"}}>Business that is registered under the Composition<br/> Scheme in GST</p>
        </div>
    ),
    },
    {
      value: "3",
      label: (
        <div>
          <p>Consumer</p>
          <p>A customer who is regular Consumer</p>
        </div>
    ),
    },
    {
      value: "4",
      label:  (
        <div>
          <p>Overseas</p>
          <p style={{fontSize:"12px"}}>Person with whom you do import or export of<br/>supplies outside India</p>
        </div>
    ),
    },
    {
      value: "5",
      label:  (
        <div>
          <p>Special Economic Zone</p>
          <p style={{fontSize:"12px"}}>Business (Unit) that is located in a Special<br/>Economic Zone (SEZ) of Inida or a SEZ Developer</p>
        </div>
    ),
    },
   
    {
      value: "6",
      label:  (
        <div>
          <p>Deemed Export</p>
          <p style={{fontSize:"12px"}}>Supply of goods to an Export Oriented Unit or<br/>against Advanced Authorization/Export Promotion<br/>Capital Goods.</p>
        </div>
    ),
    },
    {
      value: "7",
      label:  (
        <div>
          <p>Tax Deductor</p>
          <p style={{fontSize:"12px"}}>Department of the State/Central government,<br/>government agancies or local authorites</p>
        </div>
    ),
    },
    {
      value: "8",
      label:  (
        <div>
          <p>SEZ Developer</p>
          <p style={{fontSize:"12px"}}>A person/origanisation who owns at least 26% of<br/>the equity in creating business units in a Special<br/>Economic Zone (SEZ)</p>
        </div>
    ),
    },

  ];


  const gsttraetmentOptional = [
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

  const ownershipwithemail=[
    {
      value:'Parth' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", display :"flex", flexDirection:"column"}}>
              <p className='name'>Parth Goswami</p>
              <p1 className="email">Parth.goswami@reformiqo.com</p1>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <p3 className="assigned" >Assigned</p3>
            <div>
            <p4 className="date" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },

    {
      value:'Parth1' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", display :"flex", flexDirection:"column"}}>
              <p className='name'>Parth Goswami</p>
              <p1 className="email">Parth.goswami@reformiqo.com</p1>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <p3 className="assigned" >Assigned</p3>
            <div>
            <p4 className="date" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
    {
      value:'Parth2' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", display :"flex", flexDirection:"column"}}>
              <p className='name'>Parth Goswami</p>
              <p1 className="email">Parth.goswami@reformiqo.com</p1>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <p3 className="assigned" >Assigned</p3>
            <div>
            <p4 className="date" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
    {
      value:'Parth3' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", display :"flex", flexDirection:"column"}}>
              <p className='name'>Parth Goswami</p>
              <p1 className="email">Parth.goswami@reformiqo.com</p1>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <p3 className="assigned" >Assigned</p3>
            <div>
            <p4 className="date" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
    {
      value:'Parth4' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", display :"flex", flexDirection:"column"}}>
              <p className='name'>Parth Goswami</p>
              <p1 className="email">Parth.goswami@reformiqo.com</p1>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <p3 className="assigned" >Assigned</p3>
            <div>
            <p4 className="date" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
  ]

  const ownership=[
    {
      value:'Parth' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", marginTop:"10px"}}>
              <p className='ownername'>Parth Goswami</p>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <div>
            <p4 className="ownerdate" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },

    {
      value:'Parth1' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", marginTop:"10px"}}>
              <p className='ownername'>Parth Goswami</p>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <div>
            <p4 className="ownerdate" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
    {
      value:'Parth2' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", marginTop:"10px"}}>
              <p className='ownername'>Parth Goswami</p>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <div>
            <p4 className="ownerdate" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
    {
      value:'Parth3' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", marginTop:"10px"}}>
              <p className='ownername'>Parth Goswami</p>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <div>
            <p4 className="ownerdate" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
    {
      value:'Parth4' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style ={{ display :"flex"}}>
            <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="35px" height="35px"/></div>
            <div style={{marginLeft:"5px", width:"139px", height:"31px", marginTop:"10px"}}>
              <p className='ownername'>Parth Goswami</p>
              </div>
            </div>
            <div style={{display:"flex" ,alignItems: "center"}}>
            <div>
            <p4 className="ownerdate" style={{marginLeft:"7px", borderRadius:"50%", width:"20px", height:"20px", backgroundColor:"#C2CAD2"}}>19</p4>
            </div>
            </div>
            </div>
    },
  ]

  return (
    <>
      <div className="addcustomer_heading">
        <Page_heading parent={"Business Account"} child={"Add New Customer"} />
      </div>
      <div className="customerform">
        <div className="newcustomer">
          <h1 className="box_heading1">New Customer</h1>
          <div className="container_details1">
            <div className="form-left">
              <label className="label">GST Treatment</label>
              <br />
              <SearchDropdown width={330} options={gsttreatment} />

              <label className="label" style={{ marginTop: "5px" }}>
                GST No.
              </label>
              <br />
              <div className="customerdropdown" style={{ marginTop: "5px" }}>
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                  name="gstin"
                  value={values.gstin}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </div>
              <label className="label" style={{ marginTop: "5px" }}>
                Business Name
              </label>
              <br />
              <div className="customerdropdown" style={{ marginTop: "5px" }}>
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <label className="label">Type Category</label>
              <br />
              <SearchDropdown options={typeCategory} width={330} />

              <label className="label" style={{ marginTop: "5px" }}>
                Pancard
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ width: "50%" }}>
                  <label className="label" style={{ marginTop: "5px" }}>
                    Currency
                  </label>
                  <br />
                  <SearchDropdown width={150} />
                </div>
                <div style={{ width: "50%" }}>
                  <label className="label">Payment Terms</label>
                  <br />
                  <SearchDropdown width={150} />
                </div>
              </div>

              <div className="customerbutton_bottom">
                <button type="button" className="customersavebutton">
                  Submit
                </button>
                <button type="button" className="customercancelbutton">
                  Cancel
                </button>
              </div>
            </div>

            <div className="form-center">
              <label className="label" style={{ marginTop: "5px" }}>
                Credit Limit
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>

              <label className="label" style={{ marginTop: "5px" }}>
                Email
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="email"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <label className="label" style={{ marginTop: "5px" }}>
                Pincode
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="number"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>

              
              <label className="label" style={{ marginTop: "5px" }}>
                Street 1
              </label>
              <br />
              <div className="customerstreet">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>

              <label className="label" style={{ marginTop: "5px" }}>
                Street 2
              </label>
              <br />
              <div className="customerstreet">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>

              <label className="label" style={{ marginTop: "5px" }}>
                City
              </label>
              <br />
              {/* <div
                className="customerdropdown"
                style={{ backgroundColor: "#f2efeb" }}
              >
                <img src={logo} className="customerimg" />
                <input
                  className="citydis"
                  type="text"
                  style={{ border: "none", outline: "none", width: "100%" }}
                  placeholder="Placeholder"
                  disabled
                />
              </div> */}
               <SearchDropdown width={330} options={gsttraetmentOptional} />
            </div>

            <div className="form-right">
            

              <label className="label" style={{ marginTop: "5px" }}>
                State
              </label>
              <br />
              <SearchDropdown width={330} options={gsttraetmentOptional}/>
              {/* <div
                className="customerdropdown"
                style={{ backgroundColor: "#f2efeb" }}
              >
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "100%" }}
                  placeholder="Placeholder"
                  disabled
                />
              </div> */}

              <label className="label">Default Place of Supply</label>
              <br />

              <SearchDropdown width={330} options={gsttraetmentOptional} />
              <label className="label">Contacts</label>
              <br />

              <SearchDropdown width={330} options={ownership} />
              <label className="label">Ownership</label>
              <br />

              <SearchDropdown width={330} options={ownershipwithemail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewCustomer;
