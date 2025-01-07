import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Invitations from "./components/Invitations";
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
  const { token, user_is_authenticated, isLoggedIn, darkMode, setDarkMode } = useContext(Context);
  const [authenticated, setAuthenticated] = useState();
  const [showInvites, setShowInvites] = useState(false);
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
    <div className="flex  overflow-y-hidden" onClick={handlePageClick}>
      {showCreateWorkspace ? (
        <CreateWorkspace setShowCreateWorkspace={setShowCreateWorkspace} />
      ) : (
        ""
      )}
      {showProfile ? <Profile setShowProfile={setShowProfile} /> : ""}
      {showInvites ? <Invitations setShowInvites={setShowInvites} setStatus={setStatus} /> : ""}
      {showInbox ? <Inbox setShowInbox={setShowInbox} /> : ""}
      {!isLoggedIn ? (
        ""
      ) : (
        <div>
          <div
            className={`lg:w-15% ${
              darkMode == "dark" ? "bg-myblack" : ""
            }  left-0 top-0 z-10 h-full  sm:w-fit fixed sm:px-1`}
          >
            <Navbar />
          </div>
          <div className="lg:w-85% sm:w-100% lg:ml-15% sm:ml-10 fixed z-1 top-0 ">
            <Header
              specificElementRef={specificElementRef}
              setShowInvites={setShowInvites}
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
        className={`${
          darkMode == "dark" ? "bg-myblack min-h-screen" : "bg-anti-flash-white min-h-screen"
        }  ${isLoggedIn ? "lg:ml-15% sm:pl-4 pt-24" : "w-85% "}  sm:w-full`}
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
