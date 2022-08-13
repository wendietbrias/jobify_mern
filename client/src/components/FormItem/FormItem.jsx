import "./style.css";

const FormItem = ({ name, label, element, options, ...rest }) => {
  if (element === "Select" || element === "select") {
    return (
      <div className="form-control">
        <label>{label}</label>
        <select name={name} {...rest}>
          {options.map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="form-control">
      <label>{label}</label>
      <input name={name} {...rest} />
    </div>
  );
};

export default FormItem;
