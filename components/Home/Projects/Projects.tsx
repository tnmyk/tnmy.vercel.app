import { BsArrowUpRight, BsGithub } from "react-icons/bs";

const Projects = ({
  projects,
}: {
  projects: Array<{ [key: string]: any }>;
}) => {
  return (
    <>
      {projects.map((project, index) => {
        return <ProjectCard key={index} project={project} />;
      })}
    </>
  );
};
export default Projects;

const ProjectCard = ({ project }: { [key: string]: any }) => {
  return (
    <div className="border border-neutral-700 rounded-md w-5/12 flex justify-between items-center p-2 px-4 mb-2">
      <div className="flex flex-col ">
        <span className="text-xl leading-5 mt-3">
          {project.properties.Name.title[0].plain_text}
        </span>
        <span className="text-sm text-gray-300">
          {project.properties.Description.rich_text[0].plain_text}
        </span>
      </div>
      <div className="flex gap-x-4">
        <a
          className="bg-white text-gray-900 font-bold text-sm flex items-center justify-center gap-x-1 px-3 pt-1  rounded-full"
          target="_blank"
          rel="noreferrer"
          href={project.properties.Visit.url}
        >
          visit <BsArrowUpRight />
        </a>
        <a
          className="bg-white text-gray-900 font-bold text-sm flex items-center justify-center gap-x-1 px-3  pt-1 rounded-full"
          target="_blank"
          rel="noreferrer"
          href={project.properties.Github.url}
        >
          github <BsGithub />
        </a>
      </div>
    </div>
  );
};
