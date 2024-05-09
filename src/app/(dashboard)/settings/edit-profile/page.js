"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";

import { getUserProfile, useUser } from "@/context/UserContext";
import useToken from "@/hooks/useToken";

import Form from "@/components/Form";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { user: userDefaults } = useUser();
  const { token } = useToken();
  const router = useRouter();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    imageUrl: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setUser((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    setUser({
      first_name: userDefaults?.first_name,
      last_name: userDefaults?.last_name,
      imageUrl: userDefaults?.imageUrl,
      bio: userDefaults?.bio,
    });
  }, [userDefaults]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Log the data
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(token);
    try {
      const res = await API(`/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.status === 200) {
        localStorage.removeItem("userProfile");
        await getUserProfile();
        router.push("/profile");
      } else {
        setErrors(res.message);
      }
      console.log(res, "res");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setErrors(err.message);
    }
  };

  return (
    <Form
      className="mx-auto"
      errors={errors}
      setErrors={setErrors}
      handleSubmit={handleSubmit}
    >
      <div className="space-y-10">
        <Form.Input
          name="first_name"
          value={user?.first_name}
          onChange={handleChange}
        >
          First Name
        </Form.Input>

        <Form.Input
          name="last_name"
          value={user?.last_name}
          onChange={handleChange}
        >
          Last Name
        </Form.Input>

        <Form.Input name="imageUrl" type="file" onChange={handleChange}>
          Profile Picture
        </Form.Input>

        <Form.Input
          name="bio"
          value={user?.bio}
          rows={5}
          onChange={handleChange}
        >
          Bio
        </Form.Input>

        <Button type="submit" as="button">
          {loading ? "Saving ..." : "Save Changes"}
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
