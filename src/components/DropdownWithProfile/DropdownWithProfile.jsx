import Select  from 'react-select';
import React from 'react'
import "./DropdownWithProfile.scss";
import { openHyperlink } from '@syncfusion/ej2/spreadsheet';

function DropdownWithProfile() {
  const [value1, setValue1] = React.useState('Parth');
  const handleChange = (event) => {
    console.log(event.target.value);
  };
    const option=[
        {
          value:'Parth' , label: <div style={{display:"flex", justifyContent:"space-between"}}>
                <div style ={{ display :"flex"}}>
                <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="30px" height="30px"/></div>
                <div style={{marginLeft:"4px"}}><p className='drpName'>Parth Goswami</p><p1 className="drpEmail">Parth.goswami@reformiqo.com</p1></div>
                </div>
                <div style={{display:"flex" ,alignItems: "center"}}>
                <p3 className="drpContact" >Assigned</p3>
                <div>
                <p4 className="drpDate" style={{marginLeft:"7px", borderRadius:"50%"}}>19</p4>
                </div>
                </div>
                </div>
         
        },
    
        {
          value:'two' , label:  <div style={{display:"flex", justifyContent:"space-between"}}>
          <div style ={{ display :"flex"}}>
          <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="30px" height="30px"/></div>
          <div style={{marginLeft:"4px"}}><p className='drpName'>Parth Goswami</p><p1 className="drpEmail">Parth.goswami@reformiqo.com</p1></div>
          </div>
          <div style={{display:"flex" ,alignItems: "center"}}>
          <p3 className="drpContact" >Assigned</p3>
          <div>
          <p4 className="drpDate" style={{marginLeft:"7px", borderRadius:"50%"}}>19</p4>
          </div>
          </div>
          </div>
        },
        {
          value:'three' , label:  <div style={{display:"flex", justifyContent:"space-between"}}>
          <div style ={{ display :"flex"}}>
          <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="30px" height="30px"/></div>
          <div style={{marginLeft:"4px"}}><p className='drpName'>Parth Goswami</p><p1 className="drpEmail">Parth.goswami@reformiqo.com</p1></div>
          </div>
          <div style={{display:"flex" ,alignItems: "center"}}>
          <p3 className="drpContact" >Assigned</p3>
          <div>
          <p4 className="drpDate" style={{marginLeft:"7px", borderRadius:"50%"}}>19</p4>
          </div>
          </div>
          </div>
        },
        {
          value:'four' ,
          label: <div style={{display:"flex", justifyContent:"space-between"}}>
          <div style ={{ display :"flex"}}>
          <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="30px" height="30px"/></div>
          <div style={{marginLeft:"4px"}}><p className='drpName'>Parth Goswami</p><p1 className="drpEmail">Parth.goswami@reformiqo.com</p1></div>
          </div>
          <div style={{display:"flex" ,alignItems: "center"}}>
          <p3 className="drpContact" >Assigned</p3>
          <div>
          <p4 className="drpDate" style={{marginLeft:"7px", borderRadius:"50%"}}>19</p4>
          </div>
          </div>
          </div>,
          
        },
        {
          value:'five' , label:<div style={{display:"flex", justifyContent:"space-between"}}>
          <div style ={{ display :"flex"}}>
          <div> <img src="/images/searchbar_icons/User-Avtar.svg" alt="" width="30px" height="30px"/></div>
          <div style={{marginLeft:"4px"}}><p className='drpName'>Parth Goswami</p><p1 className="drpEmail">Parth.goswami@reformiqo.com</p1></div>
          </div>
          <div style={{display:"flex" ,alignItems: "center"}}>
          <p3 className="drpContact" >Assigned</p3>
          <div>
          <p4 className="drpDate" style={{marginLeft:"7px", borderRadius:"50%"}}>19</p4>
          </div>
          </div>
          </div>
        }
      ]
      
  return (
    <div className='drpprofile'>
        <Select  placeholder="Select value"  options={option}
            // onChange={handleChange}
          
            // menuIsOpen={open}
      //  defaultValue={option[0]}
          // theme={(theme) => ({
          //   ...theme,
          //   borderRadius: 0,
          //   colors: {
          //     ...theme.colors,
          //     primary25: 'hotpink',
          //     primary: 'black',
          //   },
          // })}
        />
    </div>
  )
}

export default DropdownWithProfile



// .css-1u9des2-indicatorSeparator
// {
//    width :0px !important;
// }
// .css-1u9des2-indicatorSeparator
// {
//    width :0px !important;
// }

{/* <div class=" css-1nmdiq5-menu" id="react-select-2-listbox"><div class=" css-qr46ko"><div class=" css-tr4s17-option" aria-disabled="false" id="react-select-2-option-0" tabindex="-1"><div style="display: flex; justify-content: space-between;"><div><div class="drpName">Parth Goswami</div><div class="drpEmail">Parth.goswami@reformiqo.com</div></div><div><div class="drpContact">Contact Added</div><div class="drpDate">10 Dec 2022</div></div></div></div><div class=" css-10wo9uf-option" aria-disabled="false" id="react-select-2-option-1" tabindex="-1"><div style="display: flex; justify-content: space-between;"><div><div class="drpName">Parth Goswami</div><div class="drpEmail">Parth.goswami@reformiqo.com</div></div><div><div class="drpContact">Contact Added</div><div class="drpDate">10 Dec 2022</div></div></div></div><div class=" css-10wo9uf-option" aria-disabled="false" id="react-select-2-option-2" tabindex="-1"><div style="display: flex; justify-content: space-between;"><div><div class="drpName">Parth Goswami</div><div class="drpEmail">Parth.goswami@reformiqo.com</div></div><div><div class="drpContact">Contact Added</div><div class="drpDate">10 Dec 2022</div></div></div></div><div class=" css-10wo9uf-option" aria-disabled="false" id="react-select-2-option-3" tabindex="-1"><div style="display: flex; justify-content: space-between;"><div><div class="drpName">Parth Goswami</div><div class="drpEmail">Parth.goswami@reformiqo.com</div></div><div><div class="drpContact">Contact Added</div><div class="drpDate">10 Dec 2022</div></div></div></div><div class=" css-d7l1ni-option" aria-disabled="false" id="react-select-2-option-4" tabindex="-1"><div style="display: flex; justify-content: space-between;"><div><div class="drpName">Parth Goswami</div><div class="drpEmail">Parth.goswami@reformiqo.com</div></div><div><div class="drpContact">Contact Added</div><div class="drpDate">10 Dec 2022</div></div></div></div></div></div> */}