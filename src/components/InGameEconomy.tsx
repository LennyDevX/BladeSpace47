import React from 'react';
import { FaCoins, FaChartBar, FaSync, FaRocket } from 'react-icons/fa';

const InGameEconomy: React.FC = () => {
  const economyFeatures = [
    { icon: FaCoins, title: "Points as Currency", description: "Earn points through successful missions. Use them to upgrade ships and purchase new NFTs." },
    { icon: FaChartBar, title: "Leveling System", description: "Progress through levels to unlock new features, missions, and spacecraft types." },
    { icon: FaSync, title: "Maintenance Costs", description: "Balance your earnings with the cost of spacecraft maintenance to optimize your fleet's performance." },
    { icon: FaRocket, title: "Artifact Trading", description: "Discover and trade rare artifacts to boost your ship's capabilities or sell for additional points." }
  ];

  return (
    <section id="economy" className="py-12 bg-gray-800 fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">In-Game Economy</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {economyFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover-grow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
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

export default InGameEconomy;