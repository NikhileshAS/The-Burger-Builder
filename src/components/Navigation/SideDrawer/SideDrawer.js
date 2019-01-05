import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary";

const SideDrawer = props => {
  return (
    <Aux>
      <Backdrop show={props.show} click={props.toggle} />
      <div
        className={[
          classes.SideDrawer,
          props.show ? classes.Open : classes.Close
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
