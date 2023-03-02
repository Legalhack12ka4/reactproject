import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.scss";
import "../Sidebar_btn/Sidebar_btn.scss";
import items from "./data/sidebar.json";

const Sidebar = () => {
  const [isTriggered, setIsTriggred] = useState(false);
  const [active, setActive] = useState(
    localStorage.getItem("activeMenuItem") || ""
  );
  const [openId, setOpenId] = useState("");
  const [open, setOpen] = useState(false);
  const [drpActive, setDrpActive] = useState("");
  const [subDropdown, setSubDropdown] = useState(false);
  const [subActive, setSubActive] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log("isSmallScreen", isSmallScreen);
  



  function enterMouse() {
    if (isTriggered) {
      document.getElementById("sidebar").classList.remove("sidebar_mini");
      setIsMinimized(false);

    }
  }

  useEffect(() => {
    localStorage.setItem("activeMenuItem", active);
  }, [active]);


  const myDiv = React.useRef(null);
const [scrollTop, setScrollTop] = useState(true);

useEffect(() => {
const handleScroll = () => {
setScrollTop(myDiv.current.scrollTop === 0);
};

myDiv.current.addEventListener('scroll', handleScroll);

return () => {
myDiv.current.removeEventListener('scroll', handleScroll);
};
}, []);



  function leaveMouse() {
    if (isTriggered) {
      document.getElementById("sidebar").classList.add("sidebar_mini");
      setIsMinimized(true);

    }
  }

  function handleClick() {
    setIsTriggred(!isTriggered);
    if (!isTriggered) {
      document.getElementById("sidebar").classList.toggle("sidebar_mini");
      setIsMinimized(true);

    }
    document.getElementById("sidebar").classList.toggle("closeSidebar");

  }


  function dropdown_open(id){
    setSubDropdown(false)
    if(openId === id){
      setOpen(!open)
    }
    if(!open){
      setOpen(!open)
    }
    setOpenId(id);
  }

  function subDropdown_open(id){
    if(openId === id){
      setSubDropdown(!subDropdown)
    }
    if(!subDropdown){
      setSubDropdown(!subDropdown)
    }
    setOpenId(id);
  }

  function dropdownBtnActive(id){
      // console.log(id)
      setDrpActive(id)
  }

  function subDropdownBtnActive(id){
    console.log(id)
    setDrpActive(id)
  }

  function resetDrp(){
    setSubDropdown(false)
    setDrpActive("")
    setOpen(false)
    setOpenId("")
  }

  const handleSidebarClick = (e) => {
    if (e.target.id === 'sidebar_main') {
      isSmallScreen && document.getElementById("sidebar_main").classList.toggle("hideSidebar");
    }
  };

  

  return (
    <div id="sidebar_main" onClick={handleSidebarClick} className={`${isSmallScreen && "hideSidebar" } sidebar_main_container_app`}>
      <div
        className={` ${isSmallScreen && "sidebarSaprate"} sidebar`}
        id="sidebar"
        onMouseLeave={leaveMouse}
        onMouseEnter={enterMouse}
      >
        <div className="sidebar_container">
          <div className="sidebar_logo">
            {isMinimized ? <img src="/images/sidebar_icons/sidebar_mini_icon.svg" alt="sidebar_logo"/> :
             <img
              src="/images/sidebar_icons/logo_main.svg"
              alt="sidebar_logo"
            />}
            {isSmallScreen ? <div className="collapse_btn" onClick={()=>{document.getElementById("sidebar_main").classList.toggle("hideSidebar")}}>
              <img src="/images/sidebar_icons/icon.svg" alt="arrow" />
            </div> :<div className="collapse_btn" onClick={handleClick}>
              <img src="/images/sidebar_icons/icon.svg" alt="arrow" />
            </div>}
          </div>
          <div className={`${scrollTop && 'not-at-top'} menu-innner-shadow `}></div>

          {/* Groups  */}

          <div className="sidebar_item" ref={myDiv}>
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
                  <NavLink to={item.path} onClick={()=>{isSmallScreen && document.getElementById("sidebar_main").classList.toggle("hideSidebar")}}>
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
                          <NavLink to={btn.path} onClick={()=>{isSmallScreen && document.getElementById("sidebar_main").classList.toggle("hideSidebar")}}>
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
                            <NavLink to={btn.path} onClick={()=>{isSmallScreen && document.getElementById("sidebar_main").classList.toggle("hideSidebar")}}>
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
                              <div className={`btn_container ${ subDropdown && "open openSubDropdown"}`} onClick={() => subDropdown_open(item.id)}>
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
                          <div className={`dropdown_item_container sub_dropdown ${subDropdown && "open_dropdown"} `}>
                            {btn.childrens &&
                              btn.childrens.map((btn2) => {
                                return (
                                  <NavLink to={btn2.path} onClick={()=>{isSmallScreen && document.getElementById("sidebar_main").classList.toggle("hideSidebar")}}>
                                    <div className="btn dropdown_margin bullet_item" >
                                      <div className="btn_container" onClick={()=> subDropdownBtnActive(item.id)}>
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
    </div>
  );
};

export default Sidebar;
