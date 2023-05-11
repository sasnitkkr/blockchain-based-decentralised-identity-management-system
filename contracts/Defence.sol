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
        string empId;
        Rank empRank;
    }
    
    address admin;
    mapping(bytes=>Employee) public currentEmployees;

    constructor() public{
        admin=msg.sender;
    }


    function addEmployee(string memory _empId, Rank _empRank) public {
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        // bytes memory _temp=abi.encodePacked(_encryptedAdmin, _ihash2);
        bytes memory _key = abi.encodePacked(_ihash, encryptedAdmin);
        currentEmployees[_key] = _employee;
    }

    function getEmployeeKey(string memory _empId, Rank _empRank) public view returns(bytes memory){
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        // bytes memory _temp=abi.encodePacked(_encryptedAdmin, _ihash2);
        bytes memory _key = abi.encodePacked(_ihash, encryptedAdmin);
        return _key;
    }

    function dummy(Rank _empRank) public view returns(bytes memory){
        bytes memory byteEmpRank = bytes(_empRank);
        // bytes memory _key = abi.encodePacked(_empRank, _empRank);
        return byteEmpRank;
    }

    function verifyEmployee(string memory _empId, Rank _empRank) public view returns (Employee memory){
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        // string memory _key = string(abi.encodePacked(_ihash, encryptedAdmin));
        bytes memory _key = abi.encodePacked(_ihash, encryptedAdmin);
        return currentEmployees[_key];
    }

    function removeEmployee(string memory _empId, Rank _empRank) public {
        Employee memory _employee = Employee(_empId, _empRank);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory _eId = bytes(_employee.empId);
        Rank eRank = _employee.empRank;
        bytes memory _ihash = abi.encodePacked(_eId, eRank);
        // string memory _key = string(abi.encodePacked(_ihash, encryptedAdmin));
        bytes memory _key = abi.encodePacked(_ihash, encryptedAdmin);
        delete(currentEmployees[_key]);
    } 
}