export const TextInput = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <input
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      type="text"
      placeholder={placeholder}
    />
  );
};
