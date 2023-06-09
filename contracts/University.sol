/* 
* Add/Enroll Bulk students
* Remove/Delist students
* Student verification/Check
*/
// university = await University.deployed()
//university.getStudentKey("s1",21,"s121")

pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

contract University{

    // string universityName;
    address universityAdmin;
    // StudentData[] memory studentsArray;
    struct StudentData{
        string name;
        uint age;
        string roll;
    }
    

    mapping(bytes=>bool) public currentStudents;

    constructor() public{
        universityAdmin=msg.sender;
    }

    function getStudentKey(string memory _name, uint _age, string memory _roll) public view returns (bytes memory){
        StudentData memory _student = StudentData(_name, _age, _roll);
        bytes32 _encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory _sname = bytes(_student.name);
        uint  _sage = _student.age;
        bytes memory _sroll = bytes(_student.roll);
        bytes memory _ihash1 = abi.encodePacked(_sname, _sage);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_sroll);
        bytes memory _temp=abi.encodePacked(_encryptedAdmin, _ihash2);
        return _ihash1;//change
    }

    function demo() public view returns(string memory){
        return "Hello World";
    }
    
    function addStudent(string memory _name, uint _age, string memory _roll) public {
        StudentData memory _student = StudentData(_name, _age, _roll);
        bytes32 _encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory _sname = bytes(_student.name);
        uint  _sage = _student.age;
        bytes memory _sroll = bytes(_student.roll);
        bytes memory _ihash1 = abi.encodePacked(_sname, _sage);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_sroll);
        bytes memory _key=abi.encodePacked(_encryptedAdmin, _ihash2);
        currentStudents[_key] = true;
    }

    function verifyStudent(string memory _name, uint _age, string memory _roll) public view returns (bool){
        StudentData memory _student = StudentData(_name, _age, _roll);
        bytes32 _encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory _sname = bytes(_student.name);
        uint  _sage = _student.age;
        bytes memory _sroll = bytes(_student.roll);
        bytes memory _ihash1 = abi.encodePacked(_sname, _sage);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_sroll);
        bytes memory _key=abi.encodePacked(_encryptedAdmin, _ihash2);
        return currentStudents[_key];
    }

    function removeStudent(string memory _name, uint _age, string memory _roll) public {
        StudentData memory _student = StudentData(_name, _age, _roll);
        bytes32 _encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory sname = bytes(_student.name);
        uint sage = _student.age;
        bytes memory _sroll = bytes(_student.roll);
        bytes memory _ihash1 = abi.encodePacked(sname,sage);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_sroll);
        bytes memory _key=abi.encodePacked(_encryptedAdmin, _ihash2);
        delete(currentStudents[_key]);
    } 

    function verifyStudentFromKeyAndId(bytes memory _key, string memory _id) public view returns (bool){
        bytes32 _encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory _bytesID = bytes(_id);
        // bytes memory _ihash1 = abi.encodePacked(_sname, _sage);
        bytes memory _ihash2 = abi.encodePacked(_key,_bytesID);
        bytes memory _checkKey=abi.encodePacked(_encryptedAdmin, _ihash2);
        return currentStudents[_checkKey];
    }
}