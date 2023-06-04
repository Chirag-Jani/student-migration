// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "contracts/DefaultData.sol";

contract StudentRegistration {
    DataContract dataContract;

    constructor(DataContract addr) {
        dataContract = DataContract(addr);
    }

    function signup() public pure {}

    function approve() public pure {}

    function getStudentList(address courseAddress, bool enrolled) public {
        DataContract.UserType userType = DataContract(dataContract).getUserType(
            msg.sender
        );

        if (userType == DataContract.UserType.UNIVERSITY) {
            require(
                DataContract(dataContract).courseExistUnderUniversity(
                    msg.sender,
                    courseAddress
                ) == true,
                "No Data Found"
            );

            if(enrolled == true) {
                return 
            }
        }
        if (userType == DataContract.UserType.COLLEGE) {}
    }
}
