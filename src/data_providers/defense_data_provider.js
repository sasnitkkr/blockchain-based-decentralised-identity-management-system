import Web3 from "web3";

const DEFENCE_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "currentEmployees",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "empRank",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "empId",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_empName",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_empId",
        type: "string",
      },
    ],
    name: "addEmployee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_empName",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_empId",
        type: "string",
      },
    ],
    name: "verifyEmployee",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "enum Defence.Rank",
            name: "empRank",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "empId",
            type: "string",
          },
        ],
        internalType: "struct Defence.Employee",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_empName",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_empId",
        type: "string",
      },
    ],
    name: "removeEmployee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_empName",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
      },
    ],
    name: "getEmployeeKey",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes",
        name: "_empKey",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "_empId",
        type: "string",
      },
    ],
    name: "verifyEmployeeFromKeyAndId",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "enum Defence.Rank",
            name: "empRank",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "empId",
            type: "string",
          },
        ],
        internalType: "struct Defence.Employee",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const DEFENCE_ADDRESS = "0x8d2d9932b613eC78779e45659fC2E5d2D699bA25";

// gas value: 7920027
// DEFENCE_ADDRESS

async function removeEmployee(empName, empRank, empId) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const gas = await employeeList.methods
    .removeEmployee(empName, empRank, empId)
    .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await employeeList.methods
    .removeEmployee(empName, empRank, empId)
    .send({ from: account, gas });
}

async function verifyEmployee(empName, empRank, empId) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const verificationStatus = await employeeList.methods
    .verifyEmployee(empName, empRank, empId)
    .call();
  console.log(verificationStatus);
  return verificationStatus;
}
// Change
async function verifyEmployeeFromKeyAndId(key, id) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const empData = await employeeList.methods
    .verifyEmployeeFromKeyAndId(key, id)
    .call();
  // console.log(verificationStatus);
  return empData;
}

async function addEmployee(empName, empRank, empId) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const gas = await employeeList.methods
    .addEmployee(empName, empRank, empId)
    .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  console.log(account);
  await employeeList.methods
    .addEmployee(empName, empRank, empId)
    .send({ from: account, gas });
  const key = await employeeList.methods
    .getEmployeeKey(empName, empRank)
    .call();
  return key;
}

export {
  verifyEmployeeFromKeyAndId,
  removeEmployee,
  verifyEmployee,
  addEmployee,
};
