// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "contracts/DefaultData.sol";

contract ApplicationContract {
    struct Application {
        string applicationId; // generate randomely
        address studentAddr;
        address fromAddr; // could be clg or uni
        address toAddr; // could be clg or uni
        MigrationType migrationType;
        string nocCID;
        string transferCertiCID;
        string marksheetCID;
        string migrationCertiCID;
        uint256 deadline; // 3 days to report after status is changed tos UNDER_REVIEW_AT_COLLEGE
        ApplicationStatus status;
    }

    enum MigrationType {
        COLLEGE_TO_COLLEGE_SAME_UNIVERSITY,
        COLLEGE_TO_COLLEGE_DIFFERENT_UNIVERSITY
    }

    enum ApplicationStatus {
        SENT,
        UNDER_REVIEW_AT_UNIVERSITY,
        SENT_TO_COLLEGE,
        UNDER_REVIEW_AT_COLLEGE,
        APPROVED,
        REJECTED
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

    DataContract defaultDataContract;

    constructor(DataContract defContract) {
        defaultDataContract = defContract;
    }
}
