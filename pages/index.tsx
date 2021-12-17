import type { NextPage } from "next";
import Experience from "../components/Home/Experience/Experience";
import Profile from "../components/Home/Profile/Profile";

const Home: NextPage = () => {
  return (
    <>
      <Profile />
      <div className="mt-20 text-xl mb-20">
        I like <span className="text-red-200">building.</span>
      </div>
      <Experience />
    </>
  );
};

export default Home;
