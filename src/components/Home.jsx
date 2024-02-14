import React, { useEffect, useState } from "react";
import InputField from "./InputFeild";
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa6";
import Button from "./Button";
import Card from "./Card";
import productImage from "../assets/images/default.png";
import OrderDetails from "./OrderDetails";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../app/slices/productSlice";
import Modal from "./Modal";

const Home = () => {
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [selectedOfferType, setSelectedOfferType] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector((state) => state?.Product?.productData);
    const { totalItems } = useSelector((state) => state?.Order);

    const handleOrderDetailsClick = () => {
        setShowOrderDetails(true);
        setShowAddProduct(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openCart = () => {
        setShowCartModal(true);
    };

    const closeCart = () => {
        setShowCartModal(false);
    };

    const handleOfferTypeClick = (offerType) => {
        dispatch(setSelectedOfferType(offerType));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const offerTypeCondition =
            selectedOfferType === "All" ||
            (selectedOfferType === "Buy One Get One" &&
                product.offers &&
                (product.offers.offerType === "ByOneGetSame" || product.offers.offerType === "ByOneGetOther")) ||
            product.offers.offerType === selectedOfferType;

        const searchCondition =
            product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return offerTypeCondition && searchCondition;
    });

    const handleAddProductClick = () => {
        setShowAddProduct(true);
        setShowOrderDetails(false);
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="w-full h-auto pb-5 flex">
            <div className="bg-[#f8f8f8] w-full md:w-[70%] lg:w-[70%]  px-4 md:px-8 lg:px-14 pt-4 md:pt-8">
                <div className="flex justify-between">
                    <div className="h-28">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Welcome to EzOrder Point</h1>
                        <p className="text-xs md:text-sm lg:text-base mb-4">Streamlining Your Sales Experience</p>
                    </div>
                    <div className="h-28">
                        <div className="relative">
                            <span className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center">
                                <IoIosSearch className="text-black w-5 h-5 md:w-6 md:h-6" />
                            </span>
                            <InputField
                                className="pl-10 md:pl-12 outline-gray-300 rounded mt-2 pr-4 py-2 text-xs md:text-sm lg:text-base"
                                type="text"
                                placeholder="Search Product"
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="flex justify-end gap-5 mt-5 pr-3 md:hidden relative">
                            <div>
                                <FaOpencart className="w-8 h-8" onClick={openCart} />
                                <span
                                    className="bg-red-500 text-white rounded-full px-2 py-1 text-xs -top-1 
                                right-12 absolute"
                                >
                                    {totalItems}
                                </span>
                            </div>
                            <FaCirclePlus className="w-7 h-7" onClick={openModal} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-x-5 mt-5 md:mt-0">
                    <Button
                        className={`${
                            selectedOfferType === "All"
                                ? "bg-[#f46600] text-white"
                                : "bg-white hover:bg-[#f46600] hover:text-white"
                        } md:px-5 px-3 py-1 md:py-2 rounded-md text-sm md:font-semibold`}
                        text="All"
                        onClick={() => handleOfferTypeClick("All")}
                    />
                    <Button
                        className={`${
                            selectedOfferType === "Amount"
                                ? "bg-[#f46600] text-white"
                                : "bg-white hover:bg-[#f46600] hover:text-white"
                        } md:px-5 px-3 py-1 md:py-2 rounded-md text-sm md:font-semibold`}
                        text="Flat Amount"
                        onClick={() => handleOfferTypeClick("Amount")}
                    />
                    <Button
                        className={`${
                            selectedOfferType === "Percentage"
                                ? "bg-[#f46600] text-white"
                                : "bg-white hover:bg-[#f46600] hover:text-white"
                        } md:px-5 px-3 py-1 md:py-2 rounded-md text-sm md:font-semibold`}
                        text="Flat Discount"
                        onClick={() => handleOfferTypeClick("Percentage")}
                    />
                    <Button
                        className={`${
                            selectedOfferType === "BuyOneGetOneSame" || selectedOfferType === "BuyOneGetOneAnother"
                                ? "bg-[#f46600] text-white"
                                : "bg-white hover:bg-[#f46600] hover:text-white"
                        } md:px-5 px-3 py-1 md:py-2 rounded-md text-sm md:font-semibold`}
                        text="Buy One Get One"
                        onClick={() => handleOfferTypeClick("Buy One Get One")}
                    />
                </div>

                <div className="mt-10">
                    <Card cardData={filteredProducts} />
                </div>
            </div>

            <div className="hidden lg:block bg-white w-[30%]">
                <div className="flex justify-center">
                    <div className="flex justify-center mt-8 gap-x-2 w-96 h-14 p-2 bg-[#f8f8f8]">
                        <Button
                            className={`${
                                showOrderDetails
                                    ? "bg-[#f46600] text-white"
                                    : "bg-white hover:bg-[#f46600] hover:text-white"
                            } border text-black px-10 py-2 rounded`}
                            text="Order Details"
                            onClick={handleOrderDetailsClick}
                        />
                        <Button
                            className={`${
                                showAddProduct ? "bg-[#f46600] text-white" : "bg-white hover:bg-[#f46600] hover:text-white"
                            } border text-black px-10 py-2 rounded`}
                            text="Add Product"
                            onClick={handleAddProductClick}
                        />
                    </div>
                </div>
                <div>
                    {showOrderDetails && <OrderDetails />}
                    {showAddProduct && <AddProduct />}
                    {!showOrderDetails && !showAddProduct && (
                        <div className="flex justify-center flex-col p-5 items-center">
                            <img src={productImage} className="w-full" alt="Default Image" />
                        </div>
                    )}
                </div>
            </div>
            <Modal isOpen={showModal} onClose={closeModal} className="your-modal-styles">
                <AddProduct onClose={closeModal} />
            </Modal>
            <Modal isOpen={showCartModal} onClose={closeCart} className="your-modal-styles">
                <OrderDetails onclose={closeCart} />
            </Modal>
        </div>
    );
};

export default Home;
