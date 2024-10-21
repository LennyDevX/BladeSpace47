import React from 'react';
import { FaFingerprint, FaBolt, FaTools, FaStar } from 'react-icons/fa';

const NFTMechanics: React.FC = () => {
  const mechanics = [
    { icon: FaFingerprint, title: "Unique Designs", description: "Each spacecraft NFT features a one-of-a-kind design, making your fleet truly special." },
    { icon: FaStar, title: "Varying Rarities", description: "Discover spacecraft with different rarity levels, from common to legendary." },
    { icon: FaBolt, title: "Special Abilities", description: "Each spacecraft comes with unique abilities that affect mission outcomes and resource gathering." },
    { icon: FaTools, title: "Maintenance Requirements", description: "Keep your NFTs in top shape by performing maintenance every 7 days to ensure optimal performance." }
  ];

  return (
    <section id="nft-mechanics" className="py-12 fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">NFT Mechanics</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {mechanics.map((mechanic, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover-grow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <mechanic.icon className="text-blue-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">{mechanic.title}</h3>
              <p className="text-gray-300">{mechanic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NFTMechanics;