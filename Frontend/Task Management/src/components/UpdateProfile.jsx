import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context";

import { RxCross2 } from "react-icons/rx";

const UpdateProfile = ({ setShowUpdate }) => {
  const { updateProfile, getProfile, user, darkMode } = useContext(Context);

  const [profile, setProfile] = useState();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState([]);
  const [changed, setChanged] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [users, setUser] = useState([]);
  const [gender, setGender] = useState("");
  const [preview, setPreview] = useState("");
  let female = <p>FEMALE</p>;
  let male = <p>MALE</p>;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setGender(profile.gender);
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
    const image = e.target.files[0];
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ ...profile, ["avatar"]: file });
      console.log(female);
      setUserProfile(res.data);
      setChanged(!changed);
      setShowUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" fixed z-1 inset-0  bg-black w-100%  bg-opacity-30 grid place-items-center">
      <form
        className={` rounded-3xl  ${
          darkMode == "dark" ? "bg-myblack2 text-anti-flash-white" : "bg-white"
        } lg:w-30% sm:w-90% h-fit  fixed`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-full flex justify-between  py-3 px-3 ">
          <h1 className="text-center lg:text-2xl sm:text-18 ml-5 font-semibold">
            User Information
          </h1>

          <RxCross2 className="w-5 h-5 cursor-pointer" onClick={() => setShowUpdate(false)} />
        </div>
        <div className="lg:px-10 md:px-10 sm:px-5  pb-5 flex flex-col  md:gap-2 sm:gap-2">
          <div className="flex flex-col w-fit justify-center">
            <img
              src={
                preview ||
                (profile && profile.avatar ? `http://127.0.0.1:8000/${profile.avatar}` : "")
              }
              className="w-24 h-24 rounded-full"
            />
            <h1 className="text-15 text-gray-500 pt-1">This will be displayed on your profile</h1>
            <label className="font-semibold lg:text-12 sm:text-xs pb-2 bg-blue-500 text-white w-fit px-2 py-1 my-2  rounded-lg">
              Upload New
              <input
                name="avatar"
                type="file"
                className="hidden text-sm text-gray-400 font-semibold bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded   "
                onChange={(e) => handleFileChange(e)}
              />
            </label>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold lg:text-14 sm:text-xs pb-2">Email Address</label>
            <div className="flex focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-none focus-within:rounded-xl">
              <input
                name="email"
                value={message.email || users.email}
                type="email"
                className={`  border-y-1 border-l-1 rounded-l-xl  p-2 sm:text-xs lg:text-14 w-full  lg:h-[50px] sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } `}
                onChange={(e) => handleChange(e)}
              />
              <h1
                className={`border-y-1 flex items-center border-r-1 rounded-r-xl h-[50px] pr-3 text-18 ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } `}
              >
                @
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-14 sm:text-xs pb-2">First Name</label>
              <input
                name="first_name"
                value={message.first_name || users.first_name}
                type="text"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-14 w-full  lg:h-[50px] sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold lg:text-14 sm:text-xs pb-2">Last Name</label>
              <input
                name="last_name"
                value={message.last_name || users.last_name}
                type="text"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-14 w-full  lg:h-[50px] sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-14 sm:text-xs pb-2">Age</label>
              <input
                name="age"
                type="number"
                value={message.age || userProfile.age}
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-14 w-full  lg:h-[50px] sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold lg:text-14 sm:text-xs pb-2">Gender</label>

              <div className="flex gap-x-3">
                <label class="cursor-pointer w-full">
                  <input
                    name="gender"
                    value={male.props.children}
                    type="radio"
                    class="peer sr-only"
                    onChange={(e) => {
                      setGender("MALE");
                      handleChange(e);
                    }}
                    checked={gender == "MALE" ? true : false}
                  />
                  <div class="rounded-xl border-1 text-14 border-gray-300 h-[50px] flex w-full items-center justify-center p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-600 peer-checked:ring-offset-2">
                    Male
                  </div>
                </label>
                <label class="cursor-pointer w-full">
                  <input
                    name="gender"
                    value={female.props.children}
                    type="radio"
                    class="peer sr-only"
                    onChange={(e) => {
                      setGender("FEMALE");
                      handleChange(e);
                    }}
                    checked={gender == "FEMALE" ? true : false}
                  />
                  <div class="rounded-xl border-1 text-14 border-gray-300 h-[50px] flex w-full items-center justify-center p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-blue-600 peer-checked:ring-blue-600 peer-checked:ring-offset-2">
                    Female
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col">
              <label className="font-semibold lg:text-14 sm:text-xs pb-2">Phone Number</label>
              <input
                name="phone_number"
                value={message.phone_number || userProfile.phone_number}
                type="number"
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-14 w-full  lg:h-[50px] sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                placeholder="Not Provided"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold lg:text-14 sm:text-xs pb-2">Occupation</label>
              <input
                name="occupation"
                value={message.occupation || userProfile.occupation}
                className={`  border-1 rounded-xl p-2 sm:text-xs lg:text-14 w-full  lg:h-[50px] sm:h-12 outline-none ${
                  darkMode == "dark" ? "bg-myblack border-none" : "border-gray-300"
                } focus:border-blue-500 focus:border-2`}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-2 px-3 sm:w-fit md:w-fit rounded-lg bg-dark-white lg:w-fit text-14 font-semibold bg-blue-600"
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
