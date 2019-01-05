import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxilliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentWillUpdate() {
    console.log("Modal will update");
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} click={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={
            this.props.show
              ? { transform: "translateY(0)", opacity: "1" }
              : { transform: "translateY(-100vh)", opacity: "0" }
          }
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
