import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://sunduzhoca-server.herokuapp.com/",
});

export default appAxios;
