import React from "react";
import InputField from "./InputFeild";
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa6";
import Button from "./Button";
import Card from "./Card";
import productImage from "../assets/images/product.avif";

const Home = () => {
    const cardData = [
        {
            id: 1,
            title: "Product 1",
            image: productImage,
            price: 20.99,
            offerType: "Discount",
            content: "this product is awsome and very tasy and juiscy.",
        },
        {
            id: 2,
            title: "Product 2",
            image: productImage,
            price: 15.49,
            offerType: "Flat Amount",
            content: "Card 2 Content",
        },
        {
            id: 2,
            title: "Product 2",
            image: productImage,
            price: 15.49,
            offerType: "Flat Amount",
            content: "Card 2 Content",
        },
        {
            id: 2,
            title: "Product 2",
            image: productImage,
            price: 15.49,
            offerType: "Flat Amount",
            content: "Card 2 Content",
        },
    ];
    return (
        <div className="w-full h-screen flex">
            <div className="bg-[#f8f8f8] w-full md:w-[70%] lg:w-[70%]  px-4 md:px-8 lg:px-14 pt-4 md:pt-8">
                <div className="flex justify-between">
                    <div className="h-28">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Welcome to EzOrder Point</h1>
                        <p className="text-xs md:text-sm lg:text-base mb-4">Streamlining Your Sales Experience</p>
                    </div>
                    <div className="h-28">
                        <div className="relative">
                            <span className="absolute top-3 left-7 md:top-4 md:left-8 flex items-center">
                                <IoIosSearch className="text-black w-5 h-5 md:w-6 md:h-6" />
                            </span>
                            <InputField
                                className="pl-10 md:pl-12 rounded mt-2 pr-4 py-2 text-xs md:text-sm lg:text-base"
                                type="text"
                                placeholder="Search Product"
                            />
                        </div>
                        <div className="flex justify-end gap-5 mt-5 pr-3 md:hidden relative">
                            <div>
                                <FaOpencart className="w-8 h-8" />
                                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs -top-1 right-12 absolute">
                                    1
                                </span>
                            </div>
                            <FaCirclePlus className="w-7 h-7" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-x-5 mt-5 md:mt-0">
                    <Button
                        className="md:px-5 px-3  py-1 md:py-2 bg-white hover:bg-[#f46600]
                         hover:text-white rounded-md text-sm md:font-semibold"
                        text="All"
                    />
                    <Button
                        className="md:px-5 px-3  py-1 md:py-2 bg-white hover:bg-[#f46600]
                         hover:text-white  rounded-md text-sm md:font-semibold"
                        text="Flat Amount"
                    />
                    <Button
                        className="md:px-5 px-3  py-1 md:py-2 bg-white hover:bg-[#f46600]
                         hover:text-white  rounded-md text-sm md:font-semibold"
                        text="Flat Discount"
                    />
                    <Button
                        className="md:px-5 px-3  py-1 md:py-2 bg-white hover:bg-[#f46600]
                         hover:text-white  rounded-md text-sm md:font-semibold"
                        text="Buy One get One "
                    />
                </div>

                <div className="mt-10">
                    <Card cardData={cardData} />
                </div>
            </div>

            <div className="hidden lg:block bg-green-100 w-[30%]">
                <h1 className="text-xs md:text-sm lg:text-base">order div</h1>
            </div>
        </div>
    );
};

export default Home;