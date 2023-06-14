// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DataContract {
    address admin;

    struct University {
        address addr; // university address
        string uniName; // university name
        address[] colleges; // addresses of the affiliated colleges
        bytes32[] applications;
    }

    struct College {
        address addr; // college address
        string clgName; // college name
        address uniAddr; // parent university address
        address[] courses; // addresses of the courses
        bytes32[] applications;
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
        bytes32[] migrationApplications;
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

    struct Application {
        bytes32 applicationId; // generate randomely
        address studentAddr;
        MigrationType migrationType;
        // fromCourseAddress and toCourseAddress types needs to be the same
        address fromAddr;
        address toAddr;
        address fromCourseAddress;
        address toCourseAddress;
        string nocCID;
        string transferCertiCID;
        string marksheetCID;
        string migrationCertiCID;
        uint256 deadline; // 3 days to report after status is changed tos UNDER_REVIEW_AT_COLLEGE
        ApplicationStatus status;
        string notes;
    }

    enum MigrationType {
        COLLEGE_TO_COLLEGE_SAME_UNIVERSITY,
        COLLEGE_TO_COLLEGE_DIFFERENT_UNIVERSITY
    }

    enum ApplicationStatus {
        UNDER_REVIEW_AT_UNIVERSITY,
        UNDER_REVIEW_AT_COLLEGE,
        APPROVED,
        REJECTED
    }

    // basic user data structures
    mapping(address => Student) public getStudent;
    mapping(address => Course) public getCourse;
    mapping(address => College) public getCollege;
    mapping(address => University) public getUniversity;
    mapping(address => bool) userExist; // internal call
    mapping(address => bool) public userLoggedIn; // to check if user is logged in or not

    // __________________________________________________

    // other mappings for data access

    // to get user type of msg.sender for hierarchy comparision
    mapping(address => UserType) getUserType; // internal call

    // university => course => => bool => enrolled or requested students
    mapping(address => mapping(address => mapping(bool => address[]))) getStudentsUnderUniversity;

    // college => course => bool => enrolled or requested students
    mapping(address => mapping(address => mapping(bool => address[]))) getStudentsUnderCollege;


    // courseExistUnderUniversity & courseExistUnderCollege are not needed, I will handle it from frontend

    // university => course => courseExist or not
    // mapping(address => mapping(address => bool)) courseExistUnderUniversity;

    // // college => course => courseExist or not
    // mapping(address => mapping(address => bool)) courseExistUnderCollege;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized!!");
        _;
    }

    // will be called when approved by college or university
    function addStudent(
        address studentAddress,
        string memory studentName,
        address courseAddress,
        address collegeAddress,
        address universityAddress,
        string memory studentRegNo,
        string memory batchNumber
    ) internal {
        // create student struct
        Student memory stud = Student(
            studentAddress,
            studentName,
            courseAddress,
            collegeAddress,
            universityAddress,
            studentRegNo,
            batchNumber,
            new bytes32[](0)
        );

        // add to mapping
        getStudent[studentAddress] = stud;

        // user exist
        userExist[studentAddress] = true;

        // adding to the course
        Course storage course = getCourse[courseAddress];
        course.enrolledStudents.push(studentAddress);
        course.availableSeats--;

        // adding to usertype mapping
        getUserType[studentAddress] = UserType.STUDENT;

        // adding under university and college student list of enrolled students
        getStudentsUnderUniversity[universityAddress][courseAddress][true].push(
            studentAddress
        );
        getStudentsUnderCollege[collegeAddress][courseAddress][true].push(
            studentAddress
        );
    }

    // can only be called by admin, college, or university
    function addCourse(
        string memory courseName,
        address courseAddress,
        Coursetype courseType,
        address collegeAddress,
        address universityAddress,
        uint seats
    ) public {
        // checks not needed, will handle from frontend
        // require(
        //     msg.sender == admin ||
        //         msg.sender == universityAddress ||
        //         msg.sender == collegeAddress,
        //     "Unauthorized"
        // );

        // should not repeat the address
        require(userExist[courseAddress] == false, "Course Exist");

        // course exist
        userExist[courseAddress] = true;

        // course creation
        Course memory course = Course(
            courseAddress,
            seats, // total 
            seats, // available 
            courseType,
            courseName,
            collegeAddress,
            universityAddress,
            new address[](0), // 120 studs can enroll
            new address[](0) // 120 can request
        );

        // adding to college
        College storage college = getCollege[collegeAddress];
        college.courses.push(courseAddress);

        // adding to mapping
        getCourse[courseAddress] = course;

        // adding course under college and university
        // courseExistUnderUniversity[universityAddress][courseAddress] = true;
        // courseExistUnderCollege[collegeAddress][courseAddress] = true;
    }

    // adding colleges can be done by admin or university only
    function addCollege(
        address collegeAddress,
        string memory collegeName,
        address universityAddress
    ) public {
        // checks not needed, will handle from frontend
        // require(
        //     msg.sender == admin || msg.sender == universityAddress,
        //     "Unauthorized"
        // );

        // should not repeat the address
        require(userExist[collegeAddress] == false, "User Exist");

        // college A university B
        College memory college = College(
            collegeAddress,
            collegeName,
            universityAddress,
            new address[](0),
            new bytes32[](0)
        );

        // adding to mapping
        getCollege[collegeAddress] = college;

        // user exist
        userExist[collegeAddress] = true;

        // add college to university
        University storage university = getUniversity[universityAddress];
        university.colleges.push(collegeAddress);

        // adding to usertype mapping
        getUserType[collegeAddress] = UserType.COLLEGE;
    }

    // can only be done by admin
    function addUniversity(
        string memory universityName,
        address universityAddress
    ) public onlyAdmin // onlyAdmin is needed 
     {
        // should not repeat the address
        require(userExist[universityAddress] == false, "User Exist");

        University memory university = University(
            universityAddress,
            universityName,
            new address[](0),
            new bytes32[](0)
        );

        // adding to mapping
        getUniversity[universityAddress] = university;

        // user exist
        userExist[universityAddress] = true;

        // adding to the usertype mapping
        getUserType[universityAddress] = UserType.UNIVERSITY;
    }

    // these functions are not needed, will be handled from frontend

    // function getUniversityInfo(address uniAddr)
    //     external
    //     view
    //     returns (
    //         address addr,
    //         string memory uniName,
    //         address[] memory colleges,
    //         bytes32[] memory applications
    //     )
    // {
    //     // anyone can access the data (who calls it, will be handled in frontend)
    //     University memory uni = getUniversity[uniAddr];
    //     return (uni.addr, uni.uniName, uni.colleges, uni.applications);
    // }

    // function getCollegeInfo(address clgAddr)
    //     external
    //     view
    //     returns (
    //         address addr,
    //         string memory clgName,
    //         address uniAddr,
    //         address[] memory courses,
    //         bytes32[] memory applications
    //     )
    // {
    //     College memory clg = getCollege[clgAddr];

    //     // itself, or its parent university, or admin can see
    //     require(
    //         msg.sender == clgAddr ||
    //             msg.sender == clg.uniAddr ||
    //             msg.sender == admin,
    //         "Access Denied!"
    //     );

    //     return (
    //         clg.addr,
    //         clg.clgName,
    //         clg.uniAddr,
    //         clg.courses,
    //         clg.applications
    //     );
    // }

    // function getCourseInfo(address courseAddr)
    //     external
    //     view
    //     returns (
    //         address addr,
    //         uint256 totalSeats,
    //         uint256 availableSeats,
    //         Coursetype courseType,
    //         string memory courseName,
    //         address clgAddr,
    //         address uniAddr,
    //         address[] memory enrolledStudents,
    //         address[] memory requestedStudents
    //     )
    // {
    //     Course memory cour = getCourse[courseAddr];
    //     require(
    //         msg.sender == cour.clgAddr ||
    //             msg.sender == cour.uniAddr ||
    //             msg.sender == admin,
    //         "Access Denied!"
    //     );
    //     return (
    //         cour.addr,
    //         cour.totalSeats,
    //         cour.availableSeats,
    //         cour.courseType,
    //         cour.courseName,
    //         cour.clgAddr,
    //         cour.uniAddr,
    //         cour.enrolledStudents,
    //         cour.requestedStudents
    //     );
    // }

    // function getStudentInfo(address studAddr)
    //     external
    //     view
    //     returns (
    //         address addr,
    //         string memory name,
    //         address courseAddr,
    //         address clgAddr,
    //         address uniAddr,
    //         string memory regNo,
    //         string memory batch,
    //         bytes32[] memory migrationApplications
    //     )
    // {
    //     Student memory stud = getStudent[studAddr];
    //     require(
    //         msg.sender == studAddr ||
    //             msg.sender == stud.clgAddr ||
    //             msg.sender == stud.uniAddr ||
    //             msg.sender == admin,
    //         "Access Denied!"
    //     );
    //     return (
    //         stud.addr,
    //         stud.name,
    //         stud.courseAddr,
    //         stud.clgAddr,
    //         stud.uniAddr,
    //         stud.regNo,
    //         stud.batch,
    //         stud.migrationApplications
    //     );
    // }
}

