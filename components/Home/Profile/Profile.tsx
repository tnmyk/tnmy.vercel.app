import Link from "next/link";
import { useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
import userData from "../../userData";
const Profile = () => {
  useEffect(() => {
    var prevScrollpos = 20;
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
    <div
      style={{ minHeight: "14rem" }}
      className="relative w-fit  flex justify-center"
    >
      <div id="profile" className="w-fit">
        <div className="scale-80 flex-col sm:flex-row  gap-y-6 gap-x-8 sm:scale-75 md:scale-90 lg:scale-100 flex justify-between items-center sm:gap-x-16 mt-12">
          <img src="./images/pfp.jpg" className="rounded-full w-36" />
          <div
            id="profileText"
            className="profileText flex flex-col items-center sm:block"
          >
            <h1 className="font-medium text-3xl w-max">{userData.name}</h1>
            <div className=" text-gray-200 mt-1 mb-4">{userData.bio}</div>
            <div className="flex items-center text-xl gap-3">
              {userData.twitter && (
                <a href={userData.twitter} target="_blank" rel="noreferrer">
                  <BsTwitter />
                </a>
              )}
              {userData.github && (
                <a href={userData.github} target="_blank" rel="noreferrer">
                  <AiFillGithub />
                </a>
              )}
              {userData.discord && (
                <a href={userData.discord} target="_blank" rel="noreferrer">
                  <SiDiscord />
                </a>
              )}
              {userData.linkedIn && (
                <a href={userData.linkedIn} target="_blank" rel="noreferrer">
                  <GrLinkedinOption />
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
