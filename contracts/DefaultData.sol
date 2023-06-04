// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DataContract {
    address admin;

    struct User {
        address addr;
        UserType userType;
    }

    struct University {
        address addr; // university address
        string uniName; // university name
        address[] colleges; // addresses of the affiliated colleges
    }

    struct College {
        address addr; // college address
        string clgName; // college name
        address uniAddr; // parent university address
        address[] courses; // addresses of the courses
    }

    struct Course {
        address addr; // course address
        uint256 totalSeats; // total  seates
        uint256 availableSeats; // total available seates
        Coursetype courseType; // type of the course
        string courseName;
        address clgAddr; // parent college address
        address uniAddr; // parent
        address[] enrolledStudents; // address of enrolled student
        address[] requestedStudents; // address of requested students
    }

    struct Student {
        address addr; // student address
        string name; // student name
        address courseAddr; // enrolled course
        address clgAddr; // college address
        address uniAddr; // university address
        string regNo; // registration number
        string batch; // batch id
    }

    enum Coursetype {
        COMPUTER,
        COMMERSE,
        SCIENCE
    }

    enum UserType {
        UNIVERSITY,
        COLLEGE,
        STUDENT
    }

    // basic user data structures
    User[] users;
    mapping(address => User) getUser;
    mapping(address => Student) getStudent;
    mapping(address => Course) getCourse;
    mapping(address => College) getCollege;
    mapping(address => University) getUniversity;

    // __________________________________________________

    // other mappings for data access

    // to get user type of msg.sender for hierarchy comparision
    mapping(address => UserType) public getUserType;

    // university => course => => bool => enrolled or requested students
    mapping(address => mapping(address => mapping(bool => Student[])))
        public getStudentsUnderUniversity;

    // college => course => bool => enrolled or requested students
    mapping(address => mapping(address => Student[])) getStudentsUnderCollege;

    // university => course => courseExist or not
    mapping(address => mapping(address => bool))
        public courseExistUnderUniversity;

    // college => course => courseExist or not
    mapping(address => mapping(address => bool)) courseExistUnderCollege;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized!!");
        _;
    }

    function addStudent(
        address studentAddress,
        string memory studentName,
        address courseAddress,
        address collegeAddress,
        address universityAddress,
        string memory batchNumber
    ) public onlyAdmin {
        // create student struct
        Student memory stud = Student(
            studentAddress,
            studentName,
            courseAddress,
            collegeAddress,
            universityAddress,
            studentName,
            batchNumber
        );

        // add to mapping
        getStudent[studentAddress] = stud;

        // adding to the course
        Course storage course = getCourse[courseAddress];
        course.enrolledStudents.push(studentAddress);
        course.availableSeats--;

        // creating user
        User memory user = User(studentAddress, UserType.STUDENT);

        users.push(user);

        getUser[studentAddress] = user;
    }

    function addCourse(
        string memory courseName,
        address courseAddress,
        Coursetype courseType,
        address collegeAddress,
        address universityAddress
    ) public onlyAdmin {
        // course 1 college B university A
        Course memory course = Course(
            courseAddress,
            120, // total 120
            120, // available 120
            courseType,
            courseName,
            collegeAddress,
            universityAddress,
            new address[](0), // 120 studs can enrol
            new address[](0) // 120 can request
        );

        // adding to college
        College storage college = getCollege[collegeAddress];
        college.courses.push(courseAddress);

        // adding to mapping
        getCourse[courseAddress] = course;
    }

    function addCollege(
        address collegeAddress,
        string memory collegeName,
        address universityAddress
    ) public onlyAdmin {
        // college A university B
        College memory college = College(
            collegeAddress,
            collegeName,
            universityAddress,
            new address[](0)
        );

        // adding to mapping
        getCollege[collegeAddress] = college;

        // add college to university
        University storage university = getUniversity[universityAddress];
        university.colleges.push(collegeAddress);

        // user 5
        User memory clg = User(collegeAddress, UserType.COLLEGE);

        // adding to array
        users.push(clg);

        // adding to mapping
        getUser[collegeAddress] = clg;
    }

    function addUniversity(
        string memory universityName,
        address universityAddress
    ) public onlyAdmin {
        University memory university = University(
            universityAddress,
            universityName,
            new address[](0)
        );

        // adding to mapping
        getUniversity[universityAddress] = university;

        // user 1
        User memory uni = User(universityAddress, UserType.UNIVERSITY);

        // adding to array
        users.push(uni);

        // adding to mapping
        getUser[universityAddress] = uni;
    }

    // function to get users
    function getUserInfo(
        uint256 idx
    ) public view onlyAdmin returns (address userAddr, UserType userType) {
        User memory user = users[idx];
        return (user.addr, user.userType);
    }

    function getUniversityInfo(
        address uniAddr
    )
        public
        view
        returns (address addr, string memory uniName, address[] memory colleges)
    {
        require(msg.sender == uniAddr || msg.sender == admin, "Access Denied!");
        University memory uni = getUniversity[uniAddr];
        return (uni.addr, uni.uniName, uni.colleges);
    }

    function getCollegeInfo(
        address clgAddr
    )
        public
        view
        returns (
            address addr,
            string memory clgName,
            address uniAddr,
            address[] memory courses
        )
    {
        require(msg.sender == clgAddr || msg.sender == admin, "Access Denied!");

        College memory clg = getCollege[clgAddr];
        return (clg.addr, clg.clgName, clg.uniAddr, clg.courses);
    }

    function getCourseInfo(
        address courseAddr
    )
        public
        view
        returns (
            address addr,
            uint256 totalSeats,
            uint256 availableSeats,
            Coursetype courseType,
            string memory courseName,
            address clgAddr,
            address uniAddr,
            address[] memory enrolledStudents,
            address[] memory requestedStudents
        )
    {
        Course memory cour = getCourse[courseAddr];
        require(
            msg.sender == cour.clgAddr ||
                msg.sender == cour.uniAddr ||
                msg.sender == admin,
            "Access Denied!"
        );
        return (
            cour.addr,
            cour.totalSeats,
            cour.availableSeats,
            cour.courseType,
            cour.courseName,
            cour.clgAddr,
            cour.uniAddr,
            cour.enrolledStudents,
            cour.requestedStudents
        );
    }

    function getStudentInfo(
        address studAddr
    )
        public
        view
        returns (
            address addr,
            string memory name,
            address courseAddr,
            address clgAddr,
            address uniAddr,
            string memory regNo,
            string memory batch
        )
    {
        Student memory stud = getStudent[studAddr];
        require(
            msg.sender == studAddr ||
                msg.sender == stud.clgAddr ||
                msg.sender == stud.uniAddr ||
                msg.sender == admin,
            "Access Denied!"
        );
        return (
            stud.addr,
            stud.name,
            stud.courseAddr,
            stud.clgAddr,
            stud.uniAddr,
            stud.regNo,
            stud.batch
        );
    }
}

// Uni A
// 0xdD870fA1b7C4700F2BD7f44238821C26f7392148

// College A and B of Uni A
// 0x583031D1113aD414F02576BD6afaBfb302140225
// 0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB

// Uni B
// 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C

// College A and B of Uni B
// 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c
// 0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC

// Student A College A Uni A
// 0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C

// Student A College A Uni B
// 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7
