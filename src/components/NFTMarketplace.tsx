import React, { useState } from 'react';
import { FaShoppingCart, FaTag } from 'react-icons/fa';

interface NFT {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface NFTMarketplaceProps {
  listedNFTs: NFT[];
  buyNFT: (nftId: string) => void;
  sellNFT: (nft: NFT, price: number) => void;
  userNFTs: NFT[];
  userBalance: number;
}

const NFTMarketplace: React.FC<NFTMarketplaceProps> = ({
  listedNFTs,
  buyNFT,
  sellNFT,
  userNFTs,
  userBalance
}) => {
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const handleSell = () => {
    if (selectedNFT && sellPrice > 0) {
      sellNFT(selectedNFT, sellPrice);
      setSelectedNFT(null);
      setSellPrice(0);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-bold mb-4">Mercado NFT</h3>
      <p className="mb-4">Balance: {userBalance} tokens</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">NFTs en Venta</h4>
          {listedNFTs.map(nft => (
            <div key={nft.id} className="bg-gray-700 p-3 rounded-lg mb-2">
              <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded mb-2" />
              <h5 className="font-bold">{nft.name}</h5>
              <p className="text-sm">{nft.description}</p>
              <p className="text-yellow-400">{nft.price} tokens</p>
              <button
                onClick={() => buyNFT(nft.id)}
                disabled={userBalance < nft.price}
                className={`${
                  userBalance >= nft.price
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-500 cursor-not-allowed'
                } text-white px-2 py-1 rounded mt-2`}
              >
                Comprar <FaShoppingCart className="inline-block ml-1" />
              </button>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Tus NFTs</h4>
          {userNFTs.map(nft => (
            <div key={nft.id} className="bg-gray-700 p-3 rounded-lg mb-2">
              <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded mb-2" />
              <h5 className="font-bold">{nft.name}</h5>
              <p className="text-sm">{nft.description}</p>
              <button
                onClick={() => setSelectedNFT(nft)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mt-2"
              >
                Vender <FaTag className="inline-block ml-1" />
              </button>
            </div>
          ))}
          {selectedNFT && (
            <div className="mt-4">
              <h5 className="font-bold mb-2">Vender {selectedNFT.name}</h5>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded mr-2"
                placeholder="Precio en tokens"
              />
              <button
                onClick={handleSell}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Confirmar Venta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;