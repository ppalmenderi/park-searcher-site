const Select = ({ label, value, options, onChange }) => {
  return (
    <>
      <label htmlFor="park-type">{label}</label>
      <select value={value} onChange={onChange} className="form-control">
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
