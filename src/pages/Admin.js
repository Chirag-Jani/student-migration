import React, { useState } from "react";
import AddUniversity from "../components/AddUniversity";
import AddCollege from "../components/AddCollege";
import AddCourse from "../components/AddCourse";

const Admin = ({ connectionInfo, universities }) => {
  // state while adding orgs (uni, clg, course)
  const [inputVal, setInputVal] = useState({
    uniName: "",
    uniAddr: "",
    clgName: "",
    clgAddr: "",
    courseName: "",
    courseAddr: "",
    type: "",
    courseSeats: 0,
  });

  // handling input events
  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddUniversity
        connectionInfo={connectionInfo}
        universities={universities}
        inputVal={inputVal}
        setInputVal={setInputVal}
        handleChange={handleChange}
      />
      <AddCollege
        connectionInfo={connectionInfo}
        universities={universities}
        inputVal={inputVal}
        setInputVal={setInputVal}
        handleChange={handleChange}
      />

      <AddCourse
        connectionInfo={connectionInfo}
        universities={universities}
        inputVal={inputVal}
        setInputVal={setInputVal}
        handleChange={handleChange}
      />
    </>
  );
};

export default Admin;
