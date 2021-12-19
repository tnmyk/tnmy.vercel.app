import Link from "next/link";
import { BsMoon } from "react-icons/bs";
const Nav = () => {
  return (
    <nav className="flex justify-between p-10 px-14 w-1/2">
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
