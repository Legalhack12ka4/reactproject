import * as Yup from 'yup';


export const  addCustomerSchemas = Yup.object().shape({
    // gstin: Yup.string().required('GST No. is required'),
    gstin: Yup.string().matches(/^[0-9]{2}[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}[1-9A-Z,a-z]{1}[Z,z]{1}[0-9A-Z,,a-z]{1}$/, 'Invalid GSTIN').required('GST No. is required'),
    // pancard: Yup.string().required('Pan No. is required'),
    pancard: Yup.string().matches(/^[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}$/, 'Invalid PAN').required('PAN No. is required'),
    tan: Yup.string().matches(/^[A-Z,a-z]{4}[0-9]{5}[A-Z,a-z]{1}$/, 'Invalid TAN').required('TAN No. is required'),

    businessname: Yup.string().required('Business Name is required'),
    // credit: Yup.string().required('Credit is required'),
    credit: Yup.number().required('Credit Limit is required'),
    email: Yup.string().email('Invalid email'),
    // pincode: Yup.string().required('Pincode is required'),
    pincode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid Pincode').required('Pincode is required'),
    street1: Yup.string().required('Street 1 is required'),
    street2: Yup.string().required('Street 2 is required'),
    gsttreat: Yup.string().required('GST Treatment is required'),
    // currency: Yup.string().required('Currency is required'),
    payment: Yup.string().required('Payment Terms is required'),
    category: Yup.string().required('GST Treatment is required'),
    pos: Yup.string().required('Place of Supply is required'),
    contact: Yup.string().required('Contact is required'),
    ownership: Yup.string().required('Ownership is required'),
    area:Yup.string().required('Area is required'),
    commission:Yup.string().required('Commission is required'),
    type:Yup.string().required('Customer Type is required')
});


export const  contactSchemas = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    //mobile: Yup.string().matches(/(1|2|3|4|5|6|7|8|9)\d{9}$/, 'Invalid, Please enter 10 digit').required('Mobile No. is required'),
    mobile: Yup.string().required('Mobile No. is required'),
    dob: Yup.string().required('Date of Birth is required'),
    position: Yup.string().required('Position is required'),
    ownership: Yup.string().required('Ownership is required'),
    company_name: Yup.string().required('Company Name is required'),
    lead:Yup.string().required('Lead Source is required'),
    status:Yup.string().required('Status is required'),
});


export const chartOfAccountSchema = Yup.object().shape({
    account_type: Yup.string().required('Account Type is required'),
    account_name: Yup.string().required('Account Name is required'),
    reporting: Yup.string().required('Reporting is required'),
    description: Yup.string().required('Description is required'),
    // itemtype: Yup.string().required('Item Type is required'),
    // reportingl1: Yup.string().required('Reporting Level 1 is required'),
    // reportingl2: Yup.string().required('Reporting Level 2 is required'),
    // reportingl3: Yup.string().required('Reporting Level 3 is required'),
});

export const logindata = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  
});