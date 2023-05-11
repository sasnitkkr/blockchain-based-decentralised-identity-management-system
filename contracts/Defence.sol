/* 
* Add/Enroll Bulk employee
* Remove/Delist employee
* Employee verification/Check
*/

// defence = await Defence.deployed()
// defence.verifyEmployee("s1",21,"s121")

pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

contract Defence{

    enum Rank { LIEUTINANT, COLONEL, MAJOR_GENERAL}

    struct Employee{
        string name;
        Rank empRank;
        string empId;
    }
    
    address admin;
    mapping(bytes=>Employee) public currentEmployees;

    constructor() public{
        admin=msg.sender;
    }


    function addEmployee(string memory _empName,Rank _empRank, string memory _empId) public {
        Employee memory _employee = Employee(_empName, _empRank, _empId);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eName = bytes(_employee.name);
        Rank eRank = _employee.empRank;
        bytes memory _eId = bytes(_employee.empId);
        bytes memory _ihash1 = abi.encodePacked(_eName, eRank);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_eId);
        bytes memory _key = abi.encodePacked(encryptedAdmin, _ihash2);
        currentEmployees[_key] = _employee;
    }

    function verifyEmployee(string memory _empName,Rank _empRank, string memory _empId) public view returns (Employee memory){
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eName = bytes(_empName);
        Rank eRank = _empRank;
        bytes memory _eId = bytes(_empId);
        bytes memory _ihash1 = abi.encodePacked(_eName, eRank);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_eId);
        bytes memory _key = abi.encodePacked(encryptedAdmin, _ihash2);
        return currentEmployees[_key];
    }

    function removeEmployee(string memory _empName,Rank _empRank, string memory _empId) public {
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eName = bytes(_empName);
        Rank eRank = _empRank;
        bytes memory _eId = bytes(_empId);
        bytes memory _ihash1 = abi.encodePacked(_eName, eRank);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_eId);
        bytes memory _key = abi.encodePacked(encryptedAdmin, _ihash2);
        delete(currentEmployees[_key]);
    } 

    function getEmployeeKey(string memory _empName, Rank _empRank) public view returns(bytes memory){
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eName = bytes(_empName);
        Rank eRank = _empRank;
        bytes memory _ihash= abi.encodePacked(_eName, eRank);
        return _ihash;
    }

    function verifyEmployeeFromKeyAndId(bytes memory _empKey, string memory _empId) public view returns (Employee memory){
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_empId);
        bytes memory _ihash2 = abi.encodePacked(_empKey,_eId);
        bytes memory _key = abi.encodePacked(encryptedAdmin, _ihash2);
        return currentEmployees[_key];
    }

    
}