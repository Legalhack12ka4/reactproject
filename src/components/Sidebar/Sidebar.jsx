import React, { useEffect, useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  MailOutlined,
  SettingOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import "./Sidebar.scss";
import "../Sidebar_btn/Sidebar_btn.scss";
import items from "../Sidebar_btn/data/sidebar.json";
import Sidebar_btn from "../Sidebar_btn/Sidebar_btn";

const Sidebar = () => {
  const [isTriggered, setIsTriggred] = useState(false);
  const [active, setActive] = useState("db");
  const [openId, setOpenId] = useState("");
  const [open, setOpen] = useState(false);
  const [drpActive, setDrpActive] = useState("");
  const [subDropdown, setSubDropdown] = useState(false);


  function enterMouse() {
    if (isTriggered) {
      document.getElementById("sidebar").classList.remove("sidebar_mini");
    }
  }
  function leaveMouse() {
    if (isTriggered) {
      document.getElementById("sidebar").classList.add("sidebar_mini");
    }
  }

  function handleClick() {
    setIsTriggred(!isTriggered);
    if (!isTriggered) {
      document.getElementById("sidebar").classList.toggle("sidebar_mini");
    }
    document.getElementById("sidebar").classList.toggle("closeSidebar");
  }

  function dropdown_open(id){
    if(openId === id){
      setOpen(!open)
    }
    if(!open){
      setOpen(!open)
    }
    setOpenId(id);
  }

  function dropdownBtnActive(id){
      // console.log(id)
      setDrpActive(id)
  }

  function resetDrp(){
    setDrpActive("")
    setOpen(false)
    setOpenId("")
  }

  

  return (
    <>
      <div
        className="sidebar"
        id="sidebar"
        onMouseLeave={leaveMouse}
        onMouseEnter={enterMouse}
      >
        <div className="sidebar_container">
          <div className="sidebar_logo">
            <img
              src="/images/sidebar_icons/Brand-logo.png"
              alt="sidebar_logo"
            />
            <div className="collapse_btn" onClick={handleClick}>
              <img src="/images/sidebar_icons/icon.svg" alt="arrow" />
            </div>
          </div>

          {/* Groups  */}

          <div className="sidebar_item">
            {items.map((item, index) => (
              <>
                {item.type == "group" && (
                  <div className="group">
                    <svg>
                      <rect />
                    </svg>
                    <p>{item.title}</p>
                  </div>
                )}


                {/* Nrrmal Btn */}

                {item.type == "btn" && (
                  <NavLink to={item.path}>
                    <div className="btn normal" onClick={resetDrp}>
                      <div className="btn_container plain" id={item.id}>
                        <div className="btn_icon">
                          <img src={item.icon} alt="icon" />
                        </div>
                        <p>{item.title}</p>
                      </div>
                      <div className="right_border"></div>
                    </div>
                  </NavLink>
                )}



                {/* Dropdown Btn */}

                {item.type == "dropdown_btn" && (
                  <>
                    <div
                      className={`btn ${
                        item.id === drpActive && "dropdownActive"
                      }`}
                      id={item.id}
                    >
                      <div
                        className={`btn_container  ${
                          openId === item.id && open && "open"
                        }`}
                        onClick={() => dropdown_open(item.id)}
                      >
                        <div className="btn_icon">
                          <img src={item.icon} alt="icon" />
                        </div>
                        <p>{item.title}</p>
                        <div className="dropdown_arrow">
                          <img
                            src="/images/sidebar_icons/icon-arrow-right.svg"
                            alt="arrow_right"
                          />
                        </div>
                      </div>
                      <div className="right_border"></div>
                    </div>
                    <div
                      className={`dropdown_item_container  ${
                        openId === item.id && open && "open_dropdown"
                      }`}
                    >
                      {item.childrens.map((btn, index, row) => {
                        // console.log(btn,index,row.length)
                        return (
                          <NavLink to={btn.path}>
                            <span
                              className={`v-line ${
                                index === 0 && "first-v-line"
                              } ${index === row.length - 1 && "last-v-line"} `}
                            ></span>
                            <div
                              className="btn dropdown_margin bullet_item"
                              onClick={()=> dropdownBtnActive(item.id)}
                            >
                              <div className="btn_container">
                                <div className="bullet_box">
                                  <div className="bullet_container">
                                    <div className="bullet"></div>
                                  </div>
                                </div>
                                <p>{btn.title}</p>
                              </div>
                            </div>
                          </NavLink>
                        );
                      })}
                    </div>
                  </>
                )}


                {/* Dropdown Btn 2 */}

                {item.type == "dropdown_btn2" && (
                  <>
                  <div className={`btn ${
                        item.id === drpActive && "dropdownActive"
                      }`} id={item.id} >
                    <div className={`btn_container ${openId === item.id && open && "open"}`} onClick={() => dropdown_open(item.id)}>
                      <div className="btn_icon">
                        <img src={item.icon} alt="icon" />
                      </div>
                      <p>{item.title}</p>
                      <div className="dropdown_arrow">
                        <img
                          src="/images/sidebar_icons/icon-arrow-right.svg"
                          alt="arrow_right"
                        />
                      </div>
                    </div>
                    <div className="right_border"></div>
                  </div>
            
                  <div className={`dropdown_item_container ${openId === item.id && open && "open_dropdown"}`}>
                    {item.childrens.map((btn) => {
                      return (
                        <>
                          {btn.path && (
                            <NavLink to={btn.path}>
                              <div className="btn dropdown_margin bullet_item"
                                onClick={()=> dropdownBtnActive(item.id)}>
                                <div className="btn_container">
                                  <div className="bullet_box">
                                    <div className="bullet_container">
                                      <div className="bullet"></div>
                                    </div>
                                  </div>
                                  <p>{btn.title}</p>
                                  <div className="dropdown_arrow">
                                    {btn.childrens && (
                                      <img
                                        src="/images/sidebar_icons/icon-arrow-right.svg"
                                        alt="arrow_right"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          )}
                          {!btn.path && (
                            <div className="btn dropdown_margin">
                              <div className={`btn_container ${ subDropdown && "open openSubDropdown"}`}>
                                <div className="bullet_box">
                                  <div className="bullet_container">
                                    <div className="bullet"></div>
                                  </div>
                                </div>
                                <p>{btn.title}</p>
                                <div className="dropdown_arrow">
                                  {btn.childrens && (
                                    <img
                                      src="/images/sidebar_icons/icon-arrow-right.svg"
                                      alt="arrow_right"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className={`dropdown_item_container sub_dropdown ${ "open_dropdown"} `}>
                            {btn.childrens &&
                              btn.childrens.map((btn2) => {
                                return (
                                  <NavLink to={btn2.path}>
                                    <div className="btn dropdown_margin bullet_item">
                                      <div className="btn_container">
                                        <div className="bullet_box">
                                          <div className="bullet_container">
                                            <div className="bullet"></div>
                                          </div>
                                        </div>
                                        <p>{btn2.title}</p>
                                      </div>
                                    </div>
                                  </NavLink>
                                );
                              })}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
