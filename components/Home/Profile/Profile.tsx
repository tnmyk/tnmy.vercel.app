import { AiFillGithub } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
const Profile = () => {
  return (
    <div className="flex justify-between items-center gap-x-16 mt-12">
      <img src="./pfp1.jpg" className="rounded-full w-36" />
      <div>
        <h1 className="font-medium text-3xl">tanmay kachroo</h1>
        <div className=" text-gray-200 mt-1 mb-4">fullstack dev</div>
        <div className="flex items-center text-xl gap-3">
          <a href="/">
            <AiFillGithub />
          </a>
          <a href="/">
            <BsTwitter />
          </a>
          <a href="/">
            <GrLinkedinOption />
          </a>
          <a href="/">
            <SiDiscord />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Profile;
