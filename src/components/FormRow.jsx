import React from "react";

function FormRow({ type, name, label, value, handleChange }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        className="form-input"
      />
    </div>
  );
}

export default FormRow;
