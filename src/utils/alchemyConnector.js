import { Network, Alchemy } from 'alchemy-sdk';

const alchemySDKConnector = (chainId) => {
  const settings = {
    apiKey:
      chainId === 1
        ? process.env.REACT_APP_ALCHEMY_API_KEY
        : chainId === 5
        ? process.env.REACT_APP_ALCHEMY_API_KEY_GOERLI
        : chainId === 11155111
        ? process.env.REACT_APP_ALCHEMY_API_KEY_SEPOLIA
        : null,
    network:
      chainId === 1
        ? Network.ETH_MAINNET
        : chainId === 5
        ? Network.ETH_GOERLI
        : chainId === 11155111
        ? Network.ETH_SEPOLIA
        : null,
  };

  if (!settings.apiKey || !settings.network) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }

  return new Alchemy(settings);
};

export { alchemySDKConnector };
