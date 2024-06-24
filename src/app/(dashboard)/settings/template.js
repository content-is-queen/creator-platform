"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import API from "@/api/api";

import Container from "@/components/Container";
import Subheading from "@/components/Subheading";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Form from "@/components/Form";

const Template = ({ children }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const { token } = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const { subscribed } = useAuth();

  const LINKS = [
    {
      href: "/settings",
      label: "General",
    },
    {
      href: "/settings/edit-profile",
      label: "Edit Profile",
    },
    {
      href: "/settings/password",
      label: "Password",
    },
    ...(user && subscribed
      ? [
          {
            href: "/settings/subscription",
            label: "Subscription",
          },
        ]
      : []),
    ...(user && user.role === "super_admin"
      ? [
          {
            href: "/settings/company",
            label: "Edit Company Info",
          },
        ]
      : []),
  ];

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess({});
    try {
      const response = await API.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          fullName: fullName.trim(),
        },
      });

      if (response.status === 200) {
        setSuccess({
          message: "Account deleted successfully",
        });
        router.push("/login");
      } else {
        setErrors({
          message: response.data.message || "Failed to delete account",
        });
      }
    } catch (error) {
      setErrors({
        message:
          error.response?.data.message ||
          error?.message ||
          "Failed to delete account. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  return (
    <Container size="4xl">
      <div className="py-12 md:py-20">
        <div className="flex gap-12">
          <div className="w-full max-w-40">
            <div className="border-b border-queen-black/20 pb-4 mb-4">
              <Subheading size="lg" className="mb-2">
                Settings
              </Subheading>
              <ul>
                {LINKS.map(({ href, label }) => (
                  <li key={href} className="py-1">
                    <Link
                      href={href}
                      className={pathname === href ? undefined : "opacity-70"}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="text-red-600"
              onClick={() => setIsOpen(true)}
            >
              Delete account
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Account Deletion"
        className="min-h-64 max-w-2xl"
      >
        <Form className="mt-10" onSubmit={handleDeleteAccount}>
          <div className="space-y-6">
            <p className="mb-4">
              Please type your full name to confirm you want to delete your
              account. This action cannot be undone.
            </p>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              className="border border-gray-300 rounded px-3 py-1 w-full mt-1"
              required
            />
            <Button
              as="button"
              type="submit"
              className="mt-8"
              disabled={!fullName.trim()}
            >
              {loading && <Button.Spinner />} Confirm
            </Button>
          </div>
          {errors?.message && <Form.Error>{errors.message}</Form.Error>}
          {success?.message && <Form.Success>{success.message}</Form.Success>}
        </Form>
      </Modal>
    </Container>
  );
};

export default Template;
