"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";

import Text from "@/components/Text";
import Button from "@/components/Button";
import AuthInputController from "@/components/AuthInputController";
import { Error } from "@/components/Form";

const FIELDS = [
  {
    name: "email",
    type: "email",
    children: "Email Address",
    rules: {
      required: "Email address is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    children: "Password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError({});
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
      setLoading(false);

      if (error.code == "auth/invalid-credential") {
        setError({
          message: "Login failed: Your email or password is incorrect",
        });
      } else {
        setError({
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {FIELDS.map(({ children, name, ...otherProps }) => (
            <AuthInputController
              key={name}
              control={control}
              errors={formErrors}
              name={name}
              {...otherProps}
            >
              {children}
            </AuthInputController>
          ))}
          <Text size="sm" className="!mt-2">
            <Link href="/forgot-password">Forgot password?</Link>
          </Text>
        </div>
        <Button as="button" type="submit" className="mt-8">
          {loading && <Button.Spinner />}
          Sign in
        </Button>
        <Text size="sm" className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-queen-blue">
            Sign up
          </Link>
        </Text>
      </form>
      {error?.message && <Error>{error.message}</Error>}
    </>
  );
};

export default LoginForm;
