import Experience from "../components/Home/Experience/Experience";
import Posts from "../components/Home/Posts/Posts";
import Profile from "../components/Home/Profile/Profile";
import Projects from "../components/Home/Projects/Projects";
import { Client } from "@notionhq/client";

const Home = ({
  posts,
  projects,
}: {
  posts: Array<{ [key: string]: any }>;
  projects: Array<{ [key: string]: any }>;
}) => {
  return (
    <>
      <Profile />
      <div className="mt-20 text-xl mb-20">
        I like <span className="text-red-200">building.</span>
      </div>
      <span className="text-sm mb-3">experience</span>
      <Experience />
      <span className="text-sm mt-16 mb-3">posts</span>
      <Posts posts={posts} />
      <span className="text-sm mt-16 mb-3">projects</span>
      <Projects projects={projects} />
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
