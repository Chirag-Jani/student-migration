// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

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

    // mapping to avoid repeted users - not implemented yet
    mapping(address => bool) userExist;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized!!");
        _;
    }

    // function addStudentCollegeAUniA() public {
    //     // student 1 CE
    //     Student memory stud1 = Student(
    //         address(bytes20("Student UACACEB1E1")),
    //         "Student UACACEB1E1",
    //         address(bytes20("CE")),
    //         address(bytes20("College UACA")),
    //         address(bytes20("University UA")),
    //         "Student UACACEB1E1",
    //         "Batch UACACEB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UACACEB1E1"))] = stud1;

    //     // user 7
    //     User memory student1 = User(
    //         address(bytes20("Student UACACEB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student1);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UACACEB1E1"))] = student1;

    //     // student 2 B.Com
    //     Student memory stud2 = Student(
    //         address(bytes20("Student UACABComB1E1")),
    //         "Student UACABComB1E1",
    //         address(bytes20("BCom")),
    //         address(bytes20("College UACA")),
    //         address(bytes20("University UA")),
    //         "Student UACABComB1E1",
    //         "Batch UACABComB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UACABComB1E1"))] = stud2;

    //     // user 8
    //     User memory student2 = User(
    //         address(bytes20("Student UACABComB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student2);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UACABComB1E1"))] = student2;
    // }

    // function addStudentCollegeBUniA() public {
    //     // student 1 IT
    //     Student memory stud1 = Student(
    //         address(bytes20("Student UACBITB1E1")),
    //         "Student UACBITB1E1",
    //         address(bytes20("IT")),
    //         address(bytes20("College UACB")),
    //         address(bytes20("University UA")),
    //         "Student UACBITB1E1",
    //         "Batch UACBITB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UACBITB1E1"))] = stud1;

    //     // user 9
    //     User memory student1 = User(
    //         address(bytes20("Student UACBITB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student1);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UACBITB1E1"))] = student1;

    //     // student 2 BBA
    //     Student memory stud2 = Student(
    //         address(bytes20("Student UACBBBAB1E1")),
    //         "Student UACBBBAB1E1",
    //         address(bytes20("BBA")),
    //         address(bytes20("College UACB")),
    //         address(bytes20("University UA")),
    //         "Student UACBBBAB1E1",
    //         "Batch UACBBBAB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UACBBBAB1E1"))] = stud2;

    //     // user 10
    //     User memory student2 = User(
    //         address(bytes20("Student UACBBBAB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student2);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UACABBAB1E1"))] = student2;
    // }

    // function addStudentCollegeAUniB() public {
    //     // student 1 CE
    //     Student memory stud1 = Student(
    //         address(bytes20("Student UBCACEB1E1")),
    //         "Student UBCACEB1E1",
    //         address(bytes20("CE")),
    //         address(bytes20("College UBCA")),
    //         address(bytes20("University UB")),
    //         "Student UBCACEB1E1",
    //         "Batch UBCACEB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UBCACEB1E1"))] = stud1;

    //     // user 9
    //     User memory student1 = User(
    //         address(bytes20("Student UBCACEB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student1);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UBCACEB1E1"))] = student1;

    //     // student 2 B.Com
    //     Student memory stud2 = Student(
    //         address(bytes20("Student UBCABComB1E1")),
    //         "Student UBCABComB1E1",
    //         address(bytes20("BCom")),
    //         address(bytes20("College UBCA")),
    //         address(bytes20("University UB")),
    //         "Student UBCABComB1E1",
    //         "Batch UBCABComB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UBCABComB1E1"))] = stud2;

    //     // user 10
    //     User memory student2 = User(
    //         address(bytes20("Student UBCABComB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student2);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UBCABComB1E1"))] = student2;
    // }

    // function addStudentCollegeBUniB() public {
    //     // student 1 IT
    //     Student memory stud1 = Student(
    //         address(bytes20("Student UBCBITB1E1")),
    //         "Student UBCBITB1E1",
    //         address(bytes20("IT")),
    //         address(bytes20("College UBCB")),
    //         address(bytes20("University UB")),
    //         "Student UBCBITB1E1",
    //         "Batch UBCBITB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UBCBITB1E1"))] = stud1;

    //     // user 9
    //     User memory student1 = User(
    //         address(bytes20("Student UBCBITB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student1);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UBCBITB1E1"))] = student1;

    //     // student 2 BBA
    //     Student memory stud2 = Student(
    //         address(bytes20("Student UBCBBBAB1E1")),
    //         "Student UBCBBBAB1E1",
    //         address(bytes20("BBA")),
    //         address(bytes20("College UBCB")),
    //         address(bytes20("University UB")),
    //         "Student UBCBBBAB1E1",
    //         "Batch UBCBBBAB1"
    //     );

    //     // adding to mapping
    //     getStudent[address(bytes20("Student UBCBBBAB1E1"))] = stud2;

    //     // user 10
    //     User memory student2 = User(
    //         address(bytes20("Student UBCBBBAB1E1")),
    //         UserType.STUDENT
    //     );

    //     // adding to array
    //     users.push(student2);

    //     // adding to mapping
    //     getUser[address(bytes20("Student UBCABBAB1E1"))] = student2;
    // }

    // ____________________________________________________________________________________________________________

    function addStudent(
        string memory studentName,
        string memory courseName,
        string memory collegeName,
        string memory universityName,
        string memory batchNumber
    ) public {
        // create student struct
        Student memory stud = Student(
            address(bytes20(bytes(studentName))),
            studentName,
            address(bytes20(bytes(courseName))),
            address(bytes20(bytes(collegeName))),
            address(bytes20(bytes(universityName))),
            studentName,
            batchNumber
        );

        // add to mapping
        getStudent[address(bytes20(bytes(studentName)))] = stud;

        // adding to the course
        Course storage course = getCourse[address(bytes20(bytes(courseName)))];
        course.enrolledStudents.push(address(bytes20(bytes(studentName))));
        course.availableSeats--;

        // creating user
        User memory user = User(
            address(bytes20(bytes(studentName))),
            UserType.STUDENT
        );

        users.push(user);

        getUser[address(bytes20(bytes(studentName)))] = user;
    }

    // function addCourseCollegeAUniA() public {
    //     // course 1 college A university A
    //     Course memory course1 = Course(
    //         address(bytes20("CE")),
    //         120,
    //         119,
    //         Coursetype.COMPUTER,
    //         address(bytes20("College UACA")),
    //         address(bytes20("University UA")),
    //         new address[](1),
    //         new address[](1)
    //     );

    //     // adding enrolled student
    //     course1.enrolledStudents[0] = address(bytes20("Student UACACEB1E1"));

    //     // adding to mapping
    //     getCourse[address(bytes20("CE"))] = course1;

    //     // course 2 college A university A
    //     Course memory course2 = Course(
    //         address(bytes20("BCom")),
    //         120,
    //         119,
    //         Coursetype.COMMERSE,
    //         address(bytes20("College UACA")),
    //         address(bytes20("University UA")),
    //         new address[](1),
    //         new address[](1)
    //     );

    //     // adding enrolled student
    //     course2.enrolledStudents[0] = address(bytes20("Student UACABComB1E1"));

    //     // adding to mapping
    //     getCourse[address(bytes20("BCom"))] = course2;
    // }

    // function addCourseCollegeBUniA() public {
    //     // course 1 college B university A
    //     Course memory course1 = Course(
    //         address(bytes20("IT")),
    //         120,
    //         119,
    //         Coursetype.COMPUTER,
    //         address(bytes20("College UBCB")),
    //         address(bytes20("University UB")),
    //         new address[](1),
    //         new address[](1)
    //     );

    //     // adding enrolled student
    //     course1.enrolledStudents[0] = address(bytes20("Student UBCBITB1E1"));

    //     // adding to mapping
    //     getCourse[address(bytes20("IT"))] = course1;

    //     // course 2 college B university A
    //     Course memory course2 = Course(
    //         address(bytes20("BBA")),
    //         120,
    //         119,
    //         Coursetype.COMMERSE,
    //         address(bytes20("College UBCB")),
    //         address(bytes20("University UB")),
    //         new address[](1),
    //         new address[](1)
    //     );

    //     // adding enrolled student
    //     course2.enrolledStudents[0] = address(bytes20("Student UBCBBBAB1E1"));

    //     // adding to mapping
    //     getCourse[address(bytes20("BBA"))] = course2;
    // }

    // function addCourseCollegeAUniB() public {
    //     // course 1 college A university A
    //     Course memory course1 = Course(
    //         address(bytes20("CE")),
    //         120,
    //         119,
    //         Coursetype.COMPUTER,
    //         address(bytes20("College UBCA")),
    //         address(bytes20("University UB")),
    //         new address[](1),
    //         new address[](1)
    //     );

    //     // adding enrolled student
    //     course1.enrolledStudents[0] = address(bytes20("Student UBCACEB1E1"));

    //     // adding to mapping
    //     getCourse[address(bytes20("CE"))] = course1;

    //     // course 2 college A university A
    //     Course memory course2 = Course(
    //         address(bytes20("BCom")),
    //         120,
    //         119,
    //         Coursetype.COMMERSE,
    //         address(bytes20("College UBCA")),
    //         address(bytes20("University UB")),
    //         new address[](1),
    //         new address[](1)
    //     );

    //     // adding enrolled student
    //     course2.enrolledStudents[0] = address(bytes20("Student UBCABComB1E1"));

    //     // adding to mapping
    //     getCourse[address(bytes20("BCom"))] = course2;
    // }

    // function addCourseCollegeBUniB() public {
    // // course 1 college B university A
    // Course memory course1 = Course(
    //     address(bytes20("IT")),
    //     120,
    //     119,
    //     Coursetype.COMPUTER,
    //     address(bytes20("College UACB")),
    //     address(bytes20("University UA")),
    //     new address[](1),
    //     new address[](1)
    // );

    // // adding enrolled student
    // course1.enrolledStudents[0] = address(bytes20("Student UACBITB1E1"));

    // // adding to mapping
    // getCourse[address(bytes20("IT"))] = course1;

    // // course 2 college B university A
    // Course memory course2 = Course(
    //     address(bytes20("BBA")),
    //     120,
    //     119,
    //     Coursetype.COMMERSE,
    //     address(bytes20("College UACB")),
    //     address(bytes20("University UA")),
    //     new address[](1),
    //     new address[](1)
    // );

    // // adding enrolled student
    // course2.enrolledStudents[0] = address(bytes20("Student UACBBBAB1E1"));

    // // adding to mapping
    // getCourse[address(bytes20("BBA"))] = course2;
    // }

    // ____________________________________________________________________________________________________

    function addCourse(
        string memory courseName,
        Coursetype courseType,
        string memory collegeName,
        string memory universityName
    ) public {
        // course 1 college B university A
        Course memory course = Course(
            address(bytes20(bytes(courseName))),
            120, // total 120
            120, // available 120
            courseType,
            courseName,
            address(bytes20(bytes(collegeName))),
            address(bytes20(bytes(universityName))),
            new address[](0), // 120 studs can enrol
            new address[](0) // 120 can request
        );

        // adding to college
        College storage college = getCollege[
            address(bytes20(bytes(collegeName)))
        ];
        college.courses.push(address(bytes20(bytes(courseName))));

        // adding to mapping
        getCourse[address(bytes20(bytes(courseName)))] = course;
    }

    // function addCollegeUniA() public {
    //     // college A university A
    //     College memory college1 = College(
    //         address(bytes20("College UACA")),
    //         "College A University A",
    //         address(bytes20("University UA")),
    //         new address[](2)
    //     );

    //     // adding course
    //     // college1.courses[0] = address(bytes20("CE"));
    //     // college1.courses[1] = address(bytes20("BCom"));

    //     // adding to mapping
    //     getCollege[address(bytes20("College UACA"))] = college1;

    //     // user 3
    //     User memory clg1 = User(
    //         address(bytes20("College UACA")),
    //         UserType.COLLEGE
    //     );

    //     // adding to array
    //     users.push(clg1);

    //     // adding to mapping
    //     getUser[address(bytes20("College UACA"))] = clg1;

    //     // college B University A
    //     College memory college2 = College(
    //         address(bytes20("College UACB")),
    //         "College B University A",
    //         address(bytes20("University UA")),
    //         new address[](2)
    //     );

    //     // adding course
    //     college2.courses[0] = address(bytes20("IT"));
    //     college2.courses[1] = address(bytes20("BBA"));

    //     // adding to mapping
    //     getCollege[address(bytes20("College UACB"))] = college2;

    //     // user 4
    //     User memory clg2 = User(
    //         address(bytes20("College UACB")),
    //         UserType.COLLEGE
    //     );

    //     // adding to array
    //     users.push(clg2);

    //     // adding to mapping
    //     getUser[address(bytes20("College UACB"))] = clg2;
    // }

    // function addCollegeUniB() public {
    // // college A university B
    // College memory college1 = College(
    //     address(bytes20("College UBCA")),
    //     "College A University B",
    //     address(bytes20("University UB")),
    //     new address[](2)
    // );

    // // adding course
    // college1.courses[0] = address(bytes20("CE"));
    // college1.courses[1] = address(bytes20("BCom"));

    // // adding to mapping
    // getCollege[address(bytes20("College UBCA"))] = college1;

    // // user 5
    // User memory clg1 = User(
    //     address(bytes20("College UBCA")),
    //     UserType.COLLEGE
    // );

    // // adding to array
    // users.push(clg1);

    // // adding to mapping
    // getUser[address(bytes20("College UBCA"))] = clg1;

    //     // college B University B
    //     College memory college2 = College(
    //         address(bytes20("College UBCB")),
    //         "College B University B",
    //         address(bytes20("University UB")),
    //         new address[](2)
    //     );

    //     // adding course
    //     college2.courses[0] = address(bytes20("IT"));
    //     college2.courses[1] = address(bytes20("BBA"));

    //     // adding to mapping
    //     getCollege[address(bytes20("College UBCB"))] = college2;

    //     // user 6
    //     User memory clg2 = User(
    //         address(bytes20("College UBCB")),
    //         UserType.COLLEGE
    //     );

    //     // adding to array
    //     users.push(clg2);

    //     // adding to mapping
    //     getUser[address(bytes20("College UBCB"))] = clg2;
    // }

    // __________________________________________________________________________________________

    function addCollege(string memory collegeName, string memory universityName)
        public
    {
        // college A university B
        College memory college = College(
            address(bytes20(bytes(collegeName))),
            collegeName,
            address(bytes20(bytes(universityName))),
            new address[](0)
        );

        // adding to mapping
        getCollege[address(bytes20(bytes(collegeName)))] = college;

        // add college to university
        University storage university = getUniversity[
            address(bytes20(bytes(universityName)))
        ];
        university.colleges.push(address(bytes20(bytes(collegeName))));

        // user 5
        User memory clg = User(
            address(bytes20(bytes(collegeName))),
            UserType.COLLEGE
        );

        // adding to array
        users.push(clg);

        // adding to mapping
        getUser[address(bytes20(bytes(collegeName)))] = clg;
    }

    // function addUniversity() public {
    //     // university 1
    // University memory university1 = University(
    //     address(bytes20("University UA")),
    //     "University A",
    //     new address[](2)
    // );

    // // adding college
    // university1.colleges[0] = address(bytes20("College UACA"));
    // university1.colleges[1] = address(bytes20("College UACB"));

    // // adding to mapping
    // getUniversity[address(bytes20("University UA"))] = university1;

    // // user 1
    // User memory uni1 = User(
    //     address(bytes20("University UA")),
    //     UserType.UNIVERSITY
    // );

    // // adding to array
    // users.push(uni1);

    // // adding to mapping
    // getUser[address(bytes20("University UA"))] = uni1;

    //     // university 2
    //     University memory university2 = University(
    //         address(bytes20("University UB")),
    //         "University B",
    //         new address[](2)
    //     );

    //     // adding college
    //     university2.colleges[0] = address(bytes20("College UBCA"));
    //     university2.colleges[1] = address(bytes20("College UBCB"));

    //     // adding to mapping
    //     getUniversity[address(bytes20("University UB"))] = university2;

    //     // user 2
    //     User memory uni2 = User(
    //         address(bytes20("University UB")),
    //         UserType.UNIVERSITY
    //     );

    //     // adding to array
    //     users.push(uni2);

    //     // adding to mapping
    //     getUser[address(bytes20("University UB"))] = uni2;
    // }

    function addUniversity(string memory universityName) public {
        University memory university = University(
            address(bytes20(bytes(universityName))),
            universityName,
            new address[](0)
        );

        // adding to mapping
        getUniversity[address(bytes20(bytes(universityName)))] = university;

        // user 1
        User memory uni = User(
            address(bytes20(bytes(universityName))),
            UserType.UNIVERSITY
        );

        // adding to array
        users.push(uni);

        // adding to mapping
        getUser[address(bytes20(bytes(universityName)))] = uni;
    }

    // function to get users
    function getUserInfo(uint256 idx)
        public
        view
        returns (address userAddr, UserType userType)
    {
        User memory user = users[idx];
        return (user.addr, user.userType);
    }

    function getUniversityInfo(address uniAddr)
        public
        view
        returns (
            address addr,
            string memory uniName,
            address[] memory colleges
        )
    {
        University memory uni = getUniversity[uniAddr];
        return (uni.addr, uni.uniName, uni.colleges);
    }

    function getCollegeInfo(address clgAddr)
        public
        view
        returns (
            address addr,
            string memory clgName,
            address uniAddr,
            address[] memory courses
        )
    {
        College memory clg = getCollege[clgAddr];
        return (clg.addr, clg.clgName, clg.uniAddr, clg.courses);
    }

    function getCourseInfo(address courseAddr)
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

    function getStudentInfo(address studAddr)
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
