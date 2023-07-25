// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "contracts/DefaultData.sol";

contract StudentRegistration is DataContract {
    // student calls this function to signup
    function signup(
        // address studentAddress, // will be removed in future and make it msg.sender instead
        string calldata studentName,
        address courseAddress,
        address collegeAddress,
        address universityAddress
    ) external {
        // these checks are not needed, will handle from frontend

        // // college and university addresses should be valid
        // require(
        //     getUserType[collegeAddress] == UserType.COLLEGE &&
        //         getUserType[universityAddress] == UserType.UNIVERSITY,
        //     "Invalid College or University Address"
        // );

        // // course shoudld exist under college and university
        // require(
        //     courseExistUnderCollege[collegeAddress][courseAddress] &&
        //         courseExistUnderUniversity[universityAddress][courseAddress],
        //     "Invalid Course Address"
        // );

        // should not repeat the address
        require(userExist[msg.sender] == false, "User Exist");

        Course storage course = getCourse[courseAddress];

        // availibility of seats - no check needed (handle from frontend)
        // require(course.availableSeats > 0, "Seats Unavailable");

        Student memory stud = Student(
            msg.sender,
            studentName,
            courseAddress,
            collegeAddress,
            universityAddress,
            "Not Assigned Yet",
            "Not Assigned Yet",
            new bytes32[](0)
        );

        // add to mapping
        getStudent[msg.sender] = stud;

        // add to requested Student list of course info
        course.requestedStudents.push(msg.sender);

        // these are needed to fetch the list of students (requested and enrolled)
        // add to requested students under college and university both
        getStudentsUnderCollege[collegeAddress][courseAddress][false].push(
            msg.sender
        );
        getStudentsUnderUniversity[universityAddress][courseAddress][false]
            .push(msg.sender);
    }

    function approve(
        address courseAddress,
        address studentAddress,
        string calldata assignedRegNo,
        string calldata assignedBatchNo
    ) external {
        // should not repeat the address
        require(userExist[studentAddress] == false, "User Exist");

        // get the student instance
        Student memory stud = getStudent[studentAddress];

        // only parent university or college can approve - handle from frontend
        // require(
        //     msg.sender == stud.uniAddr || msg.sender == stud.clgAddr,
        //     "Unauthorized to approve"
        // );

        // call the addStudent function
        addStudent(
            studentAddress,
            stud.name,
            courseAddress,
            stud.clgAddr,
            stud.uniAddr,
            assignedRegNo,
            assignedBatchNo
        );

        // remove from getStudentUnder college and university (from requested) bool = false
        address[] storage collegeRequested = getStudentsUnderCollege[
            stud.clgAddr
        ][courseAddress][false];
        uint256 clR = collegeRequested.length;
        for (uint256 i = 0; i < clR; i++) {
            if (collegeRequested[i] == studentAddress) {
                collegeRequested[i] = collegeRequested[clR - 1];
                collegeRequested.pop();
                break;
            }
        }

        address[] storage uniRequested = getStudentsUnderUniversity[
            stud.uniAddr
        ][courseAddress][false];
        uint256 uniR = uniRequested.length;
        for (uint256 i = 0; i < uniR; i++) {
            if (uniRequested[i] == studentAddress) {
                uniRequested[i] = uniRequested[uniR - 1];
                uniRequested.pop();
                break;
            }
        }

        // remove from requested students under the course
        Course storage course = getCourse[courseAddress];
        uint256 len = course.requestedStudents.length;
        for (uint256 i = 0; i < len; i++) {
            if (course.requestedStudents[i] == studentAddress) {
                course.requestedStudents[i] = course.requestedStudents[len - 1];
                course.requestedStudents.pop();
                break;
            }
        }
    }

    // login and logout
    function auth(bool login) public {
        // require(userLoggedIn[msg.sender] == !login);
        userLoggedIn[msg.sender] = login;
    }

    // needed (to get requested and enrolled students)
    function getStudentList(
        address courseAddress,
        bool enrolled
    ) external view returns (address[] memory studetntList) {
        UserType userType = getUserType[msg.sender];

        if (userType == UserType.UNIVERSITY) {
            // require(
            //     courseExistUnderUniversity[msg.sender][courseAddress] == true,
            //     "No Data Found"
            // );

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
            // require(
            //     courseExistUnderCollege[msg.sender][courseAddress] == true,
            //     "No Data Found"
            // );

            if (enrolled == true) {
                return getStudentsUnderCollege[msg.sender][courseAddress][true];
            } else {
                return
                    getStudentsUnderCollege[msg.sender][courseAddress][false];
            }
        }
    }
}
