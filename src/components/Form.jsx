import { forwardRef } from "react";

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
