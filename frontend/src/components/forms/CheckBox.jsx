const CheckBox = ({ label, propValue, handleChange, variant, isChecked }) => {
  return (
    <div className="form-control">
 
      <label className="cursor-pointer label flex justify-start  ">
        <input
          type="checkbox"
          checked={isChecked}
          className={`checkbox checkbox-${variant}`}
          onChange={(e) => {
            console.log(e.target.checked);
            handleChange(propValue, e.target.checked)}}
        />
        <span className="label-text ml-2">{`${label}`}</span>
      </label>
    </div>
  );
};

export default CheckBox;
