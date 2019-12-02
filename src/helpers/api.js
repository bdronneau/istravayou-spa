import axios from 'axios'
import store from "../store/index"
import Vue from 'vue';

var axiosInstance = axios.create({
    baseURL: "http://localhost:1323/api"
});

export function retrieveAthlete() {
    return axiosInstance.get("/athlete", getHeaders()).then(response => {
        return response.data
      })
      .catch((error) => {
        Vue.$log.error("On retrieve athlete", error)
        return error
      });
}

export function checkAthlete() {
    return axiosInstance.head("/athlete", getHeaders()).then(response => {
        return response.data
      });
}

export function authMeAPI() {
    return axiosInstance.post("/auth", {}, getHeaders()).then(response => {
        return response.data
      });
}

function getHeaders() {
  const code = store.getters.code
  if (code !== null) {
    return { headers: { "X-Athlete-Code": code }}
  }

  return {}
}
