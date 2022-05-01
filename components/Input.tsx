interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  [key: string]: any;
}

/* defualt is kind="text" */
const Input = ({ name, label, kind = "text", rest }: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {kind == "text" ? (
        <div className="mt-2 flex items-center shadow-sm">
          <input
            id={name}
            {...rest}
            className="w-full appearance-none rounded-md border border-gray-300
                    px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500
                    focus:outline-none focus:ring-orange-500"
          />
        </div>
      ) : null}
      {kind == "phone" ? (
        <div className="mt-2 flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id="input"
            type="number"
            className="w-full appearance-none rounded-r-md border border-gray-300
                         px-3 py-2 placeholder-gray-400 shadow-sm  focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            required
          />
        </div>
      ) : null}
    </div>
  );
};

export default Input;
