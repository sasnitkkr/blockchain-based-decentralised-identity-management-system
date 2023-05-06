import Web3 from "web3";

const UNIVERSITY_ABI = [
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
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "currentStudents",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_roll",
        type: "string",
      },
    ],
    name: "addStudent",
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
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_roll",
        type: "string",
      },
    ],
    name: "verifyStudent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_roll",
        type: "string",
      },
    ],
    name: "removeStudent",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const UNIVERSITY_ADDRESS = "0xE40929a05C8211915D21140fC380934E0Ed236ec";

// gas value: 7920027

async function removeStudent(name, age, roll) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const studentList = new web3.eth.Contract(UNIVERSITY_ABI, UNIVERSITY_ADDRESS);
  const gas = await studentList.methods
    .removeStudent(name, age, roll)
    .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await studentList.methods
    .removeStudent(name, age, roll)
    .send({ from: account, gas });
}

async function verifyStudent(name, age, roll) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const studentList = new web3.eth.Contract(UNIVERSITY_ABI, UNIVERSITY_ADDRESS);
  const verificationStatus = await studentList.methods
    .verifyStudent(name, age, roll)
    .call();
  console.log(verificationStatus);
  return verificationStatus;
}

async function addStudent(name, age, roll) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const studentList = new web3.eth.Contract(UNIVERSITY_ABI, UNIVERSITY_ADDRESS);
  const gas = await studentList.methods
    .addStudent(name, age, roll)
    .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  console.log(account);
  await studentList.methods
    .addStudent(name, age, roll)
    .send({ from: account, gas });
}

export { removeStudent, verifyStudent, addStudent };
