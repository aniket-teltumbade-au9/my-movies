import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`w-full h-[54px] rounded-[10px] text-[#fff] font-bold text-base bg-[#2BD17E] hover:bg-[#25b96d] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
