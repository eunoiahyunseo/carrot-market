interface TextAreaProps {
  name?: string;
  [key: string]: any;
}

const TextArea = ({ name, ...rest }: TextAreaProps) => {
  return (
    <textarea
      id={name}
      {...rest}
      rows={4}
      className="focus:border-1 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
    />
  );
};

export default TextArea;
