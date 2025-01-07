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
        <h1 className="lg:text-4xl  sm:text-xl  font-bold  text-blue-600 text-center ">TASKHIVE</h1>
        <div>
          <Link to="/account/">
            <button
              className=" lg:text-17 sm:text-14 lg:px-7 sm:px-4 rounded-full lg:py-2 sm:py-1 font-semibold text-blue-600 border-1 border-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => setCurrentStatus("login")}
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`mx-auto lg:w-60% sm:w-90% lg:pt-28 sm:pt-16 ${
          darkMode == "dark" ? "text-anti-flash-white" : ""
        }`}
      >
        <h1 className="lg:text-6xl sm:text-3xl font-medium  text-center leading-tight">
          Efficient <span className="text-blue-600 font-bold">Task Management</span> Strategies
        </h1>
        <h1 className="text-center lg:pt-10 lg:w-60%  sm:pt-5 mx-auto font-semibold">
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
      <div className="relative w-full mx-auto overflow-hidden lg:w-60%  rounded-lg shadow-2xl  mb-5 transition duration-500 ease-in-out transform hover:scale-105 mt-20">
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
      <div className="flex flex-col items-center sm:w-80% sm:mx-auto lg:w-100%">
        <h1
          className={`text-center lg:mt-40 sm:mt-20 font-bold text-2xl pb-10 ${
            darkMode == "dark" ? "text-anti-flash-white" : ""
          }`}
        >
          Key Features
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 sm:gap-y-7 gap-x-10 mb-10">
          <div className="bg-gradient-to-tl from-blue-600 to-blue-300 rounded-lg lg:p-6 sm:p-4 shadow-2xl transition duration-500 ease-in-out hover:scale-110">
            <div className="bg-blue-200 p-10 rounded-full w-fit h-fit mx-auto">
              <GrTasks className="text-blue-600 w-5 h-5" />
            </div>
            <h1 className="text-center font-bold lg:text-xl sm:text-19 text-white lg:pt-5 sm:pt-4">
              Task Creation and Management
            </h1>
            <h1 className="pt-2 sm:text-14 lg:text-15 font-semibold text-white text-center">
              Easily create, edit, and delete tasks with intuitive controls.
            </h1>
          </div>

          <div className="bg-gradient-to-tl from-blue-400 to-fuchsia-600 rounded-lg lg:p-6 sm:p-4 shadow-2xl transition duration-500 ease-in-out hover:scale-110">
            <div className="bg-blue-200 p-4 rounded-full w-fit h-fit mx-auto">
              <DiResponsive className="text-blue-600 w-16 h-16" />
            </div>
            <h1 className="text-center font-bold lg:text-xl sm:text-19 text-white lg:pt-5 sm:pt-4">
              User Friendly Interface
            </h1>
            <h1 className="pt-2 sm:text-14 lg:text-15 font-semibold text-white text-center">
              Enjoy a clean, intuitive interface designed for ease of use.
            </h1>
          </div>

          <div className="bg-gradient-to-tl from-fuchsia-500 to-blue-800  rounded-lg lg:p-6 sm:p-4 shadow-2xl transition duration-500 ease-in-out hover:scale-110">
            <div className="bg-blue-200 p-9 rounded-full w-fit h-fit mx-auto">
              <MdOutlineNotificationsActive className="text-blue-600 w-6 h-6" />
            </div>
            <h1 className="text-center font-bold lg:text-xl sm:text-19 text-white lg:pt-5 sm:pt-4">
              Reminders and Notifications
            </h1>
            <h1 className="pt-2 sm:text-14 lg:text-15 font-semibold text-white text-center">
              Stay on track with timely reminders and notifications.
            </h1>
          </div>
        </div>
      </div>
      <h1 className="mt-auto mx-auto p-2 sm:text-14 lg:text-18  font-semibold w-fit">
        The Everything app for task Management
      </h1>
    </div>
  );
};

export default LandingPage;
