import * as Yup from "yup";

export const productValidationSchema = Yup.object({
    productName: Yup.string()
        .required("Product Name is required")
        .matches(/^[A-Za-z\s]+$/, 'Product Name should only contain letters.'),
    productPrice: Yup.number()
        .required("Product Price is required")
        .positive("Price must be a positive number")
        .test('is-valid-price', 'Invalid price format', (value) => !isNaN(value) && /^\d+(\.\d{1,2})?$/.test(value))
        .max(9999.99, 'Price must be less than or equal to  Rs:9999.99'),
    stock: Yup.number().required("Stock is required").integer("Stock must be an integer"),
    description: Yup.string()
        .required("Description is required")
        .max(50, 'Description must be at most 50 characters'),
    offerType: Yup.string().required("Offer Type is required"),
});