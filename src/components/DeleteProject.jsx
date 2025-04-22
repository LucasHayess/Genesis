import React from "react";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { deleteProject } from "../services/blockchain";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BackProject({ project }) {
  const [deleteModal] = useGlobalState("deleteModal");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await deleteProject(project?.id);
    toast.success("Project delete successfully,will reflect in 30sec");
    setGlobalState("deleteModal", "scale-0");
    navigate("/");
  };
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 tranfrom transition-transform duration-300 ${deleteModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{project.title}</p>
            <button
              className="border-0 bg-transparent outline-none"
              onClick={() => {
                setGlobalState("deleteModal", "scale-0");
              }}
              type="button"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center justify-center mt-5">
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              <img
                src={
                  project.imageURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcgWG-minr6Ww0IxPOejSxFx3ffjWR1V34Q&s"
                }
                alt="ai robot"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>

          <div className=" flex flex-col items-center mt-5">
            <p className="font-bold">Are you sure?</p>
            <p className="text-sm text-red-600">it's irreversible</p>
          </div>

          <button
            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-red-700 mt-5"
            onClick={handleSubmit}
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}
