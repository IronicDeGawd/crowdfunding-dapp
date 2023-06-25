interface ContractConfigProps {
  address: string;
  abi: any;
}

const contractConfig: ContractConfigProps = {
  address: "0x217F7CE5D8d9C0Ee1b66627D547647930d59f508",
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_projectId",
          type: "uint256",
        },
      ],
      name: "contribute",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_goalAmount",
          type: "uint256",
        },
      ],
      name: "createProject",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getProjects",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "projectId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "goalAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "currentAmount",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "reachedGoal",
              type: "bool",
            },
          ],
          internalType: "struct CrowdFunding.Project[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "idToProjects",
      outputs: [
        {
          internalType: "uint256",
          name: "projectId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "creator",
          type: "address",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "goalAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "currentAmount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "reachedGoal",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "projectCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_projectId",
          type: "uint256",
        },
      ],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export default contractConfig;
