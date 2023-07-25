// Native Imports
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Navbar from "./layouts/Navbar";
import theme from "./assets/theme";
import ApplicationContractABI from "./assets/ContractAbi/ApplicationContract.json";

// Module Imports
import { ethers } from "ethers";
import { Button, ThemeProvider } from "@mui/material";
import Profile from "./pages/Profile";
import Transfer from "./components/Transfer";

// const DataContractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
// const StudentRegistrationContractAddress =
//   "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
const ApplicationContractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

function App() {
  // current account, contract instance, and signer info
  const [connectionInfo, setConnectionInfo] = useState({
    contract: null,
    account: null,
    signer: null,
  });

  // logged in user info
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState();

  // list of universities (addresses only to fetch when load)
  const [universities, setUniversities] = useState([]);

  const [collegeInfo, setCollegeInfo] = useState([
    // {
    //   collegeAddr: "0xladjfl23",
    //   collegeName: "CGPIT",
    //   uniAddr: "0x123",
    //   courses: [
    //     {
    //       courseAddr: "0xe4rd",
    //       totalSeates: 120,
    //       availableSeates: 120,
    //       courseType: 0,
    //       courseName: "InfoTech",
    //       clgAddr: "0xladjfl23",
    //       uniAddr: "0x123",
    //       enrolledStuds: [],
    //       requestedStuds: [],
    //     },
    //     {
    //       courseAddr: "053frd",
    //       totalSeates: 120,
    //       availableSeates: 120,
    //       courseType: 0,
    //       courseName: "Civil engineering",
    //       clgAddr: "0xladjfl23",
    //       uniAddr: "0x123",
    //       enrolledStuds: [],
    //       requestedStuds: [],
    //     },
    //   ],
    //   applications: [],
    // },
    // {
    //   collegeAddr: "0x24fsdjfl23",
    //   collegeName: "BMIIT",
    //   uniAddr: "0x123",
    //   courses: [
    //     {
    //       courseAddr: "03fxe4rd",
    //       totalSeates: 120,
    //       availableSeates: 120,
    //       courseType: 0,
    //       courseName: "MSCIT",
    //       clgAddr: "0x24fsdjfl23",
    //       uniAddr: "0x123",
    //       enrolledStuds: [],
    //       requestedStuds: [],
    //     },
    //   ],
    //   applications: [],
    // },
    // {
    //   collegeAddr: "0xBw23",
    //   collegeName: "Silver Oak",
    //   uniAddr: "0xAbd",
    //   courses: [
    //     {
    //       courseAddr: "03fxe4rd",
    //       totalSeates: 120,
    //       availableSeates: 120,
    //       courseType: 0,
    //       courseName: "Computer ENgg",
    //       clgAddr: "0xBw23",
    //       uniAddr: "0xAbd",
    //       enrolledStuds: [],
    //       requestedStuds: [],
    //     },
    //   ],
    //   applications: [],
    // },
  ]);

  // getting the lisf of universities (addresses only)
  const getUniversities = async () => {
    try {
      const uni = await connectionInfo.contract.getAllUniversities();
      console.log("All the University: ", uni);

      // storing the array temp
      const tempUniAddr = uni;
      console.log(tempUniAddr);

      // getting all the details (university wise)
      tempUniAddr.map(async (uni) => {
        // helper function
        getUniversityDetails(uni);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // helper function to get university details
  const getUniversityDetails = async (uniAddr) => {
    try {
      const tx = await connectionInfo.contract.getUniversityInfo(uniAddr);
      let tempUniData = {
        uniName: tx.uniName,
        uniAddr: tx.addr,
        uniColleges: tx.colleges,
        uniApplications: tx.applications,
      };
      console.log("University Detail: ", tempUniData);
      setUniversities((prevUniversities) => [...prevUniversities, tempUniData]);
      console.log("Getting cOllege details:");
    } catch (e) {
      console.log(e);
    }
  };

  // helper function to get the details of each college inside the universities (addresses of colleges is already inside the university details)
  const getCollegeDetails = async () => {
    universities?.map((uni) => {
      return uni.uniColleges?.map(async (col) => {
        let collegeDetails = await connectionInfo.contract.getCollegeInfo(col);
        setCollegeInfo((prevColleges) => [...prevColleges, collegeDetails]);
        console.log(collegeDetails);
        console.log(collegeInfo);
      });
    });
    try {
    } catch (e) {
      console.log(e);
    }
  };

  // connecting wallegt and initiating contract instance when load
  useEffect(() => {
    // getting provider (MetaMask in our case)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // realoading the page when chain or account is changed to get the latest
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    // helper function to setup the instance of contract
    const setupConnection = async (provider) => {
      const abi = ApplicationContractABI;

      try {
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          ApplicationContractAddress,
          abi,
          signer
        );

        const account = await signer.getAddress();

        setConnectionInfo({
          contract,
          signer,
          account,
        });
      } catch (e) {
        console.log(e.message);
      }
    };

    // connecting the metamask wallet
    const connectWallet = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
    };

    // calling the functions
    connectWallet();
    provider && setupConnection(provider);

    // if userLoggedIn available in localstorage then set data accordingly
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar
            userLoggedIn={userLoggedIn}
            connectionInfo={connectionInfo}
            setUserLoggedIn={setUserLoggedIn}
            setLoggedInUserInfo={setLoggedInUserInfo}
          />
          {/* temp buttons to get info */}
          <Button onClick={getUniversities} color="error" variant="contained">
            Get Uni
          </Button>
          <Button onClick={getCollegeDetails} color="error" variant="contained">
            Get Clg
          </Button>
          {/* temp buttons ends */}
          <Routes>
            <Route
              path="/"
              element={
                <Auth
                  universities={universities}
                  collegeInfo={collegeInfo}
                  connectionInfo={connectionInfo}
                  setUserLoggedIn={setUserLoggedIn}
                  setLoggedInUserInfo={setLoggedInUserInfo}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <Admin
                  universities={universities}
                  connectionInfo={connectionInfo}
                  getUniversities={getUniversities}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  userLoggedIn={userLoggedIn}
                  connectionInfo={connectionInfo}
                  loggedInUserInfo={loggedInUserInfo}
                />
              }
            />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
