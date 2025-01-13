import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import img1 from "../assets/web_img1.png";
import img3 from "../assets/web_img2.png";
import img2 from "../assets/web_img3.png";
import { Link } from "react-router";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import { DiResponsive } from "react-icons/di";

const LandingPage = () => {
  const { currentStatus, setCurrentStatus, darkMode, setDarkMode } = useContext(Context);
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState(1);

  //circle percentage completion
  const completionPercentage = 70;
  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (completionPercentage / 100) * circumference; // Calculate offset

  //line

  useEffect(() => {
    const dark_mode = localStorage.getItem("toggle_Dark_mode");
    setDarkMode(dark_mode);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, 3000]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  return (
    <div className="">
      <div className="flex justify-between pt-2 px-7">
        <h1 className="3xl:text-4xl  sm:text-xl  font-bold  text-blue-600 text-center ">
          TASKHIVE
        </h1>
        <div>
          <Link to="/account/">
            <button
              className=" 3xl:text-17 sm:text-14 3xl:px-7 sm:px-4 rounded-full 3xl:py-2 sm:py-1 font-semibold text-blue-600 border-1 border-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => setCurrentStatus("login")}
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`mx-auto 3xl:w-60% sm:w-90% 3xl:pt-28 sm:pt-16 ${
          darkMode == "dark" ? "text-anti-flash-white" : ""
        }`}
      >
        <h1 className="3xl:text-6xl sm:text-3xl font-medium  text-center leading-tight">
          Efficient <span className="text-blue-600 font-bold">Task Management</span> Strategies
        </h1>
        <h1 className="text-center 3xl:pt-10 3xl:w-60%  sm:pt-5 mx-auto font-semibold">
          Boosting Productivity and Achieving goals.{" "}
          <span className="text-blue-600 font-bold">TaskHive</span> helps you manage your tasks and
          time effectively, giving you the control to focus on what truly matters
        </h1>
        <div className=" flex justify-center pt-10">
          <Link to="/account/">
            <button
              className="bg-blue-600 text-18 px-8 rounded-full py-3 w-fit  text-white font-semibold"
              onClick={() => setCurrentStatus("signup")}
            >
              Get Started For Free
            </button>
          </Link>
        </div>
      </div>
      <div className="relative w-full mx-auto overflow-hidden 3xl:w-60%  rounded-lg shadow-2xl  mb-5 transition duration-500 ease-in-out transform hover:scale-105 mt-20">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full transition-opacity transform duration-00 ease-in-out "
        />
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2  text-19"
        >
          ❮
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2  text-19"
        >
          ❯
        </button>
      </div>
      <div className="flex flex-col items-center mt-14">
        <h1 className="text-3xl font-semibold">How does it work?</h1>
        <div className="flex  mt-10">
          <div className="">
            <div className="flex">
              <h1
                onClick={() => setStatus(1)}
                className={`text-center mx-auto bg-blue-600 px-[25px] py-[14px] cursor-pointer text-4xl text-white w-fit rounded-full ${
                  status == 1 ? "scale-125 duration-700" : "scale-100 duration-700"
                }`}
              >
                1
              </h1>
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>
            </div>
            <h1 className="text-xl font-semibold pt-5 flex justify-center">Create Acccount</h1>
            <h1
              className={`w-72 bg-white shadow-2xl p-5 mt-5 rounded-xl text-14 transition-opacity duration-700 ${
                status == 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              Creating an account on TaskHive is the first step towards efficient task management.
              By signing up, you gain access to a user-friendly interface designed to help you
              organize and prioritize your tasks effectively. Once your account is set up, you can
              start exploring the various features that TaskHive offers to streamline your workflow
              and boost productivity.
            </h1>
          </div>
          <div className="">
            <div className="flex">
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>

              <h1
                onClick={() => setStatus(2)}
                className={`text-center mx-auto bg-blue-600 px-[25px] py-[14px] cursor-pointer text-4xl text-white w-fit rounded-full ${
                  status == 2 ? "scale-125 duration-700" : "scale-100 duration-700"
                }`}
              >
                2
              </h1>
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>
            </div>
            <h1 className="text-xl font-semibold pt-5 flex justify-center">Add Team Members</h1>
            <h1
              className={`w-72 bg-white shadow-2xl p-5 mt-5 rounded-xl text-14 transition-opacity duration-700 ${
                status == 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              Collaboration is key to successful project management. With TaskHive, you can easily
              invite team members to join your Workspace. This enables seamless communication and
              coordination, ensuring that everyone is on the same page and working towards common
              goals. You can assign tasks, set deadlines, and monitor progress, all within the
              platform.
            </h1>
          </div>
          <div className="">
            <div className="flex">
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>

              <h1
                onClick={() => setStatus(3)}
                className={`text-center mx-auto bg-blue-600 px-[25px] py-[14px] cursor-pointer text-4xl text-white w-fit rounded-full ${
                  status == 3 ? "scale-125 duration-700" : "scale-100 duration-700"
                }`}
              >
                3
              </h1>
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>
            </div>
            <h1 className="text-xl font-semibold pt-5 flex justify-center">Add new Project</h1>
            <h1
              className={`w-72 bg-white shadow-2xl p-5 mt-5 rounded-xl text-14 transition-opacity duration-700 ${
                status == 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              The next step is to add a new project. This allows you to categorize and manage your
              tasks under specific projects, making it easier to track progress and stay organized.
              Whether you're working on a personal project or collaborating with a team, TaskHive
              provides the tools you need to keep everything in one place.
            </h1>
          </div>
          <div className="">
            <div className="flex">
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>

              <h1
                onClick={() => setStatus(4)}
                className={`text-center mx-auto bg-blue-600 px-[25px] py-[14px] cursor-pointer text-4xl text-white w-fit rounded-full ${
                  status == 4 ? "scale-125 duration-700" : "scale-100 duration-700"
                }`}
              >
                4
              </h1>
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>
            </div>
            <h1 className="text-xl font-semibold pt-5 flex justify-center">Add Tasks</h1>
            <h1
              className={`w-72 bg-white shadow-2xl p-5 mt-5 rounded-xl text-14 transition-opacity duration-700 ${
                status == 4 ? "opacity-100" : "opacity-0"
              }`}
            >
              Once your team is set up, you can start adding tasks to your projects. TaskHive's
              intuitive controls make it easy to create, edit, and delete tasks as needed. You can
              also set priorities, and add due dates ensuring that all relevant information is
              readily available. This helps you stay organized and focused on what needs to be done.
            </h1>
          </div>
          <div className="">
            <div className="flex">
              <div class="w-20 border-t-2 h-full mt-9 border-dashed border-gray-300"></div>

              <h1
                onClick={() => setStatus(5)}
                className={`text-center mx-auto bg-blue-600 px-[25px] py-[14px] cursor-pointer text-4xl text-white w-fit rounded-full ${
                  status == 5 ? "scale-125 duration-700" : "scale-100 duration-700"
                }`}
              >
                5
              </h1>
            </div>
            <h1 className="text-xl font-semibold pt-5 flex justify-center">Start Rolling</h1>
            <h1
              className={`w-72 bg-white shadow-2xl p-5 mt-5 rounded-xl text-14 transition-opacity duration-700 ${
                status == 5 ? "opacity-100" : "opacity-0"
              }`}
            >
              With your account, team members, projects, and tasks all set up, you're ready to start
              rolling. TaskHive's features, such as notifications, help you stay on track and meet
              your deadlines. By using TaskHive, you can manage your tasks efficiently, boost
              productivity, and achieve your goals with ease.
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center sm:w-80% sm:mx-auto 3xl:w-100%">
        <h1
          className={`text-center 3xl:mt-40 sm:mt-20 font-bold text-2xl pb-10 ${
            darkMode == "dark" ? "text-anti-flash-white" : ""
          }`}
        >
          Key Features
        </h1>
        <div className="grid 3xl:grid-cols-3 sm:grid-cols-1 sm:gap-y-7 gap-x-10 mb-10">
          <div className="bg-gradient-to-tl from-blue-600 to-blue-300 rounded-lg 3xl:p-6 sm:p-4 shadow-2xl transition duration-500 ease-in-out hover:scale-110">
            <div className="bg-blue-200 p-10 rounded-full w-fit h-fit mx-auto">
              <GrTasks className="text-blue-600 w-5 h-5" />
            </div>
            <h1 className="text-center font-bold 3xl:text-xl sm:text-19 text-white 3xl:pt-5 sm:pt-4">
              Task Creation and Management
            </h1>
            <h1 className="pt-2 sm:text-14 3xl:text-15 font-semibold text-white text-center">
              Easily create, edit, and delete tasks with intuitive controls.
            </h1>
          </div>

          <div className="bg-gradient-to-tl from-blue-400 to-fuchsia-600 rounded-lg 3xl:p-6 sm:p-4 shadow-2xl transition duration-500 ease-in-out hover:scale-110">
            <div className="bg-blue-200 p-4 rounded-full w-fit h-fit mx-auto">
              <DiResponsive className="text-blue-600 w-16 h-16" />
            </div>
            <h1 className="text-center font-bold 3xl:text-xl sm:text-19 text-white 3xl:pt-5 sm:pt-4">
              User Friendly Interface
            </h1>
            <h1 className="pt-2 sm:text-14 3xl:text-15 font-semibold text-white text-center">
              Enjoy a clean, intuitive interface designed for ease of use.
            </h1>
          </div>

          <div className="bg-gradient-to-tl from-fuchsia-500 to-blue-800  rounded-lg 3xl:p-6 sm:p-4 shadow-2xl transition duration-500 ease-in-out hover:scale-110">
            <div className="bg-blue-200 p-9 rounded-full w-fit h-fit mx-auto">
              <MdOutlineNotificationsActive className="text-blue-600 w-6 h-6" />
            </div>
            <h1 className="text-center font-bold 3xl:text-xl sm:text-19 text-white 3xl:pt-5 sm:pt-4">
              Reminders and Notifications
            </h1>
            <h1 className="pt-2 sm:text-14 3xl:text-15 font-semibold text-white text-center">
              Stay on track with timely reminders and notifications.
            </h1>
          </div>
        </div>
      </div>
      <h1 className="mt-auto mx-auto p-2 sm:text-14 3xl:text-18  font-semibold w-fit">
        The Everything app for task Management
      </h1>
    </div>
  );
};

export default LandingPage;
