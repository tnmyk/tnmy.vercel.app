import Link from "next/link";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
const Nav = ({
  setMenuOpen,
  isMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className="flex justify-between items-center p-6 sm:p-10 sm:px-14 sm:w-5/6 md:w-1/2 w-11/12 z-20">
      <Link href="/">
        <a className="font-medium text-lg">tnmyk</a>
      </Link>
      <button
        onClick={() => {
          setMenuOpen((prev) => {
            return !prev;
          });
        }}
        className="h-9 w-9 flex items-center justify-center rounded-md bg-neutral-800"
      >
        {isMenuOpen ? <IoMdClose /> : <RiMenu4Fill />}
      </button>
    </nav>
  );
};
export default Nav;
