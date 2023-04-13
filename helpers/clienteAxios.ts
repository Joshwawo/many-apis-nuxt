import axios from "axios";

const runtimeConfig = useRuntimeConfig();

export const clienteAxios = axios.create({
  baseURL: "http://localhost:3000",
});

export const clientAxiosClash = axios.create({
  baseURL: "https://proxy.royaleapi.dev/v1",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${runtimeConfig?.public?.nuxtApiClash}`,
    Accept: "application/json ; charset=utf-8",
  },
});

export const clienteAxiosUberduck = axios.create({
  baseURL: "https://api.uberduck.ai",
  headers: {
    accept: "application/json",
    "uberduck-id": "anonymous",
    "content-type": "application/json",
    Authorization: `Basic ${runtimeConfig?.public?.nuxtApiUberDuck}`,
  },
});

export const clienteAxiosLol = axios.create({
  baseURL: "https://la1.api.riotgames.com/lol",
  headers: {
    "Accept-Language": "en-US,en;q=0.9,es;q=0.8,my;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": `${runtimeConfig?.public?.nuxtApiLol}`,
  },
});

export const clienteAxiosLolAmericas = axios.create({
  baseURL: "https://americas.api.riotgames.com/lol",
  headers: {
    "Accept-Language": "en-US,en;q=0.9,es;q=0.8,my;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": `${runtimeConfig?.public?.nuxtApiLol}`,
  },
});
