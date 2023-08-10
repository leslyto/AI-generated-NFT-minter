import { Network, Alchemy } from 'alchemy-sdk';

const alchemySDKConnector = (chainId) => {
  const settings = {
    apiKey:
      chainId === 1
        ? process.env.REACT_APP_ALCHEMY_API_KEY
        : process.env.REACT_APP_ALCHEMY_API_KEY_GOERLI,
    network: chainId === 1 ? Network.ETH_MAINNET : Network.ETH_GOERLI,
  };

  return new Alchemy(settings);
};

export { alchemySDKConnector };
