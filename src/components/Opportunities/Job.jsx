import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Text from "../Text";
import Heading from "@/components/Heading";
import Subheading from "../Subheading";

const Job = ({
  title,
  description,
  category,
  location,
  experience,
  skills,
  salary,
  benefits,
  deadline,
}) => (
  <div className="space-y-8">
    <div>
      <Heading size="3xl" className="mb-1">
        {title}
      </Heading>
      <Text className="capitalize">
        {category} &bull; {location} &bull; {salary}
      </Text>
    </div>
    <div className="space-y-5 min-h-24 max-w-lg">
      <div>
        <Subheading>About the opportunity</Subheading>
        <Text>{description}</Text>
      </div>
      <div>
        <Subheading className=" mb-1">Skills</Subheading>
        <ul>
          {skills.map((skill) => (
            <li key={skill} className="flex gap-2 items-center">
              <span className="text-queen-black border border-queen-black/60 rounded-full h-4 w-4 flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} className="h-2.5" />
              </span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
      {benefits && (
        <div>
          <Subheading>Benefits</Subheading>
          <Text>{benefits}</Text>
        </div>
      )}
      {experience && (
        <div>
          <Subheading>Experience</Subheading>
          <Text>{experience}</Text>
        </div>
      )}
      <div>
        <Subheading>Deadline</Subheading>
        <Text>{deadline}</Text>
      </div>
    </div>
  </div>
);

export default Job;
