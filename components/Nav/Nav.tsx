import { BsMoon } from "react-icons/bs";
const Nav = () => {
  return (
    <nav className="flex justify-between p-10 px-14 w-1/2">
      <div className="font-medium text-lg">tnmyk</div>
      <button className="h-10 w-10 flex items-center justify-center rounded-md bg-neutral-800">
        <BsMoon />
      </button>
    </nav>
  );
};
export default Nav;
