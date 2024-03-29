import { cls } from "@libs/client/utils";
interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}
const Button = ({ text, large, rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cls(
        " w-full rounded-md border border-transparent bg-orange-500 px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        large ? "py-3 text-base" : "mt-6 py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
};

export default Button;
