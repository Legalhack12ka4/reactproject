import * as Yup from 'yup';


export const  addCustomerSchemas = Yup.object().shape({
    // gstin: Yup.string().required('GST No. is required'),
    gstin: Yup.string().matches(/^[0-9]{2}[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}[1-9A-Z,a-z]{1}[Z,z]{1}[0-9A-Z,,a-z]{1}$/, 'Invalid GSTIN').required('GST No. is required'),
    // pancard: Yup.string().required('Pan No. is required'),
    pancard: Yup.string().matches(/^[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}$/, 'Invalid PAN').required('Pan No. is required'),
    businessname: Yup.string().required('Business Name is required'),
    // credit: Yup.string().required('Credit is required'),
    credit: Yup.number().required('Credit is required'),
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