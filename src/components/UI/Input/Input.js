import React from "react";
import classes from "./Input.css";
const input = props => {
  let inputElement = null;
  let cssclasses = [classes.InputElement];

  if (!props.isValid && props.shouldValidate && props.touched) {
    cssclasses.push(classes.Invalid);
  } else if (props.touched) {
    cssclasses.push(classes.Valid);
  }

  switch (props.type) {
    case "input":
      inputElement = (
        <input
          className={cssclasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={cssclasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={cssclasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.config.options.map(key => (
            <option value={key.value}>{key.displayValue}</option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={cssclasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
