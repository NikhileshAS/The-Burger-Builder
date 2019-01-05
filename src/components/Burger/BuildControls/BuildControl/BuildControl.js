import React from "react";
import classes from "./BuildControl.css";

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      disabled={props.ingredients === 0}
      onClick={props.remove}
    >
      Less
    </button>

    <button className={classes.More} onClick={props.add}>
      More
    </button>
  </div>
);
export default BuildControl;
