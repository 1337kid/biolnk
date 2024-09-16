"use client";
import { handleImageUpload, handleProfileDataSubmit } from "@/actions/profile";
import { useState } from "react";
import CustomButton from "./CustomButton";

const ProfileForm = () => {
  const [data, setData] = useState({
    profileName: "",
    urlPath: "",
    bio: ""
  });
  const [links, setLinks] = useState([]);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null)
  
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
      <div className="flex flex-col">
        <form
          className="flex flex-col gap-2 my-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (profilePic) {
              const form = new FormData();
              form.append('file', profilePic)
              handleImageUpload(form, '_profile');
            }
          }}
        >
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Upload Profile Pic</label>
          <input 
            className="block w-full text-md text-gray-900 border border-zinc-800 rounded-lg cursor-pointer bg-zinc-800 dark:text-gray-400 focus:outline-none dark:bg-zinc-900 dark:border-zinc-950 dark:placeholder-gray-400 file:border-0 file:p-2 file:mr-4 file:bg-zinc-700 file:text-purple-300"
            type="file"
            onChange={(e) => {
              if (e.target.files) setProfilePic(e.target.files[0])
            }}
          />
        <CustomButton
          text="Upload Profile Pic"
          varient="form"
        />
        </form>
        <form
          className="flex flex-col gap-2 my-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (banner) {
              const form = new FormData();
              form.append('file', banner)
              handleImageUpload(form, '_banner');
            }
          }}
        >
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Upload Banner</label>
          <input 
            className="w-full text-md text-gray-900 border border-zinc-800 rounded-lg cursor-pointer bg-zinc-800 dark:text-gray-400 focus:outline-none dark:bg-zinc-900 dark:border-zinc-950 dark:placeholder-gray-400 file:border-0 file:p-2 file:mr-4 file:bg-zinc-700 file:text-purple-300"
            type="file"
            onChange={(e) => {
              if (e.target.files) setBanner(e.target.files[0])
            }}
          />
        <CustomButton
          text="Upload Banner"
          varient="form"
        />

        </form>
      </div>
      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Profile Data</label>
      <form
        className="flex flex-col gap-2 w-full"
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