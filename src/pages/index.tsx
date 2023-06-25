import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { BigNumber, ethers } from "ethers";
import contractConfig from "../../contractConfig";
import { ExternalProvider } from "@ethersproject/providers";

interface FormDataProps {
  title: string;
  goalAmount: number | string;
}

interface ProjectDataProps {
  projectId: number;
  creator: string;
  title: string;
  goalAmount: number;
  currentAmount: number;
  reachedGoal: boolean;
}

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

export default function Home() {
  const { address } = useAccount();
  const [contract, setContract] = useState<any>();
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    goalAmount: 0,
  });
  const [projectsArr, setProjectsArr] = useState<ProjectDataProps[]>([]);
  const [value, setValue] = useState<number | string>(0);

  useEffect(() => {
    const gettingContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        const currentProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        console.log(currentProvider);
        const signer = currentProvider.getSigner();
        console.log(signer);
        const contract: any = new ethers.Contract(
          contractConfig.address,
          contractConfig.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
      }
    };
    if (address) {
      gettingContract();
    }
  }, [address]);

  useEffect(() => {
    const gettingProjects = async () => {
      const projectsArr: ProjectDataProps[] = await contract.getProjects();
      console.log(projectsArr);
      setProjectsArr(projectsArr);
    };
    if (contract) {
      gettingProjects();
    }
  }, [contract]);

  const createProject = async () => {
    const goalAmount = ethers.BigNumber.from(formData.goalAmount).mul(
      ethers.BigNumber.from(10).pow(18)
    );
    console.log(formData.title, goalAmount);
    const txn = await contract.createProject(formData.title, goalAmount);
    await txn.wait();
    setFormData({ ...formData, title: "", goalAmount: 0 });
  };

  const contribute = async (projectId: number) => {
    const contributeAmount = ethers.BigNumber.from(value).mul(
      ethers.BigNumber.from(10).pow(18)
    );
    const txn = await contract.contribute(projectId, {
      from: address,
      value: contributeAmount,
    });
    await txn.wait();
  };

  const withdraw = async (projectId: number) => {
    const txn = await contract.withdrawFunds(projectId);
    await txn.wait();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="absolute left-2 top-2">
        <ConnectButton />
      </div>
      <div className="flex flex-col justify-start items-center w-[80%] h-[80%]">
        <span className="font-bold text-[4rem]">Crowdfunding Dapp</span>
        <span className="font-semiboldbold text-[2rem] mt-4">Create Project</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createProject();
          }}
          className="w-[80%] flex flex-row justify-evenly items-center mt-4"
        >
          <input
            type="text"
            className="h-[2rem] rounded-lg text-black px-2"
            placeholder="Title"
            value={formData?.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          ></input>
          <input
            type="number"
            className="h-[2rem] rounded-lg text-black px-2"
            placeholder="Goal Amount in 5ire"
            value={formData?.goalAmount}
            onChange={(e) => {
              setFormData({ ...formData, goalAmount: e.target.value });
            }}
          ></input>
          <button
            type="submit"
            className="h-[2rem] w-[10rem] bg-blue-400 rounded-lg text-black"
          >
            Create Project
          </button>
        </form>
        <div className="flex flex-col justify-start items-center gap-4 mt-20 w-[80%] h-auto">
          {projectsArr?.map((project: ProjectDataProps, index: number) => (
            <div
              key={index}
              className={`${
                project.creator != address
                  ? project.reachedGoal
                    ? "hidden"
                    : "flex"
                  : "flex"
              } flex flex-col justify-start items-start w-full`}
            >
              <div className="flex flex-row justify-evenly items-center w-full">
                <span className="font-bold text-[1.5rem]">{project.title}</span>
                <span className="font-bold text-[1.5rem]">
                  Goal Amount:{" "}
                  {parseFloat(project.goalAmount.toString()) / 10 ** 18}
                </span>
                <span className="font-bold text-[1.5rem]">
                  Current Amount:{" "}
                  {parseFloat(project.currentAmount.toString()) / 10 ** 18}
                </span>
              </div>
              <div className="flex flex-row justify-between items-center w-full mt-4">
                <span className="font-bold text-[1rem]">{project.creator}</span>
                {project.reachedGoal ? (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <button
                      className="h-[2rem] w-[10rem] bg-blue-400 rounded-lg text-black"
                      onClick={() => {
                        withdraw(project.projectId);
                      }}
                    >
                      Withdraw
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <input
                      className="h-[2rem] w-[8rem] rounded-lg text-black px-2"
                      placeholder="Contribute"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    ></input>
                    <button
                      className="h-[2rem] w-[10rem] bg-blue-400 rounded-lg text-black"
                      onClick={() => {
                        contribute(project.projectId);
                      }}
                    >
                      Contribute
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
