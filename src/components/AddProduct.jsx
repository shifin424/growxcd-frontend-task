import React, { useEffect, useState } from "react";
import InputField from "./InputFeild";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import Button from "./Button";
import { productValidationSchema } from "../schema/productValidation";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getProducts } from "../app/slices/productSlice";
import { errorMessage, successMessage } from "../hooks/message";


const AddProduct = () => {

    const [discountAmount, setDiscountAmount] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedDropdown, setSelectedDropdown] = useState("")
    const [productImage, setProductImage] = useState(null);

    const dispatch = useDispatch()
    const { isLoading, isSuccess, isError, message, error } = useSelector((state) => state?.Product)
    const products = useSelector((state) => state?.Product?.productData)

    const resetForm = useFormikContext();

    useEffect(() => {
        if (isError) {
            errorMessage(error);
        }
        if (isSuccess && message) {
            successMessage(message);
        }
    }, [isError, message, error, dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    const handleDiscountAmountChange = (e) => {
        setDiscountAmount(e.target.value);
    };

    const handleDiscountPercentageChange = (e) => {
        setDiscountPercentage(e.target.value);
    };

    const handleSelectedProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleProductImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };

    const handleDropdownChange = (e) => {
        setSelectedDropdown(e.target.value)
    }

    const initialValues = {
        productName: "",
        productPrice: "",
        stock: "",
        description: "",
        offerType: "",
    };

    const handleSubmit = (values) => {
        const formData = new FormData();

        if (productImage === null) {
            errorMessage("Please select a product image");
            return;
        }

        if  (values.offerType === "Amount" && discountAmount <= 0 || discountAmount > Number(values.productPrice)) {
            errorMessage("Discount amount should be greater than zero and less than the product price");
            return;
        }

        if (values.offerType === "Percentage" &&discountPercentage <= 0 || discountPercentage > 100) {
            errorMessage("Discount percentage should be between 0 and 100.");
            return;
        }

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        formData.append("image", productImage);

        switch (values.offerType) {
            case "No Offer":
                break;
            case "Amount":
                if (!discountAmount) {
                    errorMessage("Please enter the discount amount for Flat Amount offer");
                    return;
                }
                formData.append("discountAmount", discountAmount);
                break;

            case "Percentage":
                if (!discountPercentage) {
                    errorMessage("Please enter the discount percentage for Flat Percentage offer");
                    return;
                }
                formData.append("discountPercentage", discountPercentage);
                break;

            case "BuyOneGetOne":
                if (!selectedProduct) {
                    errorMessage("Please select a product for Buy One Get One offer");
                    return;
                }
                formData.append("selectedProduct", selectedProduct);

                if (selectedProduct === "Different Product") {
                    formData.append("otherProduct", selectedDropdown);

                    if (!selectedDropdown) {
                        errorMessage("Please select a product from the dropdown for Buy One Get One offer");
                        return;
                    }
                }
                break;

            default:
                break;
        }
        dispatch(addProducts(formData))
        resetForm({
            values: {
                productName: "",
                productPrice: "",
                stock: "",
                description: "",
                offerType: "",
            },
        });
        setDiscountAmount("");
        setDiscountPercentage("");
        setSelectedProduct("");
        setSelectedDropdown("");
        setProductImage(null);
    }


    return (
        <div className="px-5 mt-10 pb-8">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>
            <Formik initialValues={initialValues} validationSchema={productValidationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="mb-4  w-full ">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <Field
                            name="productName"
                            className="border mt-2 border-gray-500 pl-3 w-full h-10 rounded"
                            type="text"
                            placeholder="Enter product Name"
                        />
                        <div>
                            <ErrorMessage name="productName" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                            Product Price
                        </label>
                        <Field
                            name="productPrice"
                            type="number"
                            className="border mt-2 border-gray-500 pl-3 w-full h-10 rounded"
                            placeholder="Enter product price"
                        />
                        <div>
                            <ErrorMessage name="productPrice" component="div" className="text-red-500" />
                        </div>
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
                            Product Image
                        </label>
                        <Field
                            name="productImage"
                            type="file"
                            className="border p-1 mt-2 border-gray-500  w-full h-10 rounded"
                            accept="image/*"
                            onChange={handleProductImageChange}
                        />
                        <div>
                            <div>
                                <ErrorMessage name="productImage" component="div" className="text-red-500" />
                            </div>
                        </div>
                    </div>
                    {productImage && (
                        <div className="mb-4 p-5">
                            <img
                                src={URL.createObjectURL(productImage)}
                                alt="Product Preview"
                                className="aspect-[4/3] rounded  mb-2"
                            />
                        </div>
                    )}
                    <div className="mb-4 w-full">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Stock
                        </label>
                        <Field
                            name="stock"
                            className="border mt-2 border-gray-500 pl-3 w-full h-10 rounded"
                            type="number"
                            placeholder="Enter stock quantity"
                        />
                        <div>
                            <ErrorMessage name="stock" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Descirption
                        </label>
                        <Field
                            name="description"
                            as="textarea"
                            className="border mt-2 pt-3 border-gray-500 pl-3 w-full h-10 rounded"
                            type="text"
                            placeholder="Enter product description"
                        />
                        <div>
                            <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className="mb-4 ">
                        <label className="block text-sm font-medium text-gray-700">Offer Type</label>
                        <div className="flex gap-x-1">
                            <Field type="radio" name="offerType" value="Amount" />
                            Amount
                            <Field type="radio" name="offerType" value="Percentage" />
                            Percentage
                            <Field type="radio" name="offerType" value="BuyOneGetOne" />
                            Buy One Get One
                            <Field type="radio" name="offerType" value="NoOffer" />
                            No Offer
                        </div>
                        <ErrorMessage name="offerType" component="div" className="text-red-500" />
                    </div>
                    <Field name="offerType">
                        {({ field }) => (
                            <>
                                {field.value.includes("Amount") && (
                                    <div className="mb-4">
                                        <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">
                                            Discount Amount
                                        </label>
                                        <Field
                                            name="discountAmount"
                                            type="number"
                                            className="border mt-2 border-gray-500  focus:outline-gray-400 pl-3 w-full h-10 rounded"
                                            placeholder="Enter discount amount"
                                            value={discountAmount}
                                            onChange={handleDiscountAmountChange}
                                        />
                                    </div>
                                )}
                                {field.value.includes("Percentage") && (
                                    <div className="mb-4">
                                        <label
                                            htmlFor="discountPercentage"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Discount Percentage
                                        </label>
                                        <Field
                                            name="discountPercentage"
                                            type="number"
                                            className="border mt-2 border-gray-500 pl-3 w-full h-10 rounded"
                                            placeholder="Enter discount percentage"
                                            value={discountPercentage}
                                            onChange={handleDiscountPercentageChange}
                                        />
                                    </div>
                                )}
                                {field.value.includes("BuyOneGetOne") && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Select Product</label>
                                        <div className="flex items-center">
                                            <label className="mr-4">
                                                <Field
                                                    name="sameProduct"
                                                    type="radio"
                                                    value="Same Product"
                                                    checked={selectedProduct === "Same Product"}
                                                    onChange={handleSelectedProductChange}
                                                />
                                                Same Product
                                            </label>
                                            <label className="mr-4">
                                                <Field
                                                    name="differentProducts"
                                                    type="radio"
                                                    value="Different Product"
                                                    checked={selectedProduct === "Different Product"}
                                                    onChange={handleSelectedProductChange}
                                                />
                                                Different Product
                                            </label>
                                            {selectedProduct === "Different Product" && (
                                                <div>
                                                    <div>
                                                        <label
                                                            htmlFor="selectProduct"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Select Product
                                                        </label>
                                                        <select
                                                            id="selectProduct"
                                                            onChange={handleDropdownChange}
                                                            className="block w-full mt-1"
                                                        >
                                                            <option value="" disabled>
                                                                Select a product
                                                            </option>
                                                            {products.map((product) => (
                                                                <option key={product._id} value={product._id}>
                                                                    {product.productName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </Field>

                    <div className="flex justify-center ">
                        <Button
                            type="submit"
                            className="bg-[#f46600] text-white px-4 py-2 w-full rounded-md hover:bg-[#e85900]"
                            text="Add Product"
                            loading={isLoading}
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddProduct;
