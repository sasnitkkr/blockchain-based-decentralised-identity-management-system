/* 
* Add/Enroll Bulk employee
* Remove/Delist employee
* Employee verification/Check
*/

pragma solidity 0.8.18;
pragma experimental ABIEncoderV2;

contract Defence{

    enum Rank { LIEUTINANT, COLONEL, MAJOR_GENERAL}

    struct Employee{
        string empId;
        Rank empRank;
    }
    
    address admin;
    mapping(string=>Employee) public currentEmployees;

    constructor(){
        admin=msg.sender;
    }

    modifier restricted(){
        require(msg.sender == admin);
        _;
    }

    function addEmployees(Employee[] memory employee) public restricted{
        uint i=0;
        for(i=0; i<employee.length; i++){
            bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
            bytes memory empId = bytes(employee[i].empId);
            Rank empRank = employee[i].empRank;
            bytes memory ihash = abi.encodePacked(empId,empRank);
            string memory key = string(abi.encodePacked(ihash, encryptedAdmin));
            currentEmployees[key] = employee[i];
        }
    }

    function verifyEmployee(Employee memory employee) public view returns (Employee memory){
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory empId = bytes(employee.empId);
        Rank empRank = employee.empRank;
        bytes memory ihash = abi.encodePacked(empId,empRank);
        string memory key = string(abi.encodePacked(ihash, encryptedAdmin));
        return currentEmployees[key];
    }

    function removeEmployee(Employee memory employee) public restricted{
        bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
        bytes memory empId = bytes(employee.empId);
        Rank empRank = employee.empRank;
        bytes memory ihash = abi.encodePacked(empId,empRank);
        string memory key = string(abi.encodePacked(ihash, encryptedAdmin));
        delete(currentEmployees[key]);
    } 
}