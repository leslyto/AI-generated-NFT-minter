import React, { useState } from 'react';

const NFTGrid = ({ contractNFTs, contractAddress, chainId }) => {
  const [hoveredNFT, setHoveredNFT] = useState(null);
  if (!contractNFTs) {
    return null;
  }

  const openOpenSeaUrl = (tokenId) => {
    const openseaUrl = `https://${
      chainId !== 1 ? 'testnets.' : ''
    }opensea.io/assets/${
      chainId === 5 ? 'goerli/' : ''
    }${contractAddress}/${tokenId}`;
    window.open(openseaUrl, '_blank');
  };

  const handleMouseEnter = (index) => {
    setHoveredNFT(index);
  };

  const handleMouseLeave = () => {
    setHoveredNFT(null);
  };

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl text-gray-100 m-4">
        Preview other AI generated NFTs from the collection
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {contractNFTs.map((nft, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            {nft.media && (
              <img
                src={nft.media[0].thumbnail}
                alt={nft.title}
                className="w-full h-auto cursor-pointer"
                onClick={() => openOpenSeaUrl(nft.tokenId)}
              />
            )}
            {hoveredNFT === index && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded pointer-events-none text-center z-10">
                Prompt: {nft.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
