import { ThemeProvider } from "@mui/material";
import "./App.css";
import Auth from "./pages/Auth";
import theme from "./assets/theme";
import { useState } from "react";

function App() {
  const [universities, setUniversities] = useState([
    {
      uniName: "Uka Tarsadiya",
      uniAddr: "0x123",
      uniColleges: ["0xladjfl23", "0x24fsdjfl23"],
      uniApplications: [],
    },
    {
      uniName: "GTU",
      uniAddr: "0xAbd",
      uniColleges: ["0xBw23"],
      uniApplications: [],
    },
  ]);

  const [collegeInfo, setCollegeInfo] = useState([
    {
      collegeAddr: "0xladjfl23",
      collegeName: "CGPIT",
      uniAddr: "0x123",
      courses: [
        {
          courseAddr: "0xe4rd",
          totalSeates: 120,
          availableSeates: 120,
          courseType: 0,
          courseName: "InfoTech",
          clgAddr: "0xladjfl23",
          uniAddr: "0x123",
          enrolledStuds: [],
          requestedStuds: [],
        },
        {
          courseAddr: "053frd",
          totalSeates: 120,
          availableSeates: 120,
          courseType: 0,
          courseName: "Civil engineering",
          clgAddr: "0xladjfl23",
          uniAddr: "0x123",
          enrolledStuds: [],
          requestedStuds: [],
        },
      ],
      applications: [],
    },
    {
      collegeAddr: "0x24fsdjfl23",
      collegeName: "BMIIT",
      uniAddr: "0x123",
      courses: [
        {
          courseAddr: "03fxe4rd",
          totalSeates: 120,
          availableSeates: 120,
          courseType: 0,
          courseName: "MSCIT",
          clgAddr: "0x24fsdjfl23",
          uniAddr: "0x123",
          enrolledStuds: [],
          requestedStuds: [],
        },
      ],
      applications: [],
    },
    {
      collegeAddr: "0xBw23",
      collegeName: "Silver Oak",
      uniAddr: "0xAbd",
      courses: [
        {
          courseAddr: "03fxe4rd",
          totalSeates: 120,
          availableSeates: 120,
          courseType: 0,
          courseName: "Computer ENgg",
          clgAddr: "0xBw23",
          uniAddr: "0xAbd",
          enrolledStuds: [],
          requestedStuds: [],
        },
      ],
      applications: [],
    },
  ]);

  // const getUniversities = async () => {
  //   try {
  //     console.log("GEt uni");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Auth universities={universities} collegeInfo={collegeInfo} />
      </div>
    </ThemeProvider>
  );
}

export default App;
