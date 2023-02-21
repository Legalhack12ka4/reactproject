import { Switch } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./ItemandService.scss";


const ItemandService = () => {
  const [selected, setSelected] = useState(null);
  const [methodSelected, setMethodSelected] = useState(null);

  const handleClick = (index) => {
    setSelected(selected === index ? null : index);
  };

  const handleMethodClick = (index) => {
    setMethodSelected(methodSelected === index ? null : index);
    };


  return (
    <div className="item_and_service_main">
      <Page_heading main={"Items & Services"}parent={"Item or Service"}  child={"Choose type"} />
      <div className="choose_item_container1">
        <h1 className="container_heading">Choose an Item Type</h1>
        <div className="item_type_container1">

          {/* //first */}
         <Link exact to="/itemgrouptable"> 
         <div
          className={`${selected=== 1 && "selected"} item `}
            onClick={() => handleClick(1)}
            
          >
            <div className="item_icon">
                <svg id="bxs-component" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26.003">
                <path id="Path_34435" data-name="Path 34435" d="M3.049,25.21,8.827,28.1a1.446,1.446,0,0,0,1.291,0l5.132-2.567L20.382,28.1a1.43,1.43,0,0,0,1.291,0l5.778-2.889a1.446,1.446,0,0,0,.8-1.293V16.695a1.446,1.446,0,0,0-.8-1.293l-4.979-2.489V6.584a1.446,1.446,0,0,0-.8-1.293L15.9,2.4a1.444,1.444,0,0,0-1.293,0L8.825,5.291a1.447,1.447,0,0,0-.8,1.293v6.33L3.049,15.4a1.442,1.442,0,0,0-.8,1.291v7.222A1.446,1.446,0,0,0,3.049,25.21Zm6.423-9.789,3.27,1.635-4.208,2.1-3.27-1.635ZM15.25,11.81l4.333-2.167v3.27L15.25,15.08ZM24.3,17.056l-4.163,2.081L16.865,17.5l4.163-2.081ZM9.472,25.191l-.09-.045V21.967l4.423-2.213v3.27Zm11.556,0v-3.27l4.333-2.167v3.27ZM15.25,5.31l3.27,1.635L14.357,9.026l-3.27-1.635Z" transform="translate(-2.25 -2.249)" fill={`${selected === 1 ? "#5C5AD0":"#c2cad2"} `}/>
                </svg>
            </div>
            <div className="item_text"><h1 style={{textAlign:"center"}}>Raw Material & Traded Items</h1>
             <p style={{padding:"0px 10px", textAlign:"center"}}>The Stock of these items will be tracked under Inventory account.</p></div>
            {/* <div className={`${selected=== 1 && "selected"} radio_selector `}></div> */}
          </div></Link>

        {/* //second */}
        <Link exact to="/itemgrouptable1">  <div
          className={`${selected=== 2 && "selected"} item `}
            onClick={() => handleClick(2)}
            
          >
           <div className="item_icon">
           <svg id="bxs-cube" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26">
                <path id="bxs-cube-2" data-name="bxs-cube" d="M27.228,7.312l-11.7-5.2a1.3,1.3,0,0,0-1.057,0l-11.7,5.2c-.026.012-.044.031-.07.045a1.052,1.052,0,0,0-.109.052c-.029.019-.051.044-.078.065a1.131,1.131,0,0,0-.247.252c-.026.036-.053.069-.077.105a1.455,1.455,0,0,0-.1.214c-.012.035-.03.068-.04.1A1.317,1.317,0,0,0,2,8.5v13a1.3,1.3,0,0,0,.772,1.188l11.7,5.2a1.225,1.225,0,0,0,1.05-.013l.005.013,11.7-5.2A1.3,1.3,0,0,0,28,21.5V8.5A1.3,1.3,0,0,0,27.228,7.312ZM15,4.724,23.5,8.5,15,12.276l-1.7-.755L6.5,8.5ZM16.3,24.7V14.545L25.4,10.5V20.656Z" transform="translate(-2 -2)" fill={`${selected === 2 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>

           </div>
            <div className="item_text"><h1 style={{textAlign:"center"}}>No Traded Items</h1>
            <p style={{padding:"0px 10px", textAlign:"center"}}>These item will be debited/credited directly under profit & loss account.</p></div>
            {/* <div className={`${selected=== 1 && "selected"} radio_selector `}></div> */}
          </div></Link>

        {/* //third */}
        <Link exact to="/itemgrouptable2">  <div
          className={`${selected=== 3 && "selected"} item `}
            onClick={() => handleClick(3)}
            
          >
            <div className="item_icon">
                <svg id="bxs-component" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26.003">
                <path id="Path_34435" data-name="Path 34435" d="M3.049,25.21,8.827,28.1a1.446,1.446,0,0,0,1.291,0l5.132-2.567L20.382,28.1a1.43,1.43,0,0,0,1.291,0l5.778-2.889a1.446,1.446,0,0,0,.8-1.293V16.695a1.446,1.446,0,0,0-.8-1.293l-4.979-2.489V6.584a1.446,1.446,0,0,0-.8-1.293L15.9,2.4a1.444,1.444,0,0,0-1.293,0L8.825,5.291a1.447,1.447,0,0,0-.8,1.293v6.33L3.049,15.4a1.442,1.442,0,0,0-.8,1.291v7.222A1.446,1.446,0,0,0,3.049,25.21Zm6.423-9.789,3.27,1.635-4.208,2.1-3.27-1.635ZM15.25,11.81l4.333-2.167v3.27L15.25,15.08ZM24.3,17.056l-4.163,2.081L16.865,17.5l4.163-2.081ZM9.472,25.191l-.09-.045V21.967l4.423-2.213v3.27Zm11.556,0v-3.27l4.333-2.167v3.27ZM15.25,5.31l3.27,1.635L14.357,9.026l-3.27-1.635Z" transform="translate(-2.25 -2.249)" fill={`${selected === 3 ? "#5C5AD0":"#c2cad2"} `}/>
                </svg>
            </div>
            <div className="item_text"><h1 style={{textAlign:"center"}}>Manufactured Items</h1> 
            <p style={{padding:"0px 10px", textAlign:"center"}}>An item that is formed into a specific design during manufacture.</p></div>
            {/* <div className={`${selected=== 1 && "selected"} radio_selector `}></div> */}
          </div></Link>

      {/* //fouth */}
      <Link exact to="/itemgrouptable3">  <div
          className={`${selected=== 4 && "selected"} item `}
            onClick={() => handleClick(4)}
            
          >
             <div className="item_icon">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
             <path id="bxs-palette" d="M13.807,33.435A15.974,15.974,0,0,0,18,34l.226,0a4.809,4.809,0,0,0,4.269-6.888l-.317-.664a3.2,3.2,0,0,1,4.269-4.271h0l.661.318A4.811,4.811,0,0,0,34,18.226a15.884,15.884,0,0,0-.565-4.416A16,16,0,0,0,2.153,20.24,16.113,16.113,0,0,0,13.807,33.435ZM23.6,8.4a2.4,2.4,0,1,1-2.4,2.4,2.4,2.4,0,0,1,2.4-2.4Zm-8-1.6a2.4,2.4,0,1,1-2.4,2.4A2.4,2.4,0,0,1,15.6,6.8ZM13.2,23.61a2.4,2.4,0,1,1-2.4-2.4,2.4,2.4,0,0,1,2.4,2.4Zm-4-10.4a2.4,2.4,0,1,1-2.4,2.4,2.4,2.4,0,0,1,2.4-2.4Z" transform="translate(-2 -2.001)" fill={`${selected === 4 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>
            </div>
            <div className="item_text"><h1 style={{textAlign:"center"}}>Items Received for Jobwork</h1> 
            <p style={{padding:"0px 25px", textAlign:"center"}}>The items received from Customer for the Job work.</p></div>
            {/* <div className={`${selected=== 1 && "selected"} radio_selector `}></div> */}
          </div></Link>

      {/* //fifth */}
      <Link exact to="/itemgrouptable4">  <div
          className={`${selected=== 5 && "selected"} item `}
            onClick={() => handleClick(5)}
            
          >
            <div className="item_icon">
            <svg id="bx-category-alt" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26">
                 <path id="Path_34421" data-name="Path 34421" d="M12.361,2.25H3.694A1.444,1.444,0,0,0,2.25,3.694v8.667a1.444,1.444,0,0,0,1.444,1.444h8.667a1.444,1.444,0,0,0,1.444-1.444V3.694A1.444,1.444,0,0,0,12.361,2.25Zm-1.444,8.667H5.139V5.139h5.778Zm15.889,5.778H18.139a1.444,1.444,0,0,0-1.444,1.444v8.667a1.444,1.444,0,0,0,1.444,1.444h8.667a1.444,1.444,0,0,0,1.444-1.444V18.139A1.444,1.444,0,0,0,26.806,16.694Zm-1.444,8.667H19.583V19.583h5.778ZM22.472,2.25A5.778,5.778,0,1,0,28.25,8.028,5.784,5.784,0,0,0,22.472,2.25Zm0,8.667a2.889,2.889,0,1,1,2.889-2.889A2.892,2.892,0,0,1,22.472,10.917ZM8.028,16.694a5.778,5.778,0,1,0,5.778,5.778A5.784,5.784,0,0,0,8.028,16.694Zm0,8.667a2.889,2.889,0,1,1,2.889-2.889A2.892,2.892,0,0,1,8.028,25.361Z" transform="translate(-2.25 -2.25)" fill={`${selected === 5 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>

            </div>
            <div className="item_text"><h1 style={{textAlign:"center"}}>Services</h1> 
            <p style={{padding:"0px 25px", textAlign:"center"}}>Something that you provide or perform for another person.</p></div>
            {/* <div className={`${selected=== 1 && "selected"} radio_selector `}></div> */}
          </div></Link>

      {/* //sixth */}
      <Link exact to ="/itemgrouptable5"> 
      <div
          className={`${selected=== 6 && "selected"} item `}
            onClick={() => handleClick(6)}
            
          >
             <div className="item_icon">
            <svg id="bx-coin-stack" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20.8 26">
                <path id="Path_34638" data-name="Path 34638" d="M18.4,30c5.169,0,10.4-1.786,10.4-5.2V9.2C28.8,5.786,23.569,4,18.4,4S8,5.786,8,9.2V24.8C8,28.214,13.231,30,18.4,30Zm0-2.6c-4.839,0-7.8-1.683-7.8-2.6V23.152A17.134,17.134,0,0,0,18.4,24.8a17.134,17.134,0,0,0,7.8-1.648V24.8C26.2,25.716,23.239,27.4,18.4,27.4Zm0-20.8c4.839,0,7.8,1.683,7.8,2.6s-2.961,2.6-7.8,2.6-7.8-1.683-7.8-2.6S13.561,6.6,18.4,6.6Zm-7.8,6.152A17.134,17.134,0,0,0,18.4,14.4a17.134,17.134,0,0,0,7.8-1.648V14.4c0,.916-2.961,2.6-7.8,2.6s-7.8-1.684-7.8-2.6Zm0,5.2A17.134,17.134,0,0,0,18.4,19.6a17.134,17.134,0,0,0,7.8-1.648V19.6c0,.917-2.961,2.6-7.8,2.6s-7.8-1.683-7.8-2.6Z" transform="translate(-8 -4)" fill={`${selected === 6 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>

            </div>
            <div className="item_text">
              <h1 style={{textAlign:"center"}}>Fixed Assets</h1> 
              <p style={{padding:"0px 35px", textAlign:"center"}}>Purchase for long-term use quickly not convertedinto cash.</p>
              </div>
            {/* <div className={`${selected=== 1 && "selected"} radio_selector `}></div> */}
          </div>
          </Link>
 
        </div>
      </div>

{/* //second */}

      {/* <div className="choose_item_container">
        <h1 className="container_heading">Choose an Item Type</h1>
        <div className="item_type_container">
          <div
          className={`${selected=== 1 && "selected"} item `}
            onClick={() => handleClick(1)}
            
          >
            <div className="item_icon">
                <svg id="bxs-component" xmlns="http://www.w3.org/2000/svg" width="26" height="26.003" viewBox="0 0 26 26.003">
                <path id="Path_34435" data-name="Path 34435" d="M3.049,25.21,8.827,28.1a1.446,1.446,0,0,0,1.291,0l5.132-2.567L20.382,28.1a1.43,1.43,0,0,0,1.291,0l5.778-2.889a1.446,1.446,0,0,0,.8-1.293V16.695a1.446,1.446,0,0,0-.8-1.293l-4.979-2.489V6.584a1.446,1.446,0,0,0-.8-1.293L15.9,2.4a1.444,1.444,0,0,0-1.293,0L8.825,5.291a1.447,1.447,0,0,0-.8,1.293v6.33L3.049,15.4a1.442,1.442,0,0,0-.8,1.291v7.222A1.446,1.446,0,0,0,3.049,25.21Zm6.423-9.789,3.27,1.635-4.208,2.1-3.27-1.635ZM15.25,11.81l4.333-2.167v3.27L15.25,15.08ZM24.3,17.056l-4.163,2.081L16.865,17.5l4.163-2.081ZM9.472,25.191l-.09-.045V21.967l4.423-2.213v3.27Zm11.556,0v-3.27l4.333-2.167v3.27ZM15.25,5.31l3.27,1.635L14.357,9.026l-3.27-1.635Z" transform="translate(-2.25 -2.249)" fill={`${selected === 1 ? "#5C5AD0":"#c2cad2"} `}/>
                </svg>
            </div>
            <div className="item_text"><h1>Inventory Item</h1> <p>The item which is tracked and their quantities are monitored.</p></div>
            <div className={`${selected=== 1 && "selected"} radio_selector `}></div>
          </div>

          <div
          className={`${selected=== 2 && "selected"} item `}
            onClick={() => handleClick(2)}
            
          >
           <div className="item_icon">
           <svg id="bxs-cube" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                <path id="bxs-cube-2" data-name="bxs-cube" d="M27.228,7.312l-11.7-5.2a1.3,1.3,0,0,0-1.057,0l-11.7,5.2c-.026.012-.044.031-.07.045a1.052,1.052,0,0,0-.109.052c-.029.019-.051.044-.078.065a1.131,1.131,0,0,0-.247.252c-.026.036-.053.069-.077.105a1.455,1.455,0,0,0-.1.214c-.012.035-.03.068-.04.1A1.317,1.317,0,0,0,2,8.5v13a1.3,1.3,0,0,0,.772,1.188l11.7,5.2a1.225,1.225,0,0,0,1.05-.013l.005.013,11.7-5.2A1.3,1.3,0,0,0,28,21.5V8.5A1.3,1.3,0,0,0,27.228,7.312ZM15,4.724,23.5,8.5,15,12.276l-1.7-.755L6.5,8.5ZM16.3,24.7V14.545L25.4,10.5V20.656Z" transform="translate(-2 -2)" fill={`${selected === 2 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>

           </div>
            <div className="item_text"><h1>Non - Inventory Item</h1> <p>The item is not tracked and quantities are not monitored.</p></div>
            <div className={`${selected=== 2 && "selected"} radio_selector`}></div>
          </div>
          <div
          className={`${selected=== 3 && "selected"} item `}
            onClick={() => handleClick(3)}
            
          >
            <div className="item_icon">
            <svg id="bx-category-alt" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                 <path id="Path_34421" data-name="Path 34421" d="M12.361,2.25H3.694A1.444,1.444,0,0,0,2.25,3.694v8.667a1.444,1.444,0,0,0,1.444,1.444h8.667a1.444,1.444,0,0,0,1.444-1.444V3.694A1.444,1.444,0,0,0,12.361,2.25Zm-1.444,8.667H5.139V5.139h5.778Zm15.889,5.778H18.139a1.444,1.444,0,0,0-1.444,1.444v8.667a1.444,1.444,0,0,0,1.444,1.444h8.667a1.444,1.444,0,0,0,1.444-1.444V18.139A1.444,1.444,0,0,0,26.806,16.694Zm-1.444,8.667H19.583V19.583h5.778ZM22.472,2.25A5.778,5.778,0,1,0,28.25,8.028,5.784,5.784,0,0,0,22.472,2.25Zm0,8.667a2.889,2.889,0,1,1,2.889-2.889A2.892,2.892,0,0,1,22.472,10.917ZM8.028,16.694a5.778,5.778,0,1,0,5.778,5.778A5.784,5.784,0,0,0,8.028,16.694Zm0,8.667a2.889,2.889,0,1,1,2.889-2.889A2.892,2.892,0,0,1,8.028,25.361Z" transform="translate(-2.25 -2.25)" fill={`${selected === 3 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>

            </div>
            <div className="item_text"><h1>Service</h1> <p>Something that you provide or perform for another person.</p></div>
            <div className={`${selected=== 3 && "selected"} radio_selector `}></div>
          </div>
          <div
          className={`${selected=== 4 && "selected"} item `}
            onClick={() => handleClick(4)}
          >
            <div className="item_icon">
            <svg id="bx-coin-stack" xmlns="http://www.w3.org/2000/svg" width="20.8" height="26" viewBox="0 0 20.8 26">
                <path id="Path_34638" data-name="Path 34638" d="M18.4,30c5.169,0,10.4-1.786,10.4-5.2V9.2C28.8,5.786,23.569,4,18.4,4S8,5.786,8,9.2V24.8C8,28.214,13.231,30,18.4,30Zm0-2.6c-4.839,0-7.8-1.683-7.8-2.6V23.152A17.134,17.134,0,0,0,18.4,24.8a17.134,17.134,0,0,0,7.8-1.648V24.8C26.2,25.716,23.239,27.4,18.4,27.4Zm0-20.8c4.839,0,7.8,1.683,7.8,2.6s-2.961,2.6-7.8,2.6-7.8-1.683-7.8-2.6S13.561,6.6,18.4,6.6Zm-7.8,6.152A17.134,17.134,0,0,0,18.4,14.4a17.134,17.134,0,0,0,7.8-1.648V14.4c0,.916-2.961,2.6-7.8,2.6s-7.8-1.684-7.8-2.6Zm0,5.2A17.134,17.134,0,0,0,18.4,19.6a17.134,17.134,0,0,0,7.8-1.648V19.6c0,.917-2.961,2.6-7.8,2.6s-7.8-1.683-7.8-2.6Z" transform="translate(-8 -4)" fill={`${selected === 4 ? "#5C5AD0":"#c2cad2"} `}/>
            </svg>

            </div>
            <div className="item_text"><h1>Fixed Assets</h1> <p>Purchased for long-term use quickly not converted into cash.</p></div>
            <div className={`${selected=== 4 && "selected"} radio_selector `}></div>
          </div>
        </div>



        {selected && 
            <div className="choose_method_container">
                <h1 className="method_container_heading">Choose a Method</h1>
                <p className="method_container_title">Without an Item group you can't create an Item.</p>
        <div className="item_method_container">
          
          
          <div
          className={`${methodSelected === 1 && "selected"} item `}
            onClick={() => handleMethodClick(1)}
            
          >
            <div className="item_text"><h1>Item Group</h1> <p>Collection of items that share similar attributes.</p></div>
            <div className={`${methodSelected === 1 && "selected"} radio_selector `}></div>
          </div>
          <div
          className={`${methodSelected === 2 && "selected"} item `}
            onClick={() => handleMethodClick(2)}
          >
            <div className="item_text"><h1>Item</h1> <p>Piece of information, details or note.</p></div>
            <div className={`${methodSelected=== 2 && "selected"} radio_selector `}></div>
          </div>
        </div>

        <div className="button">
            <Link to={`${selected === 1 && methodSelected === 1 ? "new_inventory_group" : selected === 1 && methodSelected === 2 ? "new_inventory_item":"" } `}><button className="submit_button">Submit</button></Link>
            <button className="cancel_button">Cancel</button>
        </div>
     </div>
        }
      </div> */}
    </div>
  );
};

export default ItemandService;
