import Link from "next/link";
import { useRouter } from "next/router";
import { Url } from "url";

const StyledLink = ({ children, href }: { children: String; href: any }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        style={{
          borderBottom: router.asPath === href ? "3px solid pink" : "",
        }}
        className="text-2xl w-fit"
      >
        {children}
      </a>
    </Link>
  );
};
const VerticalNav = () => {
  return (
    <div className="fixed h-full flex flex-col items-center justify-center w-1/4">
      <div className="flex flex-col gap-y-4">
        <StyledLink href="/">home</StyledLink>
        <StyledLink href="/posts">posts</StyledLink>
        <StyledLink href="/projects">projects</StyledLink>
      </div>
    </div>
  );
};

export default VerticalNav;