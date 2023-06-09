import { Children, React, useState} from "react";
import "./Page_heading.scss";
import {ImCross} from "react-icons/im";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import home from "../../assets/Images/FilterIcon/Icon.svg"
import { GoPlus } from "react-icons/go";


const Page_heading = ({ parent, child, subchild, main , props, dataLength, addEditBtn }) => {



  const searchbarOn = () => {
    const searchbar = document.getElementById("searchbarInput");
    searchbar.classList.toggle("searchbar-active");
  };

  function showCanvas() {
    var m = document.querySelector(".menu1");
    m.classList.add("smenu");
    //document.root.style.backgroundColor='rgba(0,0,0,0.4)';
    document.getElementById("gradient").classList.add("body_gradient");
  }


  return (
<>
    <div className="page-heading-menu">
    <div className="page_heading " >
   <div className="heading_withlength"> <h1 className="heading-sb">{main ? main :  child.charAt(0).toUpperCase() + child.slice(1)} <span className="heading_length">{dataLength && `(${dataLength})`}</span></h1></div>
    <Breadcrumb>
   <Breadcrumb.Item>
   <Link exact to="/dashboard" className="heading_parent"> <img src="\images\icons\home.svg"/></Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span className="heading_parent caption-md">{parent}</span>
    </Breadcrumb.Item>
    {subchild && <Breadcrumb.Item > 
        <span className="subchild caption-md">{subchild}</span>
        </Breadcrumb.Item>
}
    <Breadcrumb.Item>{" "}
        {child.charAt(0).toUpperCase() + child.slice(1)}</Breadcrumb.Item>
  </Breadcrumb>
{/* 
  <h1>{main ? main :  child.charAt(0).toUpperCase() + child.slice(1)}</h1>
  <p className="heading-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, natus.</p> */}
  </div>
  
  
     

      <div className="searchbar-main " id="searchbarInput">
      <input type="text" name="" id="" />
      <ImCross className="searchbar-cross" onClick={searchbarOn} color={"gray"} size={12} />
    </div>
    {addEditBtn && <div className="add-edit-btn">
    {addEditBtn}
    </div>}
    </div>
  </>
  );
};

export default Page_heading;
