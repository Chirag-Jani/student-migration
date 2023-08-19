import { Button, Paper, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";

const Certificate = (props) => {
  const { searchedData, connectionInfo } = props;

  const [student, setStudent] = useState();
  const [fromCourse, setFromCourse] = useState();
  const [toCourse, setToCourse] = useState();
  const [fromCollege, setFromCollege] = useState();
  const [toCollege, setToCollege] = useState();

  const certificateRef = useRef(null);

  const generateCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificate.pdf");
      });
    }
  };

  useEffect(() => {
    // console.log(searchedData);
    const getFromCollege = async () => {
      try {
        let fromClg = await connectionInfo.contract.getCollege(
          searchedData.fromAddr
        );
        setFromCollege(fromClg);
      } catch (error) {
        console.log(error);
      }
    };
    const getToCollege = async () => {
      try {
        let toClg = await connectionInfo.contract.getCollege(
          searchedData.toAddr
        );
        setToCollege(toClg);
      } catch (error) {
        console.log(error);
      }
    };
    const getFromCourse = async () => {
      try {
        let fromCourse = await connectionInfo.contract.getCourse(
          searchedData.fromCourseAddress
        );
        setFromCourse(fromCourse);
        // console.log(fromCourse);
      } catch (error) {
        console.log(error);
      }
    };
    const getToCourse = async () => {
      try {
        let toCourse = await connectionInfo.contract.getCourse(
          searchedData.toCourseAddress
        );
        setToCourse(toCourse);
        // console.log(fromCourse);
      } catch (error) {
        console.log(error);
      }
    };
    const getStudent = async () => {
      try {
        const stud = await connectionInfo.contract.getStudentInfo(
          searchedData.studentAddr
        );
        // console.log(stud);
        setStudent(stud);
      } catch (e) {
        console.log(e);
      }
    };

    getFromCollege();
    getToCollege();
    getFromCourse();
    getToCourse();
    getStudent();
  });

  return (
    <div>
      <Button
        variant="contained"
        onClick={generateCertificate}
        color="secondary"
        sx={{
          margin: "20px 0",
        }}
      >
        Generate Transfer Certificate
      </Button>
      <div
        ref={certificateRef}
        elevation={3}
        className="certificate-container"
        style={{
          width: "210mm", // A4 width
          height: "297mm", // A4 height
          padding: "40px",
          border: "1px solid black",
        }}
      >
        <Typography
          sx={{
            padding: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          TRANSFER CERTIFICATE
        </Typography>

        <Typography
          sx={{
            textAlign: "justify",
            fontSize: "20px",
            lineHeight: "1.6",
          }}
        >
          &nbsp; &nbsp; &nbsp; &nbsp; This is to certify that {student?.name}{" "}
          has successfully completed the transfer procedure from{" "}
          {fromCollege?.clgName} {fromCourse?.courseName} to{" "}
          {toCollege?.clgName} {toCourse?.courseName}. <br /> This transfer has
          been duly approved, and the student is now eligible for admission in
          the new college and course. This certificate is awarded in recognition
          of the student's academic achievements.
        </Typography>
        <Typography
          sx={{
            textAlign: "justify",
            fontSize: "20px",
            lineHeight: "1.6",
          }}
        >
          This application is generated using Blockchain Technology. Application
          Id: {searchedData?.applicationId}
        </Typography>
      </div>
    </div>
  );
};

export default Certificate;
