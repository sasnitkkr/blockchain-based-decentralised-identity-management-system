/* 
* Add/Enroll Bulk employee
* Remove/Delist employee
* Employee verification/Check
*/

pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

contract Defence{

    enum Rank { LIEUTINANT, COLONEL, MAJOR_GENERAL}

    struct Employee{
        string empId;
        Rank empRank;
    }
    
    address admin;
    mapping(string=>Employee) public currentEmployees;

    constructor() public{
        admin=msg.sender;
    }


    function addEmployee(string memory _empId, Rank _empRank) public {
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        string memory _key = string(abi.encodePacked(_ihash, encryptedAdmin));
        currentEmployees[_key] = _employee;
    }

    function verifyEmployee(string memory _empId, Rank _empRank) public view returns (Employee memory){
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        string memory _key = string(abi.encodePacked(_ihash, encryptedAdmin));
        return currentEmployees[_key];
    }

    function removeEmployee(string memory _empId, Rank _empRank) public {
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        string memory _key = string(abi.encodePacked(_ihash, encryptedAdmin));
        delete(currentEmployees[_key]);
    } 
}