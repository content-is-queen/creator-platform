"use client";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import { useRef, useState } from "react";

import Button from "@/components/Button";
import Form from "@/components/Form";

import formData from "@/data/opportunity_form_data.json";

const CreateOpportunityForm = ({ type }) => {
  const fields = formData[type].fields;
  const { user } = useUser();

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const form = useRef();

  const handleSubmit = async (fields, userId) => {
    setLoading(true);
    const formData = new FormData(form.current);

    const keys = fields.reduce((acc, current) => {
      const { name, type, options } = current;

      if (type === "checkbox") {
        return [...acc, { [name]: options }];
      }

      return [...acc, name];
    }, "");

    const postData = { type: type, user_id: userId };

    keys.forEach((key) => {
      if (typeof key === "object") {
        const name = Object.keys(key)[0];

        postData[name] = [];

        key[name].forEach((option) => {
          if (formData.get(option) != null) {
            postData[name].push(option);
          }
        });

        return;
      }
      postData[key] = formData.get(key);
    });

    try {
      const response = await API.post("/opportunities", postData, {
        headers: { "Content-Type": "application/json" },
      });

      window.location = "/";
    } catch (err) {
      setError({
        message: err.response.data.message,
      });

      console.error(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      ref={form}
      errors={errors}
      setError={setError}
      handleSubmit={() => handleSubmit(fields, user.uid)}
    >
      <div className="space-y-10">
        {fields.map(({ children, as, type, name, options, ...otherProps }) => {
          if (as === "select") {
            return (
              <Form.Select
                key={name}
                name={name}
                options={options}
                {...otherProps}
              >
                {children}
              </Form.Select>
            );
          }

          if (as === "datalist") {
            return (
              <Form.Datalist
                key={name}
                name={name}
                options={options}
                {...otherProps}
              >
                {children}
              </Form.Datalist>
            );
          }

          if (as === "textarea") {
            return (
              <Form.Textarea key={name} name={name} {...otherProps}>
                {children}
              </Form.Textarea>
            );
          }

          if (type === "checkbox") {
            return (
              <Form.Checkbox
                key={name}
                name={name}
                options={options}
                {...otherProps}
              >
                {children}
              </Form.Checkbox>
            );
          }
          return (
            <Form.Input key={name} name={name} type={type} {...otherProps}>
              {children}
            </Form.Input>
          );
        })}
      </div>

      <Button as="button" type="submit" className="mt-8">
        {loading && <Button.Spinner />} Submit
      </Button>
    </Form>
  );
};

export default CreateOpportunityForm;
