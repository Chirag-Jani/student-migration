// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "contracts/DefaultData.sol";

contract StudentRegistration is DataContract {
    // student calls this function to signup
    function signup(
        address studentAddress,
        string memory studentName,
        address courseAddress,
        address collegeAddress,
        address universityAddress,
        string memory batchNumber
    ) public {
        // college and university addresses should be valid
        require(
            getUserType[collegeAddress] == UserType.COLLEGE &&
                getUserType[universityAddress] == UserType.UNIVERSITY,
            "Invalid College or University Address"
        );

        // course shoudld exist under college and university
        require(
            courseExistUnderCollege[collegeAddress][courseAddress] &&
                courseExistUnderUniversity[universityAddress][courseAddress],
            "Invalid Course Address"
        );

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

        // add to requested Student list of course info
        Course storage course = getCourse[courseAddress];
        course.requestedStudents.push(studentAddress);

        // add to requested students under college and university both
        getStudentsUnderCollege[collegeAddress][courseAddress][false].push(
            studentAddress
        );
        getStudentsUnderUniversity[universityAddress][courseAddress][false]
            .push(studentAddress);
    }

    function approve(address courseAddress, address studentAddress) public {
        // msg.sender type should be college or university
        require(
            getUserType[msg.sender] == UserType.UNIVERSITY ||
                getUserType[msg.sender] == UserType.COLLEGE,
            "Unauthorized to approve"
        );

        // get the student instance
        Student memory stud = getStudent[studentAddress];

        // college or university should match with the one who is calling the approve address
        require(
            stud.clgAddr == msg.sender || stud.uniAddr == msg.sender,
            "Unauthorized"
        );

        // check for available seats under given course
        Course memory course = getCourse[courseAddress];
        require(course.availableSeats > 0, "Seats Unavailable");

        // call the addStudent function
        addStudent(
            studentAddress,
            stud.name,
            courseAddress,
            stud.clgAddr,
            stud.uniAddr,
            stud.batch
        );

        // remove from requested user
        // remove from requested students
    }

    function getStudentList(
        address courseAddress,
        bool enrolled
    ) public view returns (address[] memory studetntList) {
        UserType userType = getUserType[msg.sender];

        if (userType == UserType.UNIVERSITY) {
            require(
                courseExistUnderUniversity[msg.sender][courseAddress] == true,
                "No Data Found"
            );

            if (enrolled == true) {
                return
                    getStudentsUnderUniversity[msg.sender][courseAddress][true];
            } else {
                return
                    getStudentsUnderUniversity[msg.sender][courseAddress][
                        false
                    ];
            }
        }
        if (userType == DataContract.UserType.COLLEGE) {
            require(
                courseExistUnderCollege[msg.sender][courseAddress] == true,
                "No Data Found"
            );

            if (enrolled == true) {
                return getStudentsUnderCollege[msg.sender][courseAddress][true];
            } else {
                return
                    getStudentsUnderCollege[msg.sender][courseAddress][false];
            }
        }
    }
}
