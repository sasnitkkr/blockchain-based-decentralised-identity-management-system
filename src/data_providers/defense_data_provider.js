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
        name: "empId",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "empRank",
        type: "uint8",
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
        name: "_empId",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
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
        name: "_empId",
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
        internalType: "string",
        name: "_empId",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
      },
    ],
    name: "verifyEmployee",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "empId",
            type: "string",
          },
          {
            internalType: "enum Defence.Rank",
            name: "empRank",
            type: "uint8",
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
        name: "_empId",
        type: "string",
      },
      {
        internalType: "enum Defence.Rank",
        name: "_empRank",
        type: "uint8",
      },
    ],
    name: "removeEmployee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const DEFENCE_ADDRESS = "0xae7A3601A2844EBc2E738c8e777FaD8cEC9CC12D";

// gas value: 7920027
// DEFENCE_ADDRESS

async function removeEmployee(empId, empRank) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const gas = await employeeList.methods
    .removeEmployee(empId, empRank)
    .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await employeeList.methods
    .removeEmployee(empId, empRank)
    .send({ from: account, gas });
}

async function verifyEmployee(empId, empRank) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const verificationStatus = await employeeList.methods
    .verifyEmployee(empId, empRank)
    .call();
  console.log(verificationStatus);
  return verificationStatus;
}
// Change
async function verifyEmployeeFromKeyAndId(key) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const empData = await employeeList.methods.currentEmployees(key).call();
  // console.log(verificationStatus);
  return empData;
}

async function addEmployee(empId, empRank) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const employeeList = new web3.eth.Contract(DEFENCE_ABI, DEFENCE_ADDRESS);
  const gas = await employeeList.methods
    .addEmployee(empId, empRank)
    .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  console.log(account);
  await employeeList.methods
    .addEmployee(empId, empRank)
    .send({ from: account, gas });
  const key = await employeeList.methods.getEmployeeKey(empId, empRank).call();
  return key;
}

export { verifyEmployeeFromKeyAndId, removeEmployee, verifyEmployee, addEmployee };
