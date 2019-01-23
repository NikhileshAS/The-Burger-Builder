import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: { street: "", postalcode: "" },
    loading: false
  };

  orderSubmitHandler = event => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Nikhilesh",
        address: {
          street: "Brindhavan Avenue",
          zip: "641687",
          state: "Tamil Nadu",
          country: "India"
        },
        email: "nikhi.ajay96@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        // this.state.history.push({ pathname: "/" });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error(error);
      });
  };
  render() {
    let form = !this.state.loading ? (
      <form>
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Name"
        />
        <input
          type="email"
          className={classes.Input}
          name="email"
          placeholder="Email"
        />
        <input
          type="text"
          className={classes.Input}
          name="street"
          placeholder="Steet"
        />
        <input
          type="text"
          className={classes.Input}
          name="postalcode"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderSubmitHandler}>
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
export default withRouter(ContactData);
