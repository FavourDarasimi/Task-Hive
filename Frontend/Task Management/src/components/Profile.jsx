import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import cancel from "../assets/icons8-cross-24.png";
import UpdateProfile from "./UpdateProfile";
const Profile = ({ setShowProfile }) => {
  const { getProfile, user, darkMode, user_is_authenticated } = useContext(Context);
  const [profile, setProfile] = useState();
  const [users, setUser] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [active, setActive] = useState("basic");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const response2 = await user_is_authenticated();
        console.table(response);
        setProfile(response);
        setUser(response2.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [showUpdate]);
  return (
    <div className="fixed z-50 inset-0  bg-black w-100%   bg-opacity-50 grid place-items-center">
      {showUpdate ? <UpdateProfile setShowUpdate={setShowUpdate} /> : ""}
      <div
        className={`w-fit h-fit ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } p-5 rounded-lg`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold pb-5 ">My Profile</h1>
          <img
            src={cancel}
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowProfile(false)}
          />
        </div>
        {profile && users ? (
          <div>
            <div className="flex justify-between ">
              <div className="flex  gap-x-3 items-center">
                <div>
                  {profile && profile.avatar ? (
                    <img
                      src={`http://127.0.0.1:8000/${profile.avatar}`}
                      alt={profile.user}
                      className="lg:w-24 lg:h-24 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3"
                    />
                  ) : (
                    <FaUserCircle className="lg:w-24 lg:h-24 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3" />
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-2xl font-semibold">
                    {users.first_name} {users.last_name}
                  </h1>
                  <h1 className="text-15 text-gray-400 font-semibold">{users.email}</h1>
                </div>
              </div>
              <div className="flex cursor-pointer" onClick={() => setShowUpdate(true)}>
                <CiEdit className="text-blue-600 w-6 h-6 " />
                <h1 className="text-blue-600 text-17 font-bold">Edit</h1>
              </div>
            </div>
            <div className="flex justify-between  p-2 rounded-xl mt-5 px-24">
              <h1
                className={`text-18 font-semibold cursor-pointer ${
                  active == "basic" ? "border-b-4 border-b-gray-600" : ""
                }`}
                onClick={() => setActive("basic")}
              >
                Basic Informations
              </h1>
              <h1
                className={`text-18 font-semibold cursor-pointer ${
                  active == "activities" ? "border-b-4 border-b-gray-600" : ""
                }`}
                onClick={() => setActive("activities")}
              >
                Activities
              </h1>
            </div>
            <div className=" mt-1 mx-7 border-x-1 border-x-gray-300 rounded-xl">
              <div className="flex gap-x-20 border-y-1 border-y-gray-300 p-4 rounded-t-xl">
                <h1 className="text-17 w-52 font-semibold">Age</h1>
                <h1 className="text-15 font-semibold">
                  {profile.age ? profile.age : <h1 className="text-red-600">Not Provided</h1>}
                </h1>
              </div>
              <div className="flex gap-x-20 border-b-1 border-b-gray-300 p-4">
                <h1 className="text-17 w-52 font-semibold">Gender</h1>
                <h1 className="text-15 font-semibold">
                  {profile.gender ? profile.gender : <h1 className="text-red-600">Not Provided</h1>}
                </h1>
              </div>
              <div className="flex gap-x-20 border-b-1 border-b-gray-300 p-4">
                <h1 className="text-17 w-52 font-semibold">Phone Number</h1>
                <h1 className="text-15 font-semibold">
                  {profile.phone_number ? (
                    profile.phone_number
                  ) : (
                    <h1 className="text-red-600">Not Provided</h1>
                  )}
                </h1>
              </div>
              <div className="flex gap-x-20 border-b-1 border-b-gray-300 p-4 rounded-xl">
                <h1 className="text-17 w-52 font-semibold">Occupation</h1>
                <h1 className="text-15 font-semibold">
                  {profile.occupation ? (
                    profile.occupation
                  ) : (
                    <h1 className="text-red-600">Not Provided</h1>
                  )}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
