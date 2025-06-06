import { ethers } from "ethers";
import { getGlobalState, setGlobalState } from "../store";
import abi from "../contracts/out/Genesis.sol/Genesis.json";
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const { ethereum } = window;
const contractAddress = address;
const contractAbi = abi.abi;

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    reportError(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      const newAccounts = await ethereum.request({ method: "eth_accounts" });
      setGlobalState("connectedAccount", newAccounts[0]?.toLowerCase());
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  }
};

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEthereumContract();
    cost = ethers.utils.parseEther(cost);
    await contract.createProject(title, description, imageURL, cost, expiresAt);
  } catch (error) {
    reportError(error);
  }
};

const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEthereumContract();
    const projects = await contract.getProjects();
    const status = await contract.stats();
    setGlobalState("status", structureStats(status));
    setGlobalState("projects", structuredProjects(projects));
  } catch (error) {
    reportError(error);
  }
};

const loadProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEthereumContract();
    const project = await contract.getProject(id);

    setGlobalState("project", structuredProjects([project])[0]);
  } catch (error) {
    reportError(error);
  }
};

const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      backers: project.backers.toNumber(),
      status: project.status,
    }))
    .reverse();

const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const structureStats = (stats) => ({
  totalProjects: stats.totalProjects.toNumber(),
  totalBacking: stats.totalBacking.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
});

const updateProject = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEthereumContract();
    await contract.updateProject(id, title, description, imageURL, expiresAt);
  } catch (error) {
    reportError(error);
  }
};

const deleteProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEthereumContract();
    await contract.deleteProject(id);
  } catch (error) {
    reportError(error);
  }
};

const backProject = async (id, amount) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();
    amount = ethers.utils.parseEther(amount);

    await contract.backProject(id, {
      from: connectedAccount,
      value: amount._hex,
    });
  } catch (error) {
    reportError(error);
  }
};

const structuredBackers = (backers) =>
  backers
    .map((backer) => ({
      owner: backer.owner.toLowerCase(),
      refunded: backer.refunded,
      timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
      contribution: parseInt(backer.contribution._hex) / 10 ** 18,
    }))
    .reverse();

const getBackers = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEthereumContract();
    let backers = await contract.getBackers(id);

    setGlobalState("backers", structuredBackers(backers));
  } catch (error) {
    reportError(error);
  }
};

const payoutProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();

    await contract.payOutProject(id, {
      from: connectedAccount,
    });
  } catch (error) {
    reportError(error);
  }
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export {
  connectWallet,
  isWallectConnected,
  getEthereumContract,
  createProject,
  loadProjects,
  loadProject,
  updateProject,
  deleteProject,
  backProject,
  getBackers,
  payoutProject,
};
