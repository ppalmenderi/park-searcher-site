const ParkTypeSelect = ({ className, label, options, value, onChange }) => {
  return (
    <>
      <label htmlFor="park-type">{label}</label>
      <select className={className} value={value} onChange={onChange} name="park-type">
        {/* <option value="">{label}</option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default ParkTypeSelect;
