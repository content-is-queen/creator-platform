"use client";

import API from "@/api/api";

import { twMerge } from "tailwind-merge";
import { useState } from "react";

import useAuth from "@/hooks/useAuth";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { inputStyles } from "@/components/Form";

const ProposalForm = ({ opportunityId }) => {
  const {
    user: { user_id },
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (opportunityId, userId) => {
    const postData = {
      opportunity_id: opportunityId,
      user_id: userId,
      proposal: proposal,
    };

    try {
      await API.post("/applications", postData);
      window.location.reload();
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setErrors({
        message: "Something went wrong...",
      });
      console.error(message);
    }
  };

  return (
    <>
      <Button as="button" type="submit" onClick={() => setIsOpen(true)}>
        Send Proposal
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Apply">
        <Form
          errors={errors}
          setErrors={setErrors}
          handleSubmit={() => handleSubmit(opportunityId, user_id)}
        >
          <Form.Textarea
            name="proposal"
            onChange={(e) => setProposal(e.target.value)}
            rows={10}
            minlength="5"
            required
          >
            Tell us your plan of action
          </Form.Textarea>

          <Button as="button" type="submit" className="mt-8">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ProposalForm;
