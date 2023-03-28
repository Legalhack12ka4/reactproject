import React, { useEffect, useState } from 'react'
import config from '../Database/config'
import './AttachmentFile.scss'

const AttachmentFile = (props) => {
    const [file, setFile] = useState([{name: 'GST Certificate', created: '10-03-2022'}, {name: 'GST Award Cartificate', created: '10-03-2022'}])
    console.log(props.attachData)
//     const [assignedDataAttach, setAssignedDataAttach] = useState([]);


//     let assignedId=props.attachData.id
// console.log(assignedId)
// useEffect(() => {
//   getAttachAssigedData();
// }, [assignedId]);

// const getAttachAssigedData = () => {
//   return fetch(`${config.baseUrl}/contactattatchment/?company_id=1&contact_id=${assignedId}`)
//     .then((response) => response.json())
//     .then((data) => {
//     //  const customerVendorIds = data.data.items.map(item => item.contact_id);
//       setAssignedDataAttach(data.data.items);
//      // console.log(customerVendorIds)
//       console.log(data);
//     });
// };

// console.log(props.getAttachAssigedData)

// console.log(assignedDataAttach)
  
    return (
    <div className='attachment-files-container'>
        {props.getData.map((file, index) => {
            return (
                <div className='attachment-file' key={index}>
                    <div className="attachment-preview">
                    <img src={file.attachments} alt="" />
                    </div>
                    <div className="file-details">
                    <div className='attachment-file-name sc-body-md'>{file.attatch_name}</div>
                    <div className='attachment-file-created caption-md'>{file.updated_date_time}</div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default AttachmentFile