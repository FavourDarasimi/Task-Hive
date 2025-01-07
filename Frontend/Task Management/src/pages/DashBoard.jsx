import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Calendar } from "react-calendar";
import "./Calendar.css";
import { ColorRing } from "react-loader-spinner";
import TopCards from "../components/TopCards";
import BottomCards from "../components/BottomCards";
import UpcomingDeadline from "../components/UpcomingDeadline";

const DashBoard = () => {
  const { getTaskDueToday, getTaskStatus, darkMode, username, getUserWorkspaces } =
    useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [all, setAll] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [missedDeadline, setMissedDeadline] = useState([]);
  const [teams, setTeams] = useState();
  const [activeWorkspace, setActiveWorkspace] = useState();
  const [offset1, setOffset1] = useState();
  const [offset2, setOffset2] = useState();
  const [projectOffset, setProjectOffset] = useState();
  const [projectPercentage, setProjectPercentage] = useState();
  const [loading, setLoading] = useState(true);

  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  const radius2 = 22;
  const circumference2 = 2 * Math.PI * radius2;

  const projectradius = 35;
  const projectcircumference = 2 * Math.PI * projectradius;

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const response = await getUserWorkspaces();

        setActiveWorkspace(response.active);

        const response2 = await getTaskStatus();
        const ongoingPercentage =
          (response2.all.length ? response2.in_progress.length / response2.all.length : 0) * 100;
        const ongoingOffset = circumference2 - (ongoingPercentage / 100) * circumference2;
        setOffset2(response2.in_progress && response2.all ? ongoingOffset : 0);

        const completedPercentage =
          (response2.all.length ? response2.completed.length / response2.all.length : 0) * 100;
        const completedOffset = circumference - (completedPercentage / 100) * circumference;
        setOffset1(completedOffset);

        const completedProjects = response2.projects.filter(
          (project) => project.status == "Completed"
        );
        const projectCompletedPercentage =
          (response2.projects.length > 1
            ? completedProjects.length / response2.projects.length
            : 0) * 100;
        const projectOffset =
          projectcircumference - (projectCompletedPercentage / 100) * projectcircumference;
        setProjectOffset(projectOffset);
        setProjectPercentage(response2.projects.length > 1 ? projectCompletedPercentage : 0);

        setAll(response2.all);
        setCompleted(response2.completed);
        setProjects(response2.projects);
        setInProgress(response2.in_progress);
        setUpComing(response2.upcoming);
        setTeams(response2.team);
        setMissedDeadline(response2.missed_deadline);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getWorkspaces();
  }, []);

  const getNewName = (name) => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName;
  };

  return (
    <div className={`${darkMode == "dark" ? "text-anti-flash-white " : ""}`}>
      {loading ? (
        <div className="flex justify-center">
          <ColorRing
            height={100}
            width={100}
            colors={["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]}
          />
        </div>
      ) : (
        <div className="flex gap-x-10 -mt-5">
          <div className="w-65%">
            <h1 className="lg:text-17 sm:text-14 font-bold  ">
              Hello {getNewName(username)} &#128512; ({activeWorkspace ? activeWorkspace.name : ""})
            </h1>
            <TopCards all={all} completed={completed} inProgress={inProgress} projects={projects} />
            <BottomCards
              circumference={circumference}
              circumference2={circumference2}
              radius={radius}
              radius2={radius2}
              offset1={offset1}
              offset2={offset2}
              completed={completed}
              inProgress={inProgress}
              projectradius={projectradius}
              projectcircumference={projectcircumference}
              projectOffset={projectOffset}
              projectPercentage={projectPercentage}
              teams={teams}
              missedDeadline={missedDeadline}
            />
          </div>

          <div>
            <div>
              <Calendar className={`${darkMode == "dark" ? "bg-myblack2" : "bg-white"}`} />
            </div>
            <UpcomingDeadline upcoming={upcoming} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
