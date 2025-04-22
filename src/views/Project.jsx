import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import ProjectBackers from "../components/ProjectBackers";
import UpdateProject from "../components/UpdateProject";
import BackProject from "../components/BackProject";
import DeleteProject from "../components/DeleteProject";
import { getBackers, loadProject } from "../services/blockchain";
import { useGlobalState } from "../store";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [project] = useGlobalState("project");
  const [backers] = useGlobalState("backers");
  useEffect(() => {
    const fetchProject = async () => {
      await loadProject(id);
      await getBackers(id);
      setLoaded(true);
    };
    fetchProject();
  }, [id]);
  return (
    <>
      {loaded ? (
        <>
          <ProductDetails project={project} />
          <ProjectBackers backers={backers} />
          <UpdateProject project={project} />
          <BackProject project={project} />
          <DeleteProject project={project} />
        </>
      ) : null}
    </>
  );
}
