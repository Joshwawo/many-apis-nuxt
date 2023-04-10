import axios from "axios";

export const clienteAxios = axios.create({
  baseURL: "http://localhost:3000",
});

export const clientAxiosClash = axios.create({
  baseURL: "https://proxy.royaleapi.dev/v1",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${process.env?.NUXT_API_CLASH}`,
    Accept: "application/json ; charset=utf-8",
  },
});
