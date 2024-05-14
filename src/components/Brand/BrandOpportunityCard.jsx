"use client";

import { Suspense, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import Modal from "@/components/Modal";
import SubMenu from "@/components/SubMenu";
import ApplicationsModal from "@/components/Brand/ApplicationsModal";

import API from "@/api/api";
import EditOpportunityForm from "./EditOpportunityForm";
import Spinner from "../Spinner";
import useToken from "@/hooks/useToken";

const BrandOpportunityCard = (props) => {
  const token = useToken();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

  const { compensation, deadline, status, title, opportunity_id } = props;

  const statusLabel = status.replace("_", " ");

  const editOpportunity = () => {
    setIsEditOpen(true);
  };

  const deleteOpportunity = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        const response = await API(`/opportunities/opportunityid/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const subMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Card className="inline-block space-y-4 w-full max-w-sm relative">
        <div className="flex gap-x-3 content-start items-center">
          <p className="text-lg text-queen-black capitalize truncate max-w-full w-60">
            {title}
          </p>
          <button
            type="button"
            className="ml-auto pl-2"
            onClick={subMenuToggle}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>

          {menuOpen && (
            <SubMenu>
              <SubMenu.Item>
                <button
                  type="button"
                  onClick={() => editOpportunity(opportunity_id)}
                  className="px-4 py-1 w-full text-left inline-block"
                >
                  Edit
                </button>
              </SubMenu.Item>
              <SubMenu.Item>
                <button
                  type="button"
                  onClick={() => deleteOpportunity(opportunity_id)}
                  className="px-4 py-1 w-full text-left inline-block"
                >
                  Delete
                </button>
              </SubMenu.Item>
            </SubMenu>
          )}
        </div>

        <div className="flex gap-6 items-center">
          <div className="flex flex-col">
            <Text as="span" color="muted" size="xs">
              Compensation
            </Text>
            <Text as="span" size="sm">
              {compensation}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text as="span" color="muted" size="xs">
              Deadline
            </Text>
            <Text as="span" size="sm">
              {deadline}
            </Text>
          </div>
          <div>
            <Tag>{statusLabel}</Tag>
          </div>
        </div>

        <Button
          variant="white"
          type="button"
          as="button"
          onClick={() => setIsApplicationsOpen(true)}
        >
          View Applications
        </Button>
        <Suspense fallback={<Spinner />}>
          {isApplicationsOpen && (
            <ApplicationsModal
              isApplicationsOpen={isApplicationsOpen}
              setIsApplicationsOpen={setIsApplicationsOpen}
              opportunityId={opportunity_id}
              opportunityTitle={title}
            />
          )}
        </Suspense>
      </Card>
      <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <EditOpportunityForm {...props} />
      </Modal>
    </>
  );
};

export default BrandOpportunityCard;