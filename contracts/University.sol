/* 
* Add/Enroll Bulk students
* Remove/Delist students
* Student verification/Check
*/

pragma solidity 0.8.18;
pragma experimental ABIEncoderV2;

contract University{

    string universityName;
    address universityAdmin;

    struct StudentData{
        string name;
        uint age;
        string roll;
    }
    

    mapping(string=>bool) public currentStudents;

    constructor(string memory uniName){
        universityName=uniName;
        universityAdmin=msg.sender;
    }

    modifier restricted(){
        require(msg.sender == universityAdmin);
        _;
    }

    function addStudents(StudentData[] memory students ) public restricted{
        uint i=0;
        for(i=0;i<students.length;i++){
            bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
            bytes memory sname = bytes(students[i].name);
            uint sage = students[i].age;
            bytes memory sroll = bytes(students[i].roll);
            bytes memory ihash1 = abi.encodePacked(sname,sage);
            bytes memory ihash2 = abi.encodePacked(ihash1,sroll);
            string memory key = string(abi.encodePacked(encryptedAdmin, ihash2));
            currentStudents[key] = true;
        }
    }

    function verifyStudent(StudentData memory student) public view returns (bool){
        bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory sname = bytes(student.name);
        uint sage = student.age;
        bytes memory sroll = bytes(student.roll);
        bytes memory ihash1 = abi.encodePacked(sname,sage);
        bytes memory ihash2 = abi.encodePacked(ihash1,sroll);
        string memory key = string(abi.encodePacked(encryptedAdmin, ihash2));
        return currentStudents[key];
    }

    function removeStudent(StudentData memory student) public restricted{
        bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory sname = bytes(student.name);
        uint sage = student.age;
        bytes memory sroll = bytes(student.roll);
        bytes memory ihash1 = abi.encodePacked(sname,sage);
        bytes memory ihash2 = abi.encodePacked(ihash1,sroll);
        string memory key = string(abi.encodePacked(encryptedAdmin, ihash2));
        delete(currentStudents[key]);
    } 
}