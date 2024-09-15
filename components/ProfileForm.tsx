"use client";
import { handleProfileDataSubmit } from "@/actions/profile";
import { useState } from "react";
import CustomButton from "./CustomButton";

const ProfileForm = () => {
  const [data, setData] = useState({
    profileName: "",
    urlPath: "",
    bio: ""
  });
  const [links, setLinks] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [banner, setBanner] = useState(null)
  
  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regex = /^[a-zA-Z0-9_-]+$/;
    if (data.urlPath.match(regex)) {
        handleProfileDataSubmit(
            data.profileName,
            data.urlPath,
            data.bio,
            links
        );
        return;
    }
    alert("url path can only contain A-Z, a-z, 0-9 ,-,_")
  }

  return (
    <div className='text-violet-300'>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => handleDataSubmit(e)}
      >
        
        <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
          <span className="font-[450]">Name</span>
          <input
            className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
            placeholder="Your name here"
            onChange={(e) => setData({...data, profileName: e.target.value})}
          />
        </label>

        <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
          <span className="font-[450]">Bio</span>
          <input
            className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
            placeholder="Short bio here"
            onChange={(e) => setData({...data, bio: e.target.value})}
          />
        </label>

        <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
          <span className="font-[450]">URL Path</span>
          <input
            className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
            placeholder="/urlpath"
            onChange={(e) => setData({...data, urlPath: e.target.value})}
          />
        </label>

        <CustomButton
          text="Save Data"
          varient="form"
        />
      </form>
    </div>
  )
}

export default ProfileForm;