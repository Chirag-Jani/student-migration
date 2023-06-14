// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "contracts/StudentRegistration.sol";

contract ApplicationContract is StudentRegistration {
    // mapping to get application from id
    mapping(bytes32 => Application) public getApplication;

    // initiate transfer
    function initiateTransfer(
        MigrationType migrationType,
        address from,
        address to,
        address fromCourse,
        address toCourse,
        string memory noc,
        string memory transferCerti,
        string memory marksheet,
        string memory migrationCerti
    ) public {
        // get college
        University storage toUniversity = getUniversity[getCollege[to].uniAddr];

        require(
            getCourse[fromCourse].courseType == getCourse[toCourse].courseType,
            "Course type mismatched"
        );

        // creating application id
        bytes32 _applicationId = keccak256(
            abi.encodePacked(
                migrationType,
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
            migrationType,
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

        // only student typs of member can initiate
        // show current uni, coll, course, reg no
        // transfer type (col to col same, col to col diff)
        // select uni
        // select col
        // select cour (only same CourseType)
        // get available seats
        // upload docs (Marksheet, NOC, Transfer, Migration certi)
        // done (Under review at uni)
    }

    // review at uni
    function transferApplicationToCollege(bytes32 applicationId) public {
        // get list of all requests (for own only) (handled in getUniversity data and frontend. So, no need of require)
        // select req
        Application storage application = getApplication[applicationId];

        // get all the data
        // display docs on screen

        // move to college
        College storage college = getCollege[application.toAddr];
        college.applications.push(applicationId);
        application.status = ApplicationStatus.UNDER_REVIEW_AT_COLLEGE;
        application.notes = "Moved to College";

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
        // get appli
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

