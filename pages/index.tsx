import Experience from "../components/Home/Experience/Experience";
import Posts from "../components/Home/Posts/Posts";
import Profile from "../components/Home/Profile/Profile";
import Projects from "../components/Home/Projects/Projects";
import { Client } from "@notionhq/client";
import Head from "next/head";
import Contact from "../components/Home/Contact/Contact";
import userData from "../userData";

const Home = ({
  posts,
  projects,
}: {
  posts: Array<{ [key: string]: any }>;
  projects: Array<{ [key: string]: any }>;
}) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Profile />
      <div className="mt-12 text-xl mb-20">{userData.quote}</div>
      <span className="text-sm mb-3">experience</span>
      <Experience />
      <span className="text-sm mt-16 mb-3">posts</span>
      <Posts posts={posts} />
      <span className="text-sm mt-16 mb-3">projects</span>
      <Projects projects={projects} />
      <Contact />
      <div className="border-t-2 h-6 w-4/5 sm:w-5/12 mt-28 border-neutral-600" />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const postsResponse = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Tags",
          multi_select: {
            contains: "homepage",
          },
        },
      ],
    },
  });
  const projectsResponse = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Tags",
          multi_select: {
            contains: "homepage",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Rank",
        direction: "ascending",
      },
    ],
  });
  return {
    props: {
      posts: postsResponse.results,
      projects: projectsResponse.results,
    },
    revalidate: 10,
  };
}
