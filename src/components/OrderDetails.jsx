import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { LuMinusCircle } from "react-icons/lu";
import Button from "./Button";
import { decrementCartItem, incrementCartItem } from "../app/slices/orderSlice";
import useSwal from "../hooks/useSwal";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state?.Order.cartData);
    const { showSuccess ,showError } = useSwal()


    const handleDecrement = (productId) => {
        dispatch(decrementCartItem({ productId }));
    };

    const handleIncrement = (productId) => {
        dispatch(incrementCartItem({ productId }));
    };

    const handleSubmit = () => {
        try{
            showSuccess("Order Placed Successfully")
        }catch(err){
            showError("Order Failed")
        }
      
    }

    const totalPrice = cart.reduce((acc, product) => {
        const productPrice = product.productPrice * (product.quantity || 1);
        if (product.offers && product.offers.offerType === 'Amount') {
            return acc + (productPrice - product.offers.flatAmount);
        } else if (product.offers && product.offers.offerType === 'Percentage') {
            const discount = (productPrice * product.offers.flatPercentage) / 100;
            return acc + (productPrice - discount);
        } else {
            return acc + productPrice;
        }
    }, 0);

    const totalNoProducts = cart.length;
    const totalNoOffers = cart.reduce((acc, product) => acc + (product.offers ? 1 : 0), 0);

    const discountPrice = cart.reduce((acc, product) => {
        if (product.offers && product.offers.offerType === "Amount") {
            return acc + product.offers.flatAmount;
        } else if (product.offers && product.offers.offerType === "Percentage") {
            const discount = (product.productPrice * product.offers.flatPercentage) / 100;
            return acc + discount;
        } else {
            return acc;
        }
    }, 0);

    const totalAmount = totalPrice - discountPrice;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 ml-5 mt-5">Order Details</h2>
            {cart.map((product) => (
                <div key={product._id} className="flex gap-5 p-5">
                    <div>
                        <img src={product.productImage.url} className="w-20 h-20" alt={product.productName} />
                    </div>
                    <div>
                        <h3 className="font-bold">{product.productName}</h3>
                        <p>
                            Price: <span className="text-[#f46600] font-semibold">₹{product.productPrice}</span>
                        </p>
                        <p className="text-sm">Available Offer: {product.offers.offerType}</p>
                        {product.offers && (
                            <p>
                                {product.offers.offerType === "Amount" && (
                                    <span className="text-sm">Available Offer : ₹{product.offers.flatAmount}</span>
                                )}
                                {product.offers.offerType === "Percentage" && (
                                    <span className="text-sm">Available Offer : {product.offers.flatPercentage}%</span>
                                )}
                                {product.offers.offerType === "ByOneGetSame" && (
                                    <span className="text-sm">Offer : {product.productName}</span>
                                )}
                                {product.offers.offerType === "ByOneGetOther" && (
                                    <span className="text-sm">Offer : {product?.offers?.offerProductId?.productName}</span>
                                )}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center ml-auto">
                        <button onClick={() => handleDecrement(product._id)}>
                            <LuMinusCircle className="text-orange-500 w-5 h-5" />
                        </button>
                        <span className="mx-2">{product.quantity || 1}</span>
                        <button onClick={() => handleIncrement(product._id)}>
                            <FiPlusCircle className="text-orange-500 w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-center p-5">
                <div className="bg-gray-100 w-full p-3 rounded">
                    <h1 className="text-2xl font-bold mb-4 ">Order Details</h1>
                    <div className="flex justify-between p-3">
                        <p className="font-semibold text-gray-800">Total No Products :</p>
                        <p className="font-bold">{totalNoProducts}</p>
                    </div>
                    <div className="flex justify-between p-3">
                        <p className="font-semibold text-gray-800">Total No Offers :</p>
                        <p className="font-bold">{totalNoOffers}</p>
                    </div>
                    <div className="flex justify-between p-3">
                        <p className="font-semibold text-gray-800">Total Price :</p>
                        <p className="font-bold">₹{totalPrice}</p>
                    </div>
                    <div className="flex justify-between p-3">
                        <p className="font-semibold text-gray-800">Discount Price :</p>
                        <p className="font-bold">₹{discountPrice}</p>
                    </div>
                    <div className="flex justify-between p-3 border-t border-black">
                        <p className="font-semibold text-gray-800">Total Amount :</p>
                        <p className="font-bold">₹{totalAmount}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-5">
                <Button onClick={handleSubmit}  className="bg-[#f46600] w-full h-10 rounded text-white font-bold" text="Order Now" />
            </div>
        </div>
    );
};

export default OrderDetails;
