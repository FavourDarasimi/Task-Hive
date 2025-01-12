import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const authToken = JSON.parse(sessionStorage.getItem("token"));
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

  const searchTaskMembers = async (search, task_id, project_id) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        "http://localhost:8000/search/task/members",

        {
          params: {
            search: search,
            task_id: task_id,
            project_id: project_id,
          },
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
      throw error.response.data;
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

  const responseToInvite = async (id, res, pk, workspace, active, notification_id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/response/invitation/${pk}`,
        {
          sender: id,
          accepted: res,
          workspace: workspace,
          active: active,
          notification_id: notification_id,
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
  const getProjectTaskDueToday = async (pk) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:8000/project/task/due/${pk}`,

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

  const leaveTeam = async (pk, leader_id, member_id, remove) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/leave/team/${pk}`,
        {
          leader_id: leader_id,
          member_id: member_id,
          remove: remove,
        },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const deleteProject = async (pk) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/delete/project/${pk}`,

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const deleteTask = async (pk) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/delete/task/${pk}`,

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  };

  const addMemberToProject = async (pk, param) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/add/member/project/${pk}`,
        { param: param },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const addMemberToTask = async (pk, members) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/add/member/task/${pk}`,
        { members: members },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const removeMemberToProject = async (pk, param) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/remove/member/project/${pk}`,
        { param: param },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const updateDueDate = async (pk, date) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/update/task/${pk}`,
        { due_date: date },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const updateTask = async (pk, title, priority) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/update/task/${pk}`,
        { title: title, priority: priority },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const updateProject = async (pk, title) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/update/project/${pk}`,
        { name: title },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const addToFavourite = async (pk, favourite) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/add/project/favourite/${pk}`,
        { favourite: favourite },

        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const searchResult = async (search) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/search/result`,

        {
          params: {
            search: search,
          },
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
      return response.data;
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
    searchTaskMembers,
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
    leaveTeam,
    deleteProject,
    addMemberToProject,
    deleteTask,
    updateDueDate,
    updateProject,
    updateTask,
    getProjectTaskDueToday,
    removeMemberToProject,
    searchResult,
    addToFavourite,
    addMemberToTask,
  };
  useEffect(() => {
    const four = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (token) {
        updateToken();
        user_is_authenticated();
        getTeamMembers();
      }
    }, 1000 * 60 * 60 * 20);
    return () => clearInterval(interval);
  }, [token]);

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
