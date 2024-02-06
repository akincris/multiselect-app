import { get } from "./api";

const BASE_URL = "/character";

export const getFilteredCharacters = (params: any) => get(BASE_URL, { params });
