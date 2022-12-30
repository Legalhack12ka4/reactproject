import React from 'react'
import Select from "react-select";
import "./DropdownWithLargeWidthCustomer.scss";

function DropdownWithLargeWidthCustomer() {
  const option = [
    {
      value: "Wholesaler",
      label:(<div className='contdetails' >Wholesaler</div>),
    },
    {
      value: "Retailor",
      label: (<div className='contdetails'>Retailor</div>),
    },
    {
      value: "Manufacturer",
      label: (<div className='contdetails' >Manufacturer</div>),
    },
       
      ];
  return (
    <div className='.drpsimple
{
    .css-1fdsijx-ValueContainer
 {
    font-size: 13px;
    color: #697A8D;
    font-weight: 500;
    :focus
    {
        outline: #5C5AD0;
        border: 3px solid red;
    }
  
 }
//  .css-1fdsijx-ValueContainer:focus {
//    // outline: none;
//     border:1px solid red;
//     box-shadow: 0 0 10px #719ECE;
//     width:500px
// }

 .css-1u9des2-indicatorSeparator
 {
    width :0px !important;
 }


.css-t3ipsp-control{
    -webkit-align-items:center;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    cursor:default;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-flex-wrap:wrap;
    -webkit-flex-wrap:wrap;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
    justify-content:space-between;
    min-height:38px;
    outline:0!important;
    position:relative;
    -webkit-transition:all 100ms;
    transition:all 100ms;
    background-color:hsl(0, 0%, 100%);
    border-color:#5C5AD0 !important;
    border-radius:4px;
    border-style:solid;
    border-width:1px;
    box-shadow:0 0 0 0px #D9DEE3 !important;
    box-sizing:border-box;
}

.css-13cymwt-control:hover{
    border-color: #5C5AD0 !important;
}


/**/


// <div class=" css-1fdsijx-ValueContainer">
// <div class=" css-1jqq78o-placeholder" id="react-select-5-placeholder">Select value</div>
// <div class=" css-qbdosj-Input" data-value="">
// <input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-5-input" 
// spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true"
// role="combobox" aria-describedby="react-select-5-placeholder"
//  value="" style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2 / auto / auto; font: inherit; 
//  min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;">
//  </div>
//  </div>

/**/

.css-b62m3t-container
{
margin-top: 5px;
height: 38px;
width: 330px;
margin-bottom: 18px;
}

.css-1jqq78o-placeholder {
    grid-area: 1/1/2/3;
    /* color: hsl(0, 0%, 50%); */
    margin-left: 2px;
    margin-right: 2px;
    box-sizing: border-box;
    color: #697A8D;
    opacity: 0.5;
}

/*  Dropdown Styling */
.contdetails
{
font-size:13px; 
color: #566A7F;
margin-left: 10px;

//top: 20px;
//margin-top: 3px !important;
}
.css-1nmdiq5-menu{
    border:none ;
    outline: none ;
    top:34px !important;
    position:absolute;
    width:100%;
    z-index:1;
    background-color:hsl(0, 0%, 100%);
    border-radius:0px 0px 8px 8px !important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    //outline:none;
   // justify-content: space-between !important;
//    margin-top: 15px !important;
    //margin-bottom: 20px !important;
}

.css-1n6sfyn-MenuList {
    max-height: 300px;
    overflow-y: hidden !important; 
    position: relative;
  //  -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
    padding-top: 4px;
    box-sizing: border-box;
}


.css-1it2zn2-MenuList::-webkit-scrollbar
{
    width: 0px;
}

    .css-d7l1ni-option{
        cursor:default;
        display:block;
        font-size:default;
        width:100%;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
       -webkit-tap-highlight-color:#5c5ad133 ;
       background-color:#5c5ad133  ;
        padding:5px 7px 12.9px 0px !important;
        box-sizing:border-box;
    }

.css-d7l1ni-option .contdetails{
    color :#5C5AD0 !important ;
   // background-color: #5C5AD0;
     padding: 4px;
    // width: 5px;
    // height: 20px;
    font-size: 13px;
}

        .css-d7l1ni-option:active{
        background-color:#5c5ad133 !important;
     
        }
 
        .css-10wo9uf-option{
            cursor:default;
            display:block;
            font-size:inherit;
            width:100%;
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
         //-webkit-tap-highlight-color:#5c5ad133 ;
          // background-color:#5c5ad133  ;
          //  color:#5c5ad133 ;
        padding:9px 7px 3px 4px !important;
            box-sizing:border-box;
              width:330px !important;
            height: 41px !important;
        //    margin-top: 10px;
            
        }



        .css-10wo9uf-option:active{
            background-color:#5c5ad133 !important;
           //  color: #5C5AD0 !important;
        }
       
        .css-tr4s17-option{
            cursor:default;
            display:block;
            font-size:inherit;
            width:100%;
           
           // -webkit-tap-highlight-color:#5c5ad133 !important ;
            background-color:#5c5ad133 !important;
            //color: #5C5AD0 !important;
            color: #5C5AD0 !important;
          padding:10px 20px 10px 4px !important;
            box-sizing:border-box;
            width:330px !important;
            height: 41px !important;
            
          
            //overflow: scroll !important;
          
        }
    //     .css-tr4s17-option::-webkit-scrollbar {
    //         width: 0px !important;
    // }

        .css-tr4s17-option {
            .contdetails 
            {
            color :#5C5AD0 ;
            font-size: 13px;
            }
           
        }
       
        .css-tr4s17-option:active{
            background-color:#5c5ad133 !important;
           
        }

    }'>
       <Select placeholder="Select value" options={option} />
    </div>
  )
}

export default DropdownWithLargeWidthCustomer