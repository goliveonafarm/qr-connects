const CheckBox = ({ label, propValue, handleChange, variant }) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <input
          type="checkbox"
          defaultChecked
          className={`checkbox checkbox-${variant}`}
          onChange={(e) => {
            console.log('checked:', e.target.checked)
            handleChange(propValue, e.target.checked)}}
        />
        <span className="label-text">{`${label}`}</span>
      </label>
    </div>
  );
};

export default CheckBox;
