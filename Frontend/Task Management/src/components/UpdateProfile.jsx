import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import cancel from "../assets/icons8-cross-24.png";

const UpdateProfile = ({ setShowUpdate }) => {
  const { updateProfile, getProfile, user, darkMode } = useContext(Context);

  const [profile, setProfile] = useState();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState([]);
  const [changed, setChanged] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();

        setUserProfile(profile);
        setProfile(profile);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [changed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const { name, files } = e.target;
    setProfile({ ...profile, [name]: files[0] });
    setMessage({ ...message, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ ...profile, ["avatar"]: file });
      setUserProfile(res.data);
      setChanged(!changed);
      setShowUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" fixed z-1 inset-0  bg-black w-100%  bg-opacity-50 grid place-items-center">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } lg:w-30% sm:w-90% h-fit  fixed`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex justify-end  pt-3 pr-3 ">
          <img
            src={cancel}
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowUpdate(false)}
          />
        </div>
        <div className="lg:px-10 md:px-10 sm:px-5  pb-5 flex flex-col lg:gap-5 md:gap-2 sm:gap-2">
          <h1 className="text-center lg:text-2xl sm:text-18 font-semibold">Update Profile</h1>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">First Name</label>
              <input
                name="first_name"
                value={message.first_name || users.first_name}
                type="text"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Last Name</label>
              <input
                name="last_name"
                value={message.last_name || users.last_name}
                type="text"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Age</label>
              <input
                name="age"
                type="number"
                value={message.age || userProfile.age}
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Gender</label>
              <input
                name="gender"
                value={message.gender || userProfile.gender}
                type="text"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Phone Number</label>
              <input
                name="phone_number"
                value={message.phone_number || userProfile.phone_number}
                type="number"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Email</label>
              <input
                name="email"
                value={message.email || users.email}
                type="email"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Occupation</label>
              <input
                name="occupation"
                value={message.occupation || userProfile.occupation}
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-16 w-full  lg:h-14 sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold lg:text-16 sm:text-xs pb-1">Avatar</label>
              <input
                name="avatar"
                type="file"
                className=" text-sm text-gray-400 font-semibold bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded   "
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-lg bg-dark-white lg:w-fit text-16 font-semibold bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
