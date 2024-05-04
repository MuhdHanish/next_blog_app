export const TextAreaInput = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <textarea
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder={placeholder}
    ></textarea>
  );
};
