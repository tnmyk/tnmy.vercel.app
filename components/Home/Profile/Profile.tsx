import Link from "next/link";
import { useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
import profileData from "./profileData";
const Profile = () => {
  useEffect(() => {
    var prevScrollpos = 120;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos < currentScrollPos) {
        document.getElementById("profile")?.classList.add("profileleft");
      } else {
        document.getElementById("profile")?.classList.remove("profileleft");
      }
    };
  }, []);
  return (
    <div style={{ minHeight: "14rem" }} className="relative w-full  flex justify-center">
      <div id="profile" className="w-fit">
        <div className="scale-80 flex-col sm:flex-row  gap-y-6 gap-x-8 sm:scale-75 md:scale-90 lg:scale-100 flex justify-between items-center sm:gap-x-16 mt-12">
          <img src="./pfp1.jpg" className="rounded-full w-36" />
          <div className="flex flex-col items-center sm:block">
            <h1 className="font-medium text-3xl w-max">tanmay kachroo</h1>
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
      </div>
    </div>
  );
};
export default Profile;
