import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./VerticalNav.module.css";
const VerticalNav = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);
  return (
    <div className={`${styles.container} ${isMenuOpen ? styles.open : ""}`}>
      <div className=" flex flex-col gap-y-4">
        <StyledLink href="/">home</StyledLink>
        <StyledLink href="/posts">posts</StyledLink>
        <StyledLink href="/projects">projects</StyledLink>
      </div>
    </div>
  );
};

export default VerticalNav;

const StyledLink = ({ children, href }: { children: string; href: any }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
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
