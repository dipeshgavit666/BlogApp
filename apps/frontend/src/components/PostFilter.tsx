type postFilterProps = {
  field: string;
  value: string;
  onChange: (value: string) => void;
};

export function PostFilter({ field, value, onChange }: postFilterProps) {
  const id = `filter-${field}`;
  return (
    <div>
      <label htmlFor={id}>{field}:</label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
