require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/',
    },
    // mainnet: {
    //   url: "https://mainnet.infura.io/v3/4dc92b861940427a84025d3aa7203b62",
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // polygon: {
    //   url: "https://polygon-rpc.com",
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    goerli: {
      url: 'https://goerli.infura.io/v3/4dc92b861940427a84025d3aa7203b62',
      accounts: {
        mnemonic: '', // seed phrase
      },
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/4dc92b861940427a84025d3aa7203b62',
      accounts: {
        mnemonic: '', // seed phrase
      },
    },
  },
};
