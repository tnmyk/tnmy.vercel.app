import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./VerticalNav.module.css";

let isMobile: boolean;
const VerticalNav = ({
  isMenuOpen,
  setMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);
  return (
    <div className={`${styles.container} ${isMenuOpen ? styles.open : ""}`}>
      <div className=" flex flex-col gap-y-4">
        <StyledLink setMenuOpen={setMenuOpen} href="/">
          home
        </StyledLink>
        <StyledLink setMenuOpen={setMenuOpen} href="/posts">
          posts
        </StyledLink>
        <StyledLink setMenuOpen={setMenuOpen} href="/projects">
          projects
        </StyledLink>
      </div>
    </div>
  );
};

export default VerticalNav;

const StyledLink = ({
  children,
  href,
  setMenuOpen,
}: {
  children: string;
  href: any;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        onClick={() => {
          if (!isMobile) return;
          setMenuOpen(false);
        }}
        className={`${
          (children === "home" &&
            (router.pathname === "/" || !router.pathname)) ||
          router.pathname.includes(children)
            ? "verticalNavActive"
            : ""
        } verticalNavLink text-2xl w-fit`}
      >
        {children}
        <span />
      </a>
    </Link>
  );
};
