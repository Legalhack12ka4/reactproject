import * as Yup from 'yup';


export const  addCustomerSchemas = Yup.object().shape({
    gstin: Yup.string().required('GST No. is required'),
    pancard: Yup.string().required('Pan No. is required'),
    businessname: Yup.string().required('Business Name is required'),
    credit: Yup.string().required('Credit is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    pincode: Yup.string().required('Pincode is required'),
    street1: Yup.string().required('Street 1 is required'),
    street2: Yup.string().required('Street 2 is required'),
    gsttreat: Yup.string().required('GST Treatment is required'),
    category: Yup.string().required('GST Treatment is required'),
    pos: Yup.string().required('Place of Supply is required'),
    contact: Yup.string().required('Contact is required'),
    ownership: Yup.string().required('Ownership is required'),
});