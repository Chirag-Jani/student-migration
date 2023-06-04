// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "contracts/1_DefaultData.sol";

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

    DefaultData defaultDataContract;

    constructor(DefaultData defContract) {
        defaultDataContract = defContract;
    }

    function getUserInfo(
        uint256 idx
    ) public view returns (address userAddress, DefaultData.UserType userType) {
        return DefaultData(defaultDataContract).getUserInfo(idx);
    }

    function getUniversityInfo(
        address uniAddr
    )
        public
        view
        returns (address addr, string memory uniName, address[] memory colleges)
    {
        return DefaultData(defaultDataContract).getUniversityInfo(uniAddr);
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
        return DefaultData(defaultDataContract).getCollegeInfo(clgAddr);
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
            DefaultData.Coursetype courseType,
            address clgAddr,
            address uniAddr,
            address[] memory enrolledStudents,
            address[] memory requestedStudents
        )
    {
        return DefaultData(defaultDataContract).getCourseInfo(courseAddr);
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
        return DefaultData(defaultDataContract).getStudentInfo(studAddr);
    }
}
