const Projects = () => {
  return (
    <>
      <ProjectCard />
    </>
  );
};
export default Projects;

const ProjectCard = () => {
  return (
    <div className="border border-neutral-500 rounded-md w-1/2 flex justify-between items-center p-3">
      <div className="flex flex-col">
        <span className="text-lg">learn blockchain webapp</span>
        <span className="text-sm">what does this project do</span>
      </div>
      <div className="flex gap-x-4">
        <a href="/">visit</a>
        <a href="/">github</a>
      </div>
    </div>
  );
};
