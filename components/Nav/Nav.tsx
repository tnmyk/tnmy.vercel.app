import Link from "next/link";
import { BsMoon } from "react-icons/bs";
const Nav = () => {
  return (
    <nav className="flex justify-between items-center p-6 sm:p-10 sm:px-14 sm:w-5/6 md:w-1/2 w-11/12">
      <Link href="/">
        <a className="font-medium text-lg">tnmyk</a>
      </Link>
      <button className="h-10 w-10 flex items-center justify-center rounded-md bg-neutral-800">
        <BsMoon />
      </button>
    </nav>
  );
};
export default Nav;
