import { Client } from "@notionhq/client";
import Head from "next/head";
import { BsGithub } from "react-icons/bs";
import Projects from "../components/Home/Projects/Projects";
import userData from "../components/userData";
const ProjectsPage = ({
  projects,
}: {
  projects: Array<{ [key: string]: any }>;
}) => {
  return (
    <>
      <Head>
        <title>projects</title>
      </Head>
      <div className="flex flex-col w-full items-center mt-8">
        <h1 className="mb-3">projects</h1>
        <Projects projects={projects} />
      </div>
      <a
        href={userData.github}
        target="_blank"
        rel="noreferrer"
        className="mt-10 text-gray-300 text-sm underline"
      >
        view more on my github <BsGithub className="inline" />
      </a>
    </>
  );
};
export default ProjectsPage;

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const projectsResponse = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DATABASE_ID!,
    sorts: [
      {
        property: "Rank",
        direction: "ascending",
      },
    ],
  });
  return {
    props: {
      projects: projectsResponse.results,
    },
    revalidate: 10,
  };
}
