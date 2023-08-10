import { useState, useEffect } from 'react';
import { alchemySDKConnector } from '../utils/alchemyConnector';

export const useFetchNFTs = (chainId, contractAddress) => {
  const [contractNFTs, setContractNFTs] = useState(null);

  useEffect(() => {
    async function fetchNFTs() {
      const alchemy = alchemySDKConnector(chainId);
      const contractNFTsResponse = await alchemy.nft
        .getNftsForContract(contractAddress)
        .catch((error) => {
          console.error('Error fetching from Alchemy: ', error);
        });
      const shuffledNFTs = [...contractNFTsResponse.nfts].sort(
        () => Math.random() - 0.5,
      );
      setContractNFTs(shuffledNFTs);
    }

    if (contractAddress && chainId) {
      fetchNFTs();
    }
  }, [chainId, contractAddress]);

  return contractNFTs;
};
