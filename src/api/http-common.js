import axios from "axios";

export default axios.create({
  baseURL: "http://172.20.10.2:5000/",
  headers: {
    "Content-type": "application/json"
  }
});