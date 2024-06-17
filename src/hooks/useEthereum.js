import { useState, useEffect, useCallback } from 'react';
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
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (error) {
      setErrorMessage('Failed to connect to Metamask.');
      console.error('Failed to connect to Metamask: ', error);
    }
  };

  const setupEthereumEnvironment = useCallback(async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        const signer = web3Provider.getSigner();
        const userAccount = await signer.getAddress();
        setAccount(userAccount);

        const network = await web3Provider.getNetwork();
        setChainId(network.chainId);

        const networkConfig = config[network.name];
        if (networkConfig && networkConfig.nft && networkConfig.nft.address) {
          const address = networkConfig.nft.address;
          setContractAddress(address);
          const ethersContract = new ethers.Contract(address, ABI, signer);
          setContract(ethersContract);
        } else {
          setErrorMessage(
            `No contract address found for network: ${network.name}`,
          );
        }
      } catch (error) {
        setErrorMessage('Failed to load Ethereum data.');
        console.error('Failed to load Ethereum data: ', error);
      }
    } else {
      setErrorMessage(
        'Please install Metamask to view the site and mint AI-generated pictures.',
      );
      console.log('Ethereum object not found. Install Metamask.');
    }
  }, [setErrorMessage]);

  useEffect(() => {
    if (!setErrorMessage) return;
    setupEthereumEnvironment();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
        window.location.reload();
      };

      const handleChainChanged = (_chainId) => {
        setChainId(parseInt(_chainId, 10));
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountsChanged,
          );
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [setErrorMessage, setupEthereumEnvironment]);

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
