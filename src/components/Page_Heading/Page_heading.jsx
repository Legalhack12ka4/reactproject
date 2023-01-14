import { Children, React, useState} from "react";
import "./Page_heading.scss";
import {ImCross} from "react-icons/im";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import home from "../../assets/Images/FilterIcon/Icon.svg"

const Page_heading = ({ parent, child, subchild }) => {



  const searchbarOn = () => {
    const searchbar = document.getElementById("searchbarInput");
    searchbar.classList.toggle("searchbar-active");
  };



  return (
<>
    <div className="page-heading-menu">
    <div className="page_heading">
    <Breadcrumb>
   <Breadcrumb.Item>
   <Link exact to="/">  <img src={home} style={{ width: "18px",marginBottom:"-1px"}}/></Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span className="heading_parent">{parent}</span>
    </Breadcrumb.Item>
    {subchild && <Breadcrumb.Item > 
        <span className="subchild">{subchild}</span>
        </Breadcrumb.Item>
}
    <Breadcrumb.Item>{" "}
        {child.charAt(0).toUpperCase() + child.slice(1)}</Breadcrumb.Item>
  </Breadcrumb>
  </div>
      {/* <div className="page_heading">
        <span className="heading_parent">{parent} /</span>{" "}
        {child.charAt(0).toUpperCase() + child.slice(1)}
      </div> */}

      <div className="searchbar-main " id="searchbarInput">
      <input type="text" name="" id="" />
      <ImCross className="searchbar-cross" onClick={searchbarOn} color={"gray"} size={12} />
    </div>
      {/* <div className="menu">

        <img className="search-icon" src="/images/searchbar_icons/Search-Icon.svg" alt="" onClick={searchbarOn} />
        <img className="app-icon" src="/images/searchbar_icons/App.svg" alt="" />

        <div className="notification_bell">
          <img src="/images/searchbar_icons/icon-bell.svg" alt="" />
          <div className="notification_count">4</div>
        </div>

        <img src="/images/searchbar_icons/User-Avtar.svg" alt="user" />
      </div> */}
    </div>
  </>
  );
};

export default Page_heading;
