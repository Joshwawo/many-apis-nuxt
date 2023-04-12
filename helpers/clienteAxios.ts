import axios from "axios";

export const clienteAxios = axios.create({
  baseURL: process.env?.NODE_ENV === "development" ? "http://localhost:3000" : "https://many-apis-nuxt.vercel.app",
});

export const clientAxiosClash = axios.create({
  baseURL: "https://proxy.royaleapi.dev/v1",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${process.env?.NUXT_API_CLASH}`,
    Accept: "application/json ; charset=utf-8",
  },
});

export const clienteAxiosUberduck = axios.create({
  baseURL: "https://api.uberduck.ai",
  headers: {
    accept: "application/json",
    "uberduck-id": "anonymous",
    "content-type": "application/json",
    Authorization: `Basic ${process.env?.API_KEY_UBERDUCK}`,
  },
});

export const clienteAxiosLol = axios.create({
  baseURL: "https://la1.api.riotgames.com/lol",
  headers: {
    "Accept-Language": "en-US,en;q=0.9,es;q=0.8,my;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": `${process.env?.NUXT_LOL_API_KEY}`,
  },
});

export const clienteAxiosLolAmericas = axios.create({
  baseURL: "https://americas.api.riotgames.com/lol",
  headers: {
    "Accept-Language": "en-US,en;q=0.9,es;q=0.8,my;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": `${process.env?.NUXT_LOL_API_KEY}`,
  },
});
