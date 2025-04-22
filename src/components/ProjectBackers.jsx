import React from "react";
import { FaEthereum } from "react-icons/fa";
import Identicons from "react-identicons";
import { truncate } from "../store";
import Moment from "react-moment";

export default function ProjectBackers({ backers }) {
  return (
    <div className="flex flex-col justify-center items-center px-6 mb-5">
      <div className="max-h-[calc(100vh_-_30rem)] overflow-y-auto shadow-md rounded-md w-full md:w-2/3">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Backers
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Donations
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Refunded
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {backers.map((backer, i) => (
              <Backer key={i} backer={backer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Backer = ({ backer, i }) => (
  <tr key={i} className="border-b border-gray-200">
    <th className="text-sm font-light px-6 py-4 text-left whitespace-nowrap">
      <div className="flex justify-start items-center space-x-1">
        <Identicons
          string={backer?.owner}
          className="rounded-full shadow-md h-10 w-10 object-contain"
          size={25}
        />
        <span>{truncate(backer?.owner, 4, 4, 11)}</span>
      </div>
    </th>

    <th className="text-sm font-light px-6 py-4 text-left whitespace-nowrap">
      <small className="flex justify-start items-center">
        <FaEthereum />
        <span className="text-gray-700 font-medium">
          {backer.contribution} ETH
        </span>
      </small>
    </th>

    <th className="text-sm font-light px-6 py-4 text-left whitespace-nowrap">
      <div className="flex justify-start items-center space-x-1">
        {backer.refunded ? "Yes" : "No"}
      </div>
    </th>

    <th className="text-sm font-light px-6 py-4 text-left whitespace-nowrap">
      <div className="flex justify-start items-center space-x-1">
        {<Moment fromNow>{backer.timestamp}</Moment>}
      </div>
    </th>
  </tr>
);
