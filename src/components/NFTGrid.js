import React, { useState } from 'react';

const NFTGrid = ({ contractNFTs, contractAddress, chainId }) => {
  const [hoveredNFT, setHoveredNFT] = useState(null);

  if (!contractNFTs) {
    return null;
  }

  const openOpenSeaUrl = (tokenId) => {
    const isMainnet = chainId === 1;
    const subdomain = !isMainnet ? 'testnets.' : '';
    const networkPath =
      chainId === 5 ? 'goerli/' : chainId === 11155111 ? 'sepolia/' : '';
    const openseaUrl = `https://${subdomain}opensea.io/assets/${networkPath}${contractAddress}/${tokenId}`;
    console.log('openseaUrl', openseaUrl);
    window.open(openseaUrl, '_blank');
  };

  const getMediaUrl = (media) => {
    const IPFS_GATEWAY = 'https://w3s.link/ipfs/';

    if (media.thumbnail) {
      return media.thumbnail;
    }
    if (media.raw) {
      return `${IPFS_GATEWAY}${media.raw.split('ipfs://')[1]}`;
    }
    return media.gateway; // Fallback to gateway if raw is not available
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
                src={getMediaUrl(nft.media[0])}
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
