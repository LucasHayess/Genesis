import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import AddButton from "../components/AddButton";
import Createproject from "../components/CreateProject";
import { loadProjects } from "../services/blockchain";
import { useGlobalState } from "../store";

export default function Home() {
  useEffect(() => {
    const fetchProjects = async () => {
      await loadProjects();
    };
    fetchProjects();
  }, []);

  const [projects] = useGlobalState("projects");
  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <Createproject />
      <AddButton />
    </>
  );
}
