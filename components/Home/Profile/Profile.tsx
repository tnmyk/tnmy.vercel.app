import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
import profileData from "./profileData";
const Profile = () => {
  return (
    <div className="flex justify-between items-center gap-x-16 mt-12">
      <img src="./pfp1.jpg" className="rounded-full w-36" />
      <div>
        <h1 className="font-medium text-3xl">tanmay kachroo</h1>
        <div className=" text-gray-200 mt-1 mb-4">fullstack dev</div>
        <div className="flex items-center text-xl gap-3">
          {profileData.github && (
            <a href={profileData.github} target="_blank" rel="noreferrer">
              <AiFillGithub />
            </a>
          )}
          {profileData.twitter && (
            <a href={profileData.twitter} target="_blank" rel="noreferrer">
              <BsTwitter />
            </a>
          )}
          {profileData.linkedIn && (
            <a href={profileData.linkedIn} target="_blank" rel="noreferrer">
              <GrLinkedinOption />
            </a>
          )}
          {profileData.discord && (
            <a href={profileData.discord} target="_blank" rel="noreferrer">
              <SiDiscord />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
