import React, { useEffect, useState } from "react";

import "./Sidebar.scss";
import items from "../Sidebar_btn/data/sidebar.json";
import Sidebar_btn from "../Sidebar_btn/Sidebar_btn";


const Sidebar = () => {
  const [isTriggered, setIsTriggred] = useState(false);
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
    document.getElementById("sidebar").classList.toggle("close");
  }

  const [active, setActive] = useState("db")
  const [open, setOpen] = useState(false);

  

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

          <div className="sidebar_item">
            {items.map((item, index) => (
              <Sidebar_btn key={index} item={item} active={active} setActive={setActive} open={open} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
