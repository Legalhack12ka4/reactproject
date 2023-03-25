import React, { useState } from 'react'
import './AttachmentFile.scss'

const AttachmentFile = () => {
    const [file, setFile] = useState([{name: 'GST Certificate', created: '10-03-2022'}, {name: 'GST Award Cartificate', created: '10-03-2022'}])
  return (
    <div className='attachment-files-container'>
        {file.map((file, index) => {
            return (
                <div className='attachment-file' key={index}>
                    <div className="attachment-preview">
                    <img src="/images/icons/barcode_scanner.svg" alt="" />
                    </div>
                    <div className="file-details">
                    <div className='attachment-file-name sc-body-md'>{file.name}</div>
                    <div className='attachment-file-created caption-md'>{file.created}</div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default AttachmentFile