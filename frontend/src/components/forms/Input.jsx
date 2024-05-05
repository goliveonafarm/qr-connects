const Input = ({placeholder, name, value, onChange}) => {
  return (
    <label className="input input-bordered flex items-center gap-2 text-xl">
    <input
      type="text"
      className="grow text-success  placeholder-white"
      placeholder={placeholder}
      name={name}
      autoComplete={name}
      value={value}
      onChange={onChange}
    />
  </label>
  )
}

export default Input