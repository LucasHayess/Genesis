import { TbBusinessplan } from "react-icons/tb";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/blockchain";
import { truncate, useGlobalState } from "../store";

export default function Header() {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <header className="flex justify-between items-center p-5 bg-white text-gray-500 hover:text-gray-700 shadow-lg fixed top-0 left-0 right-0">
      <Link
        to="/"
        className="flex justify-start items-center text-xl text-black space-x-1 cursor-pointer"
      >
        <span>Genesis</span>
        <TbBusinessplan />
      </Link>
      {connectedAccount ? (
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md cursor-pointer hover:bg-green-700"
            onClick={connectWallet}
          >
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        </div>
      ) : (
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md cursor-pointer hover:bg-green-700"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  );
}
