import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import UpdateProfile from "./UpdateProfile";
import { RxCross2 } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";
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
        className={`w-[450px] h-fit ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } px-5  rounded-lg`}
      >
        <div className="bg-mygrey rounded-t-lg relative -mx-5 h-56">
          <div className="flex justify-end">
            <RxCross2
              className="w-[18px] h-[18px] cursor-pointer mr-3 mt-3"
              onClick={() => setShowProfile(false)}
            />
          </div>
          <div className="flex justify-center  ">
            {profile && profile.avatar ? (
              <img
                src={`http://127.0.0.1:8000/${profile.avatar}`}
                alt={profile.user}
                className="lg:w-64 absolute -bottom-10 shadow-2xl lg:h-56 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-md lg:ml-3"
              />
            ) : (
              <FaUserCircle className="lg:w-60 lg:h-56 md:w-44 md:h-44 sm:w-24 sm:h-24 rounded-full lg:ml-3" />
            )}
          </div>
        </div>

        <div className="mt-14 px-8">
          <div className="">
            <div className="flex flex-col gap-y-2 leading-5">
              <h1 className="text-[22px] font-semibold">
                {users.first_name} {users.last_name}
              </h1>
              <h1 className="text-15 text-gray-500 font-semibold">
                {profile && profile.occupation ? (
                  profile.occupation
                ) : (
                  <h1 className="text-red-400 ">Not Provided</h1>
                )}
              </h1>
            </div>
          </div>
          <div
            className="flex cursor-pointer justify-center items-center hover:bg-blue-500 hover:text-white border-1 rounded-md mt-3 border-gray-200  px-32 py-[7px]"
            onClick={() => setShowUpdate(true)}
          >
            <CiEdit className="w-6 h-6 " />
            <h1 className=" text-15 ">Edit</h1>
          </div>

          <div className=" mt-1 ">
            <div className="flex items-center gap-x-3 px-4 py-1 ">
              <MdOutlineMailOutline className="w-[18px] h-[18px]" />
              <h1 className="text-14 underline underline-offset-2">
                {user && user.email ? user.email : <h1 className="text-red-400 ">Not Provided</h1>}
              </h1>
            </div>
            <div className="flex items-center gap-x-3 px-4 py-1">
              <FaRegCalendarAlt className="w-[18px] h-[18px]" />
              <h1 className="text-14 ">
                {profile && profile.age ? (
                  profile.age
                ) : (
                  <h1 className="text-red-400 ">Not Provided</h1>
                )}
              </h1>
            </div>
            <div className="flex items-center gap-x-3 px-4 py-1">
              <BiMaleFemale className="w-[18px] h-[18px]" />
              <h1 className="text-14 ">
                {profile && profile.gender ? (
                  profile.gender
                ) : (
                  <h1 className="text-red-400 ">Not Provided</h1>
                )}
              </h1>
            </div>
            <div className="flex items-center gap-x-3 px-4 py-1 mb-5">
              <IoCallOutline className="w-[18px] h-[18px]" />
              <h1 className="text-14 ">
                {profile && profile.phone_number ? (
                  profile.phone_number
                ) : (
                  <h1 className="text-red-400 ">Not Provided</h1>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
