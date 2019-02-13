import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "../Auth/Auth.css";
import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    isFormValid: false,
    isSignIn: false,
    controls: {
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Email" },
        value: "",
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Password" },
        value: "",
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      }
    }
  };

  onAuthHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignIn
    );
  };
  inputChangedHandler = (event, field) => {
    const updatedFormData = { ...this.state.controls };
    updatedFormData[field].value = event.target.value;
    updatedFormData[field].touched = true;
    updatedFormData[field].valid = this.checkForValidation(
      updatedFormData[field].value,
      updatedFormData[field].validation
    );
    let isFormValid = true;
    for (let formElement in updatedFormData) {
      isFormValid = updatedFormData[formElement].valid && isFormValid;
    }

    this.setState({ controls: updatedFormData, isFormValid: isFormValid });
  };
  checkForValidation = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = isValid && value.trim() !== "";
      }
      if (rules.minLength) {
        isValid = isValid && value.length >= rules.minLength;
      }
    }
    return isValid;
  };

  switchToSignInHandler = () => {
    this.setState(prevState => ({ isSignIn: !prevState.isSignIn }));
  };

  render() {
    // console.log("Sign In", this.state.isSignIn);

    const inputElements = Object.keys(this.state.controls).map(key => {
      return (
        <Input
          key={key}
          touched={this.state.controls[key].touched}
          isValid={this.state.controls[key].valid}
          type={this.state.controls[key].elementType}
          config={this.state.controls[key].elementConfig}
          value={this.state.controls[key].value}
          shouldValidate={this.state.controls[key].validation}
          changed={event => this.inputChangedHandler(event, key)}
        />
      );
    });
    // console.log(this.props.loading);

    return (
      <div className={classes.Auth}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onAuthHandler}>
            {inputElements}
            <Button btnType="Success" disabled={!this.state.isFormValid}>
              Go
            </Button>
          </form>
        )}
        <Button btnType="Danger" clicked={() => this.switchToSignInHandler()}>
          {this.state.isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}

const matchStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignIn) =>
      dispatch(auth(email, password, isSignIn))
  };
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(Auth);
