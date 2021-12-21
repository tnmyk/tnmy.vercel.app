import Link from "next/link";
import { useRouter } from "next/router";

const StyledLink = ({ children, href }: { children: string; href: any }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${
          (children === "home" &&
            (router.asPath === "/" || router.asPath === "")) ||
          router.asPath.includes(children)
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
const VerticalNav = () => {
  return (
    <div className="hidden sm:flex fixed h-screen flex flex-col items-center justify-center w-1/4">
      <div className="flex flex-col gap-y-4">
        <StyledLink href="/">home</StyledLink>
        <StyledLink href="/posts">posts</StyledLink>
        <StyledLink href="/projects">projects</StyledLink>
      </div>
    </div>
  );
};

export default VerticalNav;
