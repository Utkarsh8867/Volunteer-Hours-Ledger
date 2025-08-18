import React from "react";

const WalletConnection = ({ account, connectWallet }) => {
  return (
    <div className="mb-6 text-center">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-gray-700 font-medium">Connected Account: {account}</p>
      )}
    </div>
  );
};

export default WalletConnection;




