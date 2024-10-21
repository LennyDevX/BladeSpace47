import React from 'react';
import { FaShoppingCart, FaPaperPlane, FaTools, FaSync } from 'react-icons/fa';

const HowToPlay: React.FC = () => {
  const steps = [
    { icon: FaShoppingCart, title: "Acquire Spacecraft", description: "Purchase your first spacecraft NFT from the marketplace to begin your space exploration journey." },
    { icon: FaPaperPlane, title: "Launch Missions", description: "Send your spacecraft on automated missions to collect points and valuable artifacts." },
    { icon: FaTools, title: "Maintain Your Fleet", description: "Perform regular maintenance on your spacecraft every 7 days to keep them in top condition." },
    { icon: FaSync, title: "Upgrade and Expand", description: "Use collected points to level up your ships, acquire new ones, and grow your space empire." }
  ];

  return (
    <section id="how-to-play" className="py-12 bg-gray-800 fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">How to Play</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <step.icon className="text-blue-500 text-3xl flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${step.title}`}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;