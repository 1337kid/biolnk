"use client";
import { useEffect } from "react";
import { handleImageUpload, handleProfileDataSubmit } from "@/actions/profile";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { getProfileData } from "@/actions/profile";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { IoMdSave } from "react-icons/io";
import { IoCloudUploadSharp } from "react-icons/io5";
import isUrl from 'is-url';

const ProfileForm = () => {
  const [data, setData] = useState({
    profileName: "",
    urlPath: "",
    bio: "",
  });
  const [links, setLinks] = useState([{link:"",title:""}]);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    getProfileData().then(data => {
      setData({
        profileName: data?.name as string,
        urlPath: data?.urlpath  as string,
        bio: data?.bio  as string
      })
      if (data?.links == null) setLinks([]);
      else setLinks(data?.links as any);
      setIsLoading(false);
    });
  },[])

  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.profileName) {
      toast.error(`Error: Name cannot be empty`);
      return;
    }
    const invalidLinkFound = links.some((item) => {
      if (!isUrl(item.link)) {
        toast.error(`Error: ${item.link} is not a valid URL`);
        return true;
      }
      return false;
    });
    if (invalidLinkFound) return;
    let regex = /^[a-zA-Z0-9_.-]+$/;
    if (data.urlPath.match(regex)) {
        toast.info('Updating Data. Please wait');
        handleProfileDataSubmit(
            data.profileName,
            data.urlPath,
            data.bio,
            links
        ).then(data => {
          if (data?.error) toast.error(data.error);
          else toast.success(data?.message);
        });
        return;
    }
    toast.error('URL path can only contain A-Z, a-z, 0-9 , - , . , and _');
    toast.error('Remove "/" if you have included it in the urlpath')
  }

  const handleProfileImageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profilePic) {
      toast.info('Uploading Profile Image. Please wait');
      const form = new FormData();
      form.append('file', profilePic)
      handleImageUpload(form, '_profile').then(data => {
        if (data?.error) toast.error(data.error);
        else toast.success(data?.message);
      });
    } else {
      toast.error('Select an image first');
    }
  }

  const handleBannerUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (banner) {
      toast.info('Uploading banner. Please wait');
      const form = new FormData();
      form.append('file', banner)
      handleImageUpload(form, '_banner').then(data => {
        if (data?.error) toast.error(data.error);
        else toast.success(data?.message);
      });
    } else {
      toast.error('Select an image first');
    }
  }

  if (isLoading) return (
    <div className="flex justify-center items-center m-auto">
      <CirclesWithBar
        height="100"
        width="100"
        color="#9333ea"
        outerCircleColor="#7c3aed"
        innerCircleColor="#9333ea"
        barColor="#7c3aed"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
  )
  else return (
    <div className='text-violet-300 w-full'>
      <div className="flex flex-col">
        <form
          className="flex flex-col gap-2 my-2"
          onSubmit={handleProfileImageSubmit}
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
          RightIcon={<IoCloudUploadSharp/>}
          styles="justify-between"
        />
        </form>
        <form
          className="flex flex-col gap-2 my-2"
          onSubmit={handleBannerUpload}
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
          RightIcon={<IoCloudUploadSharp/>}
          styles="justify-between"
        />

        </form>
      </div>
      <form
        className="flex flex-col gap-2 w-full my-2"
        onSubmit={(e) => handleDataSubmit(e)}
      >
        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Profile Data</label>
        <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
          <span className="font-[450]">Name</span>
          <input
            className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
            placeholder="Your name here"
            onChange={(e) => setData({...data, profileName: e.target.value})}
            value={data.profileName}
          />
        </label>

        <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
          <span className="font-[450]">Bio</span>
          <input
            className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
            placeholder="Short bio here"
            onChange={(e) => setData({...data, bio: e.target.value})}
            value={data.bio}
          />
        </label>

        <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
          <span className="font-[450]">URL Path</span>
          <input
            className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
            placeholder="/urlpath"
            onChange={(e) => setData({...data, urlPath: e.target.value})}
            value={data.urlPath}
          />
        </label>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Profile Links</label>
        {links && links.length != 0 &&  links.map((item,index) => 
          <div key={index} className="flex">
            <div className="flex flex-col gap-2 bg-black p-2 rounded-l-lg">
              <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
                <span className="font-[450]">Title</span>
                <input
                  className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
                  placeholder="Title"
                  onChange={(e) => {
                    const updatedLinks = [...links];
                    updatedLinks[index] = {...updatedLinks[index], title: e.target.value};
                    setLinks(updatedLinks);
                  }}
                  value={item.title}
                />
              </label>
              <label className="flex gap-2 bg-zinc-900 p-1 rounded-lg items-center justify-between">
                <span className="font-[450]">Link</span>
                <input
                  className="rounded-lg p-1 bg-zinc-700 focus:outline-none focus:outline-purple-500"
                  placeholder="Link"
                  onChange={(e) => {
                    const updatedLinks = [...links];
                    updatedLinks[index] = {...updatedLinks[index], link: e.target.value};
                    setLinks(updatedLinks);
                  }}
                  value={item.link}
                />
              </label>
            </div>
            <button
              type="button"
              className="flex w-4/12 bg-zinc-800 rounded-r-lg hover:bg-red-400 hover:cursor-pointer items-center"
              onClick={() => {
                setLinks(links.filter((_, i) => i !== index));
              }}
            >
              <MdDelete className="text-[40px]"/>
            </button>   
          </div>
         )}
        <CustomButton
          type="button"
          text="Add New field"
          RightIcon={<IoMdAdd/>}
          varient="navbar"
          styles="justify-between"
          handleClick={() => {
            setLinks([...links, {link: "", title: ""}]);
          }}
        />
        <CustomButton
          text="Save Data"
          varient="form"
          RightIcon={<IoMdSave/>}
          styles="justify-between"
        />
      </form>
    </div>
  )
}

export default ProfileForm;