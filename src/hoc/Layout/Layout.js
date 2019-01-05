import React, { Component } from "react";
import Aux from "../Auxilliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  toggleSideDrawer = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  };
  render() {
    return (
      <Aux>
        <Toolbar clickHandler={this.toggleSideDrawer} />
        <SideDrawer
          show={this.state.showSideDrawer}
          toggle={this.toggleSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
