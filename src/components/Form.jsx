"use client";

import { forwardRef, useEffect, useState } from "react";

import Text from "@/components/Text";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const inputStyles = {
  input: [
    "placeholder:uppercase py-1 my-2 placeholder:text-queen-black/40 px-0 text-queen-black !bg-transparent border-0 border-b border-queen-black appearance-none peer",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-4 focus-within:ring-queen-blue focus:border-b-queen-black",
  ].join(" "),
  label: [
    "absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]",
    "peer-focus-within:font-medium peer-focus-within:start-0 rtl:peer-focus-within:translate-x-1/4 peer-focus-within:text-queen-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:text-queen-black/60 peer-placeholder-shown:translate-y-0 peer-focus-within:scale-75 peer-focus-within:-translate-y-6",
  ].join(" "),
};

export const Error = ({ children }) => (
  <div className="border-l-red-600 border-l-4 bg-red-50 text-queen-black/90 text-sm mt-4 py-2 px-4 rounded-sm">
    <p>{children}</p>
  </div>
);

export const Success = ({ children }) => (
  <div className="border-l-green-600 border-l-4 bg-green-50 text-queen-black/90 text-sm mt-4 py-2 px-4">
    <p>{children}</p>
  </div>
);

const Select = ({ name, options, children, required, ...otherProps }) => {
  const [showInput, setShowInput] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    if (e.target.value === "Other") {
      setShowInput(true);
      return;
    }

    setShowInput(false);
  };

  useEffect(() => {
    setDisabled(true);
  }, []);

  return (
    <div key={name}>
      <label className="uppercase" htmlFor={name}>
        {children}{" "}
        {required && (
          <span className="lowercase inline-block ml-2 text-queen-black/60">
            (required)
          </span>
        )}
      </label>
      <select
        onChange={handleChange}
        className={clsx(
          "w-full border-b py-2 my-2 focus-within:border-b-queen-black focus-within:ring-2 focus-within:ring-offset-4 focus-within:ring-queen-blue",
          showInput && "border-b-0"
        )}
        name={showInput ? "" : name}
        id={name}
        required={required}
        {...otherProps}
      >
        <option
          value="Select"
          defaultValue="Select"
          className="text-queen-black/50"
          {...(disabled ? { disabled: true } : {})}
        >
          Select
        </option>
        {options.map((option, index) => (
          <option key={`${option}-${index}`}>{option}</option>
        ))}
      </select>
      {showInput && <Form.Input name={name} className="mt-4" />}
    </div>
  );
};

const Datalist = ({ name, options, children, ...otherProps }) => (
  <div className="w-full">
    <label htmlFor={name} className="uppercase">
      {children}
    </label>
    <input
      list={`${name}-options`}
      name={name}
      id={name}
      className={clsx("w-full", inputStyles.input)}
      {...otherProps}
    />
    <datalist id={`${name}-options`}>
      {options.map((option, index) => (
        <option key={`${option}-${index}`} value={option} />
      ))}
    </datalist>
  </div>
);

const Checkbox = ({
  name,
  options,
  children,
  max,
  description,
  required,
  ...otherProps
}) => {
  const [checked, setChecked] = useState([]);

  const handleChange = (e) => {
    setChecked((prev) => {
      return e.target.checked
        ? [...prev, e.target.value]
        : prev.filter((i) => i !== e.target.value);
    });
  };

  const disabled = checked.length === parseInt(max);

  return (
    <div key={name}>
      <Text className="mb-4 uppercase">
        {children}{" "}
        {required && (
          <span className="lowercase inline-block ml-2 text-queen-black/60">
            (required)
          </span>
        )}
      </Text>
      <div className="space-y grid grid-cols-2 gap-x-6">
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <div key={option}>
                <div className="inline-flex items-center gap-x-3 w-full">
                  <input
                    type="checkbox"
                    className="p-1 w-4 h-4 border-queen-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-3 focus-within:ring-queen-blue focus:border-b-queen-black focus:border-b-2 focus-within:rounded-sm rounded-sm disabled:opacity-40"
                    name={option}
                    id={option}
                    onChange={handleChange}
                    value={option}
                    disabled={disabled && !checked.includes(option)}
                    {...otherProps}
                  />
                  <label htmlFor={name} className="text-sm">
                    {option}
                  </label>
                </div>
              </div>
            );
          }

          const categoryChecked = checked.filter((i) =>
            option.categories.includes(i)
          );

          const categoryDisabled =
            categoryChecked.length === parseInt(option.max);

          return (
            <div className="items-center gap-3 w-full" key={option.title}>
              {description && (
                <span className="block text-sm text-queen-black/80">
                  {description}
                </span>
              )}
              <span className="font-subheading mb-2 inline-block text-sm">
                {option.title}
              </span>
              {option.categories.map((category) => (
                <div
                  key={`${category}-${option.title}-${index}`}
                  className="inline-flex items-center gap-3 w-full"
                >
                  <input
                    type="checkbox"
                    className="p-1 w-4 h-4 border-queen-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-queen-blue/80 focus-within:rounded-sm rounded-sm disabled:opacity-40"
                    name={category}
                    id={category}
                    onChange={handleChange}
                    value={category}
                    disabled={categoryDisabled && !checked.includes(category)}
                    {...otherProps}
                  />
                  <label htmlFor={name} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Textarea = ({
  name,
  children,
  className,
  description,
  required = false,
  ...otherProps
}) => (
  <div>
    <label
      className={twMerge(clsx("uppercase mb-6", className))}
      htmlFor={name}
    >
      {children}
      {required && (
        <span className="lowercase inline-block ml-2 text-queen-black/60">
          (required)
        </span>
      )}
    </label>
    {description && (
      <span className="block text-sm text-queen-black/80">{description}</span>
    )}
    <textarea
      name={name}
      rows={6}
      className={inputStyles.input}
      required={required}
      {...otherProps}
    />
  </div>
);

const Input = ({
  name,
  type = "text",
  className,
  children,
  label = "md",
  description,
  required,
  ...otherProps
}) => (
  <div className={className}>
    <label
      className={clsx(label === "md" ? "uppercase" : "text-sm")}
      htmlFor={name}
    >
      {children}{" "}
      {required && (
        <span className="lowercase inline-block ml-2 text-queen-black/60">
          (required)
        </span>
      )}
    </label>
    {description && (
      <span className="block text-sm text-queen-black/80">{description}</span>
    )}
    <input
      type={type}
      className={inputStyles.input}
      name={name}
      id={name}
      required={required}
      {...otherProps}
    />
  </div>
);

const Form = forwardRef(function Form(
  {
    error,
    setError,
    success,
    setSuccess,
    children,
    handleSubmit,
    ...otherProps
  },
  ref
) {
  return (
    <>
      <form
        ref={ref}
        onSubmit={(event) => {
          if (typeof event.preventDefault === "function") {
            event.preventDefault();
          }
          if (typeof event.stopPropagation === "function") {
            event.stopPropagation();
          }
          setError({});
          handleSubmit();
        }}
        {...otherProps}
      >
        {children}
      </form>
      {error?.message && <Error>{error.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
});

Form.Input = Input;

Form.Textarea = Textarea;

Form.Checkbox = Checkbox;

Form.Select = Select;

Form.Datalist = Datalist;

Form.Success = Success;

Form.Error = Error;

export default Form;
