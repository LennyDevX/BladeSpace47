import React from 'react';
import { FaShoppingBag, FaExchangeAlt, FaMedal, FaChartLine } from 'react-icons/fa';

const Marketplace: React.FC = () => {
  const marketplaceFeatures = [
    { icon: FaShoppingBag, title: "Wide Variety", description: "Explore a vast selection of spacecraft NFTs with different designs, abilities, and rarities." },
    { icon: FaExchangeAlt, title: "Trading", description: "Buy, sell, and trade spacecraft NFTs with other players in our secure marketplace." },
    { icon: FaMedal, title: "Auctions", description: "Participate in exciting auctions for rare and legendary spacecraft NFTs." },
    { icon: FaChartLine, title: "Market Trends", description: "Stay informed with real-time market data and trends to make smart trading decisions." }
  ];

  return (
    <section id="marketplace" className="py-12 fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Marketplace</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {marketplaceFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover-grow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <feature.icon className="text-blue-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;