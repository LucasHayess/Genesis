import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { toast } from "react-toastify";
import { backProject } from "../services/blockchain";

export default function BackProject({ project }) {
  const [backModal] = useGlobalState("backModal");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    await backProject(project.id, amount);
    toast.success("Backed project successfully");
    setGlobalState("backModal", "scale-0");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 tranfrom transition-transform duration-300 ${backModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">{project?.title}</p>
            <button
              className="border-0 bg-transparent outline-none"
              onClick={() => {
                setGlobalState("backModal", "scale-0");
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
                  project?.imageURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcgWG-minr6Ww0IxPOejSxFx3ffjWR1V34Q&s"
                }
                alt={project?.title}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="number"
              name="amount"
              value={amount}
              step={0.01}
              min={0.01}
              placeholder="Amount (ETH)"
              required
              className="w-full block bg-transparent border-none text-sm text-slate-500  focus:ring-0 focus:outline-none"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Back Project
          </button>
        </form>
      </div>
    </div>
  );
}
