import useEthereumSetup from '../hooks/useEthereum';

const Navigation = () => {
  const { account, requestAccount } = useEthereumSetup();

  return (
    <nav className="grid grid-cols-2 items-center">
      <div className="flex justify-center items-center p-5">
        <h1 className="text-gray-300 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
          AI NFT Generator
        </h1>
      </div>

      {account ? (
        <button
          type="button"
          className="w-44 h-12 mx-auto bg-gray-700 text-white rounded-md font-play font-semibold text-base cursor-pointer transition-all ease-in-out duration-200 hover:bg-blue-900"
        >
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className="w-44 h-12 mx-auto bg-gray-700 text-white rounded-md font-play font-semibold text-base cursor-pointer transition-all ease-in-out duration-200 hover:bg-blue-900"
          onClick={requestAccount}
        >
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
