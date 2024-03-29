import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Controller } from "react-hook-form";

export const inputStyles = {
  input:
    "placeholder:uppercase placeholder:text-queen-black/40 block px-0 w-full text-queen-black bg-transparent border-0 border-b-2 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue peer",
  label:
    "peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-queen-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:text-queen-black/60 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase",
};

const Input = ({
  children,
  icon,
  name,
  className,
  rules,
  errors,
  control,
  label = true,
  ...otherProps
}) => (
  <div className="relative z-0 w-full group">
    {control ? (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <>
            <input
              className={clsx(
                twMerge(
                  inputStyles.input,
                  errors[name] ? "border-red-500" : "border-queen-black",
                  className
                )
              )}
              placeholder=""
              id={name}
              {...field}
              {...otherProps}
            />
            <label htmlFor={name} className={inputStyles.label}>
              {children}
            </label>
            {icon && icon}
          </>
        )}
      />
    ) : (
      <>
        <input
          className={clsx(
            twMerge(
              inputStyles.input,
              errors[name] ? "border-red-500" : "border-queen-black",
              className
            )
          )}
          name={name}
          placeholder=""
          id={name}
          {...otherProps}
        />
        <label htmlFor={name} className={inputStyles.label}>
          {children}
        </label>
        {icon && icon}
      </>
    )}
    {errors[name] && (
      <p className="text-red-500 text-sm">{errors[name].message}</p>
    )}
  </div>
);

export default Input;
