import axios from "axios";
import { ICharacter } from "../interfaces/character";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

type GetCharactersResponse = {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string 
    },
    results: ICharacter[]
}

const get = async (url: string, data: { params: any }) => {
  try {
    return await axios.get<GetCharactersResponse>(`${API_BASE_URL}${url}`, data);
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error: any) => {
  console.error(error.message);
};

export { get };
