import parse from "html-react-parser";

import Text from "../Text";
import Heading from "@/components/Heading";
import Subheading from "../Subheading";

const Pitch = ({
  title,
  description,
  targetAudience,
  contentDuration,
  contentType,
  budget,
  keyMessage,
}) => (
  <div className="space-y-8">
    <div>
      <Heading size="4xl" className="mb-1 text-balance">
        {title}
      </Heading>
      <Text className="capitalize">{budget}</Text>
    </div>
    <div className="space-y-8 min-h-24 max-w-lg">
      <div>
        <Subheading size="xl" className="mb-2">
          Description
        </Subheading>
        <div className="format">{parse(description)}</div>
      </div>
      {targetAudience.length > 0 && (
        <div>
          <Subheading size="xl" className="mb-1">
            Target Audience
          </Subheading>
          {targetAudience.join(",")}
        </div>
      )}
      {contentDuration && (
        <div>
          <Subheading size="xl">Expected Content Duration</Subheading>
          <Text>{contentDuration}</Text>
        </div>
      )}
      {contentType && (
        <div>
          <Subheading>Type of content</Subheading>
          <Text>{contentType}</Text>
        </div>
      )}
      {keyMessage && (
        <div>
          <Subheading>Key Message or Theme</Subheading>
          <Text>{keyMessage}</Text>
        </div>
      )}
    </div>
  </div>
);
export default Pitch;
