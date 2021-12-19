import experienceData from "./experienceData";

const Experience = () => {
  return (
    <>
      {experienceData.map((exp) => {
        return <ExperienceCard exp={exp} />;
      })}
    </>
  );
};

export default Experience;

const ExperienceCard = ({ exp }: { exp: { [key: string]: string } }) => {
  return (
    <div
      className="flex justify-between items-center border border-neutral-600 p-2 px-6 rounded-md mb-3 "
      style={{ width: "44%" }}
    >
      <div className="flex flex-col  mt-3" style={{ lineHeight: "0.5rem" }}>
        <span
          className="font-medium text-gray-300 "
          style={{ fontSize: "0.8rem" }}
        >
          {exp.position}
        </span>
        <span className="text-lg">{exp.company}</span>
      </div>
      <div className="text-gray-300 mt-1 mr-4" style={{ fontSize: "0.82rem" }}>
        {exp.duration}
      </div>
    </div>
  );
};
