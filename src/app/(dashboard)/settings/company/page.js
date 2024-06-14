"use client";

import { useState, useEffect } from "react";
import useToken from "@/hooks/useToken";
import API from "@/api/api";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

const Company = () => {
  const { user, setUser } = useUser();
  const { token } = useToken();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: user?.organizationName || "",
    organizationLogo: null,
  });

  useEffect(() => {
    setFormData({
      organizationName: user?.organizationName || "",
      organizationLogo: null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "organizationLogo" ? files[0] : value;

    const updatedFormData = { ...formData, [name]: newValue };

    const checkIsEmpty = (str) => str.trim().length === 0;

    const isEmpty =
      checkIsEmpty(updatedFormData.organizationName) ||
      !updatedFormData.organizationLogo;

    setUpdated(!isEmpty);
    setFormData(updatedFormData);
  };

  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `organizationLogo/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess({});

    try {
      let profilePhoto = null;

      if (formData.organizationLogo) {
        profilePhoto = await handleFileUpload(formData.organizationLogo);
      }

      const dataToSubmit = {
        organizationName: formData.organizationName,
        ...(profilePhoto && { organizationLogo: profilePhoto }),
      };

      const response = await API.patch("/admin/company", dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200) {
        setUser({ ...user, ...formData });
        localStorage.setItem(
          "userProfile",
          JSON.stringify({ ...user, ...formData })
        );
        setSuccess({ message: "Update complete" });
        return;
      }

      setErrors({
        message: response.message || "Something went wrong. failed.",
      });
    } catch (error) {
      setErrors({
        message: error.response?.data.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input
          name="organizationName"
          type="text"
          value={formData.organizationName}
          onChange={handleChange}
          className="relative"
        >
          Company Name
        </Form.Input>
        <Form.Input
          name="organizationLogo"
          type="file"
          onChange={handleChange}
          accept="image/*"
        >
          Profile Picture
        </Form.Input>
        <Button
          type="submit"
          as="button"
          onClick={handleSubmit}
          disabled={!updated}
        >
          {loading && <Button.Spinner />} Update Company Info
        </Button>
      </div>
      {errors?.message && <Form.Error>{errors.message}</Form.Error>}
      {success?.message && <Form.Success>{success.message}</Form.Success>}
    </Form>
  );
};

export default Company;
