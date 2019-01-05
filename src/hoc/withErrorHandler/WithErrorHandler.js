import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilliary";

const ErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };
    componentWillMount() {
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );
    }
    errorConirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent />
        </Aux>
      );
    }
  };
};
export default ErrorHandler;
