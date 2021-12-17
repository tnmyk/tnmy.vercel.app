import type { NextPage } from "next";
import Experience from "../components/Home/Experience/Experience";
import Posts from "../components/Home/Posts/Posts";
import Profile from "../components/Home/Profile/Profile";
import Projects from "../components/Home/Projects/Projects";

const Home: NextPage = () => {
  return (
    <>
      <Profile />
      <div className="mt-20 text-xl mb-20">
        I like <span className="text-red-200">building.</span>
      </div>
      <span className="text-sm mb-3">experience</span>
      <Experience />
      <span className="text-sm mt-16 mb-3">posts</span>
      <Posts />
      <span className="text-sm mt-16 mb-3">projects</span>
      <Projects />
    </>
  );
};

export default Home;
