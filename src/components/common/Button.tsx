import React, { ComponentPropsWithoutRef } from "react";
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = ({ startIcon, endIcon, ...rest }: ButtonProps) => {
  return (
    <button
      className="rounded-2xl border-2 border-gray-300 bg-white text-black h-[56px] w-[128px] flex justify-center items-center gap-4 cursor-pointer"
      {...rest}
    >
      {startIcon}
      {rest.children}
      {endIcon}
    </button>
  );
};
