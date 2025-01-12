import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import DashBoard from "./pages/DashBoard";
import Task from "./pages/Task";
import Team from "./pages/Team";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "./context/Context";
import LandingPage from "./pages/LandingPage";
import Project from "./pages/Project";
import ProjectsDetail from "./pages/ProjectsDetail";
import Inbox from "./components/Inbox";
import CreateWorkspace from "./components/createWorkspace";
import Profile from "./components/Profile";

function App() {
  const {
    token,
    user_is_authenticated,
    isLoggedIn,
    darkMode,
    setDarkMode,
    authToken,
    teamId,
    getTeamMembers,
  } = useContext(Context);
  const [authenticated, setAuthenticated] = useState();
  const [showInbox, setShowInbox] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const [status, setStatus] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const specificElementRef = useRef(null);

  const handlePageClick = (event) => {
    if (!specificElementRef.current?.contains(event.target)) {
      setShowNotification(false);
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const toggleDarkMode = () => {
      const dark_mode = localStorage.getItem("toggle_Dark_mode");
      setDarkMode(dark_mode);
    };

    const handleIsAuthenticated = async () => {
      try {
        const response = await user_is_authenticated();
        setAuthenticated(response);
      } catch (error) {
        console.log(error);
      }
    };
    toggleDarkMode();
    handleIsAuthenticated();
  }, []);

  return (
    <div className="flex  overflow-y-hidden " onClick={handlePageClick}>
      {showCreateWorkspace ? (
        <CreateWorkspace setShowCreateWorkspace={setShowCreateWorkspace} />
      ) : (
        ""
      )}
      {showProfile ? <Profile setShowProfile={setShowProfile} /> : ""}
      {showInbox ? (
        <Inbox setShowInbox={setShowInbox} setStatuss={setStatus} statuss={status} />
      ) : (
        ""
      )}
      {!isLoggedIn ? (
        ""
      ) : (
        <div className="sm:relative">
          <div
            className={`3xl:w-[15%] 2xl:w-[15%] xl:w-[15%] lg:w-[100%] border-r-1 border-r-mygrey3  sm:w-[100%] ${
              darkMode == "dark" ? "bg-myblack" : ""
            }  3xl:left-0 3xl:top-0 2xl:left-0 2xl:top-0 lg:top-0 lg:left-0 z-10 h-full  fixed sm:px-1`}
          >
            <Navbar />
          </div>
          <div className="3xl:w-[85%] 2xl:w-[85%] xl:w-[85%] lg:w-[95%] sm:w-100% 3xl:ml-[15%] 2xl:ml-[15%] xl:ml-[15%] lg:ml-[5%] fixed z-1 top-0 ">
            <Header
              specificElementRef={specificElementRef}
              setShowInbox={setShowInbox}
              setShowCreateWorkspace={setShowCreateWorkspace}
              showCreateWorkspace={showCreateWorkspace}
              setShowProfile={setShowProfile}
              status={status}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          </div>
        </div>
      )}

      <div
        className={`sm:w-[100%] sm:pb-16 ${
          darkMode == "dark" ? "bg-myblack min-h-screen" : "bg-anti-flash-white min-h-screen"
        }  ${
          isLoggedIn ? "3xl:ml-[15%] 2xl:ml-[15%] xl:ml-[15%] lg:ml-[5%] sm:px-2 pt-24" : " "
        }  `}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/task/"
            element={
              <PrivateRoute>
                <Task />
              </PrivateRoute>
            }
          />
          <Route
            path="/team/"
            element={
              <PrivateRoute>
                <Team />
              </PrivateRoute>
            }
          />

          <Route path="/account/" element={<Account />} />
          <Route
            path="/dashboard/"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/"
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <PrivateRoute>
                <ProjectsDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
