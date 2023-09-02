// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "contracts/StudentRegistration.sol";

contract ApplicationContract is StudentRegistration {
    // mapping to get application from id
    mapping(bytes32 => Application) public getApplication;

    // initiate transfer
    function initiateTransfer(
        TransferType transferType,
        address from,
        address to,
        address fromCourse,
        address toCourse,
        string memory noc,
        string memory transferCerti,
        string memory marksheet,
        string memory migrationCerti
    ) public returns (bytes32 applicationId) {
        // get college
        University storage toUniversity = getUniversity[getCollege[to].uniAddr];
        // not needed (handle from frontend)
        require(
            getCourse[fromCourse].courseType == getCourse[toCourse].courseType,
            "Course type mismatched"
        );
        // creating application id
        bytes32 _applicationId = keccak256(
            abi.encodePacked(
                transferType,
                from,
                to,
                noc,
                transferCerti,
                marksheet,
                migrationCerti,
                ApplicationStatus.UNDER_REVIEW_AT_UNIVERSITY
            )
        );
        // application instance
        Application memory appli = Application(
            _applicationId,
            msg.sender,
            transferType,
            from,
            to,
            fromCourse,
            toCourse,
            noc,
            transferCerti,
            marksheet,
            migrationCerti,
            0,
            ApplicationStatus.UNDER_REVIEW_AT_UNIVERSITY,
            "Application Created"
        );
        // adding to array and mapping
        toUniversity.applications.push(_applicationId);
        getApplication[_applicationId] = appli;
        return _applicationId;
    }

    // review at uni
    function transferApplicationToCollege(bytes32 applicationId) public {
        Application storage application = getApplication[applicationId];

        College storage college = getCollege[application.toAddr];

        college.applications.push(applicationId);

        application.status = ApplicationStatus.UNDER_REVIEW_AT_COLLEGE;

        application.notes = "Report to college within 3 business days";

        // remove from university
        University storage collegeUni = getUniversity[college.uniAddr];
        for (uint256 i = 0; i < collegeUni.applications.length; i++) {
            if (collegeUni.applications[i] == applicationId) {
                collegeUni.applications[i] = collegeUni.applications[
                    collegeUni.applications.length - 1
                ];
                collegeUni.applications.pop();
                return;
            }
        }
    }

    // approve or reject at college
    function approveOrRejectApplication(
        bytes32 applicationId,
        bool approve,
        string memory assignedRegNo,
        string memory assignedBatchNo
    ) public {
        Application storage application = getApplication[applicationId];

        if (approve == true) {
            Course memory toCourse = getCourse[application.toCourseAddress];

            // change to approve
            application.status = ApplicationStatus.APPROVED;

            application.notes = "Congratulations!!";

            // add student (directly call the function)
            addStudent(
                application.studentAddr,
                getStudent[application.studentAddr].name,
                toCourse.addr,
                toCourse.clgAddr,
                toCourse.uniAddr,
                assignedRegNo,
                assignedBatchNo
            );

            // remove student from the "from course and college and university"
            Course storage fromCourse = getCourse[
                application.fromCourseAddress
            ];

            // from college to add in the application list
            College memory fromCollege = getCollege[application.fromAddr];
            University storage fromUni = getUniversity[fromCollege.uniAddr];
            fromUni.applications.push(applicationId);

            for (uint256 i = 0; i < fromCourse.enrolledStudents.length; i++) {
                if (fromCourse.enrolledStudents[i] == application.studentAddr) {
                    fromCourse.enrolledStudents[i] = fromCourse
                        .enrolledStudents[
                            fromCourse.enrolledStudents.length - 1
                        ];
                    fromCourse.enrolledStudents.pop();
                    break;
                }
            }

            fromCourse.availableSeats += 1;

            // removing from under university and college student list of enrolled students
            address[] storage studUndUni = getStudentsUnderUniversity[
                fromCourse.uniAddr
            ][fromCourse.addr][true];

            address[] storage studUndCol = getStudentsUnderCollege[
                fromCourse.clgAddr
            ][fromCourse.addr][true];

            for (uint256 i = 0; i < studUndUni.length; i++) {
                if (studUndUni[i] == application.studentAddr) {
                    studUndUni[i] = studUndUni[studUndUni.length - 1];
                    studUndUni.pop();
                    break;
                }
            }

            getStudentsUnderUniversity[fromCourse.uniAddr][fromCourse.addr][
                true
            ] = studUndUni;

            for (uint256 i = 0; i < studUndCol.length; i++) {
                if (studUndCol[i] == application.studentAddr) {
                    studUndCol[i] = studUndCol[studUndCol.length - 1];
                    studUndCol.pop();
                    break;
                }
            }

            getStudentsUnderCollege[fromCourse.clgAddr][fromCourse.addr][
                true
            ] = studUndCol;
        } else {
            // change to reject
            application.status = ApplicationStatus.REJECTED;
            application.notes = "Not Accepted!!";
        }

        // remove from the "to" college and university
        College storage toClg = getCollege[application.toAddr];
        for (uint256 i = 0; i < toClg.applications.length; i++) {
            if (toClg.applications[i] == applicationId) {
                toClg.applications[i] = toClg.applications[
                    toClg.applications.length - 1
                ];
                toClg.applications.pop();
                break;
            }
        }
    }
}
