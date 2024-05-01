const CheckBox = ({ label, propValue, handleChange, variant, isChecked, disabled }) => {
  return (
    <div className="form-control">
 
      <label className="cursor-pointer label flex justify-start  ">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className={`checkbox checkbox-${variant}`}
          onChange={(e) => {
            handleChange(propValue, e.target.checked)}}
        />
        <span className="label-text ml-2">{`${label}`}</span>
      </label>
    </div>
  );
};

export default CheckBox;
