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
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    name: "getStudentKey",
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
    inputs: [],
    name: "demo",
    outputs: [
      {
        internalType: "string",
        name: "",
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
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes",
        name: "_key",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    name: "verifyStudentFromKeyAndId",
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
];
const UNIVERSITY_ADDRESS = "0x8ae570F349cFbfbf4660dD9975D1D126461A6A66";

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
  const key = await studentList.methods.getStudentKey(name, age, roll).call();
  return key;
}

//Change
async function verifyStudentFromKeyAndId(key, id) {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const studentList = new web3.eth.Contract(UNIVERSITY_ABI, UNIVERSITY_ADDRESS);
  const verificationStatus = await studentList.methods
    .verifyStudentFromKeyAndId(key, id)
    .call();
  return verificationStatus;
}

export { verifyStudentFromKeyAndId, removeStudent, verifyStudent, addStudent };
