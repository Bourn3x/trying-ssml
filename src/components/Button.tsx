import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className, ...buttonProps }: Props) {
  return (
    <button
      className={`py-2 px-8 rounded-full font-semibold mt-4 bg-blue-400 hover:bg-blue-500 duration-300 disabled:opacity-30 w-[210px] ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
