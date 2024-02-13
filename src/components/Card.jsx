
const Card = ({ cardData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {cardData.map((card) => (
                <div key={card.id} className="bg-white rounded-md shadow-md p-4">
                    <img src={card.image} alt={card.title} className="w-full h-32 rounded-md object-cover mb-2" />
                    <h2 className="text-lg font-semibold  ">{card.title}</h2>
                      <p className="text-xs mb-1">{card.content}</p>
                    <p className="text-2xl font-semibold text-[#f46600] mb-2">₹{card.price.toFixed(2)}</p>
                    <p className="text-sm mb-2">{card.offerType}</p>
                  
                </div>
            ))}
        </div>
    );
};

export default Card;