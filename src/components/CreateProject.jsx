import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { createProject } from "../services/blockchain";
import { toast } from "react-toastify";

export default function Createproject() {
  const [createModal] = useGlobalState("createModal");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr);
    return dateObj / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !cost || !date || !imageURL || !description) return;

    const params = {
      title,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
      description,
    };

    await createProject(params);
    toast.success("Project created successfully,will reflect in 30sec");
    onClose();
  };

  const reset = () => {
    setCost("");
    setDate("");
    setDescription("");
    setImageURL("");
    setTitle("");
  };

  const onClose = () => {
    setGlobalState("createModal", "scale-0");
    reset();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 tranfrom transition-transform duration-300 ${createModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Add Project</p>
            <button
              className="border-0 bg-transparent outline-none"
              onClick={() => {
                setGlobalState("createModal", "scale-0");
                onClose();
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
                  imageURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcgWG-minr6Ww0IxPOejSxFx3ffjWR1V34Q&s"
                }
                alt="ai robot"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full block bg-transparent border-none text-sm text-slate-500  focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="number"
              name="amount"
              step={0.01}
              min={0.01}
              placeholder="Amount (ETH)"
              required
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full block bg-transparent border-none text-sm text-slate-500  focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="date"
              name="date"
              placeholder="Expirys"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full block bg-transparent border-none text-sm text-slate-500  focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="url"
              name="imageURL"
              placeholder="Image URL"
              required
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full block bg-transparent border-none text-sm text-slate-500  focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              required
              className="w-full block bg-transparent border-none text-sm text-slate-500  focus:ring-0 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
}
