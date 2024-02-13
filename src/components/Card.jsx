
const Card = ({ cardData }) => {
    return (
  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {cardData.map((card) => (
                <div key={card.id} className="bg-white rounded-md shadow-md p-4">
                    <img src={card.productImage.url} alt="" className="aspect-[4/3]  rounded-md object-cover mb-2" />
                    <h2 className="text-lg font-semibold truncate">{card.productName}</h2>
                      <p className="text-xs mb-1">{card.description}</p>
                    <p className="text-2xl font-semibold text-[#f46600] mb-2">₹{card.productPrice}</p>
                    <p className="text-sm mb-2">{card.offers.offerType}</p>
                  
                </div>
            ))}
        </div>
    );
};

export default Card;