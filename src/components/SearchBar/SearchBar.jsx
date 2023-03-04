import React, { useState } from "react";

import "./SearchBar.scss";
import setting from "../../assets/Images/ProfileIcon/Setting.svg"
import profile from "../../assets/Images/ProfileIcon/Profile.svg"
import logout from "../../assets/Images/ProfileIcon/Logout.svg"
import {MdOutlineClose} from "react-icons/md"
import {CgSearch} from "react-icons/cg"
import {RxHamburgerMenu} from "react-icons/rx"
import { Popover } from "antd";
import { Link } from "react-router-dom";


const SearchBar = () => {
const [searchTriggered, setSearchTriggered] = useState(false);
const [open, setOpen] = useState(false);

const hide = () => {
  setOpen(false);
};

const handleOpenChange = (newOpen) => {
  setOpen(newOpen);
};

document.addEventListener("keydown", e =>{
  if(e.key === "/" && e.ctrlKey){
    setSearchTriggered(!searchTriggered)
  }
})
  function handleSearch(){
    setSearchTriggered(!searchTriggered)
  }

  const element = document.documentElement;

  // const goFullScreen = () => {

  //   if (element.requestFullscreen) {
  //     element.requestFullscreen();
  //   } else if (element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  //   } else if (element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  //   } else if (element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  //   }
  // };

  const goFullScreen = () => {
    const element = document.documentElement;
  
    if (element.requestFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    } else if (element.mozRequestFullScreen) {
      if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
      } else {
        element.mozRequestFullScreen();
      }
    } else if (element.webkitRequestFullscreen) {
      if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      } else {
        element.webkitRequestFullscreen();
      }
    } else if (element.msRequestFullscreen) {
      if (document.msFullscreenElement) {
        document.msExitFullscreen();
      } else {
        element.msRequestFullscreen();
      }
    }
  };

  
  document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
      // alert("hii")
      setSearchTriggered(false)
    }
  });
  return (
    
<div className="search_bar_container">
    {
      !searchTriggered &&(
        <div className="search_bar">
          <div className="ham_burger" onClick={()=>{document.getElementById("sidebar_main").classList.toggle("hideSidebar")}}>
          <img src="/images/searchbar_icons/ham_burger_icon.svg" alt="hamBurger" />
        </div>
      <div className="search_logo" onClick={handleSearch}>
        
        <div className="search_icon_main"><CgSearch size={23} color="#697A8D" /></div>
      </div>
      <p onClick={handleSearch}>Search (Ctrl+/)</p>
      
      <div className="profile_btn">
      <div className="bell_icon">
          <img src="/images/searchbar_icons/icon-bell.svg" alt="notification" />
          <div>4</div>
        </div>
        <img src="/images/searchbar_icons/App.svg" alt="app" />
        <img src="/images/searchbar_icons/msg.svg" alt="" />
        <img src="/images/searchbar_icons/fullScreen.svg" alt="" onClick={goFullScreen} className="fullScreenBtn" />
        <Popover placement="topRight"
          open={open}
          onOpenChange={handleOpenChange}
        getPopupContainer={(trigger) => trigger.parentElement} showArrow={false}  style={{ position: "absolute", top: "0", right: "0" }}
         content={
                 <>
                 <div className="search_main_cointainer_profile">
                  <img src="/images/searchbar_icons/User-Avtar.svg"/>
                  <div style={{display:"grid"}}>
                    <p1 className="profile_name">Parth Goswami</p1>
                    <p1 className="profile_key" >Key Person</p1>
                  </div>
                 </div>
                 <hr style={{border:"1px solid #4359711A", margin:"10px -20px"}}/>
                 <div  className="popover-menu-item container_profile">
                 <img src={profile}/>
                 <p1 className="p_profile_setting" >My profile</p1>
                 </div>
                 <div   className="popover-menu-item container_setting" >
                <img src={setting}/>
                <p1 className="p_setting">Setting</p1>
                 </div>
                 <hr style={{border:"1px solid #4359711A",  margin:"10px -20px"}}/>
                 <Link exact to="/">   <div  onClick={hide}  className="popover-menu-item container_logout">
                 <img src={logout}/>
                 <p1 className="p_logout">Log Out</p1>
                 </div></Link>
                 </>
                 
        } title="" height={100} trigger="click">
     <div style={{}}><img src="/images/searchbar_icons/User-Avtar.svg" alt="" style={{cursor:"pointer", marginRight:"20px"}}/></div> 
        </Popover>
      
      </div>
    </div>
      )
    }
    {
      searchTriggered &&(
        <div className="searchbar_input">
          <input type="text" autoFocus placeholder="Search..." accessKey="/"/>
          <div className="search_close" onClick={handleSearch}>
            <MdOutlineClose size={20} color="#566A7F"/>
          </div>
        </div>
      )
    }
    </div>
  );
};

export default SearchBar;



// <div className="search_bar">
//       <img
//         src="/images/searchbar_icons/Search Icon.svg"
        
//         className="search_logo"
//         alt="searchbar_icon"
//       />
//       <input type="text" name="search_bar" />

//       <div className="profile_btn">
//         <img src="/images/searchbar_icons/App.svg" alt="app" />
//         <div className="bell_icon">
//           <img src="/images/searchbar_icons/icon-bell.svg" alt="notification" />
//           <div>4</div>
//         </div>
//         <img src="/images/searchbar_icons/User - Avtar.svg" alt="" />
//       </div>
//     </div>
