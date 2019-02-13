import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { placeOrder, initiateOrder } from "../../../redux/actions/order";

class ContactData extends Component {
  state = {
    isFormValid: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Name" },
        value: "",
        validation: { required: true, minLength: 5 },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      zip: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "ZIP" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      state: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "State" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Email" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest ", displayValue: "Cheapest" }
          ]
        },
        value: "",
        valid: true
      }
    }
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
  inputChangedHandler = (event, field) => {
    const updatedFormData = { ...this.state.orderForm };
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

    this.setState({ orderForm: updatedFormData, isFormValid: isFormValid });
  };
  orderSubmitHandler = event => {
    event.preventDefault();
    console.log(this.props);
    // this.setState({ loading: true });
    this.props.onInitiatePurchase();
    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    this.props.onPurchaseBurger(order, this.props.token);
    this.props.history.push("/");
  };
  render() {
    const inputElements = Object.keys(this.state.orderForm).map(key => {
      return (
        <Input
          key={key}
          touched={this.state.orderForm[key].touched}
          isValid={this.state.orderForm[key].valid}
          type={this.state.orderForm[key].elementType}
          config={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          shouldValidate={this.state.orderForm[key].validation}
          changed={event => this.inputChangedHandler(event, key)}
        />
      );
    });
    let form = !this.props.loading ? (
      <form onSubmit={this.orderSubmitHandler}>
        {inputElements}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Order
        </Button>
      </form>
    ) : (
      <Spinner />
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loading: state.order.loading, token: state.auth.token };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitiatePurchase: () => dispatch(initiateOrder),
    onPurchaseBurger: (order, token) => {
      dispatch(placeOrder(order, token));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
