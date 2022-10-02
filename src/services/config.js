import axios from "axios";

export const http = axios.create({
  baseURL: "https://app-av.herokuapp.com/api/",
});
