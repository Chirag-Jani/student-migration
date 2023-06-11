// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "contracts/StudentRegistration.sol";

contract ApplicationContract is StudentRegistration {
    // mapping to get application from id
    mapping(bytes32 => Application) getApplication;

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
        College storage toCollege = getCollege[to];

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
        toCollege.applications.push(_applicationId);
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
    function transferTransferToCollege(bytes32 applicationId) public {
        // get list of all requests (for own only)
        // select req
        Application storage application = getApplication[applicationId];

        // get all the data
        // display docs on screen

        // move to college
        College storage college = getCollege[application.toAddr];
        application.status = ApplicationStatus.UNDER_REVIEW_AT_COLLEGE;

        // remove from university
    }

    // approve or reject at college
    function approveOrRejectApplication(bytes32 applicationId) public {
        // get appli
        // change to approve
        // add student (directly call the function)
        // remove from the "From" college and university
        // change to reject
    }
}
