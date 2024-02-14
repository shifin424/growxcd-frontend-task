import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateTotalItems } from "../app/slices/orderSlice";
import Button from "./Button";
import useSwal from "../hooks/useSwal";


const Card = ({ cardData }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state?.Order?.cartData);
    const { showError, showSuccess } = useSwal();

    const handleAddToCart = (productData) => {
        const { _id } = productData;

        const isProductInCart = cart.some((product) => product?._id === _id);

        if (isProductInCart) {
            showError("Product already exists in the cart.");
        } else {
            dispatch(addToCart(productData));
            dispatch(updateTotalItems());
            showSuccess("Product Added to cart");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {cardData.map((card) => (
                <div key={card._id} className="bg-white rounded-md shadow-md p-4">
                    <img src={card.productImage.url} alt="" className="aspect-[4/3] drop-shadow-md rounded-md object-cover mb-2" />
                    <h2 className="text-lg font-semibold truncate">{card.productName}</h2>
                    <p className="text-xs mb-1">{card.description}</p>
                    <p className="text-2xl font-semibold text-[#f46600] mb-2">₹{card.productPrice}</p>
                    <p className="text-sm mb-2">
                        {card.offers.offerType
                            ? card.offers.offerType === "Amount"
                                ? `Discounted Price: ₹${card.productPrice - card.offers.flatAmount}`
                                : card.offers.offerType === "Percentage"
                                ? `Percentage Off: ${card.offers.flatPercentage}%`
                                : card.offers.offerType === "ByOneGetOther"
                                ? `Buy One ${card.productName}, Get one ${
                                      card.offers.offerProductId ? "Free" : "Not Available"
                                  }`
                                : card.offers.offerType === "ByOneGetSame"
                                ? `Buy One ${card.productName}, Get another Free`
                                : "No offer available"
                            : "No Offer"}
                    </p>
                    <div className="flex justify-center">
                        <Button
                            onClick={() => handleAddToCart(card)}
                            className="px-5 text-xs w-full rounded font-semibold font-sans py-2 bg-orange-300"
                            text="Add to Cart"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
