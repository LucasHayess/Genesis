import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { truncate, daysRemaining } from "../store";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";

export default function Projects({ projects }) {
  const [count] = useState(1);
  const [end, setEnd] = useState(1);
  const [collection, setCollection] = useState([]);

  const getCollections = () => projects.slice(0, end);

  useEffect(() => {
    setCollection(getCollections());
  }, [end, projects]);

  return (
    <div className="flex flex-col px-6 pb-7">
      <div className="flex justify-center items-center flex-wrap">
        {collection.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {projects.length > 0 && projects.length > collection.length ? (
        <div className="flex items-center justify-center my-5">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md cursor-pointer hover:bg-green-700"
            onClick={() => {
              setEnd(end + count);
            }}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}

const ProjectCard = ({ project }) => (
  <div className="rounded-lg shadow-lg bg-white w-64 m-4">
    <Link to={"/projects/" + project.id}>
      <img
        src={project.imageURL}
        alt={project.title}
        className="rounded-lg h-64 w-full object-cover"
      />
    </Link>
    <div className="p-4">
      <h4 className="pb-2">{project.title}</h4>
      <div className="flex flex-col">
        <div className="flex justify-between mb-2">
          <Identicons
            string={project.owner}
            size={15}
            className="rounded-full shadow-md"
          />
          <small className="text-gray-700">
            {truncate(project.owner, 4, 4, 11)}
          </small>
        </div>
        <small className="text-gray-700">
          {new Date().getTime() > Number(project.expiresAt + "000")
            ? "Expired"
            : daysRemaining(project.expiresAt)}{" "}
          left
        </small>
      </div>
      <div className="w-full bg-gray-300 overflow-hidden">
        <div
          className="bg-green-600  p-0.5 rounded-l-full 
        "
          style={{ width: `${(project.raised / project.cost) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center font-body mt-1 mb-2 text-gray-700">
        <small>{project.raised} ETH Raised</small>
        <small className="flex items-center justify-start">
          <FaEthereum />
          <span>{project.cost} ETH</span>
        </small>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500 font-bold">
        <small>
          {project?.backers} Backer{project?.backers == 1 ? "" : "s"}
        </small>
        {project?.status == 0 ? (
          <small className="text-gray-500">Open</small>
        ) : project?.status == 1 ? (
          <small className="text-green-500">Accepted</small>
        ) : project?.status == 2 ? (
          <small className="text-gray-500">Reverted</small>
        ) : project?.status == 3 ? (
          <small className="text-red-500">Delete</small>
        ) : (
          <small className="text-orange-500">Paid</small>
        )}
      </div>
    </div>
  </div>
);
