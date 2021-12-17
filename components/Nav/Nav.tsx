import { BsMoon } from "react-icons/bs";
const Nav = () => {
  return (
    <nav className="flex justify-between p-10 px-14 w-1/2">
      <div className="font-medium text-md">tnmyk</div>
      <button className="h-8 w-8 flex items-center justify-center rounded bg-neutral-800">
        <BsMoon />
      </button>
    </nav>
  );
};
export default Nav;
