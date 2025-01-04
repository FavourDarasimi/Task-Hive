import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const authToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(authToken ? authToken : null);
  const [isLoggedIn, setIsLoggedIn] = useState(authToken);
  const [currentStatus, setCurrentStatus] = useState("login");
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("toggle_Dark_mode"));

  const login = async (e, username, password) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token", {
        username: username,
        password: password,
      });

      setToken(JSON.stringify(response.data));

      sessionStorage.setItem("token", JSON.stringify(response.data));
      user_is_authenticated();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    sessionStorage.removeItem("token");
    // try {
    //   const token = JSON.parse(sessionStorage.getItem("token"));
    //   console.log(token);
    //   const response = await axios.post(
    //     "http://localhost:8000/logout",
    //     {},
    //     {
    //       headers: { Authorization: `Bearer ${token.access}` },
    //     }
    //   );
    //   sessionStorage.removeItem("token");
    //   user_is_authenticated();
    // } catch (error) {
    //   throw error;
    // }
  };

  const getUsersTask = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/list/task",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUsersProject = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/list/project",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getProjectDetails = async (id) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:8000/project/${id}`,

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getTaskDueToday = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/task/due/today",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getTaskStatus = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/task/status",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getTeamMembers = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/team/memebers",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getOnlineMembers = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/online/team/members",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const signup = async (e, username, password, first_name, last_name, email) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup", {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const user_is_authenticated = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.get("http://127.0.0.1:8000/is_authenticated", {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      setUser(response.data.user);
      setAuthenticated(response.data.is_authenticated);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const updateToken = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const tokens = sessionStorage.getItem("token");
      const response = await axios.post("http://127.0.0.1:8000/api/refresh/token", {
        refresh: token.refresh,
      });

      setToken(JSON.stringify(response.data));
      sessionStorage.setItem("token", JSON.stringify(response.data));

      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const createTask = async (title, priority, date, projectid, team, checked) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create/task",
        {
          title: title,
          priority: priority,
          due_date: date,
          project: projectid,
          assigned_members: team.map((member) => ({ id: member.value })),
          checked: checked,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const completeTask = async (id, complete, projectId) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/complete/task/${id}`,
        { complete: complete, projectId: projectId },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const createProject = async (title, team) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create/project",
        {
          name: title,
          assigned_members: team.map((member) => ({ id: member.value })),
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const sendInvite = async (email) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/send/invitation",
        {
          email: email,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const responseToInvite = async (id, res, pk, workspace) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/response/invitation/${pk}`,
        {
          sender: id,
          accepted: res,
          workspace: workspace,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getUserInvites = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/user/invitations",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const markAsRead = async (pk) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/markasread/notifications/${pk}`,
        {},
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const markAllAsRead = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/markallasread/notifications`,
        {},
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getUserNotification = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/user/notifications",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getUserUnreadNotification = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/user/unread/notifications",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getUserWorkspaces = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/list/user/workspace",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const createWorkspace = async (name) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create/workspace",
        {
          name: name,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };
  const updateProfile = async (updatedProfile) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/update/profile",

        updatedProfile,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getProfile = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/view/profile",

        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const switchWorkspace = async (last_workspace, new_workspace) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/switch/workspace",
        {
          last_workspace: last_workspace,
          new_workspace: new_workspace,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getDate = (dateTime) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = date.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const finalFormatedDate = `${day}${daySuffix(day)} of ${
      formattedDate.split(" ")[1]
    }, ${date.getFullYear()}`;
    return finalFormatedDate;
  };

  const getRandomColor = () => {
    const color = ["red", "blue", "yellow"];
    const randomColor = color[Math.floor(Math.random() * color.length)];
    return randomColor;
  };

  const getFirstLetter = (letter) => {
    console.log(letter);
    const first_letter = letter[0].toUpperCase();
    return first_letter;
  };

  const contextValue = {
    login,
    token,
    logout,
    signup,
    getUsersTask,
    user_is_authenticated,
    createTask,
    getTaskDueToday,
    currentStatus,
    setCurrentStatus,
    isLoggedIn,
    setIsLoggedIn,
    getOnlineMembers,
    getTaskStatus,
    getTeamMembers,
    user,
    authenticated,
    getUsersProject,
    getProjectDetails,
    getDate,
    createProject,
    getRandomColor,
    getFirstLetter,
    username,
    setUsername,
    completeTask,
    darkMode,
    setDarkMode,
    sendInvite,
    getUserInvites,
    responseToInvite,
    markAsRead,
    getUserNotification,
    getUserUnreadNotification,
    markAllAsRead,
    getUserWorkspaces,
    createWorkspace,
    switchWorkspace,
    updateProfile,
    getProfile,
  };
  useEffect(() => {
    const four = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (token) {
        updateToken();
        user_is_authenticated();
      }
    }, 1000 * 60 * 60 * 20);
    return () => clearInterval(interval);
  }, [token]);

  // useEffect(() => {
  //   let timeoutId;

  //   const resetTimeout = () => {
  //     clearTimeout(timeoutId);

  //     timeoutId = setTimeout(logout, 300000);
  //   };

  //   window.addEventListener("mousemove", resetTimeout);
  //   window.addEventListener("keypress", resetTimeout);
  //   window.addEventListener("click", resetTimeout);
  //   window.addEventListener("scroll", resetTimeout);

  //   resetTimeout();

  //   return () => {
  //     clearTimeout(timeoutId);
  //     window.removeEventListener("mousemove", resetTimeout);
  //     window.removeEventListener("keypress", resetTimeout);
  //     window.removeEventListener("click", resetTimeout);
  //     window.removeEventListener("scroll", resetTimeout);
  //   };
  // }, []);
  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
