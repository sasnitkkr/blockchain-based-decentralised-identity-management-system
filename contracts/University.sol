/* 
* Add/Enroll Bulk students
* Remove/Delist students
* Student verification/Check
*/

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
    

    mapping(string=>bool) public currentStudents;

    constructor() public{
        // universityName=uniName;
        // StudentData memory _firstStudent = StudentData("First Student", 1, "1");
        // StudentData memory _studentArray = new StudentData[];
        // StudentData[] memory _studentArray=[_firstStudent];
        // _studentArray.push(_firstStudent); _studentArray
        // StudentData[] memory studentsArray = [StudentData("First Student", 1, "1")];
        // StudentData[1] memory studentsArray;
        // StudentData[] memory studentsArray=new StudentData[](1);
        // studentsArray[0]=StudentData("First Student", 1, "1");
        // studentsArray.push(StudentData("First Student", 1, "1"));
        // StudentData memory student = StudentData("First Student", 1, "1");
        // addStudent(student);
        universityAdmin=msg.sender;
    }

    // modifier restricted(){
    //     require(msg.sender == universityAdmin);
    //     _;
    // }

    // function addStudents(StudentData[] memory students ) public restricted{
    //     uint i=0;
    //     for(i=0;i<students.length;i++){
    //         bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
    //         bytes memory sname = bytes(students[i].name);
    //         uint sage = students[i].age;
    //         bytes memory sroll = bytes(students[i].roll);
    //         bytes memory ihash1 = abi.encodePacked(sname,sage);
    //         bytes memory ihash2 = abi.encodePacked(ihash1,sroll);
    //         string memory key = string(abi.encodePacked(encryptedAdmin, ihash2));
    //         currentStudents[key] = true;
    //     }
    // }
    function addStudent(string memory _name, uint _age, string memory _roll) public{
        StudentData memory _student = StudentData(_name, _age, _roll);
        bytes32 _encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory _sname = bytes(_student.name);
        uint  _sage = _student.age;
        bytes memory _sroll = bytes(_student.roll);
        bytes memory _ihash1 = abi.encodePacked(_sname, _sage);
        bytes memory _ihash2 = abi.encodePacked(_ihash1,_sroll);
        string memory _key = string(abi.encodePacked(_encryptedAdmin, _ihash2));
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
        string memory _key = string(abi.encodePacked(_encryptedAdmin, _ihash2));
        return currentStudents[_key];
    }

    function removeStudent(string memory _name, uint _age, string memory _roll) public {
        StudentData memory _student = StudentData(_name, _age, _roll);
        bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory sname = bytes(_student.name);
        uint sage = _student.age;
        bytes memory sroll = bytes(_student.roll);
        bytes memory ihash1 = abi.encodePacked(sname,sage);
        bytes memory ihash2 = abi.encodePacked(ihash1,sroll);
        string memory key = string(abi.encodePacked(encryptedAdmin, ihash2));
        delete(currentStudents[key]);
    } 
}