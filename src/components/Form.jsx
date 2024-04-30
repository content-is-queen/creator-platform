import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import Text from "@/components/Text";

export const inputStyles = {
  input: [
    "placeholder:uppercase py-3 placeholder:text-queen-black/40 px-0 text-queen-black !bg-transparent border-0 border-b border-queen-black appearance-none peer",
    "focus:outline-none focus:ring-0 focus:border-queen-blue",
  ].join(" "),
  label: [
    "absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]",
    "peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-queen-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:text-queen-black/60 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
  ].join(" "),
};

const Select = ({ name, options, children }) => (
  <div key={name}>
    <label className="uppercase" for={name}>
      {children}
    </label>
    <select className="w-full" name={name} id={name}>
      <option value="" selected disabled>
        Select
      </option>
      {options.map((option, index) => (
        <option key={`${option}-${index}`}>{option}</option>
      ))}
    </select>
  </div>
);

const Checkbox = ({ name, options, children }) => (
  <div key={name}>
    <Text className="mb-4 uppercase">{children}</Text>
    <div className="space-y">
      {options.map((option) => (
        <div className="inline-flex items-center gap-3 w-full" key={option}>
          <input
            type="checkbox"
            className={twMerge(inputStyles.input, "p-1")}
            name={option}
            id={option}
          />
          <label for={name} className="text-sm">
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const Textarea = ({ name, children, ...otherProps }) => (
  <div>
    <label className="uppercase" for={name}>
      {children}
    </label>
    <textarea
      name={name}
      rows={6}
      className={inputStyles.input}
      {...otherProps}
    />
  </div>
);

const Input = ({ name, type, children, ...otherProps }) => (
  <div>
    <label className="uppercase" for={name}>
      {children}
    </label>
    <input
      type={type}
      className={inputStyles.input}
      name={name}
      id={name}
      {...otherProps}
    />
  </div>
);

const Form = forwardRef(function Form(
  { errors, setErrors, children, handleSubmit, ...otherProps },
  ref
) {
  return (
    <>
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          setErrors({});
          handleSubmit();
        }}
        {...otherProps}
      >
        {children}
      </form>
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
    </>
  );
});

export default Form;

Form.Input = Input;

Form.Textarea = Textarea;

Form.Checkbox = Checkbox;

Form.Select = Select;
