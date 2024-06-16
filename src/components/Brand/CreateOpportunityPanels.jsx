import clsx from "clsx";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Panel from "@/components/Panel";

import formData from "@/data/opportunity_form_data.json";
import Subheading from "../Subheading";

const CreateOpportunityPanels = () => {
  return (
    <div className="flex flex-col gap-3 text-black lg:flex-row">
      {Object.entries(formData).map(([name, opp]) => {
        let classes;
        switch (name) {
          case "job":
            classes = {
              panel: "bg-queen-blue",
              arrow: "text-queen-blue",
            };
            break;
          case "campaign":
            classes = {
              panel: "bg-queen-black",
              arrow: "text-queen-black",
            };
            break;
          default:
            classes = {
              panel: "bg-queen-orange",
              arrow: "text-queen-orange",
            };
        }

        return (
          <Panel
            key={name}
            className={clsx(
              "flex flex-col  text-white bg-lilac-dots-circle justify-between basis-1/3 max-w-sm mx-auto relative transition-all bottom-0 hover:bottom-1",
              classes.panel
            )}
          >
            <div>
              <Subheading as="h2" size="xl" className="my-3">
                {opp.label}
              </Subheading>
              <p className="tracking-wide leading-5"> {opp.description}</p>
            </div>
            <Link
              href={{
                pathname: `/opportunities/create/${name}`,
              }}
              className="bg-white h-7 w-7 self-end justify-self-end flex items-center justify-center rounded-full mt-20 after:absolute after:left-0 after:top-0 after:w-full after:h-full"
            >
              <FontAwesomeIcon
                className={clsx(classes.arrow, "h-3 w-3")}
                icon={faArrowRight}
              />
            </Link>
          </Panel>
        );
      })}
    </div>
  );
};

export default CreateOpportunityPanels;
