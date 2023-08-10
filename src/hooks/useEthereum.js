import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../abis/ABI.json';
import config from '../config.json';

const useEthereum = (setErrorMessage) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [account, setAccount] = useState(null);

  const requestAccount = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
  };

  const setupEthereumEnvironment = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
        const network = await provider.getNetwork();
        setChainId(network.chainId);
        const contractAddress = config[network.name].nft.address;
        setContractAddress(contractAddress);
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        setContract(contract);
      } catch (error) {
        console.error('Failed to load Ethereum data: ', error);
      }
    } else {
      setErrorMessage(
        'Please Install Metamask in order to view the site and mint AI generated pictures.',
      );
      console.log('Ethereum object not found. Install Metamask.');
      return;
    }
  };

  useEffect(() => {
    if (!setErrorMessage) return;
    setupEthereumEnvironment();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0]);
        window.location.reload();
      });

      window.ethereum.on('chainChanged', async function (_chainId) {
        setChainId(_chainId);
        window.location.reload();
      });

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            'accountsChanged',
            setupEthereumEnvironment,
          );
          window.ethereum.removeListener(
            'chainChanged',
            setupEthereumEnvironment,
          );
        }
      };
    }
  }, [setErrorMessage]);

  return {
    provider,
    contract,
    contractAddress,
    chainId,
    account,
    requestAccount,
  };
};

export default useEthereum;
