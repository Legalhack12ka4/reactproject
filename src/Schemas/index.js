import * as Yup from 'yup';


export const  addCustomerSchemas = Yup.object().shape({
    // gstin: Yup.string().required('GST No. is required'),
    gstin: Yup.string().matches(/^[0-9]{2}[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}[1-9A-Z,a-z]{1}[Z,z]{1}[0-9A-Z,,a-z]{1}$/, 'Invalid GSTIN').required('GST No. is required'),
    // pancard: Yup.string().required('Pan No. is required'),
    pancard: Yup.string().matches(/^[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}$/, 'Invalid PAN').required('Pan No. is required'),
    businessname: Yup.string().required('Business Name is required'),
    // credit: Yup.string().required('Credit is required'),
    credit: Yup.number().required('Credit Limit is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // pincode: Yup.string().required('Pincode is required'),
    pincode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid Pincode').required('Pincode is required'),
    street1: Yup.string().required('Street 1 is required'),
    street2: Yup.string().required('Street 2 is required'),
    gsttreat: Yup.string().required('GST Treatment is required'),
    category: Yup.string().required('GST Treatment is required'),
    pos: Yup.string().required('Place of Supply is required'),
    contact: Yup.string().required('Contact is required'),
    ownership: Yup.string().required('Ownership is required'),
});


export const  contactSchemas = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile_no: Yup.string().required('Mobile No. is required'),
    dob: Yup.string().required('Date of Birth is required'),
    position: Yup.string().required('Position is required'),
    ownership: Yup.string().required('Ownership is required'),
    company_name: Yup.string().required('Company Name is required'),
});


export const chartOfAccountSchema = Yup.object().shape({
    accounttype: Yup.string().required('Account Type is required'),
    accountname: Yup.string().required('Account Name is required'),
    accountcode: Yup.string().required('Account Code is required'),
    moduletype: Yup.string().required('Module Type is required'),
    itemtype: Yup.string().required('Item Type is required'),
    reportingl1: Yup.string().required('Reporting Level 1 is required'),
    reportingl2: Yup.string().required('Reporting Level 2 is required'),
    reportingl3: Yup.string().required('Reporting Level 3 is required'),
});