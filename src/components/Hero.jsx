import React from "react";
import { useGlobalState, setGlobalState } from "../store";

export default function Hero() {
  const [status] = useGlobalState("status");
  return (
    <div className="py-24 px-6 text-center bg-white text-gray-800">
      <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
        <span className="capitalize">Bring creative projects to life on</span>
        <br />
        <span className="uppercase text-green-600">genesis.</span>
      </h1>
      <div className="flex justify-center items-center space-x-2">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700"
          onClick={() => {
            setGlobalState("createModal", "scale-100");
          }}
        >
          Add project
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-white text-green-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md border border-green-700 hover:bg-green-700 hover:text-white"
        >
          Back project
        </button>
      </div>

      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col h-20 justify-center items-center border w-full shadow-md">
          <span className="text-lg font-bold text-green-900 leading-5">
            {status?.totalProjects || 0}
          </span>
          <span>Projects</span>
        </div>
        <div className="flex flex-col h-20 justify-center items-center border w-full shadow-md">
          <span className="text-lg font-bold text-green-900 leading-5">
            {status?.totalBacking || 0}
          </span>
          <span>Backings</span>
        </div>
        <div className="flex flex-col h-20 justify-center items-center border w-full shadow-md">
          <span className="text-lg font-bold text-green-900 leading-5">
            {status?.totalDonations || 0} ETH
          </span>
          <span>Donated</span>
        </div>
      </div>
    </div>
  );
}
