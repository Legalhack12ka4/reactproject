import React, { useState } from "react";

import "./SearchBar.scss";


import {MdOutlineClose} from "react-icons/md"
import {CgSearch} from "react-icons/cg"


const SearchBar = () => {
const [searchTriggered, setSearchTriggered] = useState(false);

document.addEventListener("keydown", e =>{
  if(e.key === "/" && e.ctrlKey){
    setSearchTriggered(!searchTriggered)
  }
})
  function handleSearch(){
    setSearchTriggered(!searchTriggered)
  }

  const element = document.documentElement;

  const goFullScreen = () => {

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
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
      <div className="search_logo" onClick={handleSearch}>
        <CgSearch size={23} color="#697A8D" />
        <p onClick={handleSearch}>Search (Ctrl+/)</p>
      </div>
      
      <div className="profile_btn">
      <div className="bell_icon">
          <img src="/images/searchbar_icons/icon-bell.svg" alt="notification" />
          <div>4</div>
        </div>
        <img src="/images/searchbar_icons/App.svg" alt="app" />
        <img src="/images/searchbar_icons/msg.svg" alt="" />
        <img src="/images/searchbar_icons/fullScreen.svg" alt="" onClick={goFullScreen} className="fullScreenBtn" />
        <img src="/images/searchbar_icons/User-Avtar.svg" alt="" />
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
