export default {
  //  baseUrl: 'http://3.95.188.24'
    //baseUrl: 'http://3.95.188.24'
    // baseUrl: 'http://3.95.188.24'
   // baseUrl :'http://127.0.0.1:8000/backend'
  baseUrl: 'https://erp.automode.ai/backend'
}

// import React, { useState, useEffect } from "react";
// import Select from "react-select";

// const NestedDropdown = ({ data }) => {
//   const [l1Options, setL1Options] = useState([]);
//   const [l2Options, setL2Options] = useState([]);
//   const [l3Options, setL3Options] = useState([]);
//   const [selectedL2, setSelectedL2] = useState(null);
//   const [selectedL3, setSelectedL3] = useState(null);

//   useEffect(() => {
//     const uniqueL1 = [...new Set(data.map((item) => item.reporting_l1))];
//     const groupedL2Options = uniqueL1.map((l1) => {
//       const l2Items = data
//         .filter((item) => item.reporting_l1 === l1)
//         .map((item) => ({
//           value: item.reporting_l2,
//           label: item.reporting_l2,
//           l1: l1
//         }));

//       const uniqueL2Items = l2Items.reduce((accumulator, current) => {
//         if (!accumulator.find((item) => item.label === current.label)) {
//           accumulator.push(current);
//         }
//         return accumulator;
//       }, []);

//       return {
//         label: l1,
//         options: uniqueL2Items
//       };
//     });
//     setL1Options(groupedL2Options);
//   }, [data]);

//   useEffect(() => {
//     if (selectedL2) {
//       const l3Items = data
//         .filter((item) => item.reporting_l2 === selectedL2.value)
//         .map((item) => ({
//           value: item.reporting_l3,
//           label: item.reporting_l3
//         }));
//       setL3Options(l3Items);
//     }
//   }, [selectedL2, data]);

//   return (
//     <div>
//       <Select
//         options={l1Options}
//         value={selectedL2}
//         onChange={(selectedOption) => {
//           setSelectedL2(selectedOption);
//           setSelectedL3(null);
//         }}
//         isOptionDisabled={(option) => option.l1 === undefined}
//       />

//       <Select
//         options={l3Options}
//         value={selectedL3}
//         onChange={(selectedOption) => setSelectedL3(selectedOption)}
//         isDisabled={!selectedL2}
//       />
//     </div>
//   );
// };

// export default NestedDropdown;