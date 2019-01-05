import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://react-burger-builder-db5bd.firebaseio.com/"
});

export default instance;
