const Projects = ({
  projects,
}: {
  projects: Array<{ [key: string]: any }>;
}) => {
  return (
    <>
      {projects.map((project) => {
        return <ProjectCard project={project} />;
      })}
    </>
  );
};
export default Projects;

const ProjectCard = ({ project }: { [key: string]: any }) => {
  return (
    <div className="border border-neutral-500 rounded-md w-1/2 flex justify-between items-center p-3 mb-2">
      <div className="flex flex-col">
        <span className="text-lg">
          {project.properties.Name.title[0].plain_text}
        </span>
        <span className="text-sm">
          {project.properties.Description.rich_text[0].plain_text}
        </span>
      </div>
      <div className="flex gap-x-4">
        <a href={project.properties.Visit.url}>visit</a>
        <a href={project.properties.Github.url}>github</a>
      </div>
    </div>
  );
};
