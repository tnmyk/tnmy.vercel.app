import { Client } from "@notionhq/client";
import Projects from "../components/Home/Projects/Projects";
const ProjectsPage = ({
  projects,
}: {
  projects: Array<{ [key: string]: any }>;
}) => {
  return (
    <div className="flex flex-col w-full items-center mt-8">
      <h1 className="mb-3">projects</h1>
      <Projects projects={projects} />
    </div>
  );
};
export default ProjectsPage;

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY });

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
      projects: projectsResponse.results,
    },
    revalidate: 10,
  };
}
