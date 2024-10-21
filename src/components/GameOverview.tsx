import React from 'react';
import { FaRocket, FaStar, FaBolt } from 'react-icons/fa';

const GameOverview: React.FC = () => {
  return (
    <section id="overview" className="py-12 fade-in">
      <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Game Overview</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: FaRocket, title: "Spacecraft NFTs", description: "Acquire unique spacecraft as NFTs, each with its own design and abilities." },
          { icon: FaStar, title: "Automated Missions", description: "Send your spacecraft on unmanned missions to collect points and artifacts." },
          { icon: FaBolt, title: "Upgrade & Expand", description: "Use collected points to level up, acquire better ships, and dominate the galaxy." }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover-grow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
            <item.icon className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameOverview;