import { useState } from 'react';
import { ethers } from 'ethers';
// Components
import Navigation from './components/Navigation';
import NFTGrid from './components/NFTGrid';
import Banner from './components/Banner';
// Utils
import { createImage, uploadImage } from './utils/imageUtils';
// Hooks
import useEthereum from './hooks/useEthereum';
import { useFetchNFTs } from './hooks/useFetchNFTs';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const { provider, contract, contractAddress, chainId } =
    useEthereum(setErrorMessage);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);
  const [txnHash, setTransactionHash] = useState(null);
  const [message, setMessage] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const MINT_FEE = '0.001';
  const contractNFTs = useFetchNFTs(chainId, contractAddress);

  const setWaitingAndMessage = (waiting, message) => {
    setIsWaiting(waiting);
    setMessage(message);
  };

  const createImageHandler = async (e) => {
    e.preventDefault();
    if (name === '' || description === '') {
      window.alert('Please provide a name and description');
      return;
    }

    try {
      setWaitingAndMessage(true, 'Generating image...');
      // Call AI API to generate a image based on prompt
      const { data, image } = await createImage(description);
      setImage(image);

      setWaitingAndMessage(true, 'Uploading image...');
      // Upload image to IPFS (NFT.Storage)
      const { url } = await uploadImage(data, name, description);
      setURL(url);
      setWaitingAndMessage(false, '');
    } catch (e) {
      console.log('Error - ', e);
    }
  };

  const mintHandler = async () => {
    setWaitingAndMessage(true, 'Waiting for Mint...');
    const signer = await provider.getSigner();
    try {
      const transaction = await contract
        .connect(signer)
        .mint(url, { value: ethers.utils.parseUnits(MINT_FEE, 'ether') });
      const tx = await transaction.wait();
      setTransactionHash(tx.transactionHash);
    } catch (e) {
      console.log('There was an issue while minting - ', e);
    }
    setWaitingAndMessage(false, '');
  };

  return (
    <div>
      {chainId !== 5 && (
        <Banner
          message={
            errorMessage
              ? errorMessage
              : 'Currently the site only works on Goerli testnet. Please switch to Goerli to mint and view NFTs from the collection.'
          }
        />
      )}
      <Navigation />
      <div className="flex justify-center items-center min-h-150 flex-col md:flex-row">
        <div className="flex flex-col justify-center items-start m-6">
          <input
            type="text"
            className="w-80 h-12 m-2 p-2 border bg-gray-200 border-gray-500 rounded-md text-base"
            placeholder="NFT name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-80 h-12 m-2 p-2 border bg-gray-200 border-gray-500 rounded-md text-base"
            placeholder="Write the prompt for your image..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="w-80 h-12 m-2 p-2 bg-gray-800 text-white rounded-md font-medium cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-600"
            onClick={createImageHandler}
          >
            Create image
          </button>
          {image && url && (
            <button
              type="button"
              onClick={mintHandler}
              className="w-80 h-12 m-2 p-2 bg-green-600 text-white rounded-md cursor-pointer transition-all ease-in-out duration-200 hover:bg-green-500 font-bold"
            >
              Mint it :)
            </button>
          )}
          {url && (
            <a
              className="w-80 h-12 m-2 p-2 flex items-center justify-center bg-gray-800 text-white rounded-md font-medium cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-600"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              View NFT Metadata
            </a>
          )}
          {txnHash && (
            <a
              className="w-80 h-12 m-2 p-2 flex items-center justify-center bg-gray-800 text-white rounded-md font-medium cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-600"
              href={`https://goerli.etherscan.io/tx/${txnHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View transaction
            </a>
          )}
        </div>

        <div className="flex justify-center items-center w-128 h-128 m-6 border-2 border-gray-800 rounded-md overflow-hidden">
          {!isWaiting && image && (
            <img
              className="w-full h-full rounded-md border border-gray-800"
              src={image}
              alt="AI generated"
            />
          )}

          {isWaiting && (
            <div className="flex justify-center items-center">
              {/* Add spinner animation */}
              <p className="m-2 text-white">{message}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-10/12 m-auto">
        <NFTGrid
          contractNFTs={contractNFTs}
          contractAddress={contractAddress}
          chainId={chainId}
        ></NFTGrid>
      </div>
    </div>
  );
}

export default App;
